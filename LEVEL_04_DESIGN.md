# PROJECT: TERROR v2.0 — Level 04: Loji Air Hitam

## Status
Playable standalone level: `loji.html`, now linked from Campaign Hub and earlier levels. Built from the stable 480×270 HTML Canvas 2D raycaster with distinct industrial art, room geometry, floor hazards and a new enemy state machine. Saves are browser-local; real Android device tuning remains outstanding.

## Story: Fail 09
After the Bukit Meranti transmitter falls silent, a buried cable leads into the closed Loji Air Hitam pumping station. The former operator Salmah once tried to seal something under its reservoir. Pengawal Rahman, the surviving guard, warns the player of oil-black water that moves against the flow. Optional Fail 09 items reveal the containment history, Salmah's role, and the UV weakness of the organism emerging from the intake.

## Play loop and world
- **Laluan Kabel:** trace the industrial service path, find the first floodgate valve and obtain the reservoir key from a side channel.
- **Ruang Penapis:** locate the **Lampu Suluh UV** at **x=12.5, y=7.5**. This permanently unlocks existing Mystery weapon `bonus_20` (not a new duplicate catalog entry). Obtain the second valve and an automatic checkpoint when reaching the zone.
- **Takungan Bawah:** open the keyed gate, reach the third valve, and collect the optional protocol evidence.
- Collect three valves, retrieve the key, operate the console, defeat Orang Minyak, then escape through the dock at the far end of the basin.
- Three optional evidence objects (Fail 09 file / cassette / UV protocol); guard NPC dialogue changes after collecting all three.
- One optional Mystery Box at x=8.5,y=3.5. Only E / GUNA opens it, with the existing timed roulette and no duplicate owned bonus as long as unowned options remain.

## Orang Minyak boss
- **42 HP**, with a new tar-black crouched pixel sprite and four animated poses rather than the Penanggal floating-head silhouette.
- **Chase** approaches around walls and enters **vanish** only within line of sight. A visible/audible warning is shown for ~0.95 s; below 50% health the tell shortens to ~0.56 s.
- **Dash** follows a snapshotted direction for ~0.59 s with one possible collision hit; the victim may sidestep. Below half health movement accelerates.
- **Recover** follows each dash to prevent permanent contact damage loops. Salt bombs interrupt; UV light does bonus damage and briefly stuns rather than locking the boss indefinitely.
- The boss appears **only after** the three valves have been collected and the pump console activated.

## Oil slicks
- Three visible oil patches at (5.5,3.5), (8.5,7.5), and (15.5,11.5).
- Entering a patch reduces walking speed from 2.6 to 1.35 cells/s and deals **4 HP** on entry, then no more than once every 3 seconds while still touching a patch.
- Area effects are not permanent debuffs. New games and save restores reset the hazard cooldown. Oil patches render as low floor decals and share the existing raycaster sprite budget.
- Old levels and global armory data are not modified.

## Technical/save
- `STAGE=4` and dedicated save key `project-terror-loji-v1-save` with the established version-1 snapshot schema.
- Global base/bonus collection uses the same `pt-campaign-armory-v1`; clear state records stage 4.
- No dependencies or external game assets.
- Prior level save keys and the Mystery Box crash regression remain unchanged.
- `tests/qa-level04.mjs` exercises actual level logic in the existing mocked-Canvas runtime: map reachability, UV pickup/fire/save, oil damage/render, near-box E/GUNA, no collision freeze, valve/key/console objective, Orang Minyak AI, kill and victory. CI also validates all four pages and weapon art.

## Known limitations
Physical Android landscape playtest and subjective combat balancing remain necessary. Browser localStorage is not synchronized across devices. This is a lightweight 2.5D raycaster and not a full 3D world.
