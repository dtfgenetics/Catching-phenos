export function renderLineageLabPanel({ container, previews, getName }) {
  if (!container) return;

  if (!previews?.length) {
    container.innerHTML = `
      <section class="lineage-lab-panel">
        <h3>Lineage Lab</h3>
        <p class="helper-text">No compatible lineage previews yet. Claim more results in the Vault Garden.</p>
      </section>
    `;
    return;
  }

  const cards = previews.map(({ parentA, parentB, preview }) => {
    const resultNames = preview.resultPool.map((resultId) => getName?.(resultId) ?? resultId).join(', ');
    const markerRows = Object.entries(preview.markerBias ?? {}).map(([marker, value]) => `<span>${marker}: ${value}</span>`).join('');

    return `
      <article class="result-card">
        <strong>${getName?.(parentA.speciesId) ?? parentA.speciesId} x ${getName?.(parentB.speciesId) ?? parentB.speciesId}</strong>
        <span>Status: ${preview.allowed ? 'available' : 'locked'}</span>
        <span>Reason: ${preview.reason}</span>
        <span>Possible Results: ${resultNames}</span>
        <div>${markerRows}</div>
      </article>
    `;
  }).join('');

  container.innerHTML = `
    <section class="lineage-lab-panel">
      <h3>Lineage Lab</h3>
      ${cards}
    </section>
  `;
}
