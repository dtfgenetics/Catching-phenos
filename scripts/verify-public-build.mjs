import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();
const gameRoot = path.join(repoRoot, 'dist', 'games', 'phenoquest');
const entryPath = path.join(gameRoot, 'game.js');
const lineageEntryPath = path.join(gameRoot, 'lineage-runtime.js');

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

for (const required of [
  'index.html',
  'style.css',
  'game.js',
  'lineage-runtime.js',
  'build-meta.json',
  '_runtime/src/engine/battle.js',
  '_runtime/src/engine/breeding.js',
  '_runtime/src/engine/lineage-timers.js',
  '_runtime/src/engine/lineage-result-factory.js',
  '_runtime/src/engine/save.js',
  '_runtime/src/ui/combat-ui.js',
  '_runtime/src/ui/lineage-lab-ui.js',
  '_runtime/data/phenos/mvp_units.json',
  '_runtime/data/encounters/terp_fields.json',
  '_runtime/data/breeding/pairing_rules_mvp.json',
  '_runtime/data/breeding/result_units_mvp.json'
]) {
  const fullPath = path.join(gameRoot, required);
  if (!await exists(fullPath)) throw new Error(`Production package missing required file: ${required}`);
}

if (await exists(path.join(repoRoot, 'dist', 'src')) || await exists(path.join(repoRoot, 'dist', 'data'))) {
  throw new Error('Production package leaked src or data into the site root. Runtime must remain route-local.');
}

const indexHtml = await readFile(path.join(gameRoot, 'index.html'), 'utf8');
if (!indexHtml.includes('./style.css') || !indexHtml.includes('./game.js') || !indexHtml.includes('./lineage-runtime.js')) {
  throw new Error('Production index must load route-local style.css, game.js, and lineage-runtime.js.');
}

for (const browserEntryPath of [entryPath, lineageEntryPath]) {
  const source = await readFile(browserEntryPath, 'utf8');
  if (source.includes('../../../src/') || source.includes('../../../data/')) {
    throw new Error(`Production entry ${path.basename(browserEntryPath)} contains repository-relative paths.`);
  }
  if (!source.includes('./_runtime/src/') || !source.includes('./_runtime/data/')) {
    throw new Error(`Production entry ${path.basename(browserEntryPath)} is not wired to the route-local runtime.`);
  }
}

const entry = await readFile(entryPath, 'utf8');
const javascriptFiles = (await walk(gameRoot)).filter((file) => file.endsWith('.js'));
const importPattern = /(?:import|export)\s+(?:[^'";]+?\s+from\s+)?['"]([^'"]+)['"]/g;
let importCount = 0;

for (const file of javascriptFiles) {
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(importPattern)) {
    const specifier = match[1];
    if (!specifier.startsWith('.')) continue;
    importCount += 1;
    const resolved = path.resolve(path.dirname(file), specifier);
    if (!await exists(resolved)) {
      throw new Error(`Broken relative import in ${path.relative(gameRoot, file)}: ${specifier}`);
    }
  }
}

const dataMatches = [...entry.matchAll(/['"](\.\/_runtime\/data\/[^'"]+\.json)['"]/g)].map((match) => match[1]);
if (dataMatches.length < 10) {
  throw new Error(`Expected the production entry to reference the canonical MVP data set; found ${dataMatches.length} JSON paths.`);
}
for (const dataPath of dataMatches) {
  const resolved = path.resolve(path.dirname(entryPath), dataPath);
  if (!await exists(resolved)) throw new Error(`Missing production data dependency: ${dataPath}`);
}

const lineageEntry = await readFile(lineageEntryPath, 'utf8');
if (!lineageEntry.includes('pairing_rules_mvp.json') || !lineageEntry.includes('result_units_mvp.json')) {
  throw new Error('Production lineage runtime is not wired to canonical pairing and result data.');
}

console.log(`Verified PhenoQuest production package: ${javascriptFiles.length} JavaScript files, ${importCount} relative module imports, ${dataMatches.length} core JSON dependencies, Lineage Lab runtime included.`);
