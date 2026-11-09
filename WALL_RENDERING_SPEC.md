# Wall-rendering implementation (v0.4)

## Original issue
Signage and lamps were ordinary billboards in the same sprite list as enemies, so they rotated to face the camera and appeared to hover off the walls.

## Fix
In each DDA wall-column ray hit, the renderer knows the hit cell (mx,my), wall face (N,S,E,W), fractional location along the wall, projected wall top/height, and ray depth. Wall attachments are indexed by a key `mx,my,face`. Each has wall-local UV rectangle (`u,w,v,h`), anchored to the face, sampled as a texture strip in the same column as the wall itself. Wall-distance shading is applied after the decal.

For N and E faces, the U coordinate is reversed to keep letters readable. Only the nearest hit wall is rendered, providing natural occlusion by nearer geometry. Decorations must have a solid wall tile, an adjacent open space on the visible side, and legal UV extents.

## Render categories
- Wall attachments: signs, lights, notices, generator, exit.
- Floor decorations: trolley with projected floor baseline and shadow.
- Collectible items: ammo, fuses, health, power-ups, projected on floor.
- Enemies: billboards with intentional animation bobbing.

Wall props are planar 2D decals, not full 3D protruding geometry. A future 3D renderer would be needed for physical depth.

## QA
Chromium tests: front and oblique sign views, inactive/active generator, locked/open exit, desktop and mobile input, 3 fuses, generator, Pontianak, and escape. Real-device Android QA is still recommended.
