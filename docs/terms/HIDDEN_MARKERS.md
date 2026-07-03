# Hidden Markers

## Definition

Hidden Markers are simplified game indicators that describe what a Pheno can potentially become.

They are a readable gameplay system for traits, expressions, pairings, and progression.

## Core Rule

**Markers define potential. Environment decides expression.**

## Marker List

| Marker | Game Meaning |
|---|---|
| TERP | aroma-style special strength |
| ROOT | defense and recovery support |
| RESIN | shield and critical-effect links |
| VIGOR | health and growth strength |
| SPEED | turn order and fast progression |
| COLOR | visual variants and rare expression colors |
| STABILITY | control and stress resistance |
| ECHO | Vault or Legacy potential |

## Marker Values

Markers can use simple values:

- low
- normal
- high
- rare
- locked
- unstable

## Reveal Progression

The player should not see all marker data immediately.

Reveal order:

1. visible trait
2. Stability
3. expression history
4. partial markers
5. full markers
6. Echo marker

## Data Fields

Suggested fields:

```json
{
  "TERP": "high",
  "ROOT": "normal",
  "RESIN": "low",
  "VIGOR": "normal",
  "SPEED": "high",
  "COLOR": "rare",
  "STABILITY": "normal",
  "ECHO": "locked"
}
```

## Connected Systems

- Keeper System
- Environmental Expression
- Lineage Lab
- Batch Results
- PhenoLog
