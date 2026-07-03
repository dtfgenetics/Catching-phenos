# Codex Build Brief

## Project

**PhenoQuest: The Living Seed Vault**

A standalone DTF Seeds browser game about cannabis genetics, clone propagation, phenotype expression, breeding/crossing, and restoring the Living Seed Vault.

## Build Goal

Create a browser-playable MVP at:

```text
/public/games/phenoquest/index.html
```

The MVP should be readable, modular, data-driven, and easy to expand.

## Core Player Loop

1. Explore Seedling Town and Terp Fields.
2. Encounter wild Phenos.
3. Grow Battle wild Phenos.
4. Earn Cuttings instead of catching directly.
5. Collect enough Cuttings to unlock/root a clone recipe.
6. Start a Clone Dome timer.
7. Receive a Rooted Clone with traits, expression tags, stability, and quality.
8. Mark possible Keepers.
9. Restore PhenoLog and Living Seed Vault progress.
10. Progress through the first Team Lockout event and Aroma Trial.

## Required MVP Systems

- player movement
- map collision
- dialogue boxes
- quest flags
- starter selection
- wild encounters
- Grow Battle system
- Cutting rewards
- Clone Dome timer
- PhenoLog updates
- inventory
- local save/load
- first Garden Trial
- Team Lockout first boss event
- demo ending screen

## Data-Driven Requirement

Do not hardcode Pheno, move, item, quest, expression, or encounter definitions inside the engine. Load them from `/data` JSON files.

## MVP Phenos

Playable/rootable:

1. Mango Puff
2. Kush Cub
3. Frostling
4. Gas Goblin
5. Skunkrat
6. Terp Toad

Enemy-only first pass:

7. Lockout Leech

## MVP Regions

1. Seedling Town
2. Terp Fields
3. Professor Calyx Greenhouse
4. Clone Dome / Vault Garden screen
5. Aroma Trial greenhouse

## MVP Weather / Expression System

Start with a reduced matrix:

- Weather: Clear Bloom, Sweet Wind, Lockout Static
- Environmental Cues: Light Exposure, Airflow, Moisture, Vault Energy
- Total MVP expressions: 12

The full game will expand to 8 environmental cues x 6 weather states = 48 expression conditions.

## Cloning System Requirement

There is no direct catching mechanic. Wild Phenos award Cuttings after battle. Players root clones using required Cuttings, optional boost items, active environment/weather, and timer completion.

## Breeding System Requirement

Breeding is not required in the first playable MVP, but all Pheno data structures must prepare for it. Every Pheno should support genotype markers, compatible crosses, possible offspring, lineage branch, and expression history.

## Save System Requirement

Use browser localStorage for MVP. Save real timestamps for active clone timers so timers continue while the player is away.

## IP Safety Requirement

Do not copy Pokémon names, slogans, logos, capture devices, battle UI layout, fonts, sound effects, or character silhouettes. Build all terminology, UI, mechanics, and art as original PhenoQuest systems.

## Build Style

Recommended first implementation: vanilla HTML/CSS/JS or a lightweight canvas game engine. Keep file structure simple and readable before adding framework complexity.

## MVP Completion Definition

The MVP is complete when a player can:

1. start the game
2. choose a starter
3. enter Terp Fields
4. battle a wild Pheno
5. earn Cuttings
6. root a clone in the Clone Dome
7. see the clone added to PhenoLog/Vault Garden
8. defeat the first Team Lockout encounter
9. complete Aroma Trial
10. restore the first Vault branch
