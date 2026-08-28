# PhenoQuest: The Living Seed Vault

**PhenoQuest: The Living Seed Vault** is an original cannabis genetics-preservation browser game for DTF Seeds.

Players explore Verdantia, battle wild Phenos for Cuttings, root clones in the Vault Garden, identify Keeper traits, reveal genotypes, make strategic crosses in the Lineage Lab, grow results under changing environments, unlock rare phenotype expressions, and restore lost genetic lineages before Team Lockout replaces living diversity with sterile synthetic clones.

## Core Game Statement

**Battle for Cuttings. Root your Clones. Find your Keepers. Read the Genotype. Make the Cross. Grow the Expression. Restore the Lineage.**

## Public Identity

- **Title:** PhenoQuest: The Living Seed Vault
- **Tagline:** Collect the Whole Garden
- **Secondary in-game motto:** Cloning preserves. Crossing discovers.
- **Platform:** Browser game for DTF Seeds
- **Audience:** Adult cannabis community / 21+ where required by local law
- **Genre:** Original cannabis genetics collection/adventure RPG
- **Core world:** Verdantia
- **Player role:** Vault Runner / Pheno Hunter
- **Creatures:** Phenos
- **Main villain faction:** Team Lockout

## Current Playable Vertical Slice

The canonical repository now contains a self-contained static browser build under `public/games/phenoquest/` plus source modules, machine-readable game data, validators, and build verification.

The current loop includes:

- starter selection and local save data;
- map movement, transitions, nearby interactions, NPC dialogue and dialogue choices;
- weather/expression controls;
- encounter rolls and turn-based combat with basic enemy AI and status effects;
- battle rewards and inventory materials;
- rooting/result timers and Vault Garden storage;
- Keeper/result tracking, collection and Pheno Log panels;
- progression/quest events and region unlocks;
- breeding compatibility previews;
- **playable Lineage Lab crosses:** start a compatible cross, run the demo timer, claim an offspring into the Vault Garden, and resolve quality from the pairing rule's weighted probabilities;
- build, data-contract, rules, smoke, compile and repository-audit checks.

## Design Pillars

1. **Genotype is the blueprint. Environment decides the expression.**
2. **Players do not catch Phenos directly; they battle for Cuttings and root clones.**
3. **The best clone is not always the strongest — the goal is to find Keepers.**
4. **Breeding/crossing unlocks new expressions, hybrid Phenos, and restored lineages.**
5. **Every restored lineage repairs the Living Seed Vault.**
6. **Team Lockout removes variation through sterile synthetic control.**

## Repository Structure

```text
/docs
  /systems
  /world
  /production
/data
  /phenos
  /moves
  /items
  /quests
  /encounters
  /expressions
/assets
  /sprites
  /tilesets
  /ui
  /audio
/src
  /engine
  /game
  /ui
  /data
/public/games/phenoquest
/scripts
```

Run the full verification suite with:

```bash
npm run check
```

Build the self-contained website package with:

```bash
npm run build
```

## IP / Parody Safety Direction

This game must remain an original cannabis genetics adventure. Do not use Pokémon names, slogans, logos, characters, fonts, capture-ball designs, battle UI layouts, or other protected identity elements. The main product identity and mechanics should remain recognizably PhenoQuest and DTF Seeds.

## Open Release Gates

This is a **playable browser vertical slice**, not a finished RPG. Before promotion into the public DTFSeeds Game Hub, it still needs:

- broader world/map content and a cleaner guided first-session flow;
- stronger combat/enemy variety and balance testing;
- a complete lineage-restoration progression loop beyond the MVP pairings;
- final original visual/audio assets;
- mobile/touch and accessibility QA;
- human playtesting and save-migration testing;
- DTFSeeds packaging/integration and live-route verification.

Current status: **playable browser vertical slice in active development**.
