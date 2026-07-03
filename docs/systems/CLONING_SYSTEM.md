# Cloning System

## System Name

**Clone Propagation System**

Player-facing station: **Clone Dome**

## Core Rule

Players do not catch wild Phenos directly. They battle wild Phenos, earn Cuttings, and root clones in the Clone Dome.

## Core Loop

1. Encounter wild Pheno.
2. Battle the Pheno.
3. Earn Cuttings based on battle outcome.
4. Collect enough Cuttings for a clone recipe.
5. Start clone propagation in Clone Dome.
6. Timer runs in real time.
7. Clone roots successfully.
8. Reveal clone quality, expression, trait, and Stability.
9. Add Rooted Clone to team or Vault Garden.

## Cuttings

Cuttings are living plant material collected after Grow Battles.

Possible Cutting tags:

- Clear Cut
- Terp Cut
- Rain Cut
- Stress Cut
- Frost Cut
- Static Cut
- Vault Cut
- Pest-Touched Cut

Cuttings can remember the weather/environment expression they came from.

## Clone Recipe

Each Pheno has a clone recipe.

Recipe fields:

- species id
- Cuttings required
- required item/tool
- timer length
- optional boost items
- preferred weather
- preferred environment cue
- possible trait outcomes
- possible expression outcomes

## MVP Clone Requirements

| Pheno | Cuttings Needed | Demo Timer | Full Timer Target |
|---|---:|---:|---:|
| Mango Puff | 3 | 30 sec | 5 min |
| Kush Cub | 3 | 30 sec | 5 min |
| Frostling | 5 | 120 sec | 30 min |
| Gas Goblin | 4 | 60 sec | 15 min |
| Skunkrat | 3 | 30 sec | 5 min |
| Terp Toad | 4 | 60 sec | 15 min |

## Battle Reward Rules

Cutting rewards should depend on battle quality.

| Battle Result | Reward |
|---|---:|
| Win normally | 1 Cutting |
| Win with high team Stability | +1 possible Cutting |
| Use Observe successfully | chance for Trait Sample |
| Avoid over-damaging | higher clone quality chance |
| Battle during ideal weather | chance for Expression-tagged Cutting |
| Defeat corrupted Pheno | Corrupted Cutting or Vault Shard |

## Clone Quality Tiers

- Weak Clone
- Stable Clone
- Strong Clone
- Keeper Candidate
- Legacy-Touched
- Mutated Clone

## Clone Result Formula

```text
Clone Result =
Species Recipe
+ Cutting Count
+ Cutting Expression Tags
+ Weather During Cloning
+ Vault Garden Environment
+ Optional Boost Item
+ Player Rank
+ Random Trait Roll
```

## Real-Time Timer Rule

Clone timers should store timestamps in save data.

When the player leaves and returns, the game compares current time to clone start time and duration.

## No Total Failure Rule

Normal clones should not fail completely. Poor conditions should create weaker Stability, longer timers, unstable traits, or lower quality instead of deleting player progress.

Corrupted or Synthetic material can fail or require cleansing if used before purification.

## Story Meaning

Player cloning preserves living genetics responsibly through the Vault.

Team Lockout force-clones material, removes variation, and creates sterile Synthetic Phenos.
