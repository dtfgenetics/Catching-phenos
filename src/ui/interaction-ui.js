export function renderInteractionControls({ container, onInteract }) {
  if (!container) return;

  container.innerHTML = `
    <section class="interaction-panel result-card">
      <strong>Interaction</strong>
      <span>Face an NPC or object, then press Interact.</span>
      <button type="button" id="interact-button">Interact</button>
    </section>
  `;

  container.querySelector('#interact-button')?.addEventListener('click', () => onInteract?.());
}

export function renderInteractionResult({ container, interaction }) {
  if (!container) return;

  if (!interaction || interaction.type === 'none') {
    container.innerHTML = `
      <section class="interaction-panel result-card">
        <strong>Interaction</strong>
        <span>Nothing to interact with here.</span>
        <button type="button" id="interact-button">Interact</button>
      </section>
    `;
    return;
  }

  container.innerHTML = `
    <section class="interaction-panel result-card">
      <strong>Interaction: ${interaction.type}</strong>
      <span>Target: ${interaction.target?.id ?? 'unknown'}</span>
      <span>Dialogue: ${interaction.dialogueId ?? 'none'}</span>
      <button type="button" id="interact-button">Interact Again</button>
    </section>
  `;
}

export function bindInteractionButton({ container, onInteract }) {
  container?.querySelector('#interact-button')?.addEventListener('click', () => onInteract?.());
}
