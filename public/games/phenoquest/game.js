import { fetchJson } from '../../../src/data/fetch-json.js';
import { summarizeMvpData, showPanel } from '../../../src/ui/render-summary.js';
import { renderChosenStarter, renderStarterSelection } from '../../../src/ui/starter-selection-ui.js';
import { renderMapGrid, renderMapLabel } from '../../../src/ui/map-ui.js';
import { renderMovementControls } from '../../../src/ui/movement-ui.js';
import { renderEncounterControls, renderEncounterResult } from '../../../src/ui/encounter-ui.js';
import { renderCombatPanel, renderCombatResult } from '../../../src/ui/combat-ui.js';
import { renderRecipeMessage, renderRecipePanel } from '../../../src/ui/recipe-ui.js';
import { renderCollectionPanel } from '../../../src/ui/collection-ui.js';
import { renderVaultGardenPanel } from '../../../src/ui/vault-garden-ui.js';
import { chooseStarter, getStarterOptions } from '../../../src/engine/starter-selection.js';
import { addStoredUnit, setStarterChoice } from '../../../src/engine/game-state.js';
import { loadSave, resetSave, writeSave } from '../../../src/engine/save.js';
import { getMap } from '../../../src/engine/maps.js';
import { applyTransition, movePlayer } from '../../../src/engine/movement.js';
import { rollEncounter, rollLevel } from '../../../src/engine/encounters.js';
import { findExpression, getExpressionRewardTag } from '../../../src/engine/expression.js';
import { createCombatant, isDefeated, resolveAbility } from '../../../src/engine/battle.js';
import { calculateMaterialReward } from '../../../src/engine/battle-rewards.js';
import { addBattleProgress, addMaterials, addRootedResult, spendMaterials } from '../../../src/engine/collection.js';
import { addMaterial, removeMaterial } from '../../../src/engine/inventory.js';
import { applyQuestEvent } from '../../../src/engine/quest-events.js';
import { createTimer } from '../../../src/engine/timers.js';
import { addResultTimer, findResultTimer, refreshResultTimers, removeResultTimer } from '../../../src/engine/result-timers.js';
import { createTimerResult } from '../../../src/engine/result-factory.js';

const startButton = document.querySelector('#start-button');
const resetButton = document.querySelector('#reset-save-button');
const panel = document.querySelector('#game-panel');
const panelTitle = document.querySelector('#panel-title');
const panelCopy = document.querySelector('#panel-copy');
const starterSelection = document.querySelector('#starter-selection');
const mapLabel = document.querySelector('#map-label');
const mapPreview = document.querySelector('#map-preview');
const movementControls = document.querySelector('#movement-controls');
const encounterControls = document.querySelector('#encounter-controls');
const encounterResult = document.querySelector('#encounter-result');
const combatPanel = document.querySelector('#combat-panel');
const recipePanel = document.querySelector('#recipe-panel');
const vaultGardenPanel = document.querySelector('#vault-garden-panel');
const collectionPanel = document.querySelector('#collection-panel');
const debugOutput = document.querySelector('#debug-output');

let activeData = null;
let activeCombat = null;
let activeRecipeSpeciesId = null;
let activeRecipeExpressionId = null;

const DATA_PATHS = {
  expressions: '../../../data/expressions/expression_matrix_mvp.json',
  starters: '../../../data/phenos/mvp_units.json',
  extraUnits: '../../../data/phenos/mvp_units_extra.json',
  encounters: '../../../data/encounters/terp_fields.json',
  items: '../../../data/items/mvp_items.json',
  abilities: '../../../data/moves/mvp_abilities.json',
  quests: '../../../data/quests/mvp_quests.json',
  dialogue: '../../../data/dialogue/mvp_dialogue.json',
  starterSlots: '../../../data/starter_slots.json'
};

const MAP_PATHS = [
  '../../../data/maps/seedling_town.json',
  '../../../data/maps/greenhouse.json',
  '../../../data/maps/terp_fields.json',
  '../../../data/maps/aroma_trial_greenhouse.json'
];

async function loadGameData() {
  const entries = await Promise.all(
    Object.entries(DATA_PATHS).map(async ([key, path]) => [key, await fetchJson(path)])
  );
  const maps = await Promise.all(MAP_PATHS.map((path) => fetchJson(path)));
  return { ...Object.fromEntries(entries), maps };
}

function getAllUnits(data) {
  return [...(data.starters ?? []), ...(data.extraUnits ?? [])];
}

function getSpecies(data, speciesId) {
  return getAllUnits(data).find((unit) => unit.id === speciesId) ?? null;
}

function getAbility(data, abilityId) {
  return data.abilities.find((ability) => ability.id === abilityId) ?? null;
}

function getUnitActions(data, species) {
  return (species.abilities ?? []).map((abilityId) => getAbility(data, abilityId)).filter(Boolean);
}

function getExpressionById(expressionId) {
  return activeData?.expressions.find((expression) => expression.id === expressionId) ?? null;
}

function renderCurrentMap(data, saveData) {
  const currentMap = getMap(data.maps, saveData.player.currentMap);
  renderMapLabel({ container: mapLabel, map: currentMap, player: saveData.player });
  renderMapGrid({ container: mapPreview, map: currentMap, player: saveData.player });
}

function renderCollectionProgress(saveData = loadSave()) {
  if (!activeData) return;
  renderCollectionPanel({
    container: collectionPanel,
    collection: saveData.collection,
    units: getAllUnits(activeData)
  });
}

function renderVaultGarden(saveData = loadSave()) {
  renderVaultGardenPanel({
    container: vaultGardenPanel,
    vaultGarden: saveData.vaultGarden
  });
}

function renderActiveCombat(log = '') {
  if (!activeCombat) return;
  renderCombatPanel({
    container: combatPanel,
    player: activeCombat.player,
    opponent: activeCombat.opponent,
    actions: activeCombat.actions,
    log,
    onAction: handleCombatAction
  });
}

function clearPlayPanels() {
  encounterResult.innerHTML = '';
  combatPanel.innerHTML = '';
  recipePanel.innerHTML = '';
  vaultGardenPanel.innerHTML = '';
  collectionPanel.innerHTML = '';
  activeCombat = null;
  activeRecipeSpeciesId = null;
  activeRecipeExpressionId = null;
}

function renderRecipeForSpecies(species, expression = null) {
  if (!species) return;

  const refreshedSave = refreshResultTimers(loadSave());
  writeSave(refreshedSave);

  const entry = refreshedSave.collection[species.id];
  const activeTimer = findResultTimer(refreshedSave, species.id);
  activeRecipeSpeciesId = species.id;
  activeRecipeExpressionId = expression?.id ?? activeRecipeExpressionId;

  renderRecipePanel({
    container: recipePanel,
    entry,
    species,
    activeTimer,
    onStart: () => handleStartRecipe(species, expression),
    onRefresh: () => renderRecipeForSpecies(species, expression),
    onClaim: () => handleClaimRecipe(species)
  });
  renderCollectionProgress(refreshedSave);
  renderVaultGarden(refreshedSave);
}

function handleStartRecipe(species, expression = null) {
  const saveData = refreshResultTimers(loadSave());
  const entry = saveData.collection[species.id];
  if (!entry || entry.materialsOwned < entry.materialsRequired) return;

  const timer = createTimer({
    id: `${species.id}_${Date.now()}`,
    recipeId: species.id,
    durationSeconds: species.recipe.demoSeconds,
    inputTags: [getExpressionRewardTag(expression)],
    weatherAtStart: saveData.world.weather,
    cueAtStart: saveData.world.cue
  });

  const nextSave = addResultTimer({
    ...saveData,
    collection: spendMaterials(saveData.collection, species.id, entry.materialsRequired),
    inventory: removeMaterial(saveData.inventory, species.id, entry.materialsRequired)
  }, timer);

  writeSave(nextSave);
  renderRecipeForSpecies(species, expression);
  renderCollectionProgress(nextSave);
  renderVaultGarden(nextSave);
  debugOutput.textContent = JSON.stringify({ timerStarted: timer, activeQuest: nextSave.quests.activeQuest }, null, 2);
}

function handleClaimRecipe(species) {
  const saveData = refreshResultTimers(loadSave());
  const timer = findResultTimer(saveData, species.id);
  if (!timer || timer.status !== 'ready') return;

  const expression = getExpressionById(activeRecipeExpressionId) ?? findExpression(activeData.expressions, timer.weatherAtStart, timer.cueAtStart);
  const resultUnit = createTimerResult({ species, expression, sourceTags: timer.inputTags });
  const withoutTimer = removeResultTimer(saveData, timer.id);
  const withStoredUnit = addStoredUnit(withoutTimer, resultUnit);
  const withCollection = {
    ...withStoredUnit,
    collection: addRootedResult(withStoredUnit.collection, species.id, resultUnit.trait, resultUnit.expression, resultUnit.isKeeper)
  };
  const nextSave = applyQuestEvent(withCollection, 'first_result_claimed');

  writeSave(nextSave);
  renderRecipeMessage({ container: recipePanel, message: `${resultUnit.displayName} result claimed and saved to the Vault Garden.` });
  renderVaultGarden(nextSave);
  renderCollectionProgress(nextSave);
  debugOutput.textContent = JSON.stringify({ resultUnit, activeQuest: nextSave.quests.activeQuest, collection: nextSave.collection[species.id] }, null, 2);
}

function handleMove(direction) {
  if (!activeData) return;

  const saveData = loadSave();
  const currentMap = getMap(activeData.maps, saveData.player.currentMap);
  const moveResult = movePlayer(saveData, currentMap, direction);
  let nextSave = moveResult.saveData;

  if (moveResult.transition) {
    nextSave = applyTransition(nextSave, moveResult.transition);
  }

  writeSave(nextSave);
  renderCurrentMap(activeData, nextSave);
  debugOutput.textContent = JSON.stringify({
    map: nextSave.player.currentMap,
    position: nextSave.player.position,
    cue: nextSave.world.cue,
    moved: moveResult.moved,
    transition: moveResult.transition?.id ?? null
  }, null, 2);
}

function handleEncounterRoll() {
  if (!activeData) return;

  const saveData = loadSave();
  const state = {
    weather: saveData.world.weather,
    cue: saveData.world.cue,
    flags: saveData.quests.flags
  };
  const encounter = rollEncounter(activeData.encounters, state);
  const species = encounter ? getSpecies(activeData, encounter.speciesId) : null;
  const level = encounter ? rollLevel(encounter) : null;
  const expression = findExpression(activeData.expressions, state.weather, state.cue);

  renderEncounterResult({ container: encounterResult, encounter, species, level, expression });

  if (species && saveData.team[0]) {
    const playerSpecies = getSpecies(activeData, saveData.team[0].speciesId);
    activeCombat = {
      species,
      expression,
      player: createCombatant(playerSpecies, saveData.team[0].level ?? 1),
      opponent: createCombatant(species, level),
      actions: getUnitActions(activeData, playerSpecies),
      opponentActions: getUnitActions(activeData, species)
    };
    renderActiveCombat('Combat test started. Choose an action.');
  }

  debugOutput.textContent = JSON.stringify({
    encounter: encounter?.speciesId ?? null,
    level,
    weather: state.weather,
    cue: state.cue,
    expression: expression?.id ?? null
  }, null, 2);
}

function awardVictory(activeCombatState) {
  const saveData = loadSave();
  const tag = getExpressionRewardTag(activeCombatState.expression);
  const reward = calculateMaterialReward({
    victory: true,
    highStability: activeCombatState.player.stability >= 7,
    expressionTag: tag
  });

  const collectionAfterBattle = addBattleProgress(saveData.collection, activeCombatState.species);
  const collectionAfterReward = addMaterials(collectionAfterBattle, activeCombatState.species, reward.materialCount, activeCombatState.expression?.id ?? null);
  const inventoryAfterReward = addMaterial(saveData.inventory, activeCombatState.species.id, reward.materialCount, reward.tags);
  const withReward = {
    ...saveData,
    collection: collectionAfterReward,
    inventory: inventoryAfterReward
  };
  const withFirstBattle = applyQuestEvent(withReward, 'first_battle_won');
  const nextSave = applyQuestEvent(withFirstBattle, 'first_material_earned');

  writeSave(nextSave);
  return { reward, nextSave };
}

function handleCombatAction(actionId) {
  if (!activeCombat || !activeData) return;

  const action = getAbility(activeData, actionId);
  if (!action) return;

  const playerTurn = resolveAbility({ attacker: activeCombat.player, defender: activeCombat.opponent, ability: action });

  activeCombat.player = playerTurn.attacker;
  activeCombat.opponent = playerTurn.defender;

  if (isDefeated(activeCombat.opponent)) {
    const defeatedState = activeCombat;
    const { reward, nextSave } = awardVictory(defeatedState);
    renderCombatResult({ container: combatPanel, message: `${defeatedState.opponent.displayName} was defeated. Earned ${reward.materialCount} field material.` });
    renderRecipeForSpecies(defeatedState.species, defeatedState.expression);
    renderCollectionProgress(nextSave);
    renderVaultGarden(nextSave);
    debugOutput.textContent = JSON.stringify({ reward, activeQuest: nextSave.quests.activeQuest, collection: nextSave.collection[defeatedState.species.id] }, null, 2);
    activeCombat = null;
    return;
  }

  const opponentAction = activeCombat.opponentActions[0];
  const opponentTurn = resolveAbility({ attacker: activeCombat.opponent, defender: activeCombat.player, ability: opponentAction });

  activeCombat.opponent = opponentTurn.attacker;
  activeCombat.player = opponentTurn.defender;

  if (isDefeated(activeCombat.player)) {
    renderCombatResult({ container: combatPanel, message: `${activeCombat.player.displayName} cannot continue. Reset or try another encounter.` });
    activeCombat = null;
    return;
  }

  renderActiveCombat(`${playerTurn.log}\n${opponentTurn.log}`);
}

function handleResetSave() {
  const freshSave = resetSave();
  clearPlayPanels();
  if (activeData) {
    renderCurrentMap(activeData, freshSave);
    renderCollectionProgress(freshSave);
    renderVaultGarden(freshSave);
  }
  starterSelection.innerHTML = '';
  panelCopy.textContent = 'Save reset. Press Start Demo again or choose a new starter.';
  debugOutput.textContent = JSON.stringify(freshSave.player, null, 2);
}

function bindKeyboardMovement() {
  window.addEventListener('keydown', (event) => {
    const keyMap = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right' };
    const direction = keyMap[event.key];
    if (!direction) return;
    event.preventDefault();
    handleMove(direction);
  });
}

bindKeyboardMovement();
resetButton?.addEventListener('click', handleResetSave);

startButton?.addEventListener('click', async () => {
  showPanel({ panel, titleEl: panelTitle, copyEl: panelCopy, debugEl: debugOutput, title: 'Seedling Town Demo', copy: 'Loading MVP data...' });

  try {
    const data = await loadGameData();
    activeData = data;
    const allUnits = getAllUnits(data);
    const starters = getStarterOptions(allUnits);

    showPanel({
      panel,
      titleEl: panelTitle,
      copyEl: panelCopy,
      debugEl: debugOutput,
      title: 'Choose Your First Partner',
      copy: 'Pick one starter to begin the Seedling Town Demo.',
      debug: summarizeMvpData(data)
    });

    renderMovementControls({ container: movementControls, onMove: handleMove });
    renderEncounterControls({ container: encounterControls, onRoll: handleEncounterRoll });
    renderCollectionProgress(loadSave());
    renderVaultGarden(loadSave());

    renderStarterSelection({
      container: starterSelection,
      starters,
      onChoose: (starterId) => {
        const starterUnit = chooseStarter(allUnits, starterId);
        const withStarter = setStarterChoice(loadSave(), starterId, starterUnit);
        const nextSave = applyQuestEvent(withStarter, 'starter_chosen');
        writeSave(nextSave);

        renderChosenStarter({ container: starterSelection, starterUnit });
        renderCurrentMap(data, nextSave);
        renderCollectionProgress(nextSave);
        renderVaultGarden(nextSave);
        panelCopy.textContent = 'Starter saved locally. Win combat to earn material, start a timer, and claim the result.';
        debugOutput.textContent = JSON.stringify({ player: nextSave.player, activeQuest: nextSave.quests.activeQuest }, null, 2);
      }
    });
  } catch (error) {
    showPanel({ panel, titleEl: panelTitle, copyEl: panelCopy, debugEl: debugOutput, title: 'Data Load Error', copy: 'Data load failed. Check paths and JSON files.', debug: String(error) });
  }
});
