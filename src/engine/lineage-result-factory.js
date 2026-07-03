export function pickLineageResult({ pairingRule, resultUnits, random = Math.random }) {
  const resultPool = pairingRule?.resultPool ?? [];
  if (!resultPool.length) return null;

  const index = Math.floor(random() * resultPool.length);
  const resultId = resultPool[Math.min(index, resultPool.length - 1)];
  return resultUnits.find((unit) => unit.id === resultId) ?? null;
}

export function createLineageResult({ pairingRule, resultUnits, timer, random = Math.random }) {
  const baseResult = pickLineageResult({ pairingRule, resultUnits, random });
  if (!baseResult) return null;

  return {
    id: `${baseResult.id}_${timer.id}`,
    speciesId: baseResult.id,
    displayName: baseResult.displayName,
    source: 'lineage_lab',
    sourceRule: pairingRule.id,
    parents: [timer.parentA, timer.parentB],
    trait: baseResult.traits?.[0] ?? 'unknown_trait',
    expression: timer.weatherAtStart ?? 'unknown_expression',
    markers: baseResult.markers ?? {},
    quality: estimateLineageQuality(baseResult),
    isKeeper: estimateLineageQuality(baseResult) === 'keeper_candidate',
    createdAt: Date.now()
  };
}

export function estimateLineageQuality(resultUnit) {
  const markers = Object.values(resultUnit?.markers ?? {});
  if (markers.includes('rare')) return 'keeper_candidate';
  if (markers.includes('high')) return 'strong';
  return 'stable';
}
