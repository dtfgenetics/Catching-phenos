# Environmental Expression System

## Core Rule

**Genotype is the blueprint. Environment decides the expression.**

Every wild Pheno has genetic potential, but the current weather and local environment cue determine what traits, visuals, behavior, and clone material may express.

## System Names

- Full system: **Environmental Expression System**
- Player-facing log: **Expression Log**
- Data table: **Expression Matrix**

## Full Game Matrix

The full game uses:

```text
8 Environmental Cues x 6 Weather States = 48 Expression Conditions
```

## Environmental Cues

1. Light Exposure
2. Moisture / Humidity
3. Root Zone
4. Temperature
5. Airflow / Wind
6. Nutrient Pressure
7. Pest / Pathogen Pressure
8. Vault Energy

## Weather States

1. Clear Bloom
2. Sweet Wind
3. Heavy Rain
4. Dry Heat
5. Cold Snap
6. Lockout Static

## Full 48-Condition Matrix

| Environmental Cue | Clear Bloom | Sweet Wind | Heavy Rain | Dry Heat | Cold Snap | Lockout Static |
|---|---|---|---|---|---|---|
| Light Exposure | Bright Expression | Terp Glow | Cloud Stretch | Sun-Stress | Frost Light | LED Burn |
| Moisture / Humidity | Balanced Moisture | Aroma Mist | Rain Bloom | Dry Curl | Cold Dew | Static Damp |
| Root Zone | Root Balance | Scented Soil | Myco Surge | Root Stress | Frozen Root | Root Lock |
| Temperature | Stable Temp | Warm Terps | Humid Heat | Heat Stress | Cold Resin | Temp Shock |
| Airflow / Wind | Clean Air | Sweet Drift | Storm Gust | Hot Wind | Chill Draft | Static Gust |
| Nutrient Pressure | Fed Balance | Flavor Feed | Nutrient Wash | Overfed Burn | Slow Feed | Lockout Feed |
| Pest Pressure | Clean Canopy | Scent Lure | Mold Risk | Mite Surge | Dormant Pest | Pest Mutation |
| Vault Energy | Echo Pulse | Terp Echo | Root Echo | Stress Echo | Frost Echo | Corrupt Echo |

## MVP Matrix

The MVP uses a smaller version:

```text
4 Environmental Cues x 3 Weather States = 12 Expression Conditions
```

### MVP Weather

- Clear Bloom
- Sweet Wind
- Lockout Static

### MVP Cues

- Light Exposure
- Airflow
- Moisture
- Vault Energy

### MVP Matrix

| Environmental Cue | Clear Bloom | Sweet Wind | Lockout Static |
|---|---|---|---|
| Light Exposure | Bright Expression | Terp Glow | LED Burn |
| Airflow | Clean Air | Sweet Drift | Static Gust |
| Moisture | Balanced Moisture | Aroma Mist | Static Damp |
| Vault Energy | Echo Pulse | Terp Echo | Corrupt Echo |

## Expression Effects

Expressions can affect:

- wild spawn odds
- wild temperament
- battle stats
- Stability
- Trust
- Cutting tag
- clone quality
- trait odds
- Keeper chance
- Growth Shift paths
- breeding outcomes
- visual overlays
- PhenoLog completion

## Expression Categories

### Stable Expressions

Reliable and easier to clone.

Examples:

- Bright Expression
- Balanced Moisture
- Root Balance
- Stable Temp
- Clean Air
- Fed Balance
- Clean Canopy
- Echo Pulse

### Terp Expressions

Aroma/flavor-heavy expressions.

Examples:

- Terp Glow
- Aroma Mist
- Sweet Drift
- Warm Terps
- Flavor Feed
- Terp Echo

### Moisture / Root Expressions

Growth and resilience expressions.

Examples:

- Rain Bloom
- Myco Surge
- Root Echo
- Nutrient Wash

### Stress Expressions

High-power but unstable expressions.

Examples:

- Sun-Stress
- Dry Curl
- Root Stress
- Heat Stress
- Hot Wind
- Overfed Burn
- Mite Surge
- Stress Echo

### Frost / Resin Expressions

Rare resin-heavy expressions.

Examples:

- Frost Light
- Cold Dew
- Frozen Root
- Cold Resin
- Chill Draft
- Frost Echo

### Lockout / Corrupted Expressions

Artificial or corrupted expressions caused by Team Lockout interference.

Examples:

- LED Burn
- Static Damp
- Root Lock
- Temp Shock
- Static Gust
- Lockout Feed
- Pest Mutation
- Corrupt Echo

## Pheno Reaction Rule

The matrix is global, but each Pheno reacts differently.

Example: Cold Resin may empower Frostling, stress Mango Puff, and stabilize Gas Goblin slightly.

Do not create 48 unique sprite sheets per Pheno. Use visual layers and overlays.

## Visual Layer System

Each Pheno can use:

1. base sprite
2. expression tint
3. particle effect
4. body accent
5. trait icon
6. Keeper glow
7. corruption overlay

## Map Design Rule

Environment cues should be tile/zone based.

Examples:

- sunny field = Light Exposure
- creek/mist patch = Moisture
- root grove = Root Zone
- heat vent = Temperature
- windy ridge = Airflow
- rich garden bed = Nutrient Pressure
- pest hollow = Pest Pressure
- glowing Vault patch = Vault Energy

## Clone and Breeding Connection

Cuttings should remember expression tags. Seed batches should inherit influence from parent expression histories and the active weather/environment during development.

## MVP Implementation Rule

Build the 12-expression MVP matrix first. The data schema must support the full 48-condition expansion later.
