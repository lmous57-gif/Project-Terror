# Level 02 — Kampung Berhantu: Implementation

- 2.5D Canvas raycasting, original procedural sprites, 21 x 15 tile layout, no remote assets or external dependencies.
- Laman Kampung (top), Estet Getah (middle), Kawasan Keramat (bottom). Each zone is separated by hedge/fence tile rows.
- Normal gates: (7,5), (17,5). Locked keramat gate: (8,10), requiring an in-game key.
- Collect three Jalur Pendinding at (6.5,3.5), (17.5,8.5), (11.5,13.5).
- Kunci Pagar Keramat: (3.5,9.5). Tiang Pendinding: (3.5,1.5). Final exit: (18.5,13.4).
- Activating Tiang Pendinding after collecting three Jalur spawns Hantu Raya at (17.2,12.6).
- Hantu Raya: 34 HP, speed 0.45 tiles/sec. A 1.0s attack tell precedes a 24-damage slam within 1.85 tiles and line-of-sight. ~0.7s recovery with cooldown; can be countered by retreat.
- Walls/locked gates block camera rays, movement, projectiles and pathfinding. Fog-of-war does not show rooms beyond closed gates.
- Browser save key: `project-terror-kampung-v1-save` (does not change Level 01 key `project-terror-v1-save`).
- Hospital Lama preserved with a new Level 02 link in menu and on victory. Level 02 also directly accessible for playtesting.
- QA in headless Chromium: all gates/key/seals, boss spawn and dodge, quest victory, save restore, Level 01 victory link, simulated Android multitouch; physical-device QA pending.

These are stylized outdoor scenes within a classic raycasting engine, not a full 3D open world.

## v1.2 — Interior house layout and atmosphere

- **Rumah Tok Pawang:** interior tiles x=12–14/y=2–3, doors (11,2) and (15,3). Tangkal pickup inside.
- **Rumah Kebun:** interior tiles x=11–14/y=7–8, doors (10,7) and (15,8). Medkit inside.
- The original gate coordinates (7,5), (17,5), (8,10), three Jalur objectives and the escape route are unchanged.
- Dynamic cabins use existing collision/LOS/raycast/pathfinding and fog-discovery systems. First entry rewards +8 HP and +5 pistol reserve ammo once per house, recorded in saves.
- Fog is a pre-rendered 256×120 repeating transparency texture scrolled outdoors at ~4 units/sec, reduced indoors.
- WebAudio crickets are 4 quiet chirps roughly every 4–8 seconds after user interaction, with ON/OFF toggle.
- Hantu Raya enrages at 50% HP; more readable sprite and ground-slam warning without strobe.
- Migration from v1.1 retains saves and clears newly created interiors from previously explored minimap cells. Incompatible player spawn geometry is repaired.
