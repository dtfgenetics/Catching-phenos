# PhenoQuest Production System Map

This document explains how the current repo is structured and what each system is responsible for.

## Main Goal

Build a browser-playable MVP where a player can:

1. start the demo
2. choose a starter
3. move on placeholder maps
4. trigger environment-based encounters
5. battle wild units
6. earn field material
7. spend material on a timer recipe
8. claim a result into the Vault Garden
9. track progress in the PhenoLog

## Current Main Route

`public/games/phenoquest/index.html`

This is the browser entry page for the MVP scaffold.

`public/games/phenoquest/game.js`

This currently wires together data loading, starter selection, movement, encounter testing, combat testing, rewards, recipe timers, result claiming, collection progress, and reset-save testing.

## Data Layer

### Pheno Data

- `data/phenos/mvp_units.json`
- `data/phenos/mvp_units_extra.json`

These define starter units, wild units, enemy units, stats, traits, recipe requirements, abilities, and lineage placeholders.

### Expression Data

- `data/expressions/expression_matrix_mvp.json`

This defines the environment expression states created from weather plus environment cue.

### Encounter Data

- `data/encounters/terp_fields.json`

This defines which units can appear in Terp Fields and what weather/cue conditions affect them.

### Ability Data

- `data/moves/mvp_abilities.json`

This defines combat actions used by units.

### Item Data

- `data/items/mvp_items.json`

This defines early inventory/care/story items.

### Quest Data

- `data/quests/mvp_quests.json`

This defines the first MVP story chain.

### Map Data

- `data/maps/seedling_town.json`
- `data/maps/greenhouse.json`
- `data/maps/terp_fields.json`
- `data/maps/aroma_trial_greenhouse.json`

These are placeholder map definitions for movement, cue zones, transitions, NPCs, objects, and trial locations.

## Engine Layer

### Save System

- `src/engine/save.js`

Creates, loads, merges, writes, and resets local save state.

### Movement System

- `src/engine/movement.js`
- `src/engine/maps.js`

Handles tile movement, blocked spaces, map transitions, and environment cue detection.

### Encounter System

- `src/engine/encounters.js`

Chooses eligible encounters based on weather, cue, weights, and story flags.

### Combat System

- `src/engine/battle.js`
- `src/engine/class-chart.js`
- `src/engine/battle-rewards.js`

Handles combatants, class advantage, ability resolution, damage, status-like effects, victory reward calculation, and zero-power action safety.

### Collection / PhenoLog System

- `src/engine/collection.js`

Tracks seen, battled, material count, recipe unlock, rooted result count, known traits, known expressions, keeper found, and vault progress.

### Timer / Result System

- `src/engine/timers.js`
- `src/engine/result-timers.js`
- `src/engine/result-factory.js`

Handles active timers, ready status, result creation, and storing claimed results.

### Inventory System

- `src/engine/inventory.js`

Tracks items and field materials.

### Starter System

- `src/engine/starter-selection.js`

Creates the first starter unit and adds it to the player team.

## UI Layer

- `src/ui/starter-selection-ui.js`
- `src/ui/map-ui.js`
- `src/ui/movement-ui.js`
- `src/ui/encounter-ui.js`
- `src/ui/combat-ui.js`
- `src/ui/recipe-ui.js`
- `src/ui/collection-ui.js`
- `src/ui/render-summary.js`

These are small DOM render helpers. They should stay simple and avoid holding game logic.

## Validation Layer

- `scripts/smoke-check.mjs`
- `.github/workflows/smoke.yml`

The smoke check verifies JSON parsing, module imports, cross-reference integrity, required HTML containers, and basic combat safety rules.

## Current Development Rule

Do not build a huge feature in one file.

Every system should be split into:

1. data
2. engine logic
3. UI helper
4. smoke check if possible
5. page wiring only after the smaller parts exist

## Next Systems To Add

1. Quest event hooks
2. Vault Garden display panel
3. Environment/weather control panel
4. Better combat reward summary
5. Timer remaining display
6. MVP deployment notes
7. Breeding/lineage design document
8. Genotype pairing schema
9. Future multi-region expansion map
