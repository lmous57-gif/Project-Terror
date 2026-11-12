# Project: Terror — v1.7 Pre-Level-03 Polish Sprint

## What's changed
This is a focused gameplay and usability release for **both existing levels** (Hospital Lama and Kampung Berhantu). **No Level 03 has been added yet.**

### Mystery Box
- Mystery Boxes now stay unopened when the player walks near or through them. A **contextual E / GUNA** prompt appears within interaction range.
- Pressing E or the Android GUNA button starts a **1.55-second rotating reveal**; the awarded weapon is guaranteed to match the predetermined roll, even if other events occur during the animation.
- Awarding a weapon automatically updates the persistent 40-weapon collection and the currently equipped gun.
- If the player dies or quits mid-animation, they haven't spent the box yet; a new attempt can open it.
- New game / save restore cancels any obsolete pending spin so a reward from an earlier run cannot leak into another run.
- Kampung Berhantu's box moved away from the cassette / optional case-evidence interaction. Unopened boxes in older saves at the original position are migrated.
- Mobile GUNA was originally bound to an obsolete direct function reference and failed to pick up later behavior changes; it now dispatches the current interaction function.

### Combat feedback
- A visible **reload progress bar** indicates when the weapon will be usable again.
- Mystery Box audio now has different synthesized signatures for *melee, beam/mystical, heavy/scatter, rapid,* and *precision* archetypes instead of playing the same gunshot for every bonus weapon.
- The 40 distinct procedural weapon sprites and four animation poses remain intact.

### Android UI
- The six weapon slots (fists / parang / pistol / shotgun / SMG / BONUS), plus existing story interactions, use a **single horizontal swipeable strip** in supported mobile layouts, preventing a multirow stack from covering gameplay.
- Left dynamic joystick and right fixed minimalist shoot button are preserved.
- When near a box, tap **GUNA** on the right or E on desktop. Aim and movement continue while the roulette plays.

## Regression requirements
The GitHub Actions workflow gates release on:
1. JavaScript syntax and required game controls in both levels.
2. Exactly 40 bonus weapons, 14 perks and 40 original visual profiles.
3. The **real game runtime in a mocked Canvas**, including starting with fists, parang pickup, Toyol pistol drop, one box per level, no accidental walk-over collection, E/GUNA interaction, correct timed roll reward, shotgun pickup in Level 02, save and persistent cross-level unlocks.
4. 160 generated sprite poses, drawing and gallery.

## What remains before Level 03
This build stabilizes existing systems; it is not a redesign of the raycaster. Physical Android playtesting is still needed to check touch target comfort, real-device performance, sound latency and visual readability. Level 03 (SMG unlock) is still planned, not built. Consider adding a character inventory panel and variable difficulty as separate future sprints.
