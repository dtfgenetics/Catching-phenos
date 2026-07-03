# Stabilization Log

## Purpose

This file records small fixes and validation checkpoints so future build passes know what has already been checked.

## Current Stabilized Areas

### Data Loading

The browser scaffold loads:

- starter roster
- extra MVP roster
- expression matrix
- encounter table
- item table
- ability table
- quest table
- dialogue table
- starter slot table
- MVP map files

### Save State

Default save now includes:

- player
- team
- vaultGarden
- inventory
- timers
- collection
- quests
- world state

Older local saves are merged with the default shape when loaded.

### Starter Selection

Starter selection is wired into the page and writes the selected starter to local save.

### Map Preview

The scaffold renders a placeholder grid map and shows player position.

### Movement

Movement supports:

- button controls
- keyboard arrows
- WASD
- blocked tile checks
- map transitions
- environment cue updates

### Encounter Prototype

The encounter prototype can:

- read current weather
- read current environment cue
- roll from Terp Fields data
- show selected opponent
- show expression state

### Combat Prototype

The combat prototype can:

- create combatants
- render player and opponent
- show available actions
- resolve one player action
- resolve one opponent response
- end when either side reaches zero Vigor

### Smoke Check

`npm run smoke` checks:

- required JSON files parse
- required modules import
- encounter references match real units
- ability references match real abilities
- required HTML containers exist
- zero-power actions do not deal damage

## Known Next Steps

1. Add reward flow after combat victory.
2. Update collection progress after victory.
3. Add timer recipe UI.
4. Add PhenoLog UI.
5. Add reset-save button.
6. Add basic quest advancement hooks.
7. Add deploy/static path notes for DTF Seeds hosting.
