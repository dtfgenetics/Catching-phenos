import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const gameRoot = path.join(root, 'dist', 'games', 'phenoquest');

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

const required = [
  'index.html',
  'style.css',
  'game.js',
  'lineage-runtime.js',
  'experience-v2.js',
  'build-meta.json',
  '_runtime/src/engine/first-session.js',
  '_runtime/src/ui/first-session-ui.js',
];

for (const relative of required) {
  assert.equal(await exists(path.join(gameRoot, relative)), true, `Missing production runtime file: ${relative}`);
}

const index = await readFile(path.join(gameRoot, 'index.html'), 'utf8');
const style = await readFile(path.join(gameRoot, 'style.css'), 'utf8');
const game = await readFile(path.join(gameRoot, 'game.js'), 'utf8');
const experience = await readFile(path.join(gameRoot, 'experience-v2.js'), 'utf8');

for (const marker of [
  'id="start-button"',
  'id="game-panel"',
  'id="movement-controls"',
  'id="first-session-guide"',
  './game.js',
  './experience-v2.js',
]) {
  assert.ok(index.includes(marker), `Production index missing interactive marker: ${marker}`);
}

assert.doesNotMatch(style, /html\s*,\s*body\s*\{[^}]*overflow-x\s*:\s*hidden/i, 'Root overflow must stay observable.');
for (const marker of [
  'min-width: 0',
  'min-height: 44px',
  'overscroll-behavior-inline: contain',
  '@media (max-width:390px)',
]) {
  assert.ok(style.includes(marker), `Responsive runtime contract missing: ${marker}`);
}

for (const marker of [
  './_runtime/src/',
  './_runtime/data/',
  'movement-controls',
]) {
  assert.ok(game.includes(marker), `Game runtime missing production marker: ${marker}`);
}

for (const marker of ['first-session.js', 'first-session-ui.js']) {
  assert.ok(experience.includes(marker), `Guided runtime missing: ${marker}`);
}

assert.equal(game.includes('../../../src/'), false, 'Production game runtime still references repository source paths.');
assert.equal(game.includes('../../../data/'), false, 'Production game runtime still references repository data paths.');

console.log(JSON.stringify({
  ok: true,
  mode: 'deterministic-static-runtime',
  package: 'dist/games/phenoquest',
  responsiveContainment: true,
  touchTargetContractPx: 44,
  firstSessionWiring: true,
  repositoryRelativeRuntimePaths: false,
}, null, 2));
