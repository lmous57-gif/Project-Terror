# Project: Terror — Weapon Progression v1.5

## Unlock milestones
- **Level 01 · Hospital Lama**: starts with **fists** on a new campaign. Collect a **parang** close to spawn; defeating the first **Toyol** creates a **pistol drop**. Find the level's single **Mystery Box** to unlock one bonus weapon.
- **Level 02 · Kampung Berhantu**: collect the **shotgun** near the starting route. Previously earned core/bonus weapon unlocks carry forward using origin-scoped browser storage; find this level's one Mystery Box.
- **Level 03 (not yet built)**: designated **SMG unlock**. Existing players with SMG in older saves are grandfathered in rather than losing access.
- New game begins with fists equipped. Bonus weapons are never pre-equipped until found. Returning players can still access previously earned unlocks.

## Controls
- Desktop: 0 fists, 1 parang, 2 pistol, 3 shotgun, 4 SMG (when unlocked), **5 cycles owned bonus weapons**.
- Android: dynamic joystick, fixed fire button; **FIST**, **PARANG**, **PISTOL**, **SHOTGUN**, **SMG** and **BONUS** weapon buttons.
- A Mystery Box grants a random owned-exclusive bonus weapon until all 40 have been collected; its pickups have a rarity cue and become usable immediately.

## Rules and implementation
- 40 original bonus weapon definitions: 6 combat families (melee, precision, rapid, scatter, heavy, beam), 4 rarities and 14 actual gameplay effects.
- Rarity weights are applied **per remaining weapon**, so category-wide odds depend on how many of each rarity remain.
- Effects: crit, piercing, area splash, knockback, burn, stun, chain, poison, bleed, ricochet, healing, random chaos, curse, or rapid standard hit.
- Each Mystery Box is available once per level run, and unopened/collected status is part of the normal level save. Unlock collection persists across both pages via `pt-campaign-armory-v1` on the same origin.
- The game currently has **two playable levels**, not a released SMG Level 03. Forty unique names/stat combinations are playable through procedural weapon renderers; **forty bespoke sprite/animation sets are future art work**.
- Static syntax, registry/rarity, runtime level unlocks, Toyol drop, box reward, save and cross-level carry checks run in GitHub Actions before Pages deploys.

## The 40 Mystery Box rewards

| # | Senjata | Rarity | Combat family | Effect |
|---:|---|---|---|---|
| 1 | Revolver Tua | rare | precision | crit |
| 2 | Rifle Estet | rare | precision | line penetration |
| 3 | Karbin Usang | common | rapid | standard rapid |
| 4 | Senapang Berkembar | epic | scatter | AoE |
| 5 | Pistol Berat | rare | precision | knockback |
| 6 | Senapang Pemburu | rare | precision | crit |
| 7 | Rifle Karat | common | rapid | burn DOT |
| 8 | Meriam Mini | epic | heavy | AoE |
| 9 | Crossbow Malam | rare | precision | stun |
| 10 | Blaster Arka | mythic | beam | chain target |
| 11 | Paip Besi | common | melee | knockback |
| 12 | Penyembur Racun | rare | rapid | poison DOT |
| 13 | Pemotong Getah | common | melee | bleed DOT |
| 14 | Obor Minyak | rare | rapid | burn DOT |
| 15 | Paku Terbang | rare | precision | line penetration |
| 16 | Cangkul Karat | common | melee | stun |
| 17 | Botol Api Biru | epic | heavy | burn DOT |
| 18 | Gasing Besi | rare | rapid | bounce |
| 19 | Wrench Generator | common | melee | chain target |
| 20 | Lampu Suluh UV | epic | beam | stun |
| 21 | Selipar Mak | common | melee | knockback |
| 22 | Senduk Kenduri | common | melee | stun |
| 23 | Durian Launcher | epic | heavy | AoE |
| 24 | Teh Tarik Blaster | rare | rapid | heal on hit |
| 25 | Kipas Meja Turbo | rare | beam | knockback |
| 26 | Ketupat Cannon | rare | scatter | random damage |
| 27 | Penyapu Lidi | common | melee | bleed DOT |
| 28 | Mic Karaoke | epic | beam | stun |
| 29 | Sambal Meletup | rare | heavy | burn DOT |
| 30 | Ayam Getah | mythic | melee | random damage |
| 31 | Keris Malam | rare | melee | extra spectral damage |
| 32 | Tombak Langit | epic | precision | line penetration |
| 33 | Pelita Arwah | rare | beam | burn DOT |
| 34 | Jampi Ribut | epic | beam | chain target |
| 35 | Sumpit Bunian | rare | precision | poison DOT |
| 36 | Cincin Senja | mythic | beam | heal on hit |
| 37 | Pedang Bayang | epic | melee | extra spectral damage |
| 38 | Kilat Keramat | mythic | beam | chain target |
| 39 | Tali Pocong | rare | melee | stun |
| 40 | Seruling Penunggu | mythic | beam | random damage |

## Save compatibility
- Legacy save files are still readable; existing unlocked/selected guns on old saves are grandfathered into the collection.
- Progress unlocks are local to the **same browser and device**, not cloud-synced. Clearing site data may remove them.
- Restarting a level resets its map and Mystery Box for a new run; earned global bonuses remain collected.
