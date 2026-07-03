# PhenoQuest Production Backlog

This backlog defines the next work in priority order. Keep this updated as systems move from planned to wired.

## Critical

### 1. Stabilize Current MVP Loop

- run `npm run check`
- fix any audit, contract, smoke, or compile errors
- confirm browser flow works locally through `npm run dev`
- verify reset save works
- verify timer claim works after refresh/check

### 2. Split Browser Controller

Current `public/games/phenoquest/game.js` is too large. Split into:

- `src/game/bootstrap.js`
- `src/game/controller.js`
- `src/game/screens.js`
- `src/game/load-data.js`

### 3. Add Save Migration

Create versioned save repair and migration so older local saves do not break new systems.

### 4. Add Full PhenoLog Screen

Replace the simple collection panel with a proper PhenoLog screen.

### 5. Add Quest Tracker UI

Show active objective, completed objectives, and next objective.

## Next

### 6. Add Inventory UI

Display:

- field materials
- reward tags
- items
- key items

### 7. Add Lineage Lab Preview Screen

Turn read-only breeding preview into a better inspection screen.

### 8. Add Vault Garden Detail Panel

Allow inspection of stored results:

- species
- quality
- trait
- expression
- tags
- Keeper status

### 9. Add Weather Forecast / Cycle

Move from manual weather buttons to optional timed weather cycling.

### 10. Add Dialogue Controller

Build dialogue box UI and NPC interactions.

## Later

### 11. Add Real Map Renderer

Replace placeholder grid with tilemap rendering.

### 12. Add Sprite Asset Pipeline

Create sprite manifest and naming rules before generating art.

### 13. Add Audio Manifest

Track music and sound needs.

### 14. Add Deployment Plan

Document static deployment to DTF Seeds / Hostinger.

### 15. Add Browser Tests

Use Playwright or another browser test runner later to automate button-click flows.

## Bugs To Watch

- old local saves missing new fields
- timer refresh not showing ready state
- recipe panel not appearing if material is below requirement
- lineage preview not showing if only one candidate exists
- map transition flags blocking testing too early
- large `game.js` becoming hard to maintain

## Current Rule

Do not add heavy art, backend accounts, multiplayer, trading, or daily event services until the MVP loop is stable and split into maintainable files.
