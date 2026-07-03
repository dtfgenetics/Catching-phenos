# Rooted Clones

## Definition

A Rooted Clone is a playable Pheno unit created through a fictional timer-based recipe system.

The player does not directly take wild Phenos. The player earns game material, starts a recipe timer, and receives a Rooted Clone when the timer completes.

## Gameplay Purpose

Rooted Clones are the player's usable team members.

They can have:

- species
- class
- stats
- trait
- expression tag
- stability value
- quality tier
- Keeper potential

## MVP Rules

- Rooted Clones are created in the Vault Garden.
- Each recipe requires species-specific Cuttings.
- The timer uses real timestamps in local save data.
- When complete, the Rooted Clone is revealed and added to the player's collection.

## Quality Tiers

- weak
- stable
- strong
- keeper_candidate
- legacy_touched
- unstable_variant

## Data Fields

Suggested fields:

```json
{
  "uniqueId": "clone_001",
  "speciesId": "mango_puff",
  "level": 1,
  "trait": "sweet_terp",
  "expression": "sweet_drift",
  "stability": 84,
  "quality": "strong",
  "isKeeper": false
}
```

## Connected Systems

- Cuttings
- Clone Recipe
- Vault Garden
- PhenoLog
- Keeper System
- Breeding System
