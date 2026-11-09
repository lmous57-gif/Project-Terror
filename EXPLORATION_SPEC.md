# Peta Misteri — Exploration system v0.7

## Rules
- `mapSeen` Uint8Array, 0 unknown / 1 revealed / 2 visited tile, reset for every mission.
- Radius survey = 3.4 map cells, 360-degree proximity survey based on player position, not flashlight direction.
- `canSurveyTile()` marches rays at subcell intervals using `tileAt()`, so closed doors and walls stop revealing further cells.
- Wall tile itself can be revealed but rooms behind it cannot.
- `minimap()` draws only discovered tiles. No structure is shown outside survey area.
- Objective markers are shown persistently only if their cell has been discovered.
- Enemy blips only when distance <= 2.7 and `lineOfSight()` succeeds.
- Progress percentage counts revealed walkable cells (floors and door tiles) over all walkable cells.
- Hidden stash at (2.5,8.5) in Wad Rawatan is deliberately omitted from minimap and can only be seen nearby.
- Visited and revealed state persist within a mission; restart resets it.

## Verified checks
- Start at about 6% mapped; Ward fuse, mortuary and exit unrevealed.
- At a closed door, door becomes visible but tiles behind stay hidden.
- Opening and physically walking through door expands map.
- Secret stash rewards exploration with 25 HP (capped), 12 pistol bullets and 6 shotgun shells.
- Full key + 3 fuses + generator + Pontianak + exit loop works.
- Restart clears fog, secret state and doors.
- Android Chrome layout and controls tested in Chromium mobile emulation.

A future version could add discoverable paper maps, collectible sector blueprints, checkpoint saving and animated doors.
