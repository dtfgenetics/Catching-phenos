import { fetchJson } from '../../../src/data/fetch-json.js';
import { summarizeMvpData, showPanel } from '../../../src/ui/render-summary.js';
import { renderChosenStarter, renderStarterSelection } from '../../../src/ui/starter-selection-ui.js';
import { renderMapGrid, renderMapLabel } from '../../../src/ui/map-ui.js';
import { renderMovementControls } from '../../../src/ui/movement-ui.js';
import { renderEncounterControls, renderEncounterResult } from '../../../src/ui/encounter-ui.js';
import { chooseStarter, getStarterOptions } from '../../../src/engine/starter-selection.js';
import { setStarterChoice } from '../../../src/engine/game-state.js';
import { loadSave, writeSave } from '../../../src/engine/save.js';
import { getMap } from '../../../src/engine/maps.js';
import { applyTransition, movePlayer } from '../../../src/engine/movement.js';
import { rollEncounter, rollLevel } from '../../../src/engine/encounters.js';
import { findExpression } from '../../../src/engine/expression.js';

const startButton = document.querySelector('#start-button');
const panel = document.querySelector('#game-panel');
const panelTitle = document.querySelector('#panel-title');
const panelCopy = document.querySelector('#panel-copy');
const starterSelection = document.querySelector('#starter-selection');
const mapLabel = document.querySelector('#map-label');
const mapPreview = document.querySelector('#map-preview');
const movementControls = document.querySelector('#movement-controls');
const encounterControls = document.querySelector('#encounter-controls');
const encounterResult = document.querySelector('#encounter-result');
const debugOutput = document.querySelector('#debug-output');

let activeData = null;

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

function renderCurrentMap(data, saveData) {
  const currentMap = getMap(data.maps, saveData.player.currentMap);
  renderMapLabel({ container: mapLabel, map: currentMap, player: saveData.player });
  renderMapGrid({ container: mapPreview, map: currentMap, player: saveData.player });
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

  renderEncounterResult({
    container: encounterResult,
    encounter,
    species,
    level,
    expression
  });

  debugOutput.textContent = JSON.stringify({
    encounter: encounter?.speciesId ?? null,
    level,
    weather: state.weather,
    cue: state.cue,
    expression: expression?.id ?? null
  }, null, 2);
}

function bindKeyboardMovement() {
  window.addEventListener('keydown', (event) => {
    const keyMap = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      w: 'up',
      s: 'down',
      a: 'left',
      d: 'right'
    };

    const direction = keyMap[event.key];
    if (!direction) return;
    event.preventDefault();
    handleMove(direction);
  });
}

bindKeyboardMovement();

startButton?.addEventListener('click', async () => {
  showPanel({
    panel,
    titleEl: panelTitle,
    copyEl: panelCopy,
    debugEl: debugOutput,
    title: 'Seedling Town Demo',
    copy: 'Loading MVP data...'
  });

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

    renderStarterSelection({
      container: starterSelection,
      starters,
      onChoose: (starterId) => {
        const starterUnit = chooseStarter(allUnits, starterId);
        const nextSave = setStarterChoice(loadSave(), starterId, starterUnit);
        writeSave(nextSave);

        renderChosenStarter({ container: starterSelection, starterUnit });
        renderCurrentMap(data, nextSave);
        panelCopy.textContent = 'Starter saved locally. Use the movement buttons or arrow keys to move, then test a field encounter.';
        debugOutput.textContent = JSON.stringify(nextSave.player, null, 2);
      }
    });
  } catch (error) {
    showPanel({
      panel,
      titleEl: panelTitle,
      copyEl: panelCopy,
      debugEl: debugOutput,
      title: 'Data Load Error',
      copy: 'Data load failed. Check paths and JSON files.',
      debug: String(error)
    });
  }
});
