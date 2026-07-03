# UI Style Guide

## Purpose

This guide defines how PhenoQuest interface screens should look and behave.

## UI Direction

The interface should feel like:

- field journal
- seed vault terminal
- grow log notebook
- hand-labeled plant tags
- warm parchment and dark green UI

## Core UI Motifs

Use:

- seed tags
- glass jar labels
- root lines
- terpene droplets
- vault rings
- parchment panels
- amber highlights
- green glow for active systems

## Core Screens

MVP screens:

- Title
- Starter Selection
- Weather Panel
- Map Panel
- Encounter Panel
- Combat Panel
- Recipe Timer Panel
- Inventory Panel
- Vault Garden Panel
- PhenoLog Panel
- Lineage Lab Panel
- Debug Output

## Layout Rules

- mobile-first
- large readable buttons
- avoid cramped text
- every panel should have a clear title
- every action should explain its result
- debug text can exist during MVP but should be hidden or removed for public launch

## Button Rules

Buttons should be:

- rounded
- high contrast
- easy to tap
- clearly labeled

Avoid vague labels like:

```text
OK
Do it
Thing
```

Use clear labels like:

```text
Roll Field Encounter
Start Timer
Claim Result
Reset Save
```

## Color Direction

Primary:

- dark green
- cream
- amber gold

Secondary:

- resin orange
- frost blue
- muted purple

Warning:

- controlled red
- black/gray for Team Lockout systems

## Panel Rule

Every major system should be its own panel helper in `/src/ui`.

Do not put large HTML strings directly in `game.js` when a reusable UI helper can own it.

## Public Launch Cleanup

Before launch:

- hide raw JSON debug panel
- replace placeholder grid with visual map
- replace text-only Pheno entries with cards
- replace generic result panels with styled components
