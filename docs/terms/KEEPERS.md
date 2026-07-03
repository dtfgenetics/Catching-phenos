# Keepers

## Definition

A Keeper is a high-value Rooted Clone selected by the player because it has strong traits, strong Stability, useful genotype markers, rare expression history, or strong future pairing value.

## Gameplay Purpose

Keepers give the player a deeper goal than collecting one of each species.

The player is encouraged to compare multiple Rooted Clones and choose the best candidates for future growth, display, and pairing systems.

## Keeper Score Inputs

A Keeper score can consider:

- Stability
- quality tier
- trait rarity
- expression rarity
- genotype marker strength
- battle performance
- lineage compatibility
- Vault Echo potential

## MVP Rules

- The first MVP can support a simple boolean: `isKeeper`.
- A Rooted Clone with high quality can show `Keeper potential detected`.
- Player can mark one or more Rooted Clones as Keeper candidates.

## Data Fields

Suggested fields:

```json
{
  "isKeeper": true,
  "keeperScore": 82,
  "keeperReasons": ["high_stability", "rare_trait", "good_expression"]
}
```

## Connected Systems

- Rooted Clones
- PhenoLog
- Vault Garden
- Genotype
- Lineage Lab
- Future seed batch results
