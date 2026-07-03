# Sprite Style Guide

## Purpose

This guide defines how PhenoQuest sprites should be created so the game stays visually consistent and original.

## Visual Direction

PhenoQuest should feel like:

- cannabis fantasy biology
- field journal meets living seed vault
- warm garden adventure
- original creature collector without franchise lookalikes

## Do Not Use

Avoid:

- red and white capture balls
- copied monster-game UI silhouettes
- yellow/blue creature-collector logo styling
- franchise-style trainer poses
- copied monster proportions
- copied music, cries, icons, or fonts

## Sprite Categories

### Player

Recommended sizes:

```text
32x32 or 48x48 overworld
4 directions
4 frames per direction
transparent PNG
```

### NPCs

Recommended sizes:

```text
32x32 or 48x48 overworld
idle and walking frames
transparent PNG
```

### Phenos

Recommended sizes:

```text
32x32 overworld icon
96x96 PhenoLog portrait
128x128 combat sprite
192x192 boss sprite
transparent PNG
```

## Naming Rules

Use lowercase snake case.

Examples:

```text
player_vault_runner_walk.png
npc_professor_calyx.png
pheno_mango_puff_combat.png
pheno_kush_cub_icon.png
```

## MVP Sprite Priority

1. Player Vault Runner
2. Professor Calyx
3. Nova
4. Team Lockout Grunt
5. Mango Puff
6. Kush Cub
7. Frostling
8. Terp Toad
9. Gas Goblin
10. Skunkrat
11. Lockout Leech

## Palette Direction

Use:

- deep greens
- warm amber
- cream parchment
- resin gold
- frost blue
- muted purple
- controlled red only for Team Lockout warnings

## Pheno Design Rule

Each Pheno should be built from:

```text
cannabis concept + animal/object silhouette + gameplay role
```

Example:

```text
Mango Puff = fruit terp profile + puff bud body + fast aroma role
```

## Export Rules

- transparent PNG
- no checkerboard backgrounds
- consistent canvas size per category
- centered subject
- safe padding
- no cropped limbs or effects
