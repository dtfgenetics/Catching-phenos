# Environment Expression System

The Environment Expression System controls how weather and local field cues influence Pheno behavior, encounter availability, combat modifiers, timer results, and future breeding outcomes.

## Design Goal

The player should feel like the world is alive. A Pheno is not just a fixed creature record. It has expression potential that changes based on where and when it is found.

The system should support this idea:

**Same Pheno + different environment = different expression result.**

## Core Formula

Expression State = Weather State + Environment Cue

Example:

- Clear Bloom + Light Exposure = Bright Growth
- Sweet Wind + Airflow = Aroma Lift
- Lockout Static + Vault Energy = Echo Distortion

## MVP Version

The current MVP uses:

### Weather States

1. Clear Bloom
2. Sweet Wind
3. Lockout Static

### Environment Cues

1. Light Exposure
2. Airflow
3. Moisture
4. Vault Energy

This creates 12 possible MVP combinations.

## Full System Target

The full target is 48 expression combinations.

That can be structured as:

6 Weather States x 8 Environment Cues = 48 combinations

## Full Weather Set

Recommended full weather states:

1. Clear Bloom
2. Sweet Wind
3. Resin Fog
4. Root Rain
5. Frost Spark
6. Lockout Static

## Full Environment Cue Set

Recommended full cue states:

1. Light Exposure
2. Airflow
3. Moisture
4. Vault Energy
5. Deep Soil
6. Resin Trace
7. Shadow Cover
8. Stress Pulse

## Combination Categories

Each expression combination should belong to one category:

- Growth
- Aroma
- Root
- Resin
- Color
- Speed
- Stability
- Echo
- Stress
- Synthetic

## Expression Effects

Each expression state can affect:

- encounter weights
- combat stats
- material reward tags
- recipe timer result quality
- visible PhenoLog expression unlocks
- future breeding marker bias
- rare Keeper chance

## Player-Facing Examples

### Bright Growth

Clear Bloom + Light Exposure

Effect direction:

- slightly higher Stability
- clean timer results
- balanced rewards

### Aroma Lift

Sweet Wind + Airflow

Effect direction:

- higher Terp-style expression
- more Fruit/Skunk encounter flavor
- better aroma reward tags

### Damp Rooting

Root Rain + Moisture

Effect direction:

- better Root expression
- higher defensive results
- useful for stable timer outcomes

### Resin Veil

Resin Fog + Resin Trace

Effect direction:

- better Resin expression
- possible rare visual result
- stronger but slower outcomes

### Echo Distortion

Lockout Static + Vault Energy

Effect direction:

- higher risk
- lower Stability
- synthetic/corrupted pressure
- stronger rare tags if controlled

## How This Connects To Other Systems

### Encounters

Encounter tables should include weather and cue filters.

### Combat

Weather and expression can modify temporary combat stats.

### Timer Results

The weather and cue at timer start should be stored on the timer. When the result is claimed, the system uses that stored state to create the final result.

### PhenoLog

The PhenoLog should record known expressions separately from species completion.

### Breeding

Later breeding should use parent markers plus environment expression to bias result quality.

## Implementation Rule

Do not hardcode expression behavior directly into UI.

Use this structure:

1. Data defines weather.
2. Data defines expressions.
3. Engine resolves expression.
4. Timer stores weather/cue.
5. Result factory applies expression.
6. UI displays the result.

## Current Development Target

The next code target is a Weather Control UI for testing:

- show current weather
- buttons for each MVP weather state
- update local save weather
- refresh encounter and expression behavior

This lets us test the system before adding random weather cycling.
