# MVP Master Sheet

## MVP Title

**PhenoQuest: Seedling Town Demo**

## MVP Purpose

Prove the core game loop before expanding into the full genetics, breeding, and world-restoration game.

The MVP should show that PhenoQuest is not a direct catching game. The player battles wild Phenos for Cuttings, roots clones with timers, identifies traits, and restores the first Vault branch.

## MVP Player Flow

1. Title screen
2. Intro narration
3. Seedling Town
4. Professor Calyx greenhouse
5. Starter choice
6. First tutorial Grow Battle
7. Team Lockout steals a Vault Tag
8. Terp Fields opens
9. Wild Pheno encounter
10. Battle rewards Cuttings
11. PhenoLog updates recipe progress
12. Clone Dome tutorial
13. Root first clone
14. Nova rival challenge
15. Signal Clamp event
16. Team Lockout Grunt Pike battle
17. Aroma Trial puzzle and battle
18. Terp Seal earned
19. Fruit Vault Branch restored
20. Demo ending tease

## MVP Locations

### Seedling Town

- Player house
- Professor Calyx Greenhouse
- Cure Station
- Seed Supply Shop
- Vault Gate
- Training Patch
- Terp Fields exit

### Terp Fields

- Entrance meadow
- Tall aromatic grass
- Aroma Ridge / Airflow cue zone
- Terp Creek / Moisture cue zone
- Signal Clamp clearing
- Aroma Trial greenhouse
- Hidden Vault Flower / Vault Energy cue zone

## MVP Phenos

| ID | Name | Class | Use |
|---|---|---|---|
| mango_puff | Mango Puff | Fruit | starter/wild/rootable |
| kush_cub | Kush Cub | Kush | starter/rootable |
| frostling | Frostling | Frost | starter/rootable |
| gas_goblin | Gas Goblin | Gas | wild/rootable |
| skunkrat | Skunkrat | Skunk | wild/rootable |
| terp_toad | Terp Toad | Fruit/Skunk | wild/rootable |
| lockout_leech | Lockout Leech | Synthetic/Pest | enemy-only MVP |

## MVP Weather

- Clear Bloom
- Sweet Wind
- Lockout Static

## MVP Environmental Cues

- Light Exposure
- Airflow
- Moisture
- Vault Energy

This creates a 4 x 3 MVP matrix with 12 expression conditions.

## MVP Clone Requirements

| Pheno | Cuttings Needed | Demo Timer |
|---|---:|---:|
| Mango Puff | 3 | 30 seconds |
| Kush Cub | 3 | 30 seconds |
| Frostling | 5 | 120 seconds |
| Gas Goblin | 4 | 60 seconds |
| Skunkrat | 3 | 30 seconds |
| Terp Toad | 4 | 60 seconds |

## MVP Core Systems

Must build:

- movement
- collision
- dialogue
- quest flags
- starter selection
- battle system
- Cutting reward system
- Clone Dome timer
- PhenoLog
- inventory
- local save/load
- region restoration
- simple expression tags
- Garden Trial

Should build if possible:

- Keeper potential reveal
- basic Vault Garden screen
- expression log
- clone quality tiers
- mobile touch controls

Do not build in MVP:

- full breeding
- multiplayer
- trading
- online account system
- huge roster
- full 48 expression matrix
- complete world map

## MVP Success Criteria

The MVP is successful when the player can complete this loop:

**Battle wild Mango Puff -> earn Cuttings -> collect 3/3 -> start Clone Dome -> wait timer -> reveal Rooted Mango Puff -> update PhenoLog -> restore Vault progress.**

## Demo Ending

After completing Aroma Trial, the Fruit Branch of the Living Seed Vault lights up.

Suggested ending text:

**One Vault Tag restored. One branch awakened. Many lineages remain.**
