# Breeding and Lineage System

## System Name

**Lineage Lab**

Player-facing action: **Make a Cross**

## Core Rule

Cloning preserves what the player found. Crossing discovers what the genetics can become.

## Core Motto

**Cloning preserves. Crossing discovers.**

## Progression Ladder

1. Battle for Cuttings.
2. Root clones.
3. Find Keepers.
4. Reveal genotype markers.
5. Pair compatible Phenos.
6. Create seed batches.
7. Grow offspring under environmental conditions.
8. Discover new expressions and hybrid Phenos.
9. Stabilize lineages.
10. Restore Vault branches.

## Genotype Markers

Each Pheno can carry simplified genotype markers:

| Marker | Meaning |
|---|---|
| TERP | aroma, flavor, special move strength |
| ROOT | defense, rooting, stability recovery |
| RESIN | shields, crits, Frost/Gas traits |
| VIGOR | health and growth strength |
| SPEED | turn order and quick growth |
| COLOR | visual variants and rare expressions |
| STABILITY | control, stress resistance, clone quality |
| ECHO | Vault/Legacy potential |

Marker values can be:

- Low
- Normal
- High
- Rare
- Locked
- Corrupted

## Breeding Unlock Stages

### Level 1: Clone Propagation

Unlocked at game start. Player collects Cuttings and roots clones.

### Level 2: Trait Scanning

Unlocked after first Garden Seal. Player can inspect traits, compare clones, and mark Keepers.

### Level 3: Basic Crossing

Unlocked after restoring first Vault Branch. Player can cross same-class Phenos.

### Level 4: Hybrid Crossing

Unlocked after later Garden Seals. Player can cross compatible different classes.

### Level 5: Expression Breeding

Player can use weather and environment cues to influence seed batches.

### Level 6: Stabilized Lineage

Player can lock traits and create named stable lines.

### Level 7: Legacy Crossing

Endgame system using Echo markers to restore ancient lineages.

## Basic Cross Requirements

- 2 compatible Rooted Clones
- at least one Keeper or stable parent
- both parents at required level
- enough Seed Credits
- one open Seed Batch slot
- unlocked Lineage Lab tier
- optional environment/weather requirement

## Seed Batch

A cross produces a Seed Batch instead of one guaranteed result.

Each offspring can roll:

- species result
- class result
- genotype mix
- expressed trait
- Stability
- color expression
- Keeper potential
- Echo chance
- mutation or corruption risk

## Compatibility Rules

| Pair Type | Expected Result |
|---|---|
| Same Class | stable offspring |
| Related Lineage | higher Keeper chance |
| Complementary Class | hybrid offspring |
| Opposing Class | unstable but rare traits |
| Vault-linked Pair | Legacy chance |
| Corrupted Parent | risk offspring |
| Synthetic Parent | blocked until purified |

## Environment Breeding Formula

```text
Seed Batch Result =
Parent A Genotype
+ Parent B Genotype
+ Parent Traits
+ Parent Expression History
+ Environment Cue
+ Weather State
+ Vault Branch Progress
+ Lineage Lab Upgrade
+ Random Variation
```

## Example Crosses

### Mango Puff x Terp Toad

Goal: high-terp Fruit hybrid.

Possible results:

- Mango Puff with Sticky Terps
- Terp Toad with Sweet Terp
- Mango Toadlet
- Aroma Mist Mango Toadlet

### Kush Cub x Root Rhino

Goal: high-stability tank line.

Possible results:

- Kush Cub with Deep Roots
- Root Rhino with Dense Frame
- Kushhorn Cub
- Myco Guard Kushhorn

### Gas Goblin x Frostling

Goal: resin-heavy attacker.

Possible results:

- Gas Goblin with Frost Coat
- Frostling with Diesel Burst
- Frost Goblin
- Resin Spark Goblin

## Breeding Timers

Breeding takes longer than cloning.

### Demo/Testing Timers

| Process | Time |
|---|---:|
| Basic cross | 2 min |
| Hybrid cross | 3-5 min |
| Rare cross | 5-10 min |

### Full Game Timers

| Process | Time |
|---|---:|
| Basic cross | 30 min |
| Hybrid cross | 1-2 hr |
| Stabilized lineage | 4-8 hr |
| Legacy cross | 12-24 hr |

Timers should use real timestamps in save data.

## Lineage Stabilization

To stabilize a new lineage, the player must:

- produce the cross multiple times
- find a Keeper offspring
- restore related Vault Branch
- complete a Lineage Trial
- spend Seed Credits or Vault Shards
- lock selected traits

## MVP Rule

Full breeding is not required for the first MVP. However, all Pheno data must support future genotype markers, compatible crosses, possible offspring, and lineage branch fields.
