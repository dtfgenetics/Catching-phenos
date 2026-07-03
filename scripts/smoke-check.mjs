import { readFile } from 'node:fs/promises';

const requiredJsonFiles = [
  'data/expressions/expression_matrix_mvp.json',
  'data/phenos/mvp_units.json',
  'data/phenos/mvp_units_extra.json',
  'data/encounters/terp_fields.json',
  'data/items/mvp_items.json',
  'data/moves/mvp_abilities.json',
  'data/quests/mvp_quests.json',
  'data/dialogue/mvp_dialogue.json',
  'data/starter_slots.json',
  'data/maps/seedling_town.json',
  'data/maps/greenhouse.json',
  'data/maps/terp_fields.json',
  'data/maps/aroma_trial_greenhouse.json'
];

const requiredModules = [
  'src/engine/battle.js',
  'src/engine/battle-rewards.js',
  'src/engine/class-chart.js',
  'src/engine/collection.js',
  'src/engine/dialogue.js',
  'src/engine/encounters.js',
  'src/engine/expression.js',
  'src/engine/game-state.js',
  'src/engine/inventory.js',
  'src/engine/maps.js',
  'src/engine/movement.js',
  'src/engine/quests.js',
  'src/engine/recipes.js',
  'src/engine/save.js',
  'src/engine/starter-selection.js',
  'src/engine/timers.js',
  'src/ui/encounter-ui.js',
  'src/ui/map-ui.js',
  'src/ui/movement-ui.js',
  'src/ui/render-summary.js',
  'src/ui/starter-selection-ui.js'
];

async function readJson(path) {
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const path of requiredJsonFiles) {
  await readJson(path);
  console.log(`OK JSON: ${path}`);
}

for (const path of requiredModules) {
  await import(`../${path}`);
  console.log(`OK MODULE: ${path}`);
}

const starters = await readJson('data/phenos/mvp_units.json');
const extras = await readJson('data/phenos/mvp_units_extra.json');
const allUnits = [...starters, ...extras];
const unitIds = new Set(allUnits.map((unit) => unit.id));

assert(starters.length === 3, 'Expected exactly 3 starter units.');
assert(unitIds.has('mango_puff'), 'Missing mango_puff.');
assert(unitIds.has('kush_cub'), 'Missing kush_cub.');
assert(unitIds.has('frostling'), 'Missing frostling.');

const encounterTable = await readJson('data/encounters/terp_fields.json');
for (const encounter of encounterTable.encounters) {
  assert(unitIds.has(encounter.speciesId), `Encounter references missing unit: ${encounter.speciesId}`);
}

const abilities = await readJson('data/moves/mvp_abilities.json');
const abilityIds = new Set(abilities.map((ability) => ability.id));
for (const unit of allUnits) {
  for (const abilityId of unit.abilities ?? []) {
    assert(abilityIds.has(abilityId), `${unit.id} references missing ability: ${abilityId}`);
  }
}

const html = await readFile('public/games/phenoquest/index.html', 'utf8');
assert(html.includes('game.js'), 'Game page does not reference game.js.');
assert(html.includes('starter-selection'), 'Game page missing starter selection container.');
assert(html.includes('map-preview'), 'Game page missing map preview container.');
assert(html.includes('encounter-controls'), 'Game page missing encounter controls container.');

console.log('Smoke check complete.');
