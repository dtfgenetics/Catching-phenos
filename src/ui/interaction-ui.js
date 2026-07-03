export function renderInteractionResult({ container, interaction }) {
  if (!container) return;

  if (!interaction || interaction.type === 'none') {
    container.innerHTML = '<p class="helper-text">Nothing to interact with here.</p>';
    return;
  }

  container.innerHTML = `
    <section class="interaction-panel result-card">
      <strong>Interaction: ${interaction.type}</strong>
      <span>Target: ${interaction.target?.id ?? 'unknown'}</span>
      <span>Dialogue: ${interaction.dialogueId ?? 'none'}</span>
    </section>
  `;
}
