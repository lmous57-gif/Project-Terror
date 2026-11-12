# Changelog

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
