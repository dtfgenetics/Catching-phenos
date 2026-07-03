import { spawnSync } from 'node:child_process';

const entryFiles = [
  'public/games/phenoquest/game.js',
  'src/game/config.js',
  'src/game/controller.js',
  'src/game/load-data.js',
  'src/game/screens.js',
  'src/engine/battle.js',
  'src/engine/breeding.js',
  'src/engine/genotype.js',
  'src/engine/lineage-lab.js',
  'src/engine/progression.js',
  'src/engine/save-export.js',
  'src/engine/save-migration.js',
  'src/engine/save.js',
  'src/engine/storage.js',
  'src/engine/weather.js',
  'src/ui/breeding-ui.js',
  'src/ui/inventory-ui.js',
  'src/ui/lineage-lab-ui.js',
  'src/ui/phenolog-ui.js',
  'src/ui/quest-ui.js',
  'src/ui/weather-ui.js',
  'scripts/data-contract-check.mjs',
  'scripts/dev-server.mjs',
  'scripts/repo-audit.mjs',
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
