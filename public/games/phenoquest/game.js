const startButton = document.querySelector('#start-button');
const panel = document.querySelector('#game-panel');
const panelTitle = document.querySelector('#panel-title');
const panelCopy = document.querySelector('#panel-copy');
const debugOutput = document.querySelector('#debug-output');

const DATA_PATHS = {
  expressions: '../../../data/expressions/expression_matrix_mvp.json',
  starters: '../../../data/phenos/mvp_units.json',
  extraUnits: '../../../data/phenos/mvp_units_extra.json',
  encounters: '../../../data/encounters/terp_fields.json',
  items: '../../../data/items/mvp_items.json',
  abilities: '../../../data/moves/mvp_abilities.json',
  quests: '../../../data/quests/mvp_quests.json'
};

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
}

async function loadGameData() {
  const entries = await Promise.all(
    Object.entries(DATA_PATHS).map(async ([key, path]) => [key, await loadJson(path)])
  );
  return Object.fromEntries(entries);
}

function summarizeData(data) {
  const starters = data.starters?.length ?? 0;
  const extraUnits = data.extraUnits?.length ?? 0;
  const expressions = data.expressions?.length ?? 0;
  const quests = data.quests?.length ?? 0;
  const encounters = data.encounters?.encounters?.length ?? 0;

  return [
    `Loaded starters: ${starters}`,
    `Loaded extra units: ${extraUnits}`,
    `Loaded expression states: ${expressions}`,
    `Loaded quests: ${quests}`,
    `Loaded Terp Fields encounters: ${encounters}`
  ].join('\n');
}

startButton?.addEventListener('click', async () => {
  panel?.classList.remove('hidden');
  panelTitle.textContent = 'Seedling Town Demo';
  panelCopy.textContent = 'Loading MVP data...';
  debugOutput.textContent = '';

  try {
    const data = await loadGameData();
    panelCopy.textContent = 'MVP data loaded. Next step: connect movement, dialogue, battle, timer recipes, and PhenoLog UI.';
    debugOutput.textContent = summarizeData(data);
  } catch (error) {
    panelCopy.textContent = 'Data load failed. Check paths and JSON files.';
    debugOutput.textContent = String(error);
  }
});
