import { spawnSync } from 'node:child_process';

const entryFiles = [
  'public/games/phenoquest/game.js',
  'src/engine/battle.js',
  'src/engine/breeding.js',
  'src/engine/weather.js',
  'src/ui/weather-ui.js',
  'scripts/smoke-check.mjs'
];

for (const file of entryFiles) {
  const result = spawnSync(process.execPath, ['--check', file], {
    encoding: 'utf8'
  });

  if (result.status !== 0) {
    console.error(result.stdout);
    console.error(result.stderr);
    throw new Error(`Syntax check failed: ${file}`);
  }

  console.log(`OK SYNTAX: ${file}`);
}

console.log('Static compile check complete.');
