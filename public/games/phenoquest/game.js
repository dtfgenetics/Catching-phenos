import { fetchJson } from '../../../src/data/fetch-json.js';
import { summarizeMvpData, showPanel } from '../../../src/ui/render-summary.js';
import { renderChosenStarter, renderStarterSelection } from '../../../src/ui/starter-selection-ui.js';
import { chooseStarter, getStarterOptions } from '../../../src/engine/starter-selection.js';
import { setStarterChoice } from '../../../src/engine/game-state.js';
import { loadSave, writeSave } from '../../../src/engine/save.js';

const startButton = document.querySelector('#start-button');
const panel = document.querySelector('#game-panel');
const panelTitle = document.querySelector('#panel-title');
const panelCopy = document.querySelector('#panel-copy');
const starterSelection = document.querySelector('#starter-selection');
const debugOutput = document.querySelector('#debug-output');

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

    renderStarterSelection({
      container: starterSelection,
      starters,
      onChoose: (starterId) => {
        const starterUnit = chooseStarter(allUnits, starterId);
        const nextSave = setStarterChoice(loadSave(), starterId, starterUnit);
        writeSave(nextSave);

        renderChosenStarter({ container: starterSelection, starterUnit });
        panelCopy.textContent = 'Starter saved locally. Next build step: transition into Seedling Town movement and dialogue.';
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
