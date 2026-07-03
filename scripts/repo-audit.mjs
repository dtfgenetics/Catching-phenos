import { access, readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile('data/system/file_manifest.json', 'utf8'));

for (const file of manifest.requiredFiles ?? []) {
  try {
    await access(file);
    console.log(`OK FILE: ${file}`);
  } catch {
    throw new Error(`Required manifest file missing: ${file}`);
  }
}

console.log(`Repo audit complete for ${manifest.project} ${manifest.version}.`);
