import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const root = resolve(process.cwd(), 'dist');
const port = 4174;
const server = spawn('python3', ['-m', 'http.server', String(port), '--directory', root], { stdio: 'ignore' });

async function waitForServer() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/games/phenoquest/`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 150));
  }
  throw new Error('PhenoQuest browser-test server did not start.');
}

let browser;
try {
  await waitForServer();
  browser = await chromium.launch({ headless: true });

  const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  desktop.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  desktop.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  await desktop.goto(`http://127.0.0.1:${port}/games/phenoquest/`, { waitUntil: 'networkidle' });
  await desktop.waitForFunction(() => document.querySelector('#start-button')?.textContent.includes('Begin Vault Run'));
  assert.equal(await desktop.locator('#first-session-guide').isVisible(), false, 'Guide should be inside hidden game panel before start.');

  await desktop.click('#start-button');
  await desktop.locator('#game-panel').waitFor({ state: 'visible' });
  await desktop.locator('.starter-card').first().waitFor({ state: 'visible' });
  assert.match(await desktop.locator('#first-session-guide').innerText(), /Start your first Vault Run|Choose a starter/);
  await desktop.locator('.starter-card').first().click();
  await desktop.waitForFunction(() => document.querySelector('#first-session-title')?.textContent.includes('1/6'));
  assert.match(await desktop.locator('#first-session-guide').innerText(), /Win a field battle/);
  assert.equal(await desktop.locator('#debug-output').isVisible(), false);
  assert.deepEqual(errors, []);

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobileErrors = [];
  mobile.on('pageerror', (error) => mobileErrors.push(`page: ${error.message}`));
  mobile.on('console', (message) => { if (message.type() === 'error') mobileErrors.push(`console: ${message.text()}`); });
  await mobile.goto(`http://127.0.0.1:${port}/games/phenoquest/`, { waitUntil: 'networkidle' });
  await mobile.click('#start-button');
  await mobile.locator('#game-panel').waitFor({ state: 'visible' });
  const overflow = await mobile.evaluate(() => Math.max(0, document.documentElement.scrollWidth - window.innerWidth));
  assert.ok(overflow <= 1, `Mobile overflow is ${overflow}px`);
  const moveButton = mobile.locator('.movement-controls button').first();
  await moveButton.waitFor({ state: 'visible' });
  const moveBox = await moveButton.boundingBox();
  assert.ok(moveBox && moveBox.height >= 44, `Movement touch target is only ${moveBox?.height ?? 0}px tall`);
  assert.deepEqual(mobileErrors, []);

  console.log(JSON.stringify({
    ok: true,
    desktop: '1280x900',
    mobile: '390x844',
    firstSessionAdvanced: true,
    debugHiddenByDefault: true,
    mobileOverflowPx: overflow,
    movementTouchTargetPx: Math.round(moveBox.height),
    consoleErrors: 0
  }, null, 2));
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
