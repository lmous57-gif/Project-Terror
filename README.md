# PROJECT: TERROR — Hospital Lama (v0.3)

A browser-first, retro pixel FPS set in a haunted Malaysian hospital. Built with original Canvas 2D raycasting, procedural sprites and WebAudio, without external dependencies.

**Play online:** https://lmous57-gif.github.io/Project-Terror/

## Objective

Collect 3 fius, activate the generator, defeat the Pontianak and reach the exit. Survive Pocong and Toyol on the way.

## Controls

| Action | Desktop | Android / mobile (landscape) |
| --- | --- | --- |
| Move | WASD | Virtual joystick |
| Look | Mouse or arrow keys | Drag right side |
| Fire | Click / Space | TEMBAK |
| Reload | R | ISI SEMULA |
| Weapon | 1 Parang / 2 Pistol / 3 Shotgun | Weapon buttons |
| Flashlight | L | 🔦 LAMPU ON / OFF |
| Pause | Esc | Switching tabs auto-pauses |

## Equipment
- **Parang**: unlimited melee.
- **Pistol**: accurate ranged option.
- **Shotgun**: heavy close-range damage.
- **Air Garam**: +60% damage for 14 seconds.
- **Tangkal Pelindung**: -45% incoming damage for 18 seconds.

## v0.3 — Malam Berkelip

- Flashlight toggle for desktop and Android.
- Flickering corridor lighting, vignette and pixel/CRT atmosphere.
- Nearby ghost sounds and Pontianak scream cue.
- Local hospital dressing: ward / mortuary / exit signs, trolley, fluorescent lights.
- New Tangkal Pelindung temporary shield.
- More objective feedback and revised mobile layout.

## Development & deployment

The game is a single `index.html` without external assets or build tools. GitHub Pages deploys automatically with `.github/workflows/pages.yml`.

Original source and procedural art; no DOOM proprietary content is included. Headless Chromium testing covers game launch, mobile controls, flashlight, power-up, fuses, generator and game completion. Real-device testing is still recommended.
