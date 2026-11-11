# PROJECT: TERROR — Story Design v1.3

## Premis
Di Kampung Berhantu, Mak Timah memberitahu pemain Jururawat Salmah telah membawa tiga Jalur Pendinding dari Hospital Lama. Tiga petunjuk membayangkan generator hospital digunakan untuk *menutup*, bukan memanggil, laluan yang berkaitan dengan pemancar lama di Bukit Meranti.

## Objek dan urutan penerokaan
- **Mak Timah** (14.1, 3.45), dalam Rumah Tok Pawang. Tidak diserang dan bukan musuh; E/GUNA untuk dialog.
- **Fail 07 — Wad Malam** (12.5, 2.5), Rumah Tok Pawang. Mendedahkan peranan generator dan Salmah.
- **Kaset — Suara Salmah** (13.5, 7.5), Rumah Kebun. Rakaman memberi amaran mengenai suara kedua dan tiga jalur.
- **Batu Tanda Bukit Meranti** (10.5, 11.5), Kawasan Keramat di sebalik pagar berkunci. Mendedahkan Hantu Raya menjaga laluan ke menara.
- Semua petunjuk optional dan boleh diambil tanpa susunan tertentu mengikut akses lokasi.
- 3/3 petunjuk memberi 12 saat Tangkal dan empat peluru shotgun reserve sekali sahaja. Menang tanpa bukti tetap dibenarkan.

## Teknologi
- Data petunjuk tetap di `CASES`, NPC statik `SURVIVOR`, sprite pixel art procedural, raycast billboard dengan ujian jarak dan line-of-sight.
- `getInteractable` menggabungkan target NPC/case dengan pintu dan tiang pendinding.
- Modal `caseOverlay` menavigasi catatan yang telah dibuka dan berhenti sementara mekanik update ketika dibaca.
- `caseFound`, `npcSpoken` dan `caseRewarded` bersambung ke `snapshotGame`, `restoreState` dan localStorage bawah key Level 02 sama.
- Save v1.2 tanpa medan baharu dipulihkan dengan default kosong supaya progres kunci/jalur/map/kills tidak hilang.
- `J` dan butang mobile `FAIL` untuk akses jurnal.

## Pengembangan kemudian
Menara Pemancar Bukit Meranti boleh menjadi idea Level 03; **belum dibina dalam v1.3**.
