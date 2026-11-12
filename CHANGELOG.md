# Changelog

## v1.9 — Campaign Hub (2026-11-12)
- Pusat Misi responsif baharu di `campaign.html`, dengan statistik tiga level dan kemajuan 40 bonus senjata.
- Baca clear-status, unlock senjata utama dan kehadiran checkpoint daripada localStorage tanpa mengubah save.
- Menu dan skrin tamat Hospital/Kampung/Bukit kini mempunyai pautan ke hub.
- Pengendalian simpanan rosak / versi lama yang selamat; tambah ujian CI hub dan integrasi navigation.
- Kekalkan peta, combat, key save, kesukaran serta semua regression v1.8.

---

## v1.8 — Level 03 Bukit Meranti (2026-11-12)
- Third playable level with new hilltop transmitter map, rocky cliff, jungle and concrete facility textures.
- Story continues from Fail 07: Juruteknik Din, 3 optional Fail 08 evidence files, 3 signal modules and a keyed tower approach.
- SMG is a collectible unlock in the technical building and persists through the shared 40-weapon arsenal.
- Penanggal: new pixel sprite, ranged telegraphed curse and close diving attack, enrages below half health.
- One Mystery Box with deliberate E/GUNA and near-box freeze regression; distinct Level03 save namespace.
- Level navigation linked from Hospital and Kampung menus and Kampung victory overlay.
- Automated full mission runtime/SMG/boss/reload/box tests gate GitHub Pages publication.

---

## v1.7 — Pre-Level-03 Polish (2026-11-12)
- Mystery Box needs explicit E / GUNA, with a timed prize roulette and consistent selected reward.
- Fixed stale mobile GUNA handler so the new interaction works on touch devices.
- One-line horizontally scrollable mobile weapon slots replace overlapping rows.
- Added reload progress bar and class-specific sound synthesis for bonus weapons.
- Repositioned Kampung Mystery Box away from optional cassette and migrated older unopened box saves.
- Reset/resume clears stale roulette state to prevent duplicate or orphaned rewards.
- Strengthened runtime regression testing for two-level box interactions and progression.

---

## v1.6 — Weapon Art Revamp (November 2026)
- Replaced 40 generic Mystery Box weapon labels with a coherent roster, retaining original IDs and saved unlocks.
- Created `weapon-art.js`: unique pixel silhouettes for all 40 rewards and four animation poses each.
- Separate visual identities for firearms, relics, improvised tools and novelty weapons, including a lantern, keris, grimoire and revolver.
- Standalone sprite review gallery at `weapon-gallery.html`; regular mystery archive remains spoiler-free.
- Added 160-frame renderer integrity testing and kept existing combat/progression regression checks.

---

## v1.5 — Weapon Progression & Mystery Box (Nov 12, 2026)
- Level 01 bermula dengan fists, pickup parang dan pistol drop selepas Toyol pertama tumbang.
- Level 02 pickup shotgun; SMG direserve untuk Level 03 yang belum dibangunkan.
- 40 bonus weapons yang boleh digunakan, 6 combat archetypes, 4 rarities dan 14 kesan serangan.
- Satu Mystery Box setiap level, roll tidak duplicate selagi masih ada senjata yang belum dikumpulkan.
- Inventory/bonus slot untuk keyboard dan mobile, arkib koleksi 0/40 dan cross-level persistent unlocks.
- Migrasi save lama dan automated JS + runtime gameplay regression checks.

---


## v1.4 — Combat Overhaul
- SMG slot keempat; unlock melalui pickup di zon kedua, ammo baharu di zon ketiga.
- Bom Garam (Q/✧) dengan radius AoE, line-of-sight, stok, cooldown, animasi ring dan stun.
- Damage affinity berlainan untuk Pocong, Toyol, Pontianak, Langsuir dan Hantu Raya.
- Legacy save migration menerima tambahan pickup/inventori tanpa padam data pemain.
- Minimal mobile combat control dan arahan dikemaskini.
- 34/34 QA Chromium tempatan lulus, serta smoke test live untuk dua level.
- Semua kandungan v1.3 Rahsia Kampung dikekalkan.

## v1.3 — Rahsia Kampung
- Mak Timah: NPC survivor dalam Rumah Tok Pawang dengan dialog berubah selepas tiga bukti dikumpul.
- Tiga objek bukti interaktif asal: Fail 07 (rumah pertama), kaset Salmah (rumah kedua), batu tanda Bukit Meranti (keramat).
- Fail Kes dengan navigasi catatan, kawalan J/FAIL, dan pause combat ketika dibaca.
- Ganjaran sekali untuk mengumpul ketiga-tiga bukti, tanpa mengunci progres misi asal.
- State cerita disimpan ke save Level 02 sedia ada; save v1.2 yang tiada medan cerita masih boleh dipulihkan.
- Regression QA Chromium desktop, mobile simulasi, map reachability, save reload dan main quest lulus.

## v1.2 — Kampung Malam
- Dua rumah kayu boleh dimasuki, kabus estet, ambience cengkerik, Hantu Raya fasa kedua.

## v1.1 — Kampung Berhantu
- Level 02, kunci, tiga jalur pendinding, Tiang Pendinding dan Hantu Raya.

## v1.0 — Survival Update
- Pathfinding hantu, autosave browser dan combat balancing.

## v0.9 / v0.7 / v0.4
- Pintu gelongsor dan checkpoint, fog-of-war, peralatan yang melekat pada dinding.
