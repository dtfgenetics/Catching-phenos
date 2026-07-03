# PhenoQuest System Overview

This document explains the game system in plain production language so design, code, data, and future Codex work all point in the same direction.

## Core Goal

Build an original browser game where the player explores Verdantia, battles wild Phenos, earns field material, starts timed result recipes, discovers expression variations, tracks progress in the PhenoLog, and later unlocks breeding and advanced genotype systems.

## Current MVP Loop

The current demo loop is:

1. Start Demo
2. Choose starter
3. Load placeholder map
4. Move around the map
5. Roll field encounter
6. Battle encounter
7. Earn field material
8. Update PhenoLog
9. Start timer recipe
10. Check timer
11. Claim result
12. Save result to Vault Garden
13. Update PhenoLog again

## System Layers

### 1. Data Layer

JSON files define units, encounters, moves, items, maps, dialogue, expressions, weather, genotype markers, and future breeding rules.

### 2. Engine Layer

Engine modules perform reusable logic:

- battle math
- movement
- map transitions
- weather and expression lookup
- collection progress
- inventory changes
- timer state
- result generation
- future breeding calculations

### 3. UI Layer

UI modules render one system at a time:

- starter selection
- map grid
- movement controls
- encounter result
- combat panel
- timer recipe panel
- collection/PhenoLog panel

### 4. Browser Page Layer

`public/games/phenoquest/game.js` currently wires systems together into one playable scaffold. Later this should be split into a proper app controller and route-based screens.

## Current MVP Systems

### Starter System

The player chooses one starter. The selected unit is written into local save and becomes the first team unit.

### Movement System

The map is currently placeholder-grid based. Movement supports buttons, keyboard arrows, and WASD. Movement can update map position and environment cue.

### Encounter System

The current encounter system rolls from Terp Fields using:

- weather
- current environment cue
- story flags
- weighted encounter table

### Combat System

The current combat system is intentionally simple:

- one player unit
- one opponent
- action buttons
- Vigor as health
- Stability as control/quality pressure
- simple class advantage
- victory/defeat state

### Material System

Winning combat awards field material for the defeated species. Material is tracked in inventory and collection progress.

### Timer Recipe System

When enough material is earned, the player can start a timer recipe. After the timer is ready, the player claims a result that is saved to the Vault Garden.

### PhenoLog System

Collection progress records:

- seen
- battled
- material count
- recipe unlocked
- rooted/result count
- known traits
- known expressions
- keeper found
- vault progress

## Next System Layer

The next layer should add:

1. weather state controls
2. expression matrix expansion
3. genotype marker data
4. breeding pair rules
5. breeding preview engine
6. Vault Garden panel
7. quest advancement hooks
8. deployment notes

## Important Design Rule

Every system should answer one question:

**How does the player discover, build, improve, or preserve a Pheno?**

If a system does not support that goal, it should wait until later.
