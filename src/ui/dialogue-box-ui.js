import { getCurrentDialogueLine } from '../engine/dialogue-runner.js';

export function renderDialogueBox({ container, session, onNext, onClose }) {
  if (!container) return;

  if (!session?.active || !session.record) {
    container.innerHTML = '';
    return;
  }

  const line = getCurrentDialogueLine(session);
  const isLastLine = session.lineIndex >= (session.record.lines?.length ?? 1) - 1 && !session.record.next;

  container.innerHTML = `
    <section class="dialogue-box result-card">
      <strong>${session.record.speaker}</strong>
      <p>${line ?? ''}</p>
      <button type="button" id="dialogue-next-button">${isLastLine ? 'Close' : 'Next'}</button>
    </section>
  `;

  container.querySelector('#dialogue-next-button')?.addEventListener('click', () => {
    if (isLastLine) onClose?.();
    else onNext?.();
  });
}
