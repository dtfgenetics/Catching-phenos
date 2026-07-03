# Codex Build Notes

These notes are for future coding passes. Follow this structure so the project stays organized.

## Current Repo Direction

This repo is building the PhenoQuest browser game in small verified layers.

The current target is not final art or a full RPG. The current target is a stable playable scaffold that proves the core loop:

- starter selection
- movement
- encounters
- combat
- material rewards
- timer recipes
- result claiming
- PhenoLog progress
- save/reset

## File Ownership

### Data Files

Use `/data` for editable game content:

- `/data/phenos` for unit records
- `/data/moves` for actions
- `/data/items` for items
- `/data/encounters` for encounter tables
- `/data/expressions` for weather/cue expression states
- `/data/weather` for weather states
- `/data/breeding` for genotype and pairing rules
- `/data/maps` for placeholder and future map data
- `/data/dialogue` for dialogue records
- `/data/quests` for quest chains

### Engine Files

Use `/src/engine` for reusable logic only. Engine modules should not directly write DOM elements.

### UI Files

Use `/src/ui` for DOM rendering helpers. UI files should not own long-term game rules.

### Public Browser Files

Use `/public/games/phenoquest` for the static browser entrypoint.

`game.js` is currently a temporary controller. As it grows, split it into:

- `src/game/bootstrap.js`
- `src/game/controller.js`
- `src/game/screens.js`

## Current Smoke Command

Run:

```bash
npm run smoke
```

The smoke script validates JSON, module imports, key references, and required HTML containers.

## Do Not Break These IDs

The current MVP depends on these IDs:

- `mango_puff`
- `kush_cub`
- `frostling`
- `terp_fields`
- `clear_bloom`
- `sweet_wind`
- `lockout_static`
- `choose_your_echo`

## Next Recommended Code Pass

1. Add weather control UI.
2. Add Vault Garden panel.
3. Add quest event hooks to the actual page flow.
4. Split large `game.js` into smaller controller files.
5. Add static local server instructions.
6. Add a deployment checklist for DTF Seeds hosting.

## Rule For New Mechanics

A new mechanic is not considered added until it has at least two of these:

- design doc
- JSON data
- engine module
- UI module
- smoke check

## Safety / Originality Rule

Keep all public-facing terms original to PhenoQuest. Avoid franchise references, copied monster-game language, or lookalike branding.
