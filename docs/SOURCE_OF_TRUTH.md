# PhenoQuest: The Living Seed Vault — Source of Truth

`dtfgenetics/Catching-phenos` is the canonical code, structured game-data, and production repository for **PhenoQuest: The Living Seed Vault**.

Google Drive `04 Games/Catching Phenos` is canonical for approved human-readable design masters, original artwork/source assets, playtest evidence, proofs, and approved release packages.

## Current controlled state

Status: **playable browser vertical slice in active development**.

The repository is no longer design-only preproduction. It contains source modules, machine-readable game data, validation/build tooling, and a self-contained browser build.

Canonical implementation areas:

```text
src/
data/
public/games/phenoquest/
scripts/
```

The self-contained website build under `public/games/phenoquest/` is generated from and governed by this repository. DTFSeeds should package the verified canonical build rather than treat a copied route snapshot as the gameplay master.

## Current playable systems

The current vertical slice includes the controlled MVP loop documented in the repository README, including:

- starter selection and local save data;
- map movement, transitions, nearby interactions, and NPC dialogue choices;
- weather/expression controls;
- encounter rolls and turn-based combat;
- basic enemy AI and status effects;
- battle rewards and inventory materials;
- rooting/result timers and Vault Garden storage;
- Keeper/result tracking, collection, and Pheno Log panels;
- progression/quest events and region unlocks;
- breeding compatibility previews;
- playable Lineage Lab crosses and offspring claiming.

This is **not a finished full RPG**. Broader world content, encounter/combat variety, progression depth, final original visual/audio assets, mobile/touch QA, accessibility QA, save migration, and human playtesting remain open production work.

## Core identity rules

PhenoQuest must remain an original cannabis genetics-preservation adventure.

- Players battle for Cuttings and root clones rather than using copied creature-capture conventions.
- Genotype, environment, phenotype expression, Keeper selection, breeding, and lineage restoration remain central systems.
- Do not use Pokémon names, slogans, logos, characters, fonts, capture-ball concepts, copied battle layouts, protected catchphrases, or other franchise identity elements.

## DTFSeeds integration contract

Public route:

```text
https://dtfseeds.com/games/phenoquest/
```

Canonical verification commands:

```bash
npm run check
npm run build
```

The public suite must package the passing canonical build from this repository. Any DTFSeeds integration output is a delivery surface, not a replacement code owner.

## Release

A PhenoQuest release requires:

1. canonical data/schema validation;
2. rules/engine/smoke/build verification through `npm run check`;
3. a passing self-contained production build;
4. startup, save, movement, interaction, combat, rooting, Garden, Keeper, progression, and breeding-flow verification;
5. mobile/touch and accessibility QA appropriate to the release scope;
6. original approved visual/audio assets or explicitly approved temporary production assets;
7. human playtest and save-migration evidence before claims of full production readiness;
8. DTFSeeds package validation and exact live-route verification;
9. browser gameplay verification as a separate final evidence level.

Do not describe PhenoQuest as design-only preproduction, and do not describe the complete RPG as finished. The accurate current state is a **playable browser vertical slice in active development**.
