# Next Build Tasks

## Current Status

The repository now has the MVP design foundation, starter data, expression data, encounter data, item data, action data, quest data, map placeholders, dialogue data, save helpers, timer helpers, collection helpers, and browser scaffold.

## Next Implementation Pass

### 1. Starter Selection UI

Build a starter selection panel that:

- reads `data/starter_slots.json`
- displays the three starter options
- creates the selected starter unit
- saves the starter choice
- advances the first quest

### 2. Basic Map Screen

Build a placeholder grid renderer that:

- loads current map data
- displays player position
- supports keyboard movement
- checks blocked tiles
- handles map transitions
- updates environment cue when entering cue zones

### 3. Dialogue UI

Build a dialogue panel that:

- loads dialogue records
- shows speaker and text
- supports next/close
- applies dialogue flags
- supports starter-choice dialogue

### 4. Encounter Button / Prototype Trigger

Before random walking encounters, add a simple button for testing:

- roll Terp Fields encounter
- apply current weather and cue
- show selected opponent and level

### 5. Battle Prototype

Build a simple battle screen that:

- creates combatants
- lets player use first ability
- lets opponent use first ability
- tracks Vigor and Stability
- ends battle on defeat
- awards material on victory

### 6. Recipe Timer UI

Build a timer screen that:

- checks collection progress
- starts a timer when requirements are met
- saves start timestamp
- marks timer ready after duration
- claims result unit

### 7. PhenoLog UI

Build a basic PhenoLog screen that:

- shows seen/battled status
- shows material count
- shows recipe unlocked status
- shows rooted result count
- shows known expressions and traits

### 8. Quest Advancement

Connect quest events:

- starter chosen
- tutorial battle complete
- first material earned
- first timer result claimed
- first field event cleared
- trial complete

## Do Not Add Yet

- online accounts
- multiplayer
- trading
- full Lineage Lab
- full world map
- advanced animation
- complex audio
- daily event backend

## MVP Build Definition

The next build is successful when a player can:

1. load the page
2. choose a starter
3. view starter in save state
4. enter Terp Fields placeholder
5. trigger a battle
6. earn material
7. start a timer
8. claim a result
9. see PhenoLog progress
