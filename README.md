# PROJECT: TERROR — Hospital Lama (v0.4)

**Play:** https://lmous57-gif.github.io/Project-Terror/

A Malaysian-supernatural retro FPS for browser, built with a standalone HTML/Canvas raycaster. No dependencies or external assets.

## Mission
Collect three FIUS, activate the wall-mounted generator, defeat the Pontianak and escape through the hospital exit door. Fight Pocong and Toyol.

## Controls
| Action | Desktop | Mobile (landscape) |
|---|---|---|
| Move | WASD | Left joystick |
| Look | Mouse / arrows | Drag right |
| Attack | Mouse / Space | TEMBAK |
| Reload | R | ISI SEMULA |
| Weapons | 1 Parang, 2 Pistol, 3 Shotgun | Weapon buttons |
| Flashlight | L | LAMPU |

Air Garam: +60% damage (14 seconds). Tangkal Pelindung: -45% incoming damage (18 seconds).

## v0.4 — Wall Render Overhaul
- Hospital signs, lamps, notices, generator and exit are now **attached to actual wall faces** and perspective-rendered during each DDA ray hit, instead of floating camera-facing sprites.
- East/north faces use corrected UV orientation to keep text readable.
- Wall attachments inherit occlusion and wall-distance shading.
- Trolley/pickups share the projected floor baseline; trolley has a contact shadow.
- Generator status and exit-door appearance reflect mission progress.
- Landscape mobile flashlight placement refined.

The game is served from `index.html` via `.github/workflows/pages.yml`. See `WALL_RENDERING_SPEC.md` for implementation details.

QA: Headless Chromium checks cover gameplay completion, mobile controls, sign angle views and changing generator/door states. Physical-device playtesting remains necessary. Code and procedural assets are original (no proprietary DOOM files).
