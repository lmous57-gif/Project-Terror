# PROJECT: TERROR — v0.9: Combat & Doors

**Play online:** https://lmous57-gif.github.io/Project-Terror/

Malaysian supernatural retro FPS, playable in browser on desktop or Chrome Android (landscape). Original single-file Canvas raycaster, no packages required.

## New in v0.9
- **Reversible sliding hospital doors:** press **E / GUNA** to open or close. The door visibly slides over ~0.7 seconds. Passage/collision updates when movement completes; it will not close on a player or ghost. The mortuary still needs a key.
- Checkpoint in **Wad Rawatan**: progress is saved upon first entry. After defeat, select **SAMBUNG DARI CHECKPOINT** to restore location, HP, weapons, pickups, objectives, discovered map, enemies and open doors. **CUBA LAGI** starts over.
- Combat feedback: distinct shotgun/pistol recoil, responsive crosshair spread, brighter kill marker, door/reload/checkpoint sound effects.
- **v0.8 mobile controls included**: dynamic joystick appearing wherever you touch the left half; fixed fire button with shell icon on right, compatible with simultaneous input.
- v0.7 fog-of-war and all existing ghost types remain.

## Controls

| Action | Desktop | Android landscape |
| --- | --- | --- |
| Move | WASD | Touch/drag anywhere on left |
| Look | Mouse | Drag right side |
| Shoot | Click / Space | Fixed right bullet button |
| Use door/generator | E | GUNA |
| Reload | R | ISI SEMULA |
| Weapon select | 1 / 2 / 3 | Weapon buttons |
| Torch | L | LAMPU |

## Mission
Explore Lobi, Wad Rawatan and Bilik Mayat. Collect mortuary key + 3 fuses, activate the generator, defeat Pontianak and escape. Enemies: Pocong, Toyol, Pontianak and Langsuir.

## QA and release
Chromium regression tests passed: sliding doors, key gating, ward checkpoint/revive, three fuses, generator, boss, exit, restart, plus simulated multitouch mobile input (dynamic joystick + fixed fire) with no JavaScript errors. **Physical Android testing is still pending.**

Hosted by GitHub Pages using `.github/workflows/pages.yml`. No proprietary DOOM artwork or WAD files included.
