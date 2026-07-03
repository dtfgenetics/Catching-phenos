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
npm run audit
npm run contracts
npm run rules
npm run smoke
npm run compile
```

## Audit Check

Use:

```bash
npm run audit
```

This checks the required file manifest.

## Contract Check

Use:

```bash
npm run contracts
```

This checks key JSON data shapes.

## Gameplay Rules Check

Use:

```bash
npm run rules
```

This checks core gameplay expectations:

- Calyx dialogue starts
- dialogue runner returns a line
- facing Professor Calyx resolves an NPC interaction
- sticky tongue applies Rootbound
- resin guard applies Shielded
- enemy AI chooses the stronger basic action

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
3. Move near an NPC.
4. Face the NPC and press Interact, Enter, or Space.
5. Advance dialogue.
6. Change weather if desired.
7. Move on the placeholder map.
8. Roll a field encounter.
9. Use combat actions.
10. Win combat to earn material.
11. Start a timer recipe when enough material exists.
12. Check timer.
13. Claim the result.
14. Confirm Vault Garden and PhenoLog update.
15. Check Lineage Preview.
16. Reset save and repeat.

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
