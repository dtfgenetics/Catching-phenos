import { getClassMultiplier } from './class-chart.js';

export function createCombatant(unit, level = 1) {
  return {
    unitId: unit.id,
    displayName: unit.displayName,
    classes: unit.classes,
    level,
    maxVigor: unit.baseStats.vigor + level * 2,
    vigor: unit.baseStats.vigor + level * 2,
    stability: unit.baseStats.stability,
    stats: { ...unit.baseStats }
  };
}

export function calculateDamage({ attacker, defender, ability }) {
  const basePower = ability.power ?? 0;
  const attackStat = ability.category === 'special' ? attacker.stats.terps : attacker.stats.power;
  const defenseStat = defender.stats.roots;
  const classMultiplier = getClassMultiplier(attacker.classes, defender.classes);

  const raw = basePower + attackStat - Math.floor(defenseStat / 2);
  return Math.max(1, Math.round(raw * classMultiplier));
}

export function applyDamage(combatant, amount) {
  return {
    ...combatant,
    vigor: Math.max(0, combatant.vigor - amount)
  };
}

export function applyStabilityChange(combatant, amount) {
  return {
    ...combatant,
    stability: Math.max(0, combatant.stability + amount)
  };
}

export function isDefeated(combatant) {
  return combatant.vigor <= 0;
}

export function resolveAbility({ attacker, defender, ability }) {
  const damage = calculateDamage({ attacker, defender, ability });
  let nextAttacker = attacker;
  let nextDefender = applyDamage(defender, damage);

  if (ability.effect === 'self_stability_down') {
    nextAttacker = applyStabilityChange(nextAttacker, -1);
  }

  if (ability.effect === 'raise_defense_restore_stability') {
    nextAttacker = applyStabilityChange(nextAttacker, 2);
  }

  return {
    attacker: nextAttacker,
    defender: nextDefender,
    log: `${attacker.displayName} used ${ability.displayName} for ${damage} damage.`
  };
}
