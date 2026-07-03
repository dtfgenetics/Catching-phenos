# Breeding And Genotype System

This document defines how future pairing, genotype markers, expression history, and timed result batches should work in PhenoQuest.

## Design Goal

Breeding should not feel like a random slot machine. It should feel like a player is learning how traits, environment, stability, and lineage interact.

The player should be able to say:

**I understand why this result happened.**

## Core Rule

Pairing Result = Parent A + Parent B + Hidden Markers + Expression History + Environment + Player Progress

## Current MVP Status

The full breeding system is not active yet. The repo currently supports:

- genotype marker definitions
- pairing rule data
- future result unit records
- breeding preview engine
- breeding preview UI helper
- smoke checks for pairing references

## Parent Requirements

A future pairing should require:

1. two compatible rooted results or qualified team units
2. unlocked region
3. required player rank
4. known PhenoLog progress
5. enough credits or material
6. open timer slot

## Marker System

Each unit can have marker values:

- TERP
- ROOT
- RESIN
- VIGOR
- SPEED
- COLOR
- STABILITY
- ECHO

Markers describe hidden potential. They should not all be fully visible at first.

## Marker Reveal Order

1. visible trait
2. stability rating
3. expression history
4. partial markers
5. full markers
6. Echo marker

## Pairing Rule Structure

A pairing rule should define:

- parentA
- parentB
- resultPool
- requiredRank
- requiredRegion
- chanceWeights
- markerBias

## Chance Weights

Chance weights should start simple:

- stable
- strong
- keeper_candidate

Later expansion can add:

- unstable
- legacy_touched
- rare_color
- echo_result

## Environment Influence

Weather and cue at batch start should influence the result.

Example:

- Sweet Wind may increase TERP outcomes.
- Root Rain may increase ROOT and STABILITY outcomes.
- Resin Fog may increase RESIN outcomes.
- Lockout Static may increase risk and rare outputs.

## Time Requirement

Pairing should use a timer like recipe results, but longer.

Recommended full-game timer ranges:

- simple pairing: 30 minutes
- uncommon pairing: 1 hour
- advanced pairing: 2-4 hours
- rare/legacy pairing: 6-12 hours

For demo/testing, timers should remain short.

## Unlock Progression

Breeding should unlock in stages:

### Stage 1: Preview Only

Player can see that pairings exist but cannot run them.

### Stage 2: Basic Lineage Lab

Player can preview compatible pairings and see locked requirements.

### Stage 3: First Pairing

Player can run one beginner pairing using early Terp Fields species.

### Stage 4: Environment Pairing

Weather and cue begin modifying results.

### Stage 5: Keeper Line Work

Keeper results unlock stronger or rare pairing routes.

### Stage 6: Echo Pairing

Late-game Echo marker routes create Legacy content.

## MVP Pairings

Current planned MVP pairings:

- Mango Puff x Terp Toad -> Mango Toadlet
- Mango Puff x Frostling -> Frosted Mango
- Frostling x Gas Goblin -> Frost Goblin

## Implementation Rule

Do not hardcode pairings inside the UI.

Use this path:

1. Pairing data lives in `/data/breeding/pairing_rules_mvp.json`.
2. Result units live in `/data/breeding/result_units_mvp.json`.
3. Engine previews pairings through `src/engine/breeding.js`.
4. UI renders pairings through `src/ui/breeding-ui.js`.
5. Smoke checks validate references.

## Next Code Target

The next code target is a read-only breeding preview in the demo page.

It should:

- read player team and Vault Garden results
- find possible pairing rules
- show whether the pairing is locked or available
- show result preview names
- show marker bias

It should not yet start breeding timers.
