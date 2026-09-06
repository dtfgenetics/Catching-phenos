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
  assertKeys(unit.recipe, ['materialsRequired', 'demoSeconds', 'fullSeconds', 'preferredWeather', 'preferredCues'], `${unit.id}.recipe`);
  assert(Array.isArray(unit.recipe.preferredWeather), `${unit.id}.recipe.preferredWeather must be an array.`);
  assert(Array.isArray(unit.recipe.preferredCues), `${unit.id}.recipe.preferredCues must be an array.`);
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

const resultUnitIds = new Set(resultUnits.map((unit) => unit.id));
const pairingRulesById = new Map(pairingRules.map((rule) => [rule.id, rule]));
const restorationGoals = await readJson('data/breeding/restoration_goals_mvp.json');
const restorationIds = new Set();
for (const goal of restorationGoals) {
  assertKeys(goal, ['id', 'name', 'description', 'resultSpeciesId', 'sourceRule', 'minimumQuality', 'archiveBranch', 'archiveProgress'], `restoration goal ${goal.id ?? 'unknown'}`);
  assert(!restorationIds.has(goal.id), `Duplicate restoration goal id: ${goal.id}`);
  restorationIds.add(goal.id);
  assert(['stable', 'strong', 'keeper_candidate'].includes(goal.minimumQuality), `${goal.id} minimumQuality is invalid.`);
  assert(Number.isFinite(goal.archiveProgress) && goal.archiveProgress > 0 && goal.archiveProgress <= 100, `${goal.id} archiveProgress must be between 1 and 100.`);
  assert(resultUnitIds.has(goal.resultSpeciesId), `${goal.id} references missing result species ${goal.resultSpeciesId}.`);
  const sourceRule = pairingRulesById.get(goal.sourceRule);
  assert(sourceRule, `${goal.id} references missing pairing rule ${goal.sourceRule}.`);
  assert(sourceRule.resultPool.includes(goal.resultSpeciesId), `${goal.id} result species must be produced by ${goal.sourceRule}.`);
}

const mechanicRegistry = await readJson('data/system/mechanic_registry.json');
assert(Array.isArray(mechanicRegistry.mechanics), 'mechanic_registry mechanics must be an array.');
for (const mechanic of mechanicRegistry.mechanics) {
  assertKeys(mechanic, ['id', 'status', 'goal', 'dataFiles', 'engineFiles', 'uiFiles', 'browserFiles'], `mechanic ${mechanic.id ?? 'unknown'}`);
}

console.log('Data contract check complete.');
