# Project: Terror v1.6 — Weapon Art Revamp

## Objective

Make weapon unlocks meaningful. The former generic bonus-weapon HUD painted one rectangular/elongated shape with a new color for almost every reward; it did not read as a rifle, lantern, keris, book, etc. This build replaces that one-size-fits-all template.

## Design rules

1. **Readability first.** Each Mystery Box reward has a distinct `visual` ID mapped to original low-resolution first-person pixel art.
2. **Name matches silhouette.** A shotgun is recognizable by double barrels; a lantern by handle, cage and glow; a grimoire by open pages and floating sigil; a keris by a wavy blade.
3. **Mechanical identity remains.** Six combat families (melee, precision, rapid, scatter, heavy, beam), four rarity tiers, and 14 hit effects stay compatible with prior v1.5 saves.
4. **Keep surprises.** The normal 40-weapon collection archive hides the names of undiscovered weapons. The standalone visual QA gallery is available for production review only.
5. **No borrowed art.** No Doom sprites, screenshots, scraped icon files or external sprite licenses. All pixel images are newly drawn at runtime in Canvas 2D.

## Artwork specification

- Per-weapon frame: **96 × 128 px**, transparent background.
- Animation poses: **idle, fire/cast, recover, reload**.
- Render on screen at about **152 × 202 px**, nearest-neighbor scaling for pixel crispness.
- Cached lazily per weapon in `weapon-art.js` (4 frames generated when first equipped or previewed). Full 40-weapon atlas: **160 frames**, without shipping external PNG assets.
- Firearms animate via vertical recoil, muzzle flash and magazine/reload illustration.
- Melee use angled slash plus drawn impact streak.
- Improvised tools use own forms (spade, spray tank, industrial nailer, slingshot, megaphone).
- Relics use distinct props and casting effects, not gun recoil.
- Novelty weapons are recognizable objects first, with restrained playful FX.

## Priority visuals

| Weapon | Essential model features | Animation language |
|---|---|---|
| Tangan kosong | Two fists with visible knuckles | alternating short jab |
| Parang | Machete with guard, wooden grip | diagonal slash |
| Pistol 9mm | Small handgun and muzzle | sharp recoil |
| Shotgun Pam | Large two-hand pump gun | heavy recoil |
| SMG | Compact automatic shape | rapid small recoil |
| Revolver .38 | Cylinder and stub barrel | snap-back |
| Shotgun Dua Laras | Twin gun barrels | heavy kick / break-open cue |
| Rifle Bolt-Action | Long barrel with bolt + sight | single heavy shot |
| Keris Pusaka | Wavy blade and ornamental guard | slash + violet trail |
| Pelita Penunggu | Suspended frame and blue flame | glow + pulse |
| Kitab Ribut | Open book with two pages and rune | page flick / spellcast |
| Seruling Bunian | Straight flute with finger holes | sound-wave rings |

Other weapons have separate model cases: grenade tube, crossbow limbs, flame bottle, sickle, tool hammer, UV flashlight, durian orb, kettle, desk fan, rubber chicken, amulet and more.

## Roster structure

The 40 bonus weapon **IDs** are stable (`bonus_01` through `bonus_40`), ensuring owned weapons in local saves remain owned after renaming.

Catalog categories: **9 firearms**, **12 improvised**, **12 relics**, **7 novelty**. Rewards range from common to mythic.

The names are in `arsenal.js`; silhouettes, color and pose drawing are in `weapon-art.js`. Presentation of the collection is in `arsenal.html`; production preview is in `weapon-gallery.html`.

## QA gates

- `tests/validate-game.mjs`: in-game JS and weapon-art module integration for both levels.
- `tests/validate-progression.mjs`: 40 unique names/visual IDs, 14 effects, unlocks and location checks.
- `tests/qa-progress-runtime.mjs`: original mechanics — first Toyol pistol, Mystery Box, shotgun and cross-level saves.
- `tests/validate-weapon-art.mjs`: 40 custom render branches, 160 four-pose sprites, draw/reload and gallery syntax.

## Follow-up art quality upgrades

After reviewing this generated pass on Android:
- refine finger/hand alignment and weapon scale per class,
- add class-specific reload choreography (mag, shells, spell regeneration),
- author separate 5–8 frame swing and shot animations for the most-used 10,
- add hit sparks, motion-blur frames and ghost-specific damage effects,
- prepare exported sprite atlases if we migrate away from procedural runtime artwork.

This is a source-integrated pixel-sprite pass, not a bespoke hand-painted commercial asset set. It deliberately remains lightweight for mobile.
