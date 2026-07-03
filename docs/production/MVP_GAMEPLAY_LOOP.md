# MVP Gameplay Loop

## Locked MVP Loop

The first playable loop is:

```text
Start Demo
  -> choose starter
  -> move on map
  -> read environment state
  -> roll encounter
  -> battle wild unit
  -> earn field material
  -> update PhenoLog
  -> start timer recipe
  -> wait/check timer
  -> claim result
  -> store result in Vault Garden
  -> update PhenoLog again
```

## Why This Loop Matters

This loop proves the game is not only a battle simulator.

The identity of PhenoQuest is:

- environment influences expression
- battle creates access to plant material
- material feeds the cloning/result system
- timers create progression pressure
- claimed results expand the Vault Garden
- PhenoLog tracks discovery and preservation

## MVP Player Verbs

The MVP player should be able to:

1. Choose
2. Move
3. Observe environment
4. Encounter
5. Battle
6. Earn material
7. Start timer
8. Check timer
9. Claim result
10. Review PhenoLog
11. Reset save for testing

## MVP Non-Goals

Do not add these until the first loop is stable:

- online accounts
- multiplayer
- trading
- full breeding lab
- advanced animations
- full tile art
- audio engine
- daily backend events
- paid inventory

## Environment Role

Weather plus cue should influence:

- which wild units appear
- which expression state is active
- which reward tag is earned
- timer result quality
- known expression progress

## Battle Role

Battle does not directly capture the wild unit.

Battle awards field material.

The material represents a piece of plant/line material that can be used in a timer recipe.

## Timer Role

Timer recipes are the MVP version of the cloning/result system.

A timer should:

- spend required material
- record start timestamp
- record duration
- remember weather/cue at start
- become ready after time passes
- produce a result unit when claimed

## PhenoLog Role

PhenoLog progress should update at these moments:

- wild unit is encountered/seen
- wild unit is battled
- field material is earned
- recipe becomes available
- timer result is claimed
- trait is discovered
- expression is discovered
- keeper-quality result appears

## Vault Garden Role

Vault Garden is where claimed timer results live.

In MVP it can be simple:

- list rooted/result units
- show species name
- show trait
- show expression
- show quality
- show Stability

## First Playable Definition

The MVP is considered first-playable when one player can complete this full path without console errors:

1. Press Start Demo
2. Choose starter
3. Roll encounter
4. Win combat
5. Earn enough material
6. Start timer
7. Check timer until ready
8. Claim result
9. See result in Vault Garden
10. See progress in PhenoLog
