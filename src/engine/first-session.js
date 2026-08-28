export const FIRST_SESSION_STEPS = [
  {
    id: 'starter',
    title: 'Choose a starter',
    detail: 'Pick your first Pheno partner and save it to your team.'
  },
  {
    id: 'battle',
    title: 'Win a field battle',
    detail: 'Roll an encounter and win a turn-based battle for field material.'
  },
  {
    id: 'material',
    title: 'Earn propagation material',
    detail: 'A battle reward gives you the material needed to start rooting a result.'
  },
  {
    id: 'root',
    title: 'Root and claim a result',
    detail: 'Start the demo timer, then claim the rooted result into the Vault Garden.'
  },
  {
    id: 'lineage',
    title: 'Unlock the Lineage Lab',
    detail: 'Progress far enough to preview compatible genetics and make a cross.'
  },
  {
    id: 'offspring',
    title: 'Produce your first offspring',
    detail: 'Complete a Lineage Lab cross and store its offspring in the Living Seed Vault.'
  }
];

export function deriveFirstSessionProgress(saveData = {}) {
  const flags = saveData.quests?.flags ?? {};
  const rootedUnits = saveData.vaultGarden?.rootedUnits ?? [];
  const completed = {
    starter: Boolean(saveData.player?.starterChoice || flags.starter_chosen),
    battle: Boolean(flags.tutorial_battle_complete),
    material: Boolean(flags.first_material_earned),
    root: Boolean(flags.first_result_claimed || rootedUnits.some((unit) => unit.source !== 'lineage_lab')),
    lineage: Boolean(flags.lineage_preview_unlocked),
    offspring: rootedUnits.some((unit) => unit.source === 'lineage_lab')
  };

  const steps = FIRST_SESSION_STEPS.map((step) => ({ ...step, complete: completed[step.id] }));
  const completedCount = steps.filter((step) => step.complete).length;
  const next = steps.find((step) => !step.complete) ?? null;

  return {
    steps,
    completedCount,
    total: steps.length,
    percent: Math.round((completedCount / steps.length) * 100),
    complete: completedCount === steps.length,
    next
  };
}

export function firstSessionHeadline(progress) {
  if (!progress || progress.completedCount === 0) return 'Start your first Vault Run';
  if (progress.complete) return 'First Vault Run complete';
  return `Vault Run ${progress.completedCount}/${progress.total}`;
}

export function firstSessionNextAction(progress) {
  if (!progress?.next) return 'Your first preservation loop is complete. Explore Verdantia and continue restoring lineages.';
  return `${progress.next.title}: ${progress.next.detail}`;
}
