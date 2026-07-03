# Playable Loop Contract

This file defines the minimum working game loop for the current PhenoQuest scaffold.

## MVP Loop Contract

The loop is considered working when the player can complete this sequence without a page crash:

1. Press Start Demo.
2. Choose one starter.
3. See the starter saved to local state.
4. See a map placeholder render.
5. Move the player marker.
6. Roll an encounter.
7. Start combat.
8. Use an action.
9. Defeat the opponent.
10. Earn material.
11. See PhenoLog progress update.
12. Start a timer recipe when enough material exists.
13. Check the timer after it becomes ready.
14. Claim the timer result.
15. See the result saved to Vault Garden.
16. See PhenoLog result count update.
17. Reset the save and begin again.

## Required Data For The Loop

- starter roster
- extra MVP roster
- ability table
- encounter table
- expression matrix
- maps
- save state
- collection state
- timer state

## Required Engine Modules

- starter selection
- movement
- maps
- encounters
- battle
- battle rewards
- collection
- inventory
- timers
- result timers
- result factory
- save

## Required UI Modules

- starter selection UI
- map UI
- movement UI
- encounter UI
- combat UI
- recipe UI
- collection UI

## What Must Not Be Added Until This Is Stable

- multiplayer
- account login
- trading
- full breeding UI
- large world map
- asset-heavy sprite animation
- production economy
- real backend services

## Validation Rule

Every new mechanic should include at least one of the following:

- data file
- engine helper
- UI helper
- smoke check
- architecture note

The goal is to avoid loose ideas that are not connected to the repo.
