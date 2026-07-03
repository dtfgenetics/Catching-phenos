# Recipe Timers

## Definition

Recipe Timers are real-time countdowns used for Rooted Clone creation and future batch results.

## Gameplay Purpose

Timers give the browser game return value and pacing without forcing the player to stop playing.

## MVP Rules

- Timers run in the background.
- Timers use real timestamps saved in local storage.
- If the player leaves and returns later, the game checks elapsed time.
- MVP timers should be short so the first demo stays playable.

## MVP Timer Targets

| Result Type | Demo Time |
|---|---:|
| Common result | 30 seconds |
| Uncommon result | 60 seconds |
| Rare result | 120 seconds |

## Future Timer Targets

| Result Type | Full Game Time |
|---|---:|
| Common result | 5 minutes |
| Uncommon result | 15 minutes |
| Rare result | 30 minutes |
| Advanced batch | 1-2 hours |
| Major lineage result | 4-8 hours |

## Data Fields

Suggested fields:

```json
{
  "timerId": "timer_001",
  "recipeId": "mango_puff_recipe",
  "startTimestamp": 1793628000000,
  "durationSeconds": 30,
  "status": "active"
}
```

## Connected Systems

- Vault Garden
- Rooted Clones
- Lineage Lab
- Save System
- PhenoLog
