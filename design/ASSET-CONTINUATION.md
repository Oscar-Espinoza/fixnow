# Asset continuation checkpoint — 2026-10-13, rear glass v10

The hero remains work in progress. Technical QA is not Oscar's visual approval.

## Current scope and agreements

- Focus on the hero assets; preserve diagnostics, source/brand files and the page design.
- Keep the opening animation. Claude's later direct requests from Oscar permit manual hero drag and now set HERO_TILT=-1.05 and HERO_YAW=+.5. No automatic idle rotation.
- The display, battery/support plate, horizontal motherboard and lower rear glass detach. The camera remains seated in the chassis.
- The middle is an inside-facing frame with an empty recessed battery bay and a separate graphite floor. The floor is not a battery. No extra glass above the display.
- **Rear-glass terminology corrected:** Oscar's “front” means the INNER graphite/coil face toward the open body. His “back” means the OUTSIDE rose face. Version9 wrongly put the rose exterior toward the viewer on both sides; version10 fixes this with distinct inner and outer textures.
- Rear glass is a thin sheet with a rose edge, not another frame. Its outer finish matches the phone's dusty rose/burgundy. Inner film remains graphite.
- User supplied and authorized reference images. Do not invent licensing verification or revive superseded source-free briefs.
- No deployment, commit, purchases, extension installation or external models. Do not touch design/source/, design/brand/, .dashboard/.
- Claude in pane w2:p9K is explicitly authorized for this hero's code and critique; Codex handles assets and colour. Coordinate narrow file ownership. Oscar's instructions reach both panes, so always export fallbacks from CURRENT code after the latest pose changes.

## Active hero bindings

| Asset pair | Role |
| --- | --- |
| phone-photo-atlas.png / phone-photo-shapes.json | Original clean display, index0 |
| phone-hero-components-v3.png / shapes-v3.json | Silver-backed support plate0; horizontal motherboard1 |
| phone-hero-front-v6.png / shapes-v6.json | Inside-facing chassis0, separate graphite floor1, camera backs2 |
| phone-hero-backglass-v10.png / shapes-v10.json | Inner glass0, outer rose glass1, registered to the same thin lower-cover geometry |
| phone-hero-static-v10.png | 840×1120 transparent browser fallback, both hero hosts |

The old v4 shell atlas is no longer loaded by the hero. The rejected single-face v9 and all earlier versions remain on disk for comparison. Diagnostic loaders and original diagnostic geometry/repair poses are untouched by this glass pass.

Back-glass v10 is1426×1103 RGBA,1,890,684bytes, SHA256 e308c8574945dea9d9ee0e91f23fb256cfb0c52933e32e379419102ceeeb84f9. Two equal grid columns, one row. Inner rect[102,47,591,991]; outer rect[731,46,593,992]. One component/no holes per face. Both photographs map to the existing lower-cover footprint2.95×4.58 at y=-.85; minor source-aspect normalization preserves the cover's body registration. Inner uses photoPart; outer uses reverseFace with mirrored UVs. Only the outer face has mild colour calibration0xe7c9d4.

Glass depth=.008, bevelThickness=.0015, bevelSize=.003; both photo faces are lifted.003 beyond the nominal surface. Other hero rose-metal parts retain colour0x764958, metalness.65, roughness.34, bevelThickness.024/bevelSize.032. Diagnostics retain their original defaults.

Front-v6 indices: frame0[106,28,459,922], floor1[615,322,380,528], cameraBack2[1060,346,478,309]. Gutters0,590,1030,1604. Frame3×6.48; floor2.307×3.198 at(-.007,-.770,frameZ+.05); camera width2.60 at(0,2.0), rigidly mounted. Hero depths: display-1.62, tray-.65, board.25, chassis.95, rearGlass1.55. Board position(-1.0,.2). Hero root scale1, y-.06, roll-.5, tilt-1.05, yawπ+.16+.5, plus bounded drag.

## Latest validation and remaining work

- Fresh headless Chromium/Playwright normal animation at1440px and390px reached assemblyProgress1.000, seven visible scene layers, no page/console errors or horizontal overflow.
- Screenshots were inspected: /tmp/fixnow-hero-qa/backglass-v10-1440.png and backglass-v10-390.png. The graphite inner glass faces the body; the rose exterior is on its opposite surface.
- Reduced-motion final view exported to static-v10 AFTER the final tilt-1.05 change. No-WebGL checks at both widths loaded the visible840×1120 fallback without page errors or overflow.
- Narrow source comparison confirmed diagnostic loaders, diagnostic geometry and repair poses unchanged; the glass edits preserve Claude's hero pose. No new broad diagnostic interaction suite was run. Earlier broad checks remain recorded in REPORT.md.
- Board visibility at the default angle is still limited by plate/body overlap. Camera backs remain small/dark, especially mobile. Do not represent these as solved or prepare a new board atlas without a new task.
- Real touch/GPU, Safari/Firefox and induced context loss remain untested.

## References and process

Latest references live unchanged under design/reference/phone/2026-10-13-hero/:
- back-glass-two-faces-reference.png: outside left, inside right.
- satin-rose-side-reference.png: phone colour/finish.
- rejected-outer-glass-front.png: Oscar's correction of our v9 face orientation.
- open-phone-no-screen-no-battery.jpeg, motherboard-region.png, empty-battery-compartment.png, silver-plate-separated.png: anatomy and assembly order.

Use the built-in imagegen tool for raster preparation, inspect inputs/outputs, copy generated PNGs unchanged to versioned project assets, then read alpha with design/tools/trace_phone_atlas.py. Python raster edits are prohibited. The exact final prompt and generated source path are in REPORT.md. Generated v10 source: /home/oscar/.codex/generated_images/01a13634-b3b8-7440-a72b-a8823baa6302/exec-a3d23b6b-ce4a-4939-859b-ff9a601213cb.png.

## Browser setup

Preview: http://127.0.0.1:8765/ (Python server restarted after the previous server stopped). Static site; no build step.
Playwright: require('/home/oscar/.npm/_npx/31e32ef8478fbf80/node_modules/playwright-core').
Chromium: /home/oscar/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome, --no-sandbox --enable-unsafe-swiftshader.
Capture the CURRENT final pose; update both hero fallback src values and inspect actual1440/390 screenshots. Keep temporary QA outside the repository.
