import { deriveFirstSessionProgress, firstSessionHeadline, firstSessionNextAction } from '../engine/first-session.js';

export function renderFirstSessionGuide({ container, saveData }) {
  if (!container) return null;
  const progress = deriveFirstSessionProgress(saveData);
  const steps = progress.steps.map((step) => `
    <li class="guide-step ${step.complete ? 'complete' : 'pending'}">
      <span class="guide-marker" aria-hidden="true">${step.complete ? '✓' : '○'}</span>
      <span><strong>${step.title}</strong><small>${step.detail}</small></span>
    </li>
  `).join('');

  container.innerHTML = `
    <section class="first-session-guide" aria-labelledby="first-session-title">
      <div class="guide-heading-row">
        <div>
          <p class="eyebrow">Guided first run</p>
          <h3 id="first-session-title">${firstSessionHeadline(progress)}</h3>
        </div>
        <strong class="guide-percent">${progress.percent}%</strong>
      </div>
      <div class="guide-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}" aria-label="First Vault Run progress">
        <span style="width:${progress.percent}%"></span>
      </div>
      <p class="guide-next"><strong>Next:</strong> ${firstSessionNextAction(progress)}</p>
      <details class="guide-details" ${progress.completedCount === 0 ? 'open' : ''}>
        <summary>First-run checklist · ${progress.completedCount}/${progress.total}</summary>
        <ol>${steps}</ol>
      </details>
    </section>
  `;
  return progress;
}
