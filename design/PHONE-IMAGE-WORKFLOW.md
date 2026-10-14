# Phone image workflow and continuation notes

Saved 2026-10-13 at Oscar's request; latest checkpoint: [ASSET-CONTINUATION.md](ASSET-CONTINUATION.md).

## Current status

Oscar likes the opening animation. **The v3 hero was rejected:** the middle still looks like a full phone, the rear panel appears tiny, and parts are too far apart. The positive browser review did not establish visual acceptance. The live replacement uses inside-facing front-v6 assets, rose side materials and tighter spacing from Claude. Visual approval is still pending; camera readability and mobile size remain weak. Work is focused section by section; the diagnostic section remains deliberately preserved. Do not rebuild the landing or substitute simple procedural illustrations for photographic detail.

Latest user direction authorizes using the supplied photos as editable visual sources. The older source-free/no-photo restrictions in the phone briefs were superseded by Oscar's later instructions. Preserve the current conceptual note; these are limited-angle textured extrusions, not an accurate scan or verified teardown.

No deployment, commit, purchase, account creation, external model files, or optional extension installation is authorized. Keep sources and brand files intact.

**Current collaboration authorization:** Oscar re-authorized Claude in pane `w2:p9K` to critique the hero and implement code while Codex supplies assets and reviews screenshots. Keep communication within that task. No deploy or commit. This supersedes the earlier instruction to avoid Claude.

## Where to resume

- `landing/assets/phone3d.js`: shared atlas loading, silhouette extrusion/UVs, scene poses, materials, animation and visibility pause.
- `landing/script.js`: six primary diagnostic choices, front/rear camera choice, copy/caption state, lazy mounting and floating WhatsApp placement.
- `landing/index.html` / `landing/styles.css`: separate responsive hero hosts and one diagnostic card; native camera buttons are inside the detail card, outside the decorative `aria-hidden` phone.
- [REPORT.md](REPORT.md): implementation history, checks, exact base-atlas prompt and exact repair-atlas prompt. The latest section supersedes older animation descriptions.
- [Original reference manifest](reference/phone/2026-10-13/manifest.json) and [second-pass manifest](reference/phone/2026-10-13-pass2/manifest.json): user images copied unchanged into permanent, non-served folders. Use these instead of relying on `/tmp/codex-clipboard-*` paths. New references should receive descriptive filenames and a role in a manifest.
- [Alpha metadata extractor](tools/trace_phone_atlas.py): reusable script; reads image alpha and writes geometry JSON without editing PNG pixels. Verified to reproduce the current repair metadata exactly.

## Accepted presentation and animation rules

1. **Hero — latest direction:** preserve the opening with no automatic idle rotation; manual hero drag is now allowed by Oscar's later direct requests to Claude. Current default HERO_TILT=-1.05, HERO_YAW=+.5. The chassis uses the inside-facing v6 frame, separate recessed floor and attached camera backs. Display, silver-backed plate, horizontal board and lower rear glass float separately. Rear-glass FRONT means inner graphite/coil surface toward the body; BACK means rose exterior on the opposite face. Use both v10 photo faces on one thin sheet; v9 exterior-facing version was rejected. Latest fallback is static-v10. No extra front glass. See ASSET-CONTINUATION.md for current pose, material/UV values and remaining defects. Diagnostics retain earlier assets/behavior.
2. **Screen:** Oscar explicitly superseded the earlier closed-only direction. Show cracked glass, swing the screen open so its copper/graphite underside is visible, disconnect it, introduce a clean screen and fit it. Finish on the clean front. **Ver reparación** replays the sequence. Reduced motion shows static damaged/clean views side by side; SVG fallback has a cracked-screen symbol.
3. **Rear glass:** Oscar also superseded its closed-only rule. Start with the refined closed exterior, swing the glass away to show its coil/camera-aperture inner face, and reveal the rear body with battery and camera. Keep the exterior free of a duplicate camera-cover overlay. Replay starts again from the closed rear.
4. **First front opening:** screen first, then a brief hold on the dark battery/support plate shown in the new photos. The front sensor bar is visible at the top. The rear camera remains in the phone, **not attached to the plate**; this supersedes the earlier inferred rigid camera/plate grouping. Board/deeper photographic internals stay hidden until the plate moves away. `housing` supplies a solid shell meanwhile.
5. **Battery:** the two-sided tray texture already includes its attached pouch. Lift and turn the tray to show the reverse face; expose the mounted-board/body photograph behind it. The older separate pouch mesh stays hidden to avoid duplicate/flat surfaces. Edge highlighting affects extrusion side walls; cap surfaces remain neutral, including where texture apertures reveal them.
6. **Charging:** turn the phone horizontal, remove screen and tray, lift/enlarge the full charging flex. Keep its socket and connectors clear against subdued body context.
7. **Camera:** preserve **Trasera / Frontal** buttons, matching title/symptom/caption, keyboard behavior and retained side. Rear camera now opens from the back and lifts the new metal three-lens carrier from the rear body. Front camera opens the screen and lifts the retained sensor/camera bar.
8. **Water damage:** screen → seated tray → tray away → mounted board exposed → upper board assembly lifted/highlighted. The new board occupies the upper phone region instead of an old full-height strip.
9. Preserve reduced motion, SVG/CSS failure fallback, offscreen/tab pause, one diagnostic canvas across breakpoints, limited drag angles, and floating WhatsApp avoidance of primary, camera and replay controls.

Current timing: regular front opening starts at 0.30s over 0.65s; tray starts at 1.35s over 0.65s; deeper part / battery reverse turn starts at 2.05s over 0.70s. Screen replacement holds the broken view until 0.80s, opens over 0.65s, disconnects at 1.90s over 0.50s, introduces the new panel at 2.50s, and fits it from 3.00s over 0.70s. Rear glass opens from 0.65s over 0.85s. Rear camera opens from 0.30s, then lifts from 1.45s over 0.70s; front camera lifts from 1.25s. Preserve the order when adjusting for visual issues.

## Asset bindings — preserve index order

| Atlas | Actual PNG dimensions | Index → part |
| --- | --- | --- |
| `landing/assets/phone-photo-atlas.png` + `phone-photo-shapes.json` | 1915 × 821, about 2 MB | Active: 0 clean display; 1 closed back/exterior glass. Other panels retained for comparison. |
| `landing/assets/phone-repair-atlas.png` + `phone-repair-shapes.json` | 1448 × 1086, about 1.2 MB | Active: 2 charging flex; 4 front camera. 3 bare battery mesh retained but hidden; old tray/rear-camera panels retained. |
| `landing/assets/phone-opening-atlas-v2.png` + `phone-opening-shapes-v2.json` | 1254 × 1254, about 1.46 MB | 0 brokenScreen; 1 screenBack; 2 tray; 3 trayBack |
| `landing/assets/phone-internals-atlas-v2.png` + `phone-internals-shapes-v2.json` | 1448 × 1086, about 1.48 MB | 0 backInside; 1 innerFront (mounted board); 2 board; 3 camera; 4 backBody (camera absent); 5 chassis |
| `landing/assets/phone-hero-front-v6.png` + `phone-hero-front-shapes-v6.json` | 1604 × 981, about 1.01 MB; hero only | 0 inside-facing frame; 1 recessed floor; 2 inside camera backs |
| `landing/assets/phone-hero-backglass-v10.png` + `phone-hero-backglass-shapes-v10.json` | 1426 × 1103, about 1.89 MB; hero only | 0 inward/front graphite face; 1 rose exterior/back face |
| `landing/assets/phone-hero-components-v3.png` + `phone-hero-components-shapes-v3.json` | 1774 × 887, about 1.30 MB; hero only | 0 silver-backed tray; 1 horizontal motherboard; 2 silver camera carrier |
| `landing/assets/phone-hero-static-v10.png` | 840 × 1120, RGBA; hero only | Latest final-pose transparent browser fallback |

Latest hero pose, cover registration and active material values are in ASSET-CONTINUATION.md. The following v3 layout values are historical.

Hero v3 component gutters are **0,630,1260,1774** (three columns, one row), not equal thirds. Shell has two equal columns, one row. Preserve photo aspect ratios for the board, carrier and shorter rear panel; use the full-body ratio only for the chassis/display. Hero board is 2.35 × 1.005 at local Y=.7, centered, detached in depth. Camera is 1.5 × 1.700, mirrored relative to the chassis photo's two-right/one-left aperture triangle, at local (-.463,1.900). Its depth always equals chassis depth minus .185; it never floats away. Rear panel is 2.7 × 3.962 at local Y=-.85. Older hero v1/v2 atlases are retained as unused comparisons. Latest user references are saved in `reference/phone/2026-10-13-hero/manifest.json`.

Repair atlas layout is three columns × two rows, read left-to-right then top-to-bottom. Its primary photo inputs were silver tray, dark battery pouch, rear camera module, charging flex and front camera array. The dark tray reverse was reconstructed; the black front/back plate and dirty teardown remain supporting references.

New opening atlas is two columns × two rows, with its row divider at pixel **695**, not half-height. New internals atlas is three columns × two rows, with its row divider at **534**. Actual transparent gaps were inspected; generated grid rows were unequal despite the prompt. Metadata uses these gaps so no part is sliced. The display underside includes a flex tail: its own geometry uses the front panel's 335px body width for registration rather than scaling the full 419px including tail into the frame. Back-face mirroring keeps the connector toward the hinge. Tray reverse UVs are mirrored to match its front outline.

The base atlas has uneven panel spacing. Keep its existing rectangles when preserving it; do not blindly retrace it as five equal grid cells. The reusable extractor assumes equal cells with transparent gutters.

## Repeatable process for new images

1. Read this file and the latest report; identify exactly which components the new references improve. Preserve untouched assets and scene behavior.
2. Save original references unchanged under `design/reference/phone/`. Inspect them and assign roles: front/back/side, camera module, flex, battery, tray, or attachment-order reference. Distinguish exterior camera covers from internal camera modules.
3. Use the **built-in imagegen** tool for photographic preparation/editing. Inspect local inputs with `view_image` first. `referenced_image_paths` accepts at most **five** paths in the current tool. Do not use a custom API runner or Python image edits. Use the prompts in REPORT.md as starting points, then make component-specific instructions for the new sources.
4. Require real alpha transparency, separate parts with gutters, consistent upright proportions, matched front/reverse silhouettes, realistic photo detail, no external shadows, branding, QR/chip markings or packaging tabs. Request straight orthographic views where possible. Keep silver/graphite separation and realistic lens detail. Do not accept a perspective mismatch simply because generation succeeded.
5. Inspect the generated image before integration: white fringes, ghost shadows, stray fragments, duplicated parts, inconsistent scale, lost flex tails, missing mounting holes, baked perspective, or tray reverse misalignment. Iterate the image edit for those issues. Some current assets still have these imperfections; improving them is the next pass.
6. Copy the chosen generated PNG unchanged from its saved output into a **versioned sibling** asset, e.g. `phone-repair-atlas-v2.png`. Keep the current atlas as a comparison. Record exact prompt, inputs and actual dimensions. Do not assume the requested dimensions match the output.
7. Trace alpha metadata to a matching versioned JSON. For a repair atlas from the project root:

   ```bash
   python3 design/tools/trace_phone_atlas.py \
     --input landing/assets/phone-repair-atlas-v2.png \
     --output landing/assets/phone-repair-shapes-v2.json
   ```

   Python 3 and Pillow are already available; OpenCV was unavailable and is unnecessary. Defaults: alpha threshold 128, component area >120 px², hole area >70 px², simplification tolerance 1.7px. Output contains actual dimensions, absolute rectangles, primary outline/holes and **all significant disconnected components**. Keep flex tails; an earlier largest-contour-only trace dropped them. Tune thresholds for small details. For unequal cells with clear gutters, pass `--row-boundaries` / `--column-boundaries`, including 0 and the final image edge; do not slice parts at an assumed equal midpoint. Otherwise reject/re-edit a layout that cannot separate components. Existing outputs require explicit `--overwrite`.

   Exact new-atlas commands:

   ```bash
   python3 design/tools/trace_phone_atlas.py \
     --input landing/assets/phone-opening-atlas-v2.png \
     --output landing/assets/phone-opening-shapes-v2.json \
     --columns 2 --rows 2 --names brokenScreen,screenBack,tray,trayBack \
     --row-boundaries 0,695,1254
   python3 design/tools/trace_phone_atlas.py \
     --input landing/assets/phone-internals-atlas-v2.png \
     --output landing/assets/phone-internals-shapes-v2.json \
     --names backInside,innerFront,board,camera,backBody,chassis \
     --row-boundaries 0,534,1086
   ```

8. Update atlas/JSON URLs in `loadAssets()` only after the new image is reviewable. Keep part indices stable, or deliberately update every `photoPart()` and tray reverse mapping. Register UVs to each actual rectangle, including inverted image Y. Match geometry aspect/position to the new images instead of stretching them to the old shapes. Keep holes cut through both face and extrusion.
9. Preserve sRGB, photo faces using unlit `MeshBasicMaterial` with `toneMapped:false`, and lit side walls. Do not wash photos with blue; highlight only extrusion side-wall material. Cap material is a separate neutral clone, preventing blue filled patches at reverse-face apertures. Mesh traversal must handle both material arrays and single materials. Keep two-sided registration, tray/pouch attachment, camera-in-body separation and limited viewing angles.
10. Verify rendered behavior and inspect screenshots at 390px and 1440px. Check broken → screen underside → disconnected → new panel → fitted, replay by pointer/keyboard, rear coil/body exposure, seated plate before board visibility, tray reverse without duplicate pouch/cap patches, both cameras/copy, horizontal charging fit, no overflow/errors, retained canvas/side on resize, reduced motion, offscreen pause and WebGL-disabled fallback. Avoid repeating broad checks after they pass unless a new edit warrants it.
11. Update REPORT.md with changes, exact prompts/paths, validation and remaining image defects. Do not claim the images are approved until Oscar says so. Remove temporary QA artifacts, retain source references and the reusable process.

## Browser setup used successfully

The preview was served at `http://127.0.0.1:8765/`; verify it is still running before reuse. Static landing has no build step. If needed, start `python3 -m http.server 8765 --bind 127.0.0.1 --directory landing` from the project root.

No Browser plugin is available. Use existing Playwright tooling; do not install optional plugins. The CLI previously expected a missing Chromium build, so direct Node automation used:

```js
const { chromium } = require('/home/oscar/.npm/_npx/31e32ef8478fbf80/node_modules/playwright-core');
const browser = await chromium.launch({
  headless: true,
  executablePath: '/home/oscar/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome',
  args: ['--no-sandbox', '--enable-unsafe-swiftshader']
});
```

Check these cached paths before using them. Keep temporary browser scripts/screenshots outside the repo. Useful stage attributes: `selectedPart`, `cameraSide`, `repairPhase`, `coverProgress`, `plateProgress`, `partProgress`, `screenFitProgress`, `plateSide`, `boardVisible`, `orientation`, `renderCount`. Confirm against the image. Current terminal phases: screen `repaired` (or `comparison` with reduced motion), rear glass `removed-back`, other repairs `highlighted` (battery after `turning-plate`).

Last checks passed at 390px/1440px in software-WebGL Chromium. Real mobile GPU performance, physical touch and Safari/Firefox remain untested. The procedural depth and AI-reconstructed surfaces remain approximations.
