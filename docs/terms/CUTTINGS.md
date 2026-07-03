# Cuttings

## Definition

Cuttings are the fictional game-material rewards earned after battling wild Phenos.

They are not a direct capture mechanic. They are recipe pieces used by the player to create a Rooted Clone through the Vault Garden systems.

## Gameplay Purpose

Cuttings connect battles to team building.

The player needs enough Cuttings from a Pheno species before that Pheno can be created as a playable unit.

## MVP Rules

- Wild battles can award 1 or more Cuttings.
- Cuttings are tracked by species ID.
- Cuttings unlock clone recipes.
- Expression-tagged Cuttings can influence later results.

## Data Fields

Suggested fields:

```json
{
  "speciesId": "mango_puff",
  "quantity": 3,
  "tags": ["sweet_wind", "airflow"],
  "sourceRegion": "terp_fields"
}
```

## Connected Systems

- Grow Battle
- PhenoLog
- Vault Garden
- Clone Recipe
- Environmental Expression
