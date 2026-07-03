import { readFile } from 'node:fs/promises';

const entryFiles = [
  'public/games/phenoquest/game.js',
  'src/engine/battle.js',
  'src/engine/breeding.js',
  'src/engine/weather.js',
  'src/ui/weather-ui.js'
];

for (const file of entryFiles) {
  const source = await readFile(file, 'utf8');
  const encoded = encodeURIComponent(source);
  const moduleUrl = `data:text/javascript;charset=utf-8,${encoded}`;

  try {
    await import(moduleUrl);
    console.log(`OK COMPILE: ${file}`);
  } catch (error) {
    console.error(`FAILED COMPILE: ${file}`);
    throw error;
  }
}

console.log('Static compile check complete.');
