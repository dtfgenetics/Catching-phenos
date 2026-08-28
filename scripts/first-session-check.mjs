import assert from 'node:assert/strict';
import { createDefaultSave } from '../src/engine/save.js';
import { deriveFirstSessionProgress, firstSessionHeadline } from '../src/engine/first-session.js';

const fresh = createDefaultSave();
let progress = deriveFirstSessionProgress(fresh);
assert.equal(progress.completedCount, 0);
assert.equal(progress.next.id, 'starter');
assert.equal(firstSessionHeadline(progress), 'Start your first Vault Run');

const starter = structuredClone(fresh);
starter.player.starterChoice = 'starter_a';
starter.quests.flags.starter_chosen = true;
progress = deriveFirstSessionProgress(starter);
assert.equal(progress.completedCount, 1);
assert.equal(progress.next.id, 'battle');

const rooted = structuredClone(starter);
rooted.quests.flags.tutorial_battle_complete = true;
rooted.quests.flags.first_material_earned = true;
rooted.quests.flags.first_result_claimed = true;
rooted.quests.flags.lineage_preview_unlocked = true;
rooted.vaultGarden.rootedUnits.push({ id: 'rooted-1', source: 'field_result' });
progress = deriveFirstSessionProgress(rooted);
assert.equal(progress.completedCount, 5);
assert.equal(progress.next.id, 'offspring');

const complete = structuredClone(rooted);
complete.vaultGarden.rootedUnits.push({ id: 'offspring-1', source: 'lineage_lab' });
progress = deriveFirstSessionProgress(complete);
assert.equal(progress.complete, true);
assert.equal(progress.percent, 100);
assert.equal(progress.next, null);
assert.equal(firstSessionHeadline(progress), 'First Vault Run complete');

console.log('PhenoQuest first-session progression checks passed.');
