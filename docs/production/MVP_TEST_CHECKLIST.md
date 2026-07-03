# MVP Test Checklist

Use this checklist before calling the Seedling Town Demo playable.

## Data Loading

- The browser page loads without console errors.
- Expression data loads.
- Starter unit data loads.
- Extra unit data loads.
- Encounter data loads.
- Item data loads.
- Ability data loads.
- Quest data loads.
- Missing data shows a readable error.

## New Game Flow

- Start button opens the first game panel.
- Player can begin a new local session.
- Default player state is created.
- Active quest starts at `choose_your_echo`.

## Starter Selection

- Three starter choices appear.
- Choosing a starter updates player state.
- Chosen starter is added to the active team.
- Starter choice is saved locally.

## Encounter Flow

- Terp Fields can select an encounter from the encounter table.
- Weather and cue filters affect possible encounters.
- Story-only encounter does not appear unless its story flag is active.

## Battle Flow

- Battle screen opens with player unit and wild unit.
- Vigor and Stability display correctly.
- Abilities resolve without crashing.
- Battle can end in victory or defeat.
- Victory awards material progress.

## Recipe Timer Flow

- Recipe unlocks after enough material is collected.
- Timer can be started.
- Timer is saved with timestamp and duration.
- Timer continues after reload.
- Ready timer can be claimed.
- Result creates a usable unit record.

## PhenoLog Flow

- Seen status updates.
- Battled status updates.
- Material count updates.
- Recipe status updates.
- Rooted result count updates.
- Known expression status updates.
- Vault progress updates.

## Quest Flow

- Completing a quest advances to the next quest.
- Quest flags are saved.
- Demo ending triggers after Aroma Trial.

## Save / Load

- Local save is created.
- Local save can be loaded.
- Bad save data does not crash the app.
- Reset option clears local save.

## Mobile

- Page scales on phone screen.
- Buttons are large enough to tap.
- Text remains readable.
- No required interaction depends only on keyboard.

## Build Pass

The MVP can be called playable when the player can:

1. start the game
2. choose a starter
3. enter Terp Fields
4. battle one wild unit
5. earn material
6. start a timer recipe
7. claim a Rooted Clone
8. see PhenoLog progress
9. complete the first story event
10. reach the demo ending
