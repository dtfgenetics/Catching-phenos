import { loadSave } from '../../../src/engine/save.js';
import { deriveFirstSessionProgress } from '../../../src/engine/first-session.js';
import { renderFirstSessionGuide } from '../../../src/ui/first-session-ui.js';

const guide = document.querySelector('#first-session-guide');
const startButton = document.querySelector('#start-button');
const gamePanel = document.querySelector('#game-panel');
const debugOutput = document.querySelector('#debug-output');
const journeyNav = document.querySelector('#journey-nav');
let renderQueued = false;

function syncStartButton(saveData = loadSave()) {
  if (!startButton) return;
  const progress = deriveFirstSessionProgress(saveData);
  if (progress.complete) startButton.textContent = 'Continue Exploring';
  else if (progress.completedCount > 0) startButton.textContent = 'Continue Vault Run';
  else startButton.textContent = 'Begin Vault Run';
}

function renderGuide() {
  const saveData = loadSave();
  const progress = renderFirstSessionGuide({ container: guide, saveData });
  syncStartButton(saveData);
  document.documentElement.dataset.firstSessionComplete = progress?.complete ? 'true' : 'false';
}

function queueGuideRender() {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => {
    renderQueued = false;
    renderGuide();
  });
}

function buildJourneyNav() {
  if (!journeyNav) return;
  const targets = [
    ['Map', '#map-preview'],
    ['Battle', '#combat-panel'],
    ['Vault', '#vault-garden-panel'],
    ['Lineage Lab', '#lineage-lab-panel'],
    ['Pheno Log', '#phenolog-panel']
  ];
  journeyNav.replaceChildren();
  for (const [label, selector] of targets) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.addEventListener('click', () => {
      document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    journeyNav.append(button);
  }
}

function configureDebugSurface() {
  if (!debugOutput) return;
  const debug = new URLSearchParams(location.search).get('debug') === '1';
  debugOutput.hidden = !debug;
  debugOutput.setAttribute('aria-hidden', debug ? 'false' : 'true');
}

function observeGameProgress() {
  if (!gamePanel) return;
  const observer = new MutationObserver(queueGuideRender);
  observer.observe(gamePanel, { childList: true, subtree: true, characterData: true });
}

window.addEventListener('storage', (event) => {
  if (event.key?.includes('pheno') || event.key?.includes('vault')) queueGuideRender();
});

buildJourneyNav();
configureDebugSurface();
observeGameProgress();
renderGuide();
console.info('PhenoQuest guided first-session experience initialized.');
