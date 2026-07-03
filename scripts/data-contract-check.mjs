import { readFile } from 'node:fs/promises';

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertKeys(object, keys, label) {
  for (const key of keys) {
    assert(Object.hasOwn(object, key), `${label} missing required key: ${key}`);
  }
}

const statKeys = ['vigor', 'power', 'terps', 'roots', 'speed', 'stability'];
const units = [
  ...(await readJson('data/phenos/mvp_units.json')),
  ...(await readJson('data/phenos/mvp_units_extra.json'))
];

for (const unit of units) {
  assertKeys(unit, ['id', 'displayName', 'description', 'classes', 'rarity', 'baseStats', 'abilities', 'traits', 'recipe'], `unit ${unit.id ?? 'unknown'}`);
  assert(Array.isArray(unit.classes), `${unit.id} classes must be an array.`);
  assert(Array.isArray(unit.abilities), `${unit.id} abilities must be an array.`);
  assert(Array.isArray(unit.traits), `${unit.id} traits must be an array.`);
  assertKeys(unit.baseStats, statKeys, `${unit.id}.baseStats`);
  assertKeys(unit.recipe, ['materialsRequired', 'demoSeconds', 'preferredWeather', 'preferredCue'], `${unit.id}.recipe`);
}

const abilities = await readJson('data/moves/mvp_abilities.json');
for (const ability of abilities) {
  assertKeys(ability, ['id', 'displayName', 'class', 'category', 'power', 'cost', 'accuracy', 'effect', 'description'], `ability ${ability.id ?? 'unknown'}`);
}

const weatherStates = await readJson('data/weather/weather_states.json');
for (const weather of weatherStates) {
  assertKeys(weather, ['id', 'displayName', 'description', 'weight', 'cueBias', 'modifiers'], `weather ${weather.id ?? 'unknown'}`);
}

const pairingRules = await readJson('data/breeding/pairing_rules_mvp.json');
for (const rule of pairingRules) {
  assertKeys(rule, ['id', 'parentA', 'parentB', 'resultPool', 'requiredRank', 'requiredRegion', 'chanceWeights', 'markerBias'], `pairing rule ${rule.id ?? 'unknown'}`);
}

const resultUnits = await readJson('data/breeding/result_units_mvp.json');
for (const resultUnit of resultUnits) {
  assertKeys(resultUnit, ['id', 'displayName', 'description', 'classes', 'rarity', 'sourceRule', 'baseStats', 'traits', 'markers'], `result unit ${resultUnit.id ?? 'unknown'}`);
  assertKeys(resultUnit.baseStats, statKeys, `${resultUnit.id}.baseStats`);
}

const mechanicRegistry = await readJson('data/system/mechanic_registry.json');
assert(Array.isArray(mechanicRegistry.mechanics), 'mechanic_registry mechanics must be an array.');
for (const mechanic of mechanicRegistry.mechanics) {
  assertKeys(mechanic, ['id', 'status', 'goal', 'dataFiles', 'engineFiles', 'uiFiles', 'browserFiles'], `mechanic ${mechanic.id ?? 'unknown'}`);
}

console.log('Data contract check complete.');
