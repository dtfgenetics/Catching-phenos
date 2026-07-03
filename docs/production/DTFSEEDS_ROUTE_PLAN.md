# DTF Seeds Route Plan

## Target Route

```text
/games/phenoquest
```

## Current Static Entry

```text
/public/games/phenoquest/index.html
```

## Game Hub Placement

PhenoQuest should live as one game in the DTF Seeds game hub.

Recommended hub card fields:

```text
Title: PhenoQuest
Subtitle: The Living Seed Vault
Tagline: Collect the Whole Garden
Status: MVP Demo
CTA: Play Demo
Route: /games/phenoquest
```

## Route Requirements

The route should support:

- direct browser access
- mobile browser access
- local save through localStorage
- static JSON data loading
- future asset loading

## File Path Requirement

The current scaffold relies on relative paths from:

```text
public/games/phenoquest/game.js
```

to:

```text
data/
src/
```

Do not move only the `/public/games/phenoquest` folder without also making `/data` and `/src` accessible at the expected relative paths.

## Future Route Cleanup

When a bundler is added, the final route should not expose raw `/src` imports. The bundler should output a self-contained route package.

Recommended final output:

```text
dist/games/phenoquest/index.html
dist/games/phenoquest/assets/*
dist/games/phenoquest/game.[hash].js
```

## Launch Checklist

- `npm run check` passes
- DTF Seeds hub links to route
- browser console has no module path errors
- game loads on mobile
- reset save works
- game loop completes through result claim
- no public franchise references
- no missing asset paths in production console
