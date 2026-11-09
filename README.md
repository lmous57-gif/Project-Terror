# PROJECT: TERROR — Hospital Lama (v0.5 · The Haunting)

**[MAIN GAME ONLINE](https://lmous57-gif.github.io/Project-Terror/)**

Retro FPS browser bertemakan hantu Malaysia. Game ini standalone `index.html`, menggunakan HTML5 Canvas 2D raycasting, WebAudio, original procedural pixel sprites dan tidak memerlukan build tools.

## Apa baru v0.5
- **4 hantu:** Pocong, Toyol, Pontianak (mini-boss), **Langsuir**.
- **4-frame animasi sprite** untuk setiap hantu: hop, crawl, hair sway/scream dan floating/casting.
- **Langsuir serang dari jauh:** sumpahan berwarna hijau, dengan amaran sebelum projectile dilepaskan. Projectile dilindungi oleh dinding; boleh dielak.
- **Jumpscare Pontianak ringan** (sekali setiap misi), boleh OFF/ON di menu. Tiada strobe berkelip.
- Ghost death-wisps, warna minimap baru dan AI ranged.
- Semua perbaikan **wall-mounted prop** v0.4 dikekalkan: signage, lampu, generator dan exit melekat pada dinding.

## Cara main

| Aksi | Desktop | Android Chrome (landscape) |
| --- | --- | --- |
| Gerak | W A S D | Joystick kiri |
| Aim | Mouse / arrows | Seret sebelah kanan |
| Serang | Klik / Space | TEMBAK |
| Reload | R | ISI SEMULA |
| Senjata | 1 Parang, 2 Pistol, 3 Shotgun | Butang senjata |
| Lampu | L | LAMPU |
| Pause | ESC | Tukar tab, sambung di menu |

## Misi Hospital Lama
Cari **3 fius**, aktifkan generator, kalahkan Pontianak dan lari ke pintu keluar. Air Garam memberikan +60% damage selama 14 saat. Tangkal melindungi daripada 45% damage selama 18 saat.

## Technical
Semua sprite dihasilkan dalam kod semasa loading: atlas empat frame untuk setiap enemy. Sprite art PNG boleh dieksport daripada generator ini, namun **tidak diperlukan** untuk memainkan game.

Ujian Chromium desktop + mobile simulasi lulus untuk spawn, empat atlas animasi, Langsuir projectile, jumpscare toggle, ketiga-tiga fius, generator, Pontianak dan tamat misi. QA pada telefon fizikal masih perlu.

Game di-deploy dari `main` melalui workflow `.github/workflows/pages.yml`.
