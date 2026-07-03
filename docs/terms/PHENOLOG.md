# PhenoLog

## Definition

The PhenoLog is the player's in-game archive for species records, material counts, recipe progress, traits, expression states, Keepers, pairing data, and Vault progress.

## Gameplay Purpose

The PhenoLog is not just a list. It is the player's main progress tracker.

## MVP Tabs

- Species
- Materials
- Rooted Clones
- Traits
- Expression States
- Vault Progress

## Future Tabs

- Hidden Markers
- Pairings
- Lineages
- Legacy Records

## MVP Entry States

1. Unknown
2. Seen
3. Battled
4. Material Collected
5. Recipe Unlocked
6. Rooted Clone Created
7. Trait Discovered
8. Expression Logged
9. Keeper Found
10. Vault Entry Restored

## Data Fields

Suggested fields:

```json
{
  "speciesId": "mango_puff",
  "seen": true,
  "battled": true,
  "materialsOwned": 2,
  "materialsRequired": 3,
  "recipeUnlocked": true,
  "rootedCount": 0,
  "knownTraits": ["sweet_terp"],
  "knownExpressions": ["sweet_drift"],
  "keeperFound": false,
  "vaultProgress": 35
}
```

## Connected Systems

- Battles
- Materials
- Recipe Timers
- Rooted Clones
- Keepers
- Expression States
- Lineage Lab
