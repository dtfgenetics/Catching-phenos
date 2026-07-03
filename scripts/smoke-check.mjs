import { readFile } from 'node:fs/promises';
import { calculateDamage } from '../src/engine/battle.js';
import { previewPairing } from '../src/engine/breeding.js';
import { estimateMarkerQuality, mergeMarkerBias } from '../src/engine/genotype.js';
import { applyQuestEvent, getQuestEventIds } from '../src/engine/quest-events.js';
import { canAccessSystem, isRankAtLeast } from '../src/engine/progression.js';
import { pickWeightedWeather } from '../src/engine/weather.js';

const requiredJsonFiles = [
  'data/system/file_manifest.json',
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
  'data/maps/aroma_trial_greenhouse.json',
  'data/weather/weather_states.json',
  'data/breeding/genotype_markers.json',
  'data/breeding/pairing_rules_mvp.json',
  'data/breeding/result_units_mvp.json'
];

const requiredModules = [
  'src/engine/battle.js',
  'src/engine/battle-rewards.js',
  'src/engine/breeding.js',
  'src/engine/class-chart.js',
  'src/engine/collection.js',
  'src/engine/dialogue.js',
  'src/engine/encounters.js',
  'src/engine/expression.js',
  'src/engine/game-state.js',
  'src/engine/genotype.js',
  'src/engine/inventory.js',
  'src/engine/maps.js',
  'src/engine/movement.js',
  'src/engine/progression.js',
  'src/engine/quest-events.js',
  'src/engine/quests.js',
  'src/engine/recipes.js',
  'src/engine/result-factory.js',
  'src/engine/result-timers.js',
  'src/engine/save.js',
  'src/engine/starter-selection.js',
  'src/engine/timers.js',
  'src/engine/weather.js',
  'src/ui/breeding-ui.js',
  'src/ui/collection-ui.js',
  'src/ui/combat-ui.js',
  'src/ui/encounter-ui.js',
  'src/ui/map-ui.js',
  'src/ui/movement-ui.js',
  'src/ui/recipe-ui.js',
  'src/ui/render-summary.js',
  'src/ui/starter-selection-ui.js',
  'src/ui/vault-garden-ui.js',
  'src/ui/weather-ui.js'
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

const questEventIds = getQuestEventIds();
assert(questEventIds.includes('starter_chosen'), 'Quest events missing starter_chosen.');
assert(questEventIds.includes('first_result_claimed'), 'Quest events missing first_result_claimed.');

const progressionSeed = {
  player: { rank: 'seedling_runner' },
  world: { unlockedRegions: ['seedling_town'] },
  quests: { activeQuest: 'root_first_unit', completed: [], flags: {} }
};
const progressed = applyQuestEvent(progressionSeed, 'first_result_claimed');
assert(progressed.player.rank === 'field_scout', 'first_result_claimed should advance player to field_scout.');
assert(progressed.world.unlockedRegions.includes('terp_fields'), 'first_result_claimed should unlock terp_fields.');
assert(progressed.quests.flags.lineage_preview_unlocked === true, 'first_result_claimed should unlock lineage preview flag.');
assert(isRankAtLeast(progressed.player.rank, 'seedling_runner'), 'field_scout should be above seedling_runner.');
assert(canAccessSystem(progressed, 'lineage_preview'), 'progressed save should access lineage preview.');

const markerPreview = mergeMarkerBias({ TERP: 'normal' }, { TERP: 'high', STABILITY: 'normal' }, { COLOR: 'rare' });
assert(markerPreview.TERP === 'high', 'Genotype helper should choose higher TERP marker.');
assert(estimateMarkerQuality(markerPreview) === 'stable', 'Expected merged marker preview to estimate stable quality.');

const starters = await readJson('data/phenos/mvp_units.json');
const extras = await readJson('data/phenos/mvp_units_extra.json');
const allUnits = [...starters, ...extras];
const unitIds = new Set(allUnits.map((unit) => unit.id));

assert(starters.length === 3, 'Expected exactly 3 starter units.');
assert(unitIds.has('mango_puff'), 'Missing mango_puff.');
assert(unitIds.has('kush_cub'), 'Missing kush_cub.');
assert(unitIds.has('frostling'), 'Missing frostling.');

const weatherStates = await readJson('data/weather/weather_states.json');
const weatherIds = new Set(weatherStates.map((weather) => weather.id));
assert(weatherIds.has('clear_bloom'), 'Missing clear_bloom weather.');
assert(pickWeightedWeather(weatherStates, () => 0)?.id, 'Weighted weather picker returned no state.');

const encounterTable = await readJson('data/encounters/terp_fields.json');
for (const encounter of encounterTable.encounters) {
  assert(unitIds.has(encounter.speciesId), `Encounter references missing unit: ${encounter.speciesId}`);
  for (const weatherId of encounter.weather ?? []) {
    assert(weatherIds.has(weatherId), `Encounter references missing weather: ${weatherId}`);
  }
}

for (const unit of allUnits) {
  for (const weatherId of unit.recipe?.preferredWeather ?? []) {
    assert(weatherIds.has(weatherId), `${unit.id} recipe references missing weather: ${weatherId}`);
  }
}

const abilities = await readJson('data/moves/mvp_abilities.json');
const abilityIds = new Set(abilities.map((ability) => ability.id));
for (const unit of allUnits) {
  for (const abilityId of unit.abilities ?? []) {
    assert(abilityIds.has(abilityId), `${unit.id} references missing ability: ${abilityId}`);
  }
}

const genotypeMarkers = await readJson('data/breeding/genotype_markers.json');
const markerIds = new Set(genotypeMarkers.map((marker) => marker.id));
assert(markerIds.has('TERP'), 'Missing TERP marker.');
assert(markerIds.has('STABILITY'), 'Missing STABILITY marker.');

const pairingRules = await readJson('data/breeding/pairing_rules_mvp.json');
const resultUnits = await readJson('data/breeding/result_units_mvp.json');
const resultIds = new Set(resultUnits.map((unit) => unit.id));

for (const rule of pairingRules) {
  assert(unitIds.has(rule.parentA), `Pairing rule references missing parentA: ${rule.parentA}`);
  assert(unitIds.has(rule.parentB), `Pairing rule references missing parentB: ${rule.parentB}`);
  for (const resultId of rule.resultPool ?? []) {
    assert(resultIds.has(resultId), `Pairing rule references missing result unit: ${resultId}`);
  }
  for (const markerId of Object.keys(rule.markerBias ?? {})) {
    assert(markerIds.has(markerId), `Pairing rule references missing marker: ${markerId}`);
  }
}

for (const resultUnit of resultUnits) {
  assert(pairingRules.some((rule) => rule.id === resultUnit.sourceRule), `${resultUnit.id} references missing sourceRule: ${resultUnit.sourceRule}`);
  for (const markerId of Object.keys(resultUnit.markers ?? {})) {
    assert(markerIds.has(markerId), `${resultUnit.id} references missing marker: ${markerId}`);
  }
}

const pairingPreview = previewPairing({
  rules: pairingRules,
  parentA: 'mango_puff',
  parentB: 'terp_toad',
  playerState: { rank: 'field_scout', unlockedRegions: ['terp_fields'] }
});
assert(pairingPreview.allowed, 'Expected mango_puff x terp_toad preview to be allowed for field_scout in terp_fields.');

const sampleAttacker = { classes: ['fruit'], stats: { power: 5, terps: 5 } };
const sampleDefender = { classes: ['skunk'], stats: { roots: 5 } };
const zeroDamage = calculateDamage({ attacker: sampleAttacker, defender: sampleDefender, ability: { power: 0, category: 'guard' } });
assert(zeroDamage === 0, 'Zero-power actions should not deal damage.');

const html = await readFile('public/games/phenoquest/index.html', 'utf8');
assert(html.includes('game.js'), 'Game page does not reference game.js.');
assert(html.includes('reset-save-button'), 'Game page missing reset save button.');
assert(html.includes('weather-panel'), 'Game page missing weather panel container.');
assert(html.includes('starter-selection'), 'Game page missing starter selection container.');
assert(html.includes('map-preview'), 'Game page missing map preview container.');
assert(html.includes('encounter-controls'), 'Game page missing encounter controls container.');
assert(html.includes('combat-panel'), 'Game page missing combat panel container.');
assert(html.includes('recipe-panel'), 'Game page missing recipe panel container.');
assert(html.includes('vault-garden-panel'), 'Game page missing Vault Garden panel container.');
assert(html.includes('breeding-panel'), 'Game page missing breeding panel container.');
assert(html.includes('collection-panel'), 'Game page missing collection panel container.');

console.log('Smoke check complete.');
