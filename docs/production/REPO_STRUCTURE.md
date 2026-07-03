# Repository Structure Guide

This repo is organized so game design, data, assets, and code can evolve without losing context.

## Top-Level Folders

```text
/docs
/data
/assets
/src
/public
```

## `/docs`

Design and production documentation.

```text
/docs
  GAME_BIBLE.md
  MVP_MASTER_SHEET.md
  /systems
    CORE_LOOP.md
    CLONING_SYSTEM.md
    BREEDING_SYSTEM.md
    ENVIRONMENT_EXPRESSION_SYSTEM.md
    BATTLE_SYSTEM.md
    PHENOLOG_SYSTEM.md
    VAULT_GARDEN_SYSTEM.md
  /world
    STORY_BIBLE.md
    VERDANTIA_REGIONS.md
    TEAM_LOCKOUT.md
  /production
    REPO_STRUCTURE.md
    CODEX_BUILD_BRIEF.md
    ASSET_MANIFEST.md
    IP_SAFETY_CHECKLIST.md
```

## `/data`

Structured game data. These files should be used by the game engine instead of hardcoding Phenos, moves, items, encounters, or quests.

```text
/data
  /schemas
    pheno.schema.json
    move.schema.json
    item.schema.json
    quest.schema.json
    expression.schema.json
  /phenos
    mvp_phenos.json
  /moves
    mvp_moves.json
  /items
    mvp_items.json
  /quests
    mvp_quests.json
  /encounters
    terp_fields.json
  /expressions
    expression_matrix_mvp.json
```

## `/assets`

Art and audio assets. Keep source and exported web assets organized.

```text
/assets
  /sprites
    /player
    /npcs
    /phenos
    /effects
  /tilesets
  /ui
  /audio
```

## `/src`

Game source code. The engine should load game content from `/data`.

```text
/src
  /engine
    movement.js
    collision.js
    battle.js
    cloning.js
    breeding.js
    expression.js
    save.js
  /game
    main.js
    boot.js
    config.js
  /ui
    battle-ui.js
    phenolog-ui.js
    clone-dome-ui.js
  /data
    data-loader.js
```

## `/public/games/phenoquest`

Web build target for DTF Seeds hosting.

```text
/public/games/phenoquest
  index.html
  game.js
  style.css
  assets/
```

## Commit Rule

Use small commits. Each commit should add or modify one clear piece of the system:

- one system document
- one schema
- one data table
- one engine module
- one UI module
- one asset manifest update

This keeps the repo readable for Codex and future agents.
