import assert from 'node:assert/strict';
import fs from 'node:fs';
import { getCenteredScrollLeft, shouldRecenterPlayer } from '../src/ui/map-ui.js';

assert.equal(
  getCenteredScrollLeft({ itemCenter: 40, viewportWidth: 320, contentWidth: 520 }),
  0,
  'player near the left edge must not scroll before map origin'
);
assert.equal(
  getCenteredScrollLeft({ itemCenter: 260, viewportWidth: 320, contentWidth: 520 }),
  100,
  'player in a wide map must center inside the mobile viewport'
);
assert.equal(
  getCenteredScrollLeft({ itemCenter: 500, viewportWidth: 320, contentWidth: 520 }),
  200,
  'player near the right edge must clamp to the map maximum scroll'
);
assert.equal(
  getCenteredScrollLeft({ itemCenter: 100, viewportWidth: 520, contentWidth: 320 }),
  0,
  'maps narrower than the viewport must never scroll'
);

assert.equal(shouldRecenterPlayer({ itemCenterInViewport: 40, viewportWidth: 320 }), true);
assert.equal(shouldRecenterPlayer({ itemCenterInViewport: 160, viewportWidth: 320 }), false);
assert.equal(shouldRecenterPlayer({ itemCenterInViewport: 285, viewportWidth: 320 }), true);

const source = fs.readFileSync('src/ui/map-ui.js', 'utf8');
for (const required of [
  "grid.querySelector('.player-tile')",
  'grid.scrollWidth <= grid.clientWidth + 1',
  'getBoundingClientRect()',
  "prefers-reduced-motion: reduce",
  'grid.scrollTo({ left, behavior:',
  'globalThis.requestAnimationFrame(recenter)',
  'keepPlayerVisible(grid)'
]) {
  assert.ok(source.includes(required), `map renderer missing player-follow behavior: ${required}`);
}

const mapFiles = [
  'data/maps/seedling_town.json',
  'data/maps/greenhouse.json',
  'data/maps/terp_fields.json',
  'data/maps/aroma_trial_greenhouse.json'
];
const maps = mapFiles.map((file) => JSON.parse(fs.readFileSync(file, 'utf8')));
assert.ok(maps.some((map) => map.width >= 20), 'viewport regression must cover at least one map wider than a phone view');

console.log('PhenoQuest map viewport check passed: wide maps recenter only when the player approaches a horizontal edge.');
