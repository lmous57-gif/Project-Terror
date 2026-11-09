# Level Design / Interaction Notes — v0.6

**Quest gating and locations**
- Lobi Utama (row y=1..4) contains generator (3.5,1.5) and fuse 1 (6.5,3.5).
- Two normal ward doors at tile (7,5) and (16,5), both opened by USE. They lead to Wad Rawatan, row y=6..9.
- Wad Rawatan contains fuse 2 (17.5,8.5), mortuary key (3.5,9.5) and several ghost encounters.
- Red locked mortuary door at tile (8,10) requires the key. It leads to Bilik Mayat, row y=11..13.
- Bilik Mayat contains fuse 3 (11.5,13.5), Langsuir and the exit (18.5,13.4).
- After all 3 fuses, player must return to generator, interact, defeat the Pontianak spawned in the morgue and escape.

**Implementation invariants**
The static `MAP` stores `D` for ordinary door and `K` for key door. The `openDoors` set tracks which ones were opened; `tileAt(mx,my)` returns `.` for opened doors. All geometry-dependent subsystems must call `tileAt` or `isWall`, never directly use the raw `MAP` for dynamic doors:
- DDA wall rays: closed doors are textured (texture 4 / 5), open doors are transparent empty cells.
- Player and enemy movement: closed doors are solid.
- Sight and ranged projectiles: closed doors block shots.
- Minimap: golden = ordinary closed door, red = locked door, opened door disappears.
- Quest: first fuse available initially, second fuse/key after opening a ward door, third fuse after unlocking mortuary door.

**QA**
Chromium desktop and mobile simulation confirmed reaching each gated wing by opening doors, complete quest, door collision, all four enemy animations and combat preserved. The browser test harness is not shipped as game code. Real device testing remains pending.

**Future**
Door animation/creak, per-room lighting, secret rooms and checkpoints.
