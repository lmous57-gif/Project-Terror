# Project: Terror — Hospital Lama (v0.7: Peta Misteri)

**[Main online](https://lmous57-gif.github.io/Project-Terror/)**

Retro FPS horror Malaysia untuk Chrome Android (landscape) dan desktop. Source game: satu fail `index.html` tanpa dependency.

## Apa baru v0.7
- **Fog of war:** minimap bermula gelap. Pemain mendedahkan kawasan melalui pergerakan dalam radius lebih kurang 3.4 petak dan line of sight.
- Dinding dan pintu tertutup menyembunyikan laluan di sebaliknya. Apabila masuk kawasan baru, bahagian yang ditemui kekal pada peta sehingga misi berakhir.
- Lantai pernah dilalui berwarna hijau lebih terang.
- Fius, kunci, generator dan pintu keluar hanya kelihatan pada minimap selepas petaknya ditemui.
- Hantu bukan radar global lagi — blip muncul apabila dekat dan boleh dilihat tanpa halangan.
- Kemajuan **PETA xx%** dan **RAHSIA 0/1**.
- Satu **stor bekalan rahsia** di Wad Rawatan (ammo dan health) yang tidak ditanda pada map.

## Objektif
Teroka tiga zon — Lobi Utama, Wad Rawatan, Bilik Mayat. Cari **Kunci Bilik Mayat + 3 fius**, aktifkan generator (tekan GUNA), kalahkan Pontianak dan keluar. Musuh: Pocong, Toyol, Pontianak, Langsuir. Senjata: Parang, pistol, shotgun.

| Aksi | Desktop | Android landscape |
|---|---|---|
| Gerak / pandang | WASD / mouse | Joystick kiri / seret kanan |
| Tembak | Mouse / Space | TEMBAK |
| Buka pintu / guna generator | E | GUNA |
| Reload | R | ISI SEMULA |
| Senjata | 1/2/3 | Butang senjata |
| Lampu | L | LAMPU |

## Development dan QA
HTML5 Canvas 2D raycasting, procedural sprites dan WebAudio asli; tiada DOOM WAD/asset proprietari. GitHub Actions publish automatik melalui `.github/workflows/pages.yml`.

Headless Chromium test lulus untuk fog awal, peta berkembang melalui pergerakan, LOS pintu, loot tersembunyi, key/3 fius/generator/boss/exit, restart, dan kawalan mobile. Perlu cuba pada telefon fizikal untuk pengesahan UX. Rujuk `EXPLORATION_SPEC.md`.
