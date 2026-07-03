# PhenoLog System

## System Purpose

The PhenoLog is the player's genetics field guide, clone recipe tracker, expression log, lineage archive, and Vault restoration record.

It should be one of the most important screens in the game.

## Main Tabs

1. Species
2. Cuttings
3. Rooted Clones
4. Traits
5. Genotype
6. Expressions
7. Crosses
8. Lineages
9. Vault Echo

## Entry Completion States

Each Pheno should progress through layered completion:

1. Unknown
2. Seen
3. Battled
4. Cutting Collected
5. Clone Recipe Unlocked
6. Rooted Clone Created
7. Trait Discovered
8. Expression Logged
9. Keeper Found
10. Genotype Revealed
11. Cross Discovered
12. Vault Echo Restored

## MVP Entry Fields

For the first MVP, each PhenoLog entry should track:

- species id
- name
- class
- region
- seen status
- battled status
- Cuttings owned
- Cuttings required
- clone recipe unlocked
- rooted clone count
- known traits
- known expressions
- best clone id
- Keeper found boolean
- Vault Echo progress

## Full Entry Fields

Future entries should track:

- genotype markers
- compatible crosses
- possible offspring
- lineage branch
- expression history
- corrupted/cleansed status
- Growth Shift progress
- educational cannabis note
- printable card unlock status

## Example MVP Entry

```json
{
  "speciesId": "mango_puff",
  "name": "Mango Puff",
  "class": "Fruit",
  "region": "Terp Fields",
  "seen": true,
  "battled": true,
  "cuttingsOwned": 2,
  "cuttingsRequired": 3,
  "cloneRecipeUnlocked": true,
  "rootedCloneCount": 0,
  "knownTraits": ["Sweet Terp"],
  "knownExpressions": ["Sweet Drift"],
  "keeperFound": false,
  "vaultEchoProgress": 35
}
```

## Vault Echo Progress

PhenoLog actions should contribute to Vault restoration.

Suggested progress sources:

| Action | Progress |
|---|---:|
| See wild Pheno | +5% |
| Win battle | +10% |
| Collect first Cutting | +10% |
| Root first clone | +40% |
| Discover expression | +10% |
| Find Keeper | +25% |
| Complete Growth Shift | +25% |

Values can be tuned later.

## UI Goal

The PhenoLog should feel like a grower's field journal connected to a glowing digital seed vault.

Use seed tags, journal panels, Vault glow, expression icons, and genotype markers.
