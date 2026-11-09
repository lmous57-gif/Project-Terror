# PROJECT: TERROR — v1.1 · Two-Level Edition

**[Main online](https://lmous57-gif.github.io/Project-Terror/)** · **[Level 02: Kampung Berhantu](https://lmous57-gif.github.io/Project-Terror/kampung.html)**

v1.1 adds an entirely new playable Malaysian horror level while keeping Hospital Lama and its existing browser saves.

## Level 02 — Kampung Berhantu (Malam Kedua)

- Explore three areas: **Laman Kampung → Estet Getah → Kawasan Keramat** with moonlit sky, wooden village fences, rubber trees, a timber house and wall-mounted signs.
- Locate **3 Jalur Pendinding** and the **Kunci Pagar Keramat**. Return to the **Tiang Pendinding** near the start to activate it.
- Face **Hantu Raya**, a high-HP boss with a separate pixel-art sprite, HP meter and telegraphed area slam. Retreat before the slam lands.
- Existing enemies Pocong, Toyol, Pontianak and Langsuir can also appear.
- Retains discoverable minimap, sliding gates, Android dynamic joystick, fixed minimal fire control, guns, power-ups, checkpoint and browser autosave.
- **Independent saves:** Hospital Lama keeps `project-terror-v1-save`; Kampung uses `project-terror-kampung-v1-save`. Clearing site data may delete either.

**[Level 02 implementation notes](LEVEL_02_DESIGN.md)**

---

## Level 01 — Hospital Lama (v1.0 system)

**[Play online](https://lmous57-gif.github.io/Project-Terror/)**

Browser-first Malaysian supernatural FPS. Original standalone HTML5 Canvas raycaster, procedural sprites and WebAudio, no build dependencies and no proprietary DOOM assets.

## v1.0: Survival Update

- **Smarter ghost pathfinding:** A lightweight breadth-first navigation field helps Pocong, Toyol, Pontianak, and Langsuir follow corridors and pursue around corners after losing line of sight. Closed/locked doors remain impassable.
- **Browser autosave:** Every ~12 seconds, on pickups, opened/closed doors and important objectives. **SAMBUNG PERMAINAN DISIMPAN** in the main menu restores progress after a browser restart on the same site and device. Previous Wad Rawatan death checkpoint is preserved.
- **Combat balancing:** 0.58 seconds of brief post-hit protection prevents simultaneous enemies causing instant damage stacks. Toyol attack timing and Langsuir attack damage adjusted.
- **Android performance:** Fog-of-war exploration scans about every 0.14 seconds; navigation field re-evaluated about every 0.35 seconds (or as player position/doors change).
- Minimalist right-side bullet fire button and dynamic left-screen joystick retained.

## Controls

| Action | Desktop | Chrome Android (landscape) |
| --- | --- | --- |
| Move | WASD | Touch/drag on left half |
| Aim | Mouse or arrows | Drag on right |
| Fire | Click or Space | Fixed bullet button on right |
| Reload | R | ISI SEMULA |
| Doors / generator | E | GUNA |
| Weapon | 1/2/3 | Weapon buttons |
| Flashlight | L | LAMPU |

## Mission

Explore **Lobi Utama → Wad Rawatan → Bilik Mayat**. Discover the map, collect a key and three fuses, activate the generator, defeat Pontianak, and escape. Find the secret supply cache. Other enemies: Pocong, Toyol and Langsuir.

## Saves and privacy

Saves use the browser's **localStorage**, not a cloud account. They remain on the same device and browser, and may be deleted if browser site data is cleared. Starting a new game or finishing the mission clears the active save; private browsing may not retain saves. Saves from older builds aren't automatically migrated.

## QA

Chromium tests: full mission, door key gating, death checkpoint, autosave serialized/restored in a fresh page context, AI routing around obstacles, enemy blocked by locked doors, and Android mobile multitouch. Real Android-device playtesting and performance evaluation are still pending.

GitHub Pages deployment is automated by `.github/workflows/pages.yml`.
