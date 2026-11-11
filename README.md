# PROJECT: TERROR — Rahsia Kampung v1.3

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
