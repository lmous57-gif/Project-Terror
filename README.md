# Project: Terror — Hospital Lama (v0.6)

**[Main online](https://lmous57-gif.github.io/Project-Terror/)**

FPS retro horror Malaysia untuk desktop dan Chrome Android. Standalone `index.html`, tiada dependency atau fail luaran.

## Baru dalam v0.6 — Hospital Exploration
- Tiga zon hospital: **Lobi Utama → Wad Rawatan → Bilik Mayat**.
- Tiga pintu interaktif (dua biasa, satu berkunci). Pintu tertutup menghalang gerakan, serangan dan pandangan; bila dibuka ia benar-benar menjadi ruang kosong.
- Cari **Kunci Bilik Mayat** di Wad Rawatan untuk buka akses ke fius terakhir.
- **Satu fius setiap zon**. Ambil 3 fius, pulang ke generator, tekan **E / GUNA**, kalahkan Pontianak dan keluar.
- Minimap tunjuk pintu emas (biasa), pintu merah (berkunci), fius dan kunci.
- Nama zon, arahan BM dan butang **GUNA** untuk mobile.
- Semua musuh v0.5 (Pocong, Toyol, Pontianak, Langsuir), weapon dan flashlight dikekalkan.

## Controls
| Aksi | Desktop | Chrome Android landscape |
| --- | --- | --- |
| Bergerak | WASD | Joystick kiri |
| Pusing / aim | Mouse / arrow keys | Seret sebelah kanan |
| Tembak | Klik / Space | TEMBAK |
| Buka pintu / guna generator | **E** | **GUNA** |
| Reload | R | ISI SEMULA |
| Senjata | 1 Parang / 2 Pistol / 3 Shotgun | Butang 1 / 2 / 3 |
| Lampu | L | LAMPU |
| Pause | ESC | Tukar tab / aplikasi |

## Misi
1. Lobi Utama: ambil fius pertama.
2. Buka pintu Wad Rawatan, dapatkan fius kedua dan Kunci Bilik Mayat.
3. Buka pintu merah Bilik Mayat, ambil fius ketiga.
4. Kembali ke generator di lobi dan gunakan dengan **E / GUNA**.
5. Lawan Pontianak, menuju ke pintu KELUAR.

## Development & QA
Original HTML5 Canvas 2D raycasting, procedural sprites and WebAudio. No proprietary DOOM assets/WADs. `tileAt()` synchronizes dynamic door state for collision, raycast wall rendering, enemy sight, projectile blocking and minimap. See `LEVEL_DESIGN.md`.

Automated headless Chromium checks passed for staged map reachability, real player movement blocked by closed doors and allowed through opened doors, key requirements, three fuses, generator use, Pontianak, escape, reset, and landscape mobile controls. Physical Android testing still needed. GitHub Pages deploys via `.github/workflows/pages.yml`.
