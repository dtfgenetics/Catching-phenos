# Data Contracts

This file defines the expected shape of core data files. These are not formal JSON Schemas yet, but they are the working contracts that Codex and future contributors should follow.

## Unit Contract

Used by:

- `data/phenos/mvp_units.json`
- `data/phenos/mvp_units_extra.json`

Required fields:

```text
id
displayName
description
classes
rarity
baseStats
abilities
traits
recipe
```

### baseStats

Required stat keys:

```text
vigor
power
terps
roots
speed
stability
```

### recipe

Required recipe keys:

```text
materialsRequired
demoSeconds
preferredWeather
preferredCue
```

## Ability Contract

Used by:

- `data/moves/mvp_abilities.json`

Required fields:

```text
id
displayName
class
category
power
cost
accuracy
effect
description
```

Allowed early categories:

```text
strike
special
guard
status
```

## Encounter Table Contract

Used by:

- `data/encounters/terp_fields.json`

Required table fields:

```text
id
region
encounters
```

Required encounter fields:

```text
speciesId
weight
minLevel
maxLevel
weather
cues
requiredFlags
```

## Weather Contract

Used by:

- `data/weather/weather_states.json`

Required fields:

```text
id
displayName
description
weight
cueBias
modifiers
```

## Expression Contract

Used by:

- `data/expressions/expression_matrix_mvp.json`

Required fields:

```text
id
weather
environmentCue
displayName
category
statModifiers
stabilizationModifier
rewardTag
```

## Map Contract

Used by:

- `data/maps/*.json`

Required fields:

```text
id
displayName
width
height
startPosition
blocked
transitions
cueZones
npcs
```

## Pairing Rule Contract

Used by:

- `data/breeding/pairing_rules_mvp.json`

Required fields:

```text
id
parentA
parentB
resultPool
requiredRank
requiredRegion
chanceWeights
markerBias
```

## Breeding Result Unit Contract

Used by:

- `data/breeding/result_units_mvp.json`

Required fields:

```text
id
displayName
description
classes
rarity
sourceRule
baseStats
traits
markers
```

## Save State Contract

The default save must always include:

```text
version
player
team
vaultGarden
inventory
timers
collection
quests
world
```

## Validation Rule

When adding a new data file, update at least one validation/checking tool:

- `scripts/smoke-check.mjs`
- `scripts/compile-check.mjs`
- a future JSON schema validator

## No Loose Data Rule

Do not add game data that is not referenced by at least one of these:

- engine module
- UI module
- smoke check
- architecture doc
