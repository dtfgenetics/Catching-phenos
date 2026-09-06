import { updateArchiveProgress } from './game-state.js';

const QUALITY_ORDER = ['stable', 'strong', 'keeper_candidate'];

export function meetsRestorationQuality(actualQuality, minimumQuality = 'stable') {
  const actualIndex = QUALITY_ORDER.indexOf(actualQuality);
  const minimumIndex = QUALITY_ORDER.indexOf(minimumQuality);
  return actualIndex >= 0 && minimumIndex >= 0 && actualIndex >= minimumIndex;
}

export function findRestorationGoal(goals, goalId) {
  return (goals ?? []).find((goal) => goal.id === goalId) ?? null;
}

export function isLineageRestored(saveData, goalId) {
  return (saveData.vaultGarden?.restoredLineages ?? []).some((record) => record.goalId === goalId);
}

export function getRestorationEligibility({ saveData, goal, unit }) {
  if (!goal) return { allowed: false, reason: 'goal_not_found' };
  if (isLineageRestored(saveData, goal.id)) return { allowed: false, reason: 'already_restored' };
  if (!unit) return { allowed: false, reason: 'unit_not_found' };
  if (unit.source !== 'lineage_lab') return { allowed: false, reason: 'not_lineage_lab_offspring' };
  if (unit.speciesId !== goal.resultSpeciesId) return { allowed: false, reason: 'wrong_species' };
  if (unit.sourceRule !== goal.sourceRule) return { allowed: false, reason: 'wrong_source_rule' };
  if (!meetsRestorationQuality(unit.quality, goal.minimumQuality)) {
    return { allowed: false, reason: 'quality_too_low' };
  }
  return { allowed: true, reason: 'ready' };
}

export function getRestorationCandidates({ saveData, goals }) {
  const units = saveData.vaultGarden?.rootedUnits ?? [];
  return (goals ?? []).map((goal) => {
    const qualifyingUnit = units.find((unit) => getRestorationEligibility({ saveData, goal, unit }).allowed) ?? null;
    const speciesUnits = units.filter((unit) => unit.speciesId === goal.resultSpeciesId && unit.sourceRule === goal.sourceRule);
    const bestAvailableQuality = speciesUnits
      .map((unit) => unit.quality)
      .sort((left, right) => QUALITY_ORDER.indexOf(right) - QUALITY_ORDER.indexOf(left))[0] ?? null;

    return {
      goal,
      restored: isLineageRestored(saveData, goal.id),
      qualifyingUnit,
      matchingUnits: speciesUnits.length,
      bestAvailableQuality
    };
  });
}

export function restoreLineage(saveData, goal, unitId, restoredAt = Date.now()) {
  const units = saveData.vaultGarden?.rootedUnits ?? [];
  const unit = units.find((candidate) => candidate.id === unitId) ?? null;
  const eligibility = getRestorationEligibility({ saveData, goal, unit });
  if (!eligibility.allowed) {
    return { ok: false, reason: eligibility.reason, saveData };
  }

  const record = {
    goalId: goal.id,
    name: goal.name,
    unitId: unit.id,
    speciesId: unit.speciesId,
    sourceRule: unit.sourceRule,
    quality: unit.quality,
    archiveBranch: goal.archiveBranch,
    restoredAt
  };

  const rootedUnits = units.map((candidate) => candidate.id === unit.id
    ? {
        ...candidate,
        restorationIds: Array.from(new Set([...(candidate.restorationIds ?? []), goal.id]))
      }
    : candidate);

  let nextSave = {
    ...saveData,
    vaultGarden: {
      ...(saveData.vaultGarden ?? {}),
      rootedUnits,
      restoredLineages: [...(saveData.vaultGarden?.restoredLineages ?? []), record]
    }
  };
  nextSave = updateArchiveProgress(nextSave, goal.archiveBranch, goal.archiveProgress ?? 100);

  return { ok: true, reason: 'restored', saveData: nextSave, record };
}
