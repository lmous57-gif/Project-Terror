# Enemy animation atlas — v0.5

The four ghost types have four procedural animation frames each, generated once in `index.html`. This is original, low-resolution pixel art suited to the browser raycaster.

| Row | Enemy | Poses |
| --- | --- | --- |
| 0 | Pocong | idle, hop, stretch, recover |
| 1 | Toyol | crouch, spring, claw, alternative claw |
| 2 | Pontianak | idle, hair sway, pursue, scream/dash |
| 3 | Langsuir | float, drift, high float, curse cast |

The companion production ZIP contains `enemy_spritesheet_v05.png`: a transparent 256×320 sheet, each sprite cell 64×80, with four columns and four rows. Runtime source generates this sprite data directly; no PNG fetch is required.

Future art improvements: add hand-drawn multi-angle sprite sets, hit-stun/death poses and level-dependent shading, then replace the procedural atlas generation.
