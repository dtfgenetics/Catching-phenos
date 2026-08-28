import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();
const publicSource = path.join(repoRoot, 'public', 'games', 'phenoquest');
const runtimeSource = path.join(repoRoot, 'src');
const dataSource = path.join(repoRoot, 'data');
const distRoot = path.join(repoRoot, 'dist');
const gameOut = path.join(distRoot, 'games', 'phenoquest');
const runtimeOut = path.join(gameOut, '_runtime');
const browserEntries = ['game.js', 'lineage-runtime.js', 'experience-v2.js'];

await rm(distRoot, { recursive: true, force: true });
await mkdir(path.dirname(gameOut), { recursive: true });
await cp(publicSource, gameOut, { recursive: true });
await mkdir(runtimeOut, { recursive: true });
await cp(runtimeSource, path.join(runtimeOut, 'src'), { recursive: true });
await cp(dataSource, path.join(runtimeOut, 'data'), { recursive: true });

for (const entryName of browserEntries) {
  const entryPath = path.join(gameOut, entryName);
  const sourceEntry = await readFile(entryPath, 'utf8');
  const productionEntry = sourceEntry
    .replaceAll('../../../src/', './_runtime/src/')
    .replaceAll('../../../data/', './_runtime/data/');

  if (productionEntry === sourceEntry) {
    throw new Error(`Production builder did not rewrite any repository-relative runtime paths in ${entryName}.`);
  }

  if (productionEntry.includes('../../../src/') || productionEntry.includes('../../../data/')) {
    throw new Error(`Production entry ${entryName} still contains repository-relative runtime paths.`);
  }

  await writeFile(entryPath, productionEntry, 'utf8');
}

await writeFile(
  path.join(gameOut, 'build-meta.json'),
  `${JSON.stringify({
    project: 'PhenoQuest: The Living Seed Vault',
    route: '/games/phenoquest/',
    runtime: 'static-es-modules',
    packageRoot: 'games/phenoquest',
    selfContained: true,
    browserEntries,
    generatedBy: 'npm run build'
  }, null, 2)}\n`,
  'utf8'
);

console.log(`Built self-contained PhenoQuest package: ${path.relative(repoRoot, gameOut)}`);
