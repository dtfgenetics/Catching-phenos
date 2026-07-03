import { spawnSync } from 'node:child_process';

const entryFiles = [
  'public/games/phenoquest/game.js',
  'src/game/config.js',
  'src/game/controller.js',
  'src/game/load-data.js',
  'src/game/screens.js',
  'src/engine/battle.js',
  'src/engine/breeding.js',
  'src/engine/combat-ai.js',
  'src/engine/dialogue-runner.js',
  'src/engine/genotype.js',
  'src/engine/interactions.js',
  'src/engine/lineage-lab.js',
  'src/engine/lineage-result-factory.js',
  'src/engine/lineage-timers.js',
  'src/engine/progression.js',
  'src/engine/save-export.js',
  'src/engine/save-migration.js',
  'src/engine/save.js',
  'src/engine/status-effects.js',
  'src/engine/storage.js',
  'src/engine/weather.js',
  'src/ui/breeding-ui.js',
  'src/ui/dialogue-box-ui.js',
  'src/ui/interaction-ui.js',
  'src/ui/inventory-ui.js',
  'src/ui/lineage-lab-ui.js',
  'src/ui/map-ui.js',
  'src/ui/phenolog-ui.js',
  'src/ui/quest-ui.js',
  'src/ui/vault-garden-ui.js',
  'src/ui/weather-ui.js',
  'scripts/core-rules-check.mjs',
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
