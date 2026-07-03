# Lineage Lab

## Definition

The Lineage Lab is the future game station where players pair compatible Phenos to create batch results and discover new line paths.

## Gameplay Purpose

The Lineage Lab gives long-term progression beyond the first playable team.

It lets players use Keepers, Hidden Markers, Expression history, and world conditions to discover new combinations.

## Unlock Timing

The full Lineage Lab should not be active in the first MVP.

MVP should include:

- locked Lineage Lab menu or door
- preview text
- data fields prepared for future pairings

## Future Rules

A pairing can require:

- two compatible Rooted Clones
- required level
- Keeper status or quality threshold
- Seed Credits
- open batch slot
- unlocked story tier
- compatible line branch

## Batch Result Fields

Suggested fields:

```json
{
  "parentA": "mango_puff",
  "parentB": "terp_toad",
  "possibleResults": ["mango_toadlet"],
  "timerSeconds": 7200,
  "requiresKeeper": false,
  "unlockTier": 2
}
```

## Connected Systems

- Rooted Clones
- Keepers
- Hidden Markers
- Expression States
- PhenoLog
- Vault Restoration
