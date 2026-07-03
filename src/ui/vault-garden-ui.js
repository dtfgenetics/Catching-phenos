export function renderVaultGardenPanel({ container, vaultGarden }) {
  if (!container) return;

  const rootedUnits = vaultGarden?.rootedUnits ?? [];
  if (!rootedUnits.length) {
    container.innerHTML = `
      <section class="vault-garden-panel">
        <h3>Vault Garden</h3>
        <p class="helper-text">No rooted results yet. Claim a timer result to add one here.</p>
      </section>
    `;
    return;
  }

  const rows = rootedUnits.map((unit) => `
    <div class="result-card">
      <strong>${unit.displayName}</strong>
      <span>Trait: ${unit.trait ?? 'unknown'}</span>
      <span>Expression: ${unit.expression ?? 'none'}</span>
      <span>Quality: ${unit.quality}</span>
      <span>Stability: ${unit.stability}</span>
      <span>Keeper: ${unit.isKeeper ? 'yes' : 'no'}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <section class="vault-garden-panel">
      <h3>Vault Garden</h3>
      ${rows}
    </section>
  `;
}
