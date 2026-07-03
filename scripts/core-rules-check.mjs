import { createCombatant, resolveAbility } from '../src/engine/battle.js';
import { chooseEnemyAction } from '../src/engine/combat-ai.js';
import { createDialogueSession, getCurrentDialogueLine } from '../src/engine/dialogue-runner.js';
import { resolveInteraction } from '../src/engine/interactions.js';
import { hasStatus, tickStatuses } from '../src/engine/status-effects.js';
import { createDefaultSave } from '../src/engine/save.js';
import { readFile } from 'node:fs/promises';

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const defaultSave = createDefaultSave();
const dialogueRecords = await readJson('data/dialogue/mvp_dialogue.json');
const seedlingTown = await readJson('data/maps/seedling_town.json');
const abilities = await readJson('data/moves/mvp_abilities.json');

const introSession = createDialogueSession(dialogueRecords, 'calyx_intro', defaultSave);
assert(introSession.active, 'calyx_intro should start.');
assert(getCurrentDialogueLine(introSession)?.includes('Vault'), 'calyx_intro should return a line.');

const interaction = resolveInteraction({
  map: seedlingTown,
  saveData: {
    ...defaultSave,
    player: {
      ...defaultSave.player,
      position: { x: 7, y: 4 },
      facing: 'down'
    }
  },
  direction: 'down'
});
assert(interaction.type === 'npc', 'Facing Professor Calyx should resolve an NPC interaction.');
assert(interaction.dialogueId === 'calyx_intro', 'Professor Calyx should open calyx_intro dialogue.');

const sampleUnit = {
  id: 'sample_unit',
  displayName: 'Sample Unit',
  classes: ['fruit'],
  baseStats: { vigor: 20, power: 5, terps: 5, roots: 5, speed: 5, stability: 5 }
};

const attacker = createCombatant(sampleUnit, 1);
const defender = createCombatant(sampleUnit, 1);
const stickyTongue = abilities.find((ability) => ability.id === 'sticky_tongue');
const statusTurn = resolveAbility({ attacker, defender, ability: stickyTongue });
assert(hasStatus(statusTurn.defender, 'rootbound'), 'sticky_tongue should apply rootbound status.');

const resinGuard = abilities.find((ability) => ability.id === 'resin_guard');
const guardTurn = resolveAbility({ attacker, defender, ability: resinGuard });
assert(hasStatus(guardTurn.attacker, 'shielded'), 'resin_guard should apply shielded status.');
assert(!hasStatus(tickStatuses(guardTurn.attacker), 'shielded'), 'shielded should expire after one status tick.');

const chosenAction = chooseEnemyAction({
  opponent: attacker,
  player: defender,
  actions: abilities.filter((ability) => ['quick_sprout', 'root_bump'].includes(ability.id))
});
assert(chosenAction.id === 'root_bump', 'Enemy AI should choose stronger basic action when no special condition applies.');

console.log('Core gameplay rule check complete.');
