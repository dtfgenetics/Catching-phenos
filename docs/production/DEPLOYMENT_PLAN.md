# Deployment Plan

This document defines how PhenoQuest should move from local scaffold to a public DTF Seeds game route.

## Current State

The game is currently a static browser scaffold at:

```text
public/games/phenoquest/index.html
```

Local run command:

```bash
npm run dev
```

Local URL:

```text
http://localhost:4173/public/games/phenoquest/
```

## Target Public Route

The intended future public route is:

```text
/games/phenoquest
```

## Static Build Assumption

The current version does not require:

- database
- login
- backend API
- Node server in production
- bundler

It only requires static hosting of:

- HTML
- CSS
- JS modules
- JSON data
- future asset files

## Pre-Deploy Checks

Before deployment, run:

```bash
npm run check
```

This runs:

1. repo manifest audit
2. data contract check
3. smoke check
4. syntax compile check

## Production Upload Target

For a static host, upload or publish:

```text
public/games/phenoquest/
data/
src/
```

Important: because `game.js` currently imports from `../../../src` and `../../../data`, the deployed folder structure must preserve those relative paths unless a bundler/build step is added.

## Preferred Future Build Step

Later, add a bundler build that outputs everything into:

```text
dist/games/phenoquest/
```

Then deploy only `dist`.

## Deployment Stages

### Stage 1: Static Scaffold

Goal: Make current browser game accessible on a private or test route.

### Stage 2: Internal Test Build

Goal: Verify on desktop and mobile browsers.

### Stage 3: Public Soft Launch

Goal: Add `/games/phenoquest` to DTF Seeds game hub.

### Stage 4: Asset Upgrade

Goal: Replace placeholder grid and text panels with final visual assets.

### Stage 5: Backend Upgrade

Goal: Only after local-save version is stable, consider accounts, leaderboards, or online events.

## Do Not Deploy Until

- `npm run check` passes
- Start Demo works
- starter selection works
- reset save works
- encounter roll works
- combat action works
- material reward updates inventory
- timer starts and can be claimed
- Vault Garden updates
- PhenoLog updates
- Lineage Lab preview does not crash

## Known Risk

Static ES module imports can break if the deployed folder structure changes. Keep paths intact or add a bundler before moving files.
