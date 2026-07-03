# Next Systems Queue

This queue keeps the build organized. Each system should be added in small commits: data first, engine second, UI third, smoke check fourth, page wiring fifth.

## Completed / In Progress

### 1. Core MVP Loop

Status: in progress and mostly wired.

Current path:

```text
starter -> map -> encounter -> combat -> material -> timer -> result -> Vault Garden -> PhenoLog
```

Remaining cleanup:

- improve combat balancing
- show better reward summary
- show timer remaining seconds
- show current quest clearly

### 2. Environment Expression System

Status: data and smoke checks exist.

Next steps:

- add environment control UI
- let player change weather for testing
- show current weather/cue on screen
- make expression affect timer result quality more clearly
- expand toward 48 total expression combinations

### 3. Quest System

Status: quest event helper exists and is partially wired.

Next steps:

- add quest status UI
- add event hooks for Signal Clamp and Aroma Trial
- add quest objective display
- add smoke check that quest IDs referenced by events exist in `mvp_quests.json`

### 4. Vault Garden

Status: UI helper and page container exist; claimed results render.

Next steps:

- add slot count display
- add active timer list
- add rooted result detail view
- add Keeper highlight

### 5. PhenoLog

Status: basic collection progress panel exists.

Next steps:

- separate PhenoLog from debug-style progress
- show known traits
- show known expressions
- show missing discovery layers
- show Vault progress by branch

### 6. Breeding / Genotype Lab

Status: early data and smoke checks exist.

Next steps:

- keep breeding locked behind progression
- design Lineage Lab UI
- require two rooted results before pairing
- use genotype marker bias for offspring preview
- prevent breeding from replacing MVP timer loop too early

### 7. Map / Trial Systems

Status: placeholder map data exists.

Next steps:

- add NPC interaction button
- add object interaction button
- add Signal Clamp object flow
- add Aroma Trial puzzle state
- add map transition labels

### 8. Deployment

Status: not started.

Next steps:

- add static hosting notes
- add path notes for DTF Seeds route
- add GitHub Pages or Hostinger deployment checklist
- add asset path verification

## Current Build Priority

The next three systems should be:

1. Quest status UI
2. Environment/weather testing UI
3. Timer remaining display

These give us clarity while testing the existing loop.

## Rule For New Systems

Before adding a new feature, answer:

1. What data does it need?
2. What engine file owns the logic?
3. What UI helper renders it?
4. What smoke check proves it did not break?
5. Where does `game.js` wire it into the MVP loop?
