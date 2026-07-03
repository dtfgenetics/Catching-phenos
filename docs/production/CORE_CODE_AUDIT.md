# Core Code Audit

This audit identifies the core code spine needed for PhenoQuest to stay expandable and safe to build.

## Current Core Code Present

### Data Loading

Present:

- `src/game/config.js`
- `src/game/load-data.js`
- `src/data/fetch-json.js`

Purpose:

- central data path ownership
- reusable game data loading
- unit/result display helpers

### App Controller Spine

Present:

- `src/game/controller.js`
- `src/game/screens.js`

Purpose:

- future split away from giant browser script
- screen state tracking
- active combat and recipe state tracking

### Save Safety

Present:

- `src/engine/save.js`
- `src/engine/save-migration.js`
- `src/engine/save-export.js`
- `src/engine/storage.js`

Purpose:

- default save creation
- migration/repair
- safe localStorage access
- export/import helpers

### Gameplay Engines

Present:

- starter selection
- map movement
- encounters
- battle
- rewards
- inventory
- collection
- timers
- result factory
- weather
- expression
- progression
- quest events
- genotype
- breeding preview
- lineage lab preview

### UI Panels

Present:

- starter selection
- map
- movement controls
- encounter
- combat
- recipe timer
- inventory
- Vault Garden
- PhenoLog
- quest tracker
- breeding preview
- lineage lab
- weather panel

### Validation Tools

Present:

- repo audit
- data contract check
- smoke check
- compile/syntax check
- GitHub workflow

## Key Core Code Still Missing

### 1. Browser Controller Refactor

`public/games/phenoquest/game.js` is still too large.

Needed future files:

```text
src/game/bootstrap.js
src/game/render-all-panels.js
src/game/actions.js
src/game/dom.js
```

### 2. Dialogue Controller

Dialogue data exists, but full interaction flow is missing.

Needed:

```text
src/engine/dialogue-runner.js
src/ui/dialogue-box-ui.js
```

### 3. Map Interaction Engine

Movement exists, but object/NPC interaction is not complete.

Needed:

```text
src/engine/interactions.js
src/ui/interaction-ui.js
```

### 4. Combat Status Engine

Combat works as an MVP loop, but has no proper status engine.

Needed:

```text
src/engine/status-effects.js
src/engine/combat-ai.js
```

### 5. Active Lineage Lab Mechanic

Preview exists. Active breeding/timed lineage batches do not exist yet.

Needed:

```text
src/engine/lineage-timers.js
src/engine/lineage-result-factory.js
```

### 6. Browser Automated Test

Command checks exist, but no browser-click test yet.

Needed later:

```text
tests/browser/playable-loop.test.js
```

## Current Professional Assessment

The repo now has enough core code to keep building safely.

The highest-risk missing piece is not another mechanic. It is the oversized `game.js` file. The next professional move should be to split it into smaller controller/action/render files without changing behavior.

## Recommended Next Push Set

1. Add `src/game/dom.js`
2. Add `src/game/render-all-panels.js`
3. Add `src/game/actions.js`
4. Add `src/game/bootstrap.js`
5. Move browser query selectors out of `game.js`
6. Keep old behavior intact
7. Update smoke/compile/manifest

## Do Not Add Yet

- multiplayer
- account system
- trading
- backend API
- NFT/blockchain
- heavy animation system
- large art imports

Those should wait until controller structure is cleaner.
