# Audio Style Guide

## Purpose

This guide defines the music and sound direction for PhenoQuest.

## Audio Direction

PhenoQuest audio should feel like:

- cannabis fantasy adventure
- warm garden exploration
- seed vault mystery
- light lo-fi adventure
- subtle reggae-influenced rhythm without copying recognizable songs
- original synth and organic textures

## Do Not Use

Avoid:

- copied franchise music
- copied monster cries
- familiar capture jingles
- copyrighted songs
- obvious soundalikes

## MVP Audio Targets

### Music

1. Title Theme
2. Seedling Town Loop
3. Terp Fields Loop
4. Combat Loop
5. Team Lockout Theme
6. Vault Garden Loop

### Sound Effects

1. Menu Click
2. Starter Chosen
3. Encounter Start
4. Action Used
5. Hit
6. Victory
7. Material Earned
8. Timer Started
9. Timer Ready
10. Result Claimed
11. Weather Changed
12. Vault Progress Updated

## File Naming

Use lowercase snake case.

Examples:

```text
title_theme.mp3
terp_fields_loop.mp3
combat_loop.mp3
menu_click.wav
timer_ready.wav
result_claimed.wav
```

## Format Rules

Use:

```text
mp3 for music loops
wav for short effects
```

## Loop Rules

Music loops should:

- loop cleanly
- avoid long intros for field areas
- not be too busy under UI sounds
- have moderate volume

## Sound Effect Rules

Sound effects should be:

- short
- readable
- non-harsh
- original
- consistent volume

## Future Audio Manifest

Audio file targets are currently tracked in:

```text
data/system/asset_manifest.json
```

When audio files are added, update that manifest from `needed` to `created` or `approved`.
