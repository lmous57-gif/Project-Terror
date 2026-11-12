# PROJECT: TERROR — Level 03: Bukit Meranti (v1.8)

## Status
Playable standalone browser level at `bukit.html`. Hospital Lama (`index.html`) and Kampung Berhantu (`kampung.html`) continue to use their original maps and save keys.

## Story
Fail Kes 07 from Kampung Berhantu leads to a decommissioned hilltop transmitter. The machine is broadcasting the voice of Jururawat Salmah even though no living operator is transmitting. **Juruteknik Din** has stayed at the radio hut and knows where the emergency SMG is hidden. Three separate frequency cutout modules must be found before the transmitter can be silenced; the interruption awakens **Penanggal**.

## Progression
- **Zone 1: Lereng Bukit** — explore the mountain road, first frequency module, radio hut, technician, and start-console signage.
- **Zone 2: Stesen Pemancar** — enter concrete technical buildings, take the **SMG pickup in Bilik Teknikal** (roughly x=12.5, y=7.5), find the second module and communications tape. A checkpoint activates upon exploring this zone.
- **Zone 3: Kaki Menara** — unlock the tower gate, gather the third module and antenna-warning evidence.
- Collect all **3 frequency modules**, take the tower gate key and return to the transmitter console to deactivate it.
- Defeat **Penanggal**, then reach the evacuation road on the far side of the tower.

## Combat
- SMG can be collected without completing Level 01/02, but other main weapons stay linked to their persistent campaign unlocks.
- SMG grants its permanent `smg` entry in the same cross-level armory registry `pt-campaign-armory-v1`.
- **Penanggal** has distinct first-person/third-person pixel artwork (floating head, hair and trailing organs), **38 HP**, a medium-range telegraphed curse projectile and a close-range dive attack. Below half health the attacks speed up.
- Bom Garam can interrupt Penanggal briefly, while SMG has a favorable matchup.
- One optional Mystery Box appears in the upper area, grants one nonduplicated bonus gun and must be opened by E / GUNA. Its proximity path uses the fixed `mystery_box` interaction hint and cannot dereference nonexistent door metadata.

## Replay, saving, technical
- Save key: `project-terror-bukit-v1-save`, separate from Level 01/02.
- Previous level and bonus weapon unlocks come from the shared armory only, without copying save-game state.
- Victory marks campaign `cleared` stage 3, hides/clears only the Level 03 save, and keeps the globally unlocked SMG.
- Level artwork reuses the lightweight raycasting engine, now with cliff, rainforest and industrial wall textures, a flashing hilltop antenna, relay props and a new Penanggal sprite.
- Landscape touchscreen joystick, fire, GUNA, reload, salt bomb and weapon quickbar remain available.
- The `?debug=1` / `?safe=1` troubleshooting helpers from v1.7 are retained.

## QA
CI runs `tests/validate-game.mjs`, `tests/validate-progression.mjs`, `tests/qa-progress-runtime.mjs`, `tests/qa-level03.mjs`, and `tests/validate-weapon-art.mjs` before publishing to GitHub Pages. The Level 03 suite validates map bounds, reachable objectives, a real SMG pickup and fire, save/restore, one Mystery Box with near-box anti-freeze regression, objective activation, Penanggal spawn/attack/kill and victory.

**Known limitations:** realtime rendering has been checked using a mocked Canvas regression harness; a physical Android playtest and subjective boss balancing remain necessary. The raycaster and weapon art are stylized/low-resolution by design.
