# How To Run The PhenoQuest Scaffold

This project is currently a vanilla static browser scaffold. It does not need React, Vite, Webpack, or a database yet.

## Requirements

- Node.js 20 or newer
- GitHub repo checked out locally

## Install

No dependencies are currently required.

## Run Validation

Use:

```bash
npm run check
```

This runs:

```bash
npm run smoke
npm run compile
```

## Smoke Check

Use:

```bash
npm run smoke
```

This checks:

- required JSON files parse
- required engine modules import
- required UI modules import
- important data references match
- weather references are valid
- breeding result references are valid
- quest progression unlocks rank and region state
- required browser containers exist
- zero-power actions do not accidentally deal damage

## Compile Check

Use:

```bash
npm run compile
```

This currently runs Node syntax checks against key static JS files.

This project does not have a bundler compile step yet. When a bundler is added later, this command should be upgraded to run that production build.

## Run Local Browser Demo

Use:

```bash
npm run dev
```

Then open:

```text
http://localhost:4173/public/games/phenoquest/
```

## Current Test Flow

In the browser:

1. Press Start Demo.
2. Choose a starter.
3. Change weather if desired.
4. Move on the placeholder map.
5. Roll a field encounter.
6. Use combat actions.
7. Win combat to earn material.
8. Start a timer recipe when enough material exists.
9. Check timer.
10. Claim the result.
11. Confirm Vault Garden and PhenoLog update.
12. Check Lineage Preview.
13. Reset save and repeat.

## Current Route

The browser entrypoint is:

```text
/public/games/phenoquest/index.html
```

The intended future public route is:

```text
/games/phenoquest
```

## Current Status

This is still an MVP scaffold. The priority is stable system structure before heavy art, animation, backend, or account systems.
