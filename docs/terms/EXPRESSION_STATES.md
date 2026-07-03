# Expression States

## Definition

Expression States are visible or playable variants created when a Pheno reacts to world conditions.

## Core Rule

The same Pheno species can produce different game outcomes under different conditions.

## Gameplay Purpose

Expression States create replay value by letting players search for better versions, rare variants, and special condition-based outcomes.

## MVP Inputs

The first demo uses two inputs:

1. active weather state
2. local environment cue

## Expression Effects

Expression States can affect:

- visual overlay
- battle stats
- Stability
- reward tags
- recipe result
- Keeper chance
- PhenoLog completion
- future pairing outcomes

## Data Fields

Suggested fields:

```json
{
  "id": "sweet_drift",
  "weather": "sweet_wind",
  "cue": "airflow",
  "category": "aroma",
  "statModifiers": { "terps": 2, "speed": 1 },
  "visualLayer": "mist_overlay",
  "rewardTag": "aroma_tag"
}
```

## Connected Systems

- Environment Matrix
- Wild Encounters
- Battle Rewards
- Recipe Results
- Keeper System
- PhenoLog
