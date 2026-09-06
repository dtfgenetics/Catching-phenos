const QUALITY_LABELS = {
  stable: 'Stable',
  strong: 'Strong',
  keeper_candidate: 'Keeper Candidate'
};

function qualityLabel(value) {
  return QUALITY_LABELS[value] ?? value ?? 'None yet';
}

export function renderLineageRestorationPanel({ container, candidates, onRestore }) {
  if (!container) return;

  const entries = candidates ?? [];
  const restoredCount = entries.filter((entry) => entry.restored).length;
  const readyCount = entries.filter((entry) => !entry.restored && entry.qualifyingUnit).length;

  const cards = entries.map((entry) => {
    const { goal, qualifyingUnit, matchingUnits, bestAvailableQuality, restored } = entry;
    const status = restored
      ? 'Restored'
      : qualifyingUnit
        ? 'Ready to Restore'
        : matchingUnits > 0
          ? `Needs ${qualityLabel(goal.minimumQuality)}`
          : 'Offspring Needed';

    const action = restored
      ? '<span class="restoration-lock">Archive secured</span>'
      : qualifyingUnit
        ? `<button type="button" data-lineage-restore="${goal.id}" data-lineage-unit="${qualifyingUnit.id}">Restore Lineage</button>`
        : '<span class="restoration-lock">Keep breeding for the required result quality.</span>';

    return `
      <article class="result-card lineage-restoration-card" data-restoration-status="${restored ? 'restored' : qualifyingUnit ? 'ready' : 'locked'}">
        <div class="restoration-card-heading">
          <strong>${goal.name}</strong>
          <span class="restoration-status">${status}</span>
        </div>
        <p>${goal.description}</p>
        <div class="restoration-requirements">
          <span>Line: ${goal.resultSpeciesId}</span>
          <span>Minimum quality: ${qualityLabel(goal.minimumQuality)}</span>
          <span>Best available: ${qualityLabel(bestAvailableQuality)}</span>
        </div>
        <div class="lineage-actions">${action}</div>
      </article>
    `;
  }).join('');

  container.innerHTML = `
    <section class="lineage-restoration-panel" aria-labelledby="lineage-restoration-title">
      <div class="restoration-heading-row">
        <div>
          <span class="eyebrow">Living Seed Vault</span>
          <h4 id="lineage-restoration-title">Restore Lost Lineages</h4>
        </div>
        <strong class="restoration-count">${restoredCount}/${entries.length}</strong>
      </div>
      <p class="helper-text">Crossing discovers a line; restoration proves and archives it while the living offspring remains in your Vault Garden.</p>
      <p class="restoration-summary">${readyCount} archive goal${readyCount === 1 ? '' : 's'} ready now.</p>
      <div class="restoration-grid">${cards}</div>
    </section>
  `;

  container.querySelectorAll('[data-lineage-restore]').forEach((button) => {
    button.addEventListener('click', () => onRestore?.({
      goalId: button.dataset.lineageRestore,
      unitId: button.dataset.lineageUnit
    }));
  });
}
