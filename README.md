# PROJECT: TERROR v1.7 — Pre-Level-03 Polish

**Play:** [Hospital Lama](https://lmous57-gif.github.io/Project-Terror/) · [Kampung Berhantu](https://lmous57-gif.github.io/Project-Terror/kampung.html)

**New:** Mystery Box now opens only with **E / GUNA**, with a timed weapon reveal (no accidental loot). The mobile weapon strip scrolls horizontally, reload has a progress bar, and Mystery Box weapons have category-specific synthesized firing sounds. Older Kampung saves retain their unopened Mystery Box at a usable position.

**Level 03 isn't live yet.** Read the [v1.7 polish notes](./PRE_LEVEL_03_POLISH.md) for fixes, controls, QA and remaining tasks.

---

# PROJECT: TERROR v1.6 — Weapon Art Revamp

**Play:** [Hospital Lama](https://lmous57-gif.github.io/Project-Terror/) · [Kampung Berhantu](https://lmous57-gif.github.io/Project-Terror/kampung.html)

**40 original pixel-weapon models now look different.** Bonus-weapon rewards preserve their saved IDs and mechanics but have more grounded names and recognizably different first-person sprites. Each has idle, attack/cast, recover and reload poses. This includes a true lantern, wavy keris, open spellbook, revolver cylinder and distinctive rifles rather than a recolored generic gun.

**Production preview:** [Weapon Sprite Workshop](https://lmous57-gif.github.io/Project-Terror/weapon-gallery.html) (shows all 40 and allows pose switching). The in-game [Mystery Box archive](https://lmous57-gif.github.io/Project-Terror/arsenal.html) still hides undiscovered rewards.

See [WEAPON_ART_DIRECTION.md](./WEAPON_ART_DIRECTION.md) for full specification. All sprites are authored in JavaScript/Canvas 2D without external assets.

---

# PROJECT: TERROR — Weapon Progression v1.5

**Play:** [Hospital Lama](https://lmous57-gif.github.io/Project-Terror/) · [Kampung Berhantu](https://lmous57-gif.github.io/Project-Terror/kampung.html) · [Arkib 40 Senjata](https://lmous57-gif.github.io/Project-Terror/arsenal.html)

Level 01 kini bermula **tangan kosong**: kutip parang berdekatan spawn, tewaskan Toyol pertama untuk pistol, kemudian cari satu Mystery Box. Level 02 mempunyai pickup **shotgun** dan satu lagi Mystery Box. **SMG ditetapkan untuk Level 03 (belum diterbitkan)**, dengan senjata lama yang pernah diperoleh sebelum update dikekalkan untuk save lama.

Mystery Box memberikan **satu daripada 40 senjata bonus** dengan rarity, statistik dan kesan berbeza (14 jenis efek). Unlock dibawa merentas level melalui localStorage browser yang sama. **0** pilih tangan kosong; **1–4** slot utama bila sudah unlock; **5** kitar senjata bonus. Pada Android, gunakan butang FIST / PARANG / PISTOL / SHOTGUN / SMG / BONUS.

Rujuk [WEAPON_PROGRESSION.md](./WEAPON_PROGRESSION.md) untuk semua 40 item, statistik, rarity dan mekanik. Senjata bonus berfungsi dengan visual procedural sementara, belum mempunyai 40 sprite khas.

---

# PROJECT: TERROR — Combat Overhaul v1.4

**Main terus:**
- [Level 01 — Hospital Lama](https://lmous57-gif.github.io/Project-Terror/)
- [Level 02 — Rahsia Kampung](https://lmous57-gif.github.io/Project-Terror/kampung.html)

## v1.4 — Combat Overhaul

- **Senjata keempat: SMG**, unlock di zon kedua. Tembakan automatik dengan 24 peluru dalam magazine; reload 1.55 saat. Pilih dengan `4` atau butang mobile.
- **Bom Garam**: tekan `Q` atau butang `✧`. Stok awal 2, maksima 5, boleh tambah melalui pickup dan stor rahsia. Bom meletup di hadapan pemain; pintu dan dinding menghalang kerosakan di belakangnya.
- **Ghost affinities**: Pocong lebih lemah terhadap Parang, Toyol terhadap SMG, Pontianak terhadap Shotgun/Garam, Langsuir terhadap Pistol/Garam, Hantu Raya terhadap Garam.
- **Stun**: Bom Garam menghentikan hantu biasa lebih kurang 1.25 saat, Hantu Raya 0.65 saat.
- **Hit feedback**: SMG muzzle flash, efek ring garam, sound effect garam serta counter di HUD.
- **Save compatibility**: item baharu ditambah tanpa mengubah indeks lama; save localStorage sedia ada boleh dipulihkan. Progres Level 01 dan 02 tetap berasingan.
- **Kekal**: Mak Timah, rumah kayu, Fail Kes 3 bukti, ambience kampung, boss Hantu Raya serta semua objektif terdahulu.

## Kawalan combat

| Action | Desktop | Android landscape |
| --- | --- | --- |
| Aim & move | Mouse + WASD | Seret kanan + joystick dinamik kiri |
| Shoot | Click / Space | Butang peluru fixed kanan |
| SMG | `4` (selepas dijumpai) | Butang `4 SMG` |
| Bom Garam | `Q` | Butang `✧` |
| Reload | `R` | ISI SEMULA |
| Gunakan / interaksi | `E` | GUNA |

## QA

- 34/34 ujian tempatan Chromium lulus pada engine baseline dua level, termasuk tembakan, reload, affinity, Bom Garam tak tembus pintu, save lama dan jalan misi hingga keluar.
- Smoke test browser live v1.4: dua level dibuka, SMG sebelum unlock tidak boleh digunakan, Q mengurangkan charge 2→1, Rahsia Kampung/Fail Kes kekal, tiada JS error dilaporkan.
- Ujian Android fizikal sebenar dan pengimbangan tahap kesukaran jangka panjang masih diperlukan.

---

## Catatan release terdahulu

**Main kedua-dua level:**
- [Level 01: Hospital Lama](https://lmous57-gif.github.io/Project-Terror/)
- [Level 02: Rahsia Kampung](https://lmous57-gif.github.io/Project-Terror/kampung.html)

FPS retro horror Malaysia untuk desktop dan Chrome Android landscape. Game menggunakan HTML5 Canvas 2D raycaster, sprite procedural dan WebAudio tanpa dependency atau aset proprietari DOOM.

## v1.3: Misteri Kampung Berhantu

- **Mak Timah** ialah NPC terselamat dalam **Rumah Tok Pawang**. Dekatkan diri, kemudian tekan **E / GUNA** untuk berbual.
- Cari **3 petunjuk pilihan** di Kampung Berhantu:
  1. **Fail 07** di Rumah Tok Pawang.
  2. **Kaset Jururawat Salmah** di Rumah Kebun.
  3. **Batu Tanda Bukit Meranti** di Kawasan Keramat (selepas pintu berkunci).
- Bukti menghubungkan generator Hospital Lama, tiga Jalur Pendinding dan sebuah menara pemancar lama. Mengumpul 3/3 membuka ganjaran sekali sahaja (Tangkal 12s dan 4 peluru shotgun).
- Buka semula catatan menerusi **J** (desktop) atau butang **FAIL** (mobile). Combat berhenti semasa membaca.
- Misi asal **tidak berubah**: cari kunci + 3 jalur, aktifkan tiang pendinding, hapuskan Hantu Raya, keluar. Petunjuk cerita bersifat pilihan.
- Save lama Level 02 dalam Chrome boleh disambung; data cerita yang belum wujud di v1.2 akan bermula kosong. Save Level 01 kekal berasingan.

## Controls

| Aksi | Desktop | Android landscape |
| --- | --- | --- |
| Bergerak | WASD | Joystick dinamik kiri |
| Pandang | Mouse | Seret kanan |
| Tembak | Klik / Space | Butang peluru minimalist kanan |
| Guna / bincang / baca | **E** | **GUNA** |
| Fail kes | **J** | **FAIL** |
| Reload | R | ISI SEMULA |
| Senjata | 1 / 2 / 3 | Butang senjata |
| Lampu | L | LAMPU |

## Testing dan deployment

Ujian Chromium desktop dan simulasi Android lulus untuk NPC, bukti boleh dikutip, fail kes, pause semasa membaca, save/reload, save lama, minimap fog-of-war dan kawalan mobile. Ujian laluan grid juga mengesahkan semua lokasi boleh diakses mengikut keadaan pagar. Ujian telefon fizikal masih diperlukan.

Game diterbitkan menggunakan `.github/workflows/pages.yml` melalui GitHub Pages. Rujuk `STORY_DESIGN.md` untuk peta naratif dan reka bentuk interaksi.
