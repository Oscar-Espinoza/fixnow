# FixNow landing implementation

Completed the approved B · Taller concept in `landing/` as a static, responsive page. No deployment or commit was performed.

## Files

- `landing/index.html`
- `landing/styles.css`
- `landing/script.js`
- `landing/assets/logo-horizontal.svg`
- `landing/assets/logo-vertical.svg`
- `landing/assets/logo-horizontal-white.svg`
- `landing/assets/isologo.svg`
- `landing/assets/favicon.svg`

Upload the contents of `landing/` to the static site's document root. No framework, package installation, or build step is needed to serve it.

## Logo method

The horizontal, negative horizontal, and isologo assets were copied unchanged from `design/brand/logo/`. The vertical asset uses the same SVG contour tracing of the original high-resolution artwork in `design/brand/logo_hi-05.png`, checked against the horizontal/vertical examples in `bp5-05.png` and the isologo in `bp8-08.png`. Letterforms are vector paths, not replacement-font text. The original geometry and ECG cutout are retained. The standard versions use brand blue `#0066FF` and iron grey `#BBBFC3`; the negative version uses white and light grey. Header/footer sizing preserves the original aspect ratio and includes surrounding space.

Raster comparisons of the vector silhouettes with the supplied artwork produced 99.04% horizontal, 99.10% vertical, and 99.24% isologo overlap. The small differences are contour simplification and antialiasing. No PNG fallback was necessary.

## Implementation decisions

- One HTML page with unique public anchors: `#top`, `#proceso`, `#sucursales`, `#diagnostico`, `#accesorios`, `#contacto`. Desktop and phone section variants share those anchors; CSS exposes only the appropriate variant. The breakpoint is exactly 900px.
- Preserved each artboard's Spanish copy and structure, including the shorter phone copy, phone diagnostic button grid, swipeable reviews/branches, vertical process, and floating WhatsApp button. Removed artboard concept switchers and the unavailable preview runtime.
- Applied brand tokens on `:root`, Gotham/Montserrat/system font stack, and Google Fonts Montserrat 400/500/800. No licensed Gotham files were supplied, so Montserrat is the provided fallback. No monospace font remains.
- Montserrat is wider than the source's condensed Archivo. Heading sizes, diagnostic labels, branch titles, and accessory captions are reduced where needed to fit their containers; exact source font metrics cannot be matched with the required font override.
- The hero uses the brand blue gradient with a dark overlay and the original blueprint grid. Hero and small labels on dark backgrounds use light text for contrast. Body grey contrast against `#F6F6F6` is 5.36:1 (`#5E6673`) and 7.41:1 (`#4A515C`); white on primary blue is 4.83:1.
- Phone side gutters are 16px. Horizontal scrolling is limited to the artboard's review and branch rails. Added small-phone sizing adjustments and reduced-motion styles.
- Minimal JavaScript translates the source's diagnostic selection and fullscreen menu into native DOM interactions. Diagnostic selection stays synchronized across layouts. Menu supports Escape, focus trapping, focus restoration, navigation dismissal, and closing when switching to desktop.
- Added native buttons/links, focus outlines, a skip link, live diagnostic details, image alt text, and descriptive labels for placeholder maps/product illustrations. Kept the source's CSS phone illustration and placeholders; no new photography or facts were introduced.

## Remaining placeholders

- Every source WhatsApp URL is `https://wa.me/` with no phone number. These were kept exactly as instructed and need a real number before launch.
- Footer `WhatsApp [NÚMERO] · Instagram [@USUARIO]` and Recoleta `Av. Santa Fe [ALTURA]` are unchanged.
- Source map directions, all-map, all-review, and online-store links still use `href="#"`; real destinations were not supplied. Illustrative maps are not real map embeds.
- Source ratings, reviews, and service-time claims are preserved, not independently verified. The approved files contain no `[YOUR PRICE]` or `Lorem ipsum` strings to carry over.

## Verification

Passed static checks for local asset references, unique IDs and working fragment targets, preserved source text, button semantics, image descriptions, CSS syntax, and absence of old palette values, old fonts, preview bindings, or Chat links. JavaScript syntax passed `node --check`. DOM logic checks passed all six diagnostics in both layouts, menu opening/closing, Escape, forward/backward focus trapping, navigation dismissal, and desktop resize dismissal.

No browser was opened or webpage screenshot rendered, following the brief. Responsive visual fidelity and live browser behavior have therefore not been browser-tested. Logo artwork alone was inspected as a local raster comparison. Sources, brand references, and `.dashboard/` were not modified; temporary checks and generation dependencies stayed outside the project.

## Phone + WhatsApp

Implemented `design/BRIEF-phone.md` in `landing/index.html`, `landing/styles.css`, `landing/script.js`, and the new `landing/assets/phone-layers.svg`.

- Replaced the former phone-only WhatsApp pill with one global, fixed, 56px brand-blue circular link, visible on desktop and phone. It keeps `https://wa.me/` and the requested accessible label, respects bottom/right safe areas, and stays below the header/menu stacking levels. Scroll/resize positioning lifts it above intersecting diagnostic buttons; exceptionally short viewports temporarily hide it if there is no free space below the header.
- Added an original five-layer SVG/CSS phone visual above the diagnostic controls in each responsive layout (only one layout is displayed). The 160 × 346 layer geometry uses rounded titanium-grey edges, an edge-to-edge display and island, blue battery, patterned grey board, and rear cover. No Apple photos, renders, marketing assets, or third-party libraries were used.
- Layers separate on first viewport entry via IntersectionObserver: 72px spacing on phones, 100px on desktop. Selecting a diagnostic settles spacing to 60px/90px, highlights the corresponding layers in brand blue, and updates the visible label in both layouts. Screen maps to front glass/display, battery to battery, rear glass/camera to rear cover, charging to board, and water damage to all layers.
- The entire new illustration is decorative (`aria-hidden`); the native diagnostic buttons and existing live text remain the accessible controls. Reduced-motion mode shows separated layers without animation. The existing simple diagnostic diagram is now decorative too.
- The phone is explicitly labeled a conceptual iPhone 18 Pro illustration. Internal shapes, circuitry, lens placement, proportions, and fault-to-layer mappings are illustrative, not an accurate teardown or verified product specifications. No component is presented as an authentic Apple part.

Validation passed JavaScript syntax, SVG XML structure and symbol references, local asset/anchor checks, five-layer order and placement, all six synchronized diagnostic highlights/labels, viewport reveal and settling, floating-button overlap handling, and menu regression checks. Static styles include responsive limits, safe-area offsets, and reduced-motion behavior. No browser or webpage screenshots were used; visual rendering remains unverified in a browser. No deploy or commit was performed.

## 3D phone

Implemented `design/BRIEF-phone3d.md`. New file: `landing/assets/phone3d.js` (~11.5 KB). Updated `landing/script.js` and `landing/styles.css`; the existing HTML, SVG sprite, Spanish copy, section anchors, diagnostic controls and floating WhatsApp behavior remain intact.

The local module is imported when diagnostics are within 200px of the viewport. It imports **Three.js 0.170.0**, pinned to `https://unpkg.com/three@0.170.0/build/three.module.js`. The URL returned HTTP 200 before implementation; npm's release metadata dates this version to 2024-10-31, well over two weeks old. This is the only new dependency. No external models, Apple images, image downloads, additional libraries or model licenses are used.

All geometry and artwork are generated in code: bevelled rounded-rectangle extrusions, metallic titanium frame ring and side buttons, translucent glass coatings, a canvas screen wallpaper/island, rounded blue-tinted battery with separation lines, canvas copper-trace dark-green PCB with raised chips, glass-finished rear cover, raised camera plate with three metallic lens rings/dark lenses/flash, and charging-port geometry. A canvas studio environment filtered with PMREM supplies broad reflections, plus key, rim and hemisphere lights. No ground/shadow plane is used for the cleaner transparent presentation.

The five depth-stacked groups are display, chassis, logic board, lower-body battery, and rear cover; the camera module belongs to the rear group, and the charging port belongs to the chassis. On viewport entry, separation approaches 1.0 × body thickness on phones and 1.2 × on desktop. Selection advances and lights the mapped part with blue emissive material: **screen → display; battery → battery; rear glass → back; charging → port; camera → camera module; water damage → logic board**. The existing label and button state stay synchronized across responsive layouts. Pointer drag controls orientation and suspends automatic sway while held; automatic sway is ±6.9°. Reduced motion shows an assembled phone without automatic rotation/explosion, with selection still working.

Canvas limits are 280px on phones / 420px desktop with a 1:1.1 aspect ratio. Device pixel ratio caps at 2, or 1.5 for devices reporting ≤4 logical cores or ≤4 GB memory. Rendering pauses offscreen and in hidden browser tabs; reduced-motion rendering occurs only on relevant updates. Initial construction performs one render to verify success before hiding the SVG. WebGL failure, dependency-load failure and context loss leave or restore the SVG/CSS fallback. The visual remains decorative; real diagnostic buttons and live text supply accessible controls.

### Browser verification and limits

Headless Chromium checks passed at **390px and 1440px**: 3D canvas rendered, all six diagnostic mappings and labels worked, rendering stopped offscreen, and document scroll width equalled the viewport width. No page exceptions or console errors occurred in normal runs. Screenshots of both sizes plus assembled/front views were inspected; assembled internals were kept behind the rear cover and the front glass coating was reduced to preserve the darker display artwork.

Also passed: SVG fallback with WebGL disabled; working SVG/diagnostic fallback with the Three.js CDN deliberately blocked; reduced-motion assembled state and stable idle render count; selection and pointer drag. The Playwright CLI expected an unavailable Chromium build, so checks used Playwright directly with an already cached Chromium executable and software WebGL (`--enable-unsafe-swiftshader`). Temporary browser check files/screenshots were removed after inspection.

Not checked: real-device GPU performance/battery usage, low-end hardware performance, Safari/WebKit or Firefox, physical touch input, live WebGL context-loss recovery, or pixel-identical device accuracy. This is an original conceptual phone, not an engineering teardown or verified iPhone 18 Pro specification. Browser CDN/network blocking intentionally falls back to SVG. No deployment or commit was performed.

## 3D phone v2 — unified diagnostic card

Implemented `design/BRIEF-phone3d-v2.md` in `landing/index.html`, `landing/styles.css`, `landing/script.js`, and `landing/assets/phone3d.js`.

- Removed the separate exploded-phone blocks, duplicate diagnostic heading/control list/detail markup, and both static phone drawings. Diagnostics now use **one heading, six buttons, one detail card, and one phone DOM/canvas** at every breakpoint. At ≥900px the list sits left of the phone/detail panel; below 900px the controls and card stack. The existing `#diagnostico`, `#desktop-diagnostic-detail`, and `#mobile-diagnostic-detail` IDs remain available; the mobile detail ID is a compatibility anchor inside the single detail container.
- Moved the procedural 3D phone into the card where the static drawing was. The SVG phone is its fallback in that same location. The caption and “Ilustración conceptual · iPhone 18 Pro” note remain. Selection updates the single card and graphic; changing viewport size preserves selection and the same canvas instance while choosing the appropriate existing responsive copy/time data.
- Refined titanium with a deterministic canvas brushed-roughness map, softened procedural studio reflections and lighting, and added generic screw heads/slots and copper connector pads alongside the PCB trace texture. Glass, screen gradient, lens glass/rings, and side buttons remain procedural. To expose selected internals, only covering layers become translucent during selection; this is a conceptual cutaway, not a claim of physically transparent or accurate device components. No Apple branding, part numbers, external models or images were added.
- Existing WhatsApp behavior, pinned Three.js dependency, lazy loading, visibility-based render pause, drag interaction, reduced motion and SVG fallback remain in place. Earlier report descriptions of duplicated diagnostic artboards/separate phone blocks are superseded by this section.

Headless Chromium verification passed at **390px and 1440px**: exactly one diagnostic heading, one phone/canvas, six controls, no old static phone or standalone phone block, all six selected parts and card labels working, no horizontal scroll, and no page exceptions or console errors. The same canvas and selection survived repeated breakpoint changes. WebGL-disabled SVG fallback worked inside the card with diagnostic text/caption updates. Reduced-motion assembled state, stable idle render count, and selection also passed. Card screenshots were inspected at both sizes; temporary checks/screenshots were removed. Static checks passed retained/unique IDs, assets/anchors, CSS and JavaScript syntax.

Limits remain: software-WebGL headless Chromium does not establish real-device GPU performance, physical touch behavior, Safari/Firefox compatibility or teardown accuracy. No deployment or commit was performed.

## Reference-guided logic board and phone finish

Updated `landing/assets/phone3d.js` (~18.6 KB) and this report. The initial source-free board direction was superseded by Oscar's subsequent explicit permission to use/trace the supplied photos, followed by front/back/side/battery/teardown references. The result is **reference-guided**, not a claim of a source-independent layout or an accurate iPhone teardown.

The board's silhouette and major package placement are reconstructed from the supplied annotated board photograph as unmarked, rotated 3D geometry. It has actual cut-through mounting holes with plated rings, raised package bodies/lids, solder reveals, shielding finishes, small passive bodies with metallic terminals, edge contacts, and procedurally generated substrate grain, fine traces and vias. Tiny passives and terminals use instanced geometry to reduce draw calls on mobile. Board selection retains restrained brand-blue emission while preserving material differences and component detail. No source annotations, manufacturer names, part numbers, serials or chip labels are reproduced.

The additional phone references guide a burgundy brushed frame/rear cover, dark procedural ribbon wallpaper, revised triangular camera placement, flash/sensor details, antenna bands, side bars, and a graphite L-shaped battery with a subtle pouch seam. Screen emission is retained when highlighting other parts; the glass coating is kept light enough to preserve the screen artwork. Surfaces remain procedural and respond to the existing studio lighting. No photo crops, bitmap overlays, external textures/models, brand logos or new dependencies were added to the landing. The supplied images were used as visual/layout references rather than shipped image files.

Headless Chromium checks passed at **390px and 1440px**: successful render, one canvas, all six mapped selections including the board, no horizontal scroll, and no page exceptions/console errors. Reduced-motion assembled state and pointer interaction passed; WebGL-disabled SVG fallback and diagnostic text updates also passed. Board, front and rear screenshots were inspected; temporary QA files were removed. The same existing diagnostic card, labels, SVG fallback and WhatsApp control remain in use.

Limits: material realism is a procedural approximation of the references, not a scan or verified reconstruction. Real-device GPU performance and engineering/component-placement accuracy remain unverified. No deploy or commit was performed.

## Photo-textured assembly — correcting the visual approach

Oscar clarified that the photographed surfaces should become the 3D visual, rather than serving only as inspiration for procedural approximations. The previous material/geometry approximation has therefore been replaced with a **photo-derived, limited-angle 3D assembly**.

Changed files:

- `landing/assets/phone3d.js` — separate textured front, rear, battery, board, chassis, camera and port groups, with inferred thickness, photo colors preserved, depth separation, smooth front/internal-view transitions and restrained edge highlighting.
- `landing/script.js` — awaits asynchronous texture/model initialization so loading failures remain on the SVG fallback.
- `landing/assets/phone-photo-atlas.png` — 1915 × 821 RGBA atlas, 1,991,158 bytes, prepared from the supplied photographs with the built-in image editing tool. The front/rear detail, pouch texture, component detail and internal frame now come from these photo-derived surfaces, not generated shader colors. This is an AI-edited atlas, not pixel-identical crops of every original.
- `landing/assets/phone-photo-shapes.json` — silhouette and aperture coordinates extracted from the atlas alpha channel; used to extrude matching geometry and register the texture UVs. The atlas itself was copied unchanged into the project after generation.

Photographic shading is retained with unlit surface materials; side walls/thickness receive the existing procedural studio lighting. Selected internals are exposed by fading covering parts, including their volume materials. Photographs are not washed out with a blue surface tint. Initial presentation shows the photographed front; selection turns to the appropriate view. Automatic sway and pointer angles are limited to reduce exposure of unknown surfaces. The existing card, labels, six diagnostic mappings, WhatsApp control, reduced-motion behavior and SVG fallback remain.

Headless Chromium checks passed at 390px and 1440px: photo render, one canvas, all six selections, no horizontal scroll, and no page exceptions/console errors in normal use. Front/rear/battery/board screenshots were inspected. WebGL-disabled fallback, missing-texture fallback without uncaught exceptions, and reduced-motion assembled/idle/selection behavior passed. Temporary browser QA artifacts were removed.

**Limits:** this is textured extruded geometry with inferred sides/depths, not a full photogrammetric reconstruction. The edited texture atlas fills/invents some missing surface detail; it does not establish engineering accuracy. Lighting on the photograph surfaces is baked. The atlas is about 2 MB and loads only near diagnostics on supported WebGL devices. Real mobile GPU performance and other browser engines remain untested. No deployment or commit was performed.

<details>
<summary>Exact image-edit prompt (built-in tool; saved atlas above)</summary>

Edit the supplied photographs into ONE production texture atlas for a photo-textured interactive 3D exploded smartphone. Preserve actual photographic surface realism from these inputs; do not replace them with a cartoon, CAD illustration, or low-detail render. Output a wide landscape RGBA image approximately 2560x1100 with EXACTLY FIVE equal-width vertical columns. Each column contains ONE isolated orthographic front-facing part, with its top aligned near 5% and bottom at 95% of the image height, vertically upright and centered, on truly transparent background. No perspective, no cast shadows outside parts, no titles, no labels, no watermarks, no text or serial/chip markings. Column1: the entire front phone from input1, preserving exact dark burgundy ribbon wallpaper, black dynamic-island and photographed burgundy bezel. Column2: entire rear phone from input2, preserving photographed burgundy back, camera bump and three dark lens assemblies; remove the central maker logo by matched texture fill. Column3: the dark L-shaped battery from input3, isolated with its exact photographed foil/pouch detail and shape; no glowing outline. Column4: just the detailed logic board from input5, remove all cyan annotation boxes/leaders and chip lettering, preserve photographed components and pads, rotate the isolated board 90deg to a portrait orientation. Column5: underlying internal chassis from input3 and the phone teardown input4; a full-size upright phone internal frame with camera apertures, mounting details and graphite surfaces; battery omitted and battery cavity naturally filled with matching real-looking underlying graphite surfaces. These are five texture source panels for actual 3D meshes, not an exploded assembled view. No duplicated objects. First two full phones and fifth frame must have approximately 1:2.16 aspect ratio and consistent silhouette size; column3 battery is about 70% of full phone height, column4 board about85%. Keep a 3% transparent gutter inside each column so panels never touch. Photographic macro texture, exact source surfaces, neutral physical shading, burgundy edges. Reference photo reuse is expressly authorized by user. Retain no branding or annotation text.

</details>

## Hero assembly and diagnostic repair animations — 2026-10-13

Oscar's latest direction gives the two phone placements different roles. Updated `landing/index.html`, `landing/styles.css`, `landing/script.js`, and `landing/assets/phone3d.js`; the existing photographic atlas and silhouette data are reused unchanged.

- **Hero:** replaced the visible CSS placeholder with the photo-textured exploded assembly in both responsive artboards. Glass and display sit above the exposed battery and board, with the solid chassis and rear cover underneath. Separation, a shallow viewing angle and limited sway keep the layers readable. Callout labels now use light text; the rear-cover caption sits below the assembly. The original CSS phone remains the loading/error fallback.
- **Screen and rear glass diagnostics:** show only a closed front or closed rear body. Selecting either hides internal groups immediately, even when coming from an open repair state. A gentle turn remains. Removed the separate camera overlay from the closed rear view, eliminating its doubled camera plate and blue internal outlines.
- **Battery:** the screen moves aside first; the battery then lifts from the chassis and receives a restrained blue edge highlight. The removed screen fades away once the battery is lifted, leaving a clean final view.
- **Camera:** the rear cover moves away before the independent camera assembly lifts and highlights.
- **Charging:** the closed phone tilts slightly while the small charging connector moves below the body and highlights.
- **Water damage:** the front opens, the battery moves away, and the board lifts and highlights. This is an illustrative repair sequence, not a verified disassembly procedure.

The hero and diagnostic have independent scene state and share one cached atlas/shape load. Each responsive hero host mounts only when visible/nearby; the diagnostic still has one DOM, one canvas and six controls. Scenes pause offscreen/in hidden tabs. Reduced motion shows the hero already separated and diagnostic repair states without animation or idle rendering. Screen/rear selections also stay closed in the SVG fallback. Existing diagnostic copy, caption/note, anchors, menu and WhatsApp behavior are preserved. No new external model files, images or dependencies were added.

**Verification:** headless Chromium at **390px and 1440px** rendered the photographic hero and all six diagnostic states. Browser checks confirmed that cover movement precedes battery/camera/board movement, the final selected part highlights, screen/rear states have zero opening progress, control/detail/caption state agrees, exactly one diagnostic canvas exists, and document width equals viewport width. Offscreen rendering stopped. Reduced-motion selection and stable idle render count passed; WebGL-disabled fallback passed with closed screen/rear SVGs and working diagnostic text. Normal runs had no page exceptions or console errors. Hero, front/rear, battery, camera, port and board screenshots were inspected. JavaScript syntax checks passed; temporary QA artifacts were removed.

**Limits:** browser verification used cached Chromium and software WebGL, not physical mobile hardware. Real-device GPU/touch behavior and Safari/Firefox remain unchecked. Surfaces are the existing AI-edited, photo-derived textures with inferred depth and baked lighting, not a full scan or an engineering-accurate iPhone teardown. The roughly 2 MB atlas now loads near the hero as well as diagnostics. No deploy or commit was performed.

## Silver battery tray, horizontal charging, and two camera views — 2026-10-13

Implemented Oscar's new component references and his clarified opening order. Updated `landing/index.html`, `landing/styles.css`, `landing/script.js`, and `landing/assets/phone3d.js`.

- **Opening order:** the screen moves aside first and reveals a silver battery/support-plate assembly with the rear camera attached. The tray pauses while seated; the motherboard and photographic inner chassis remain hidden. The tray, battery pouch and camera then move together as a rigid assembly, exposing the board underneath. A solid inner shell conceals the deeper photographic circuitry before tray removal. Battery selection keeps the lifted assembly visible and highlights its silver edge; water damage moves it away before lifting/highlighting the board.
- **Battery appearance:** the tray has the bright silver lower face from the new reference, a dark reverse face and a separate graphite battery pouch behind it. The hero also uses this attached battery/tray/camera assembly above the board.
- **Charging:** the phone rotates into landscape, opens, removes the tray, then lifts and enlarges the complete photographed charging flex. The long flex, connector contacts and orange socket are visible against subdued phone context. Rotation/scale/framing ease together; the module stays inside the mobile canvas.
- **Cameras:** replaced the exterior rear-cover crop with the supplied metal three-lens camera module. Added a distinct front sensor/camera-bar model with flex tails. The existing Camera category now exposes two native buttons, **Trasera / Frontal**, inside the card. Choosing either lifts and enlarges that module and updates the title, description and caption. The selected side persists across other repairs and responsive breakpoint changes. Keyboard activation works. The SVG fallback uses the corresponding closed front/rear view and matching text.
- Existing closed screen/rear-glass views, six primary diagnostic controls, anchors, conceptual note, menu, offscreen pause and reduced-motion behavior remain. Floating WhatsApp placement now also avoids the two camera-choice controls.

New files:

| File | Purpose | Size |
| --- | --- | --- |
| `landing/assets/phone-repair-atlas.png` | 1448 × 1086 transparent PNG: silver tray front, rear camera, charging flex, bare battery, front camera, dark tray reverse | 1,224,645 bytes |
| `landing/assets/phone-repair-shapes.json` | Alpha-derived silhouettes, disconnected flex pieces, apertures and UV rectangles for those six parts | 13,271 bytes |

The **built-in imagegen tool** prepared this photo-derived atlas from the user-supplied component references. Its saved output was copied unchanged into `landing/assets/`; Python only read alpha metadata to produce geometry. Existing phone atlas/shape assets were not changed. The new atlas adds about 1.2 MB and shares the existing cached asset load. No external models, additional dependencies, deployment or commit were introduced.

### Verification

Browser plugin not available; checks used the existing Playwright package and cached headless Chromium at `http://127.0.0.1:8765/`, with software WebGL. The tested flow was: diagnostic selection → screen removal → seated battery plate → plate removal → selected component highlight; Camera → front/rear choice → corresponding module and text.

| Check | Result |
| --- | --- |
| Page loads, photographic hero/diagnostic render, no app overlay | Passed |
| 390px and 1440px, all six repairs plus both cameras | Passed |
| Seated-plate phase: opening complete, plate progress zero, motherboard hidden; motherboard appears after removal | Passed |
| Horizontal charging and enlarged rear/front camera screenshots | Inspected; modules fit the canvas |
| Camera choice updates title, caption, pressed state and rendered module | Passed |
| Keyboard Space activation and front-camera persistence across 390px → 1440px | Passed; same diagnostic canvas |
| Document width equals viewport width | Passed |
| Normal page exceptions / console errors | None |
| Offscreen render pause; reduced-motion final states and stable idle rendering | Passed |
| WebGL-disabled fallback with both camera choices | Passed |
| JavaScript syntax, local HTML assets and unique IDs | Passed |

Temporary QA scripts/screenshots were removed after inspection. Remaining limits: these are AI-edited photographic surfaces on inferred, limited-angle extrusions. Some perspective/lighting remains baked into component photos; this is not a scan, a product specification or a verified teardown procedure. Real mobile GPU performance, physical touch interaction and Safari/Firefox were not tested.

<details>
<summary>Exact repair-atlas prompt (built-in imagegen)</summary>

Use case: compositing. Asset type: photo-derived transparent texture atlas for a limited-angle 3D smartphone repair animation. Edit these five supplied product photos into ONE clean RGBA atlas, EXACTLY SIX separate parts in a strict 3 columns by 2 rows grid, landscape 2048x1536. Every cell has generous transparent gutters; nothing crosses cell boundaries. Preserve photographic real metal, lenses, flex circuitry, solder and pouch texture, not cartoon or simple CAD. Every part isolated on ACTUAL transparent background with NO cast shadows or surrounding white. Reconstruct perspective-hidden detail only for straight ORTHOGRAPHIC TOP-DOWN texture views. No labels, QR codes, serials, logos, chip text, cyan packaging tabs or annotations anywhere.
Input1 silver battery support-plate assembly. Input2 clean dark battery pouch. Input3 triple rear-camera metal module. Input4 naked charging flex assembly. Input5 front-camera sensor bar with hanging flex.
TOP LEFT: entire upright SILVER battery-and-support-plate assembly from Input1, preserving its black upper bracket with mounting apertures and its large silver L-shaped lower battery backing. Full portrait silhouette, screws and connector detail. This is the first layer revealed under the screen. TOP MIDDLE: rear triple-camera MODULE from Input3, silver carrier, three distinct black lens barrels, real glass highlights and black flex connectors below. Straight top-down, not a burgundy exterior camera bump. TOP RIGHT: entire charging flex from Input4, reconstructed upright and flat: a long thin black flex up the LEFT edge plus a complex black/silver bottom crossbar with a copper-orange USB socket at bottom middle. Keep mounting rings, small chips and connector contacts; overall portrait L-shaped footprint for an internal phone. BOTTOM LEFT: standalone dark battery pouch from Input2, upright with small top connector and stepped LOWER-RIGHT corner, clean graphite foil texture, no text. BOTTOM MIDDLE: front-camera sensor bar from Input5, small lens/sensor units at the ends of silver connecting carrier, black flex tails below. Detailed photographic glass and metal. BOTTOM RIGHT: dark reverse side of the support plate from TOP LEFT, IDENTICAL portrait outline, apertures and mounting ears, matte navy-black graphite protective surface with realistic subtle finish. Parts centered in each cell with at least 5% gutters. Silver clearly contrasts with graphite. No burgundy rear cover. No hands, dirt, tables, watermark, glow or text. One part per cell, photographic surfaces with neutral baked shading.

</details>

## Continuation saved — images remain work in progress

Oscar confirmed that the animations are liked but the images are not yet perfect; new reference images will follow. Saved the process and current decisions in [PHONE-IMAGE-WORKFLOW.md](PHONE-IMAGE-WORKFLOW.md), with the atlas mappings, exact animation order, image-quality issues to inspect, preparation/integration steps and browser verification setup. Added `design/tools/trace_phone_atlas.py`; it reproduces the current repair geometry JSON exactly without modifying PNG pixels. Original user reference images are preserved unchanged in `design/reference/phone/2026-10-13/`, outside the served landing, with a manifest identifying input roles. No landing visuals were changed in this save pass, and no deploy or commit was performed.

## Second reference pass — damaged screen, two-sided covers, and deeper internals

Implemented Oscar's nine new references, saved unchanged in `design/reference/phone/2026-10-13-pass2/` with descriptive names and a manifest. This direction supersedes the earlier closed-only screen/rear-glass views and the inferred camera/battery-plate attachment.

- **Screen replacement:** begins with photographic shattered glass on the existing burgundy phone. The screen pivots around its edge to expose a copper/graphite inner face and connector, disconnects, and moves away. A clean panel enters and seats over the body; the final view is repaired. The new native **Ver reparación** button restarts the sequence and works with keyboard Enter. Reduced motion displays static damaged/clean phones side by side. Added an original cracked-screen SVG symbol for the no-WebGL fallback.
- **First opened front:** shows the new dark battery/support plate with attached pouch and the front sensor bar at the top. The mounted board/deeper body photograph remains hidden until that plate lifts. The rear camera stays in the phone, consistent with the new removal photos.
- **Battery:** lifts the plate/pouch as a combined two-sided photographic assembly, then turns it to show the dark reverse. The previous separate pouch mesh is hidden to avoid an exposed flat duplicate during the turn. Mounted-board/body artwork underneath now matches the new post-removal reference. Extrusion caps have a neutral material independent of highlighted side walls; reverse-face apertures no longer reveal blue-filled patches.
- **Rear glass:** starts with the closed rear, then pivots the cover away. Its inner coil, graphite backing and camera apertures are visible alongside the rear body, battery and camera. Replay restarts at the closed view. The detached cover uses actual cut-through apertures and separate outer/inner photographic surfaces.
- **Rear camera:** opens from the back and lifts the new metal carrier from the rear body, using the extraction reference. Its two left lenses and right camera unit remain distinct. Front-camera selection, both native camera buttons and their synchronized copy remain available.
- **Board/hero:** the board is now a broad upper-phone assembly rather than the old full-height strip. Water damage exposes the mounted board before lifting it over the stripped frame. The hero uses the updated dark tray, independent camera/board and rear-cover coil face. Horizontal charging, lazy/shared loading, one diagnostic canvas, offscreen pause and existing menu/copy/anchors remain.

Updated `landing/assets/phone3d.js`, `landing/assets/phone-layers.svg`, `landing/index.html`, `landing/styles.css`, and `landing/script.js`. Floating WhatsApp avoidance now includes replay controls. Updated the saved image workflow and reusable alpha extractor; the latter now accepts explicit pixel boundaries for unequal atlas rows/columns and still reproduces the previous repair metadata exactly.

New versioned assets, prepared with the **built-in imagegen** tool and copied unchanged into the landing:

| Asset | Actual dimensions / layout | Size |
| --- | --- | --- |
| `landing/assets/phone-opening-atlas-v2.png` | 1254 × 1254, 2 × 2: broken front, screen underside, tray front, tray reverse | 1,461,924 bytes |
| `landing/assets/phone-opening-shapes-v2.json` | Alpha geometry/UV rectangles; row divider at 695px | 8,131 bytes |
| `landing/assets/phone-internals-atlas-v2.png` | 1448 × 1086, 3 × 2: rear-cover inside, mounted front body, board, camera, rear body, stripped frame | 1,475,164 bytes |
| `landing/assets/phone-internals-shapes-v2.json` | Alpha geometry/UV rectangles; row divider at 534px | 7,309 bytes |

Generated atlas rows were unequal despite the grid prompt. Metadata boundaries were placed in inspected transparent gaps, preserving full parts. The screen underside's connector extends beyond the panel: its geometry is registered to the actual 335px panel width rather than squeezing the full 419px panel-plus-tail rectangle into the front silhouette. Back-face mirroring keeps the connector toward the hinge. Existing atlases remain untouched for comparison; the charging flex and front-camera artwork are reused.

**Verification:** cached headless Chromium/Playwright with software WebGL at `http://127.0.0.1:8765/`. Full normal-motion runs at **390px and 1440px** passed all six diagnostic choices and both camera views, photographic hero rendering, broken/open/fitted screen states, replay, removed rear-glass state, turned battery plate, horizontal charging, one diagnostic canvas and zero horizontal overflow. Recorded checks had no page exceptions or console errors. Final focused screenshots confirmed the readable undersides, neutral battery reverse and complete fitted screen. Seated-plate phase had zero plate progress and a hidden board; removal then exposed it. Keyboard camera choice and canvas/side persistence across resize passed. Reduced-motion comparisons/final states and idle render count passed; rendering paused offscreen. WebGL-disabled fallback showed the cracked SVG, matching front/rear camera text and no unavailable replay button. JavaScript syntax, SVG XML, HTML assets/unique IDs and metadata compatibility passed. Temporary QA artifacts were removed.

**Limits:** images remain work in progress, not a claim of visual approval or an engineering teardown. These are AI-edited photographic surfaces with inferred depth; some source lighting/detail is reconstructed. Real-device GPU/touch behavior and Safari/Firefox are untested. No external models, new dependencies, deployment or commit were introduced. [PHONE-IMAGE-WORKFLOW.md](PHONE-IMAGE-WORKFLOW.md) records the latest rules, file mappings, exact tracing commands and how to continue with new references.

<details>
<summary>Exact opening-atlas prompt (built-in imagegen)</summary>

Use case: compositing. Asset: one production RGBA texture atlas for a realistic phone repair animation. Edit the five inputs into EXACTLY FOUR isolated photographic parts in a strict TWO columns by TWO rows grid. Landscape or square 1536x1536. ACTUAL transparent background. Generous 8% gutters within each cell. Flat upright ORTHOGRAPHIC views, full uncropped part silhouettes, consistent 1:2.16 full-phone proportions. Retain photographic surface detail; no cartoon, no diagram text, no blue tint, no external shadows, no white extraction fringe, no hands, tools or environment. Input1 is an existing texture atlas: use ONLY its first burgundy front-phone panel as the consistent phone appearance. Input2 is a real cracked screen: use its realistic dense spiderweb crack pattern. Input3 shows the underside of an opened screen and the dark first battery cover. Input4 shows a detached battery attached to a dark support plate. Input5 shows its dark reverse side. TOP LEFT: the whole burgundy front phone from input1, same silhouette and black island, but with badly shattered glass based on input2 over its dark burgundy wallpaper; show physically realistic hairline cracks concentrated at top and around side impacts, not painted white lines or missing chunks. Keep its burgundy frame; do not take the blue body or environment from input2. TOP RIGHT: the reverse/inside face of the full removed screen from input3, upright flattened top-down: black backing with copper perimeter band, a flexible black connection tail and small gold contacts, cutouts at the top. Match the TOP LEFT outer silhouette and scale exactly. BOTTOM LEFT: the full battery/support plate from input4 rotated upright so its dark protective upper plate is at TOP and attached graphite pouch is BELOW, subtle pouch seam and realistic silver mounting ears/connector at edge. Isolate just this object and remove fingers, lower phone and background. This plate does NOT contain the rear three-lens camera. BOTTOM RIGHT: matching dark reverse of the same battery/support plate from input5, identical outline/proportions/apertures, subtle stamped ridges, mounting holes, contacts; remove glove and surrounding phone. No silver-painted large battery face: preserve these new dark reference surfaces and their actual silver tabs. Strip ALL logos, serial/chip text, QR codes or labels. Four distinct parts, one per cell, actual photo realism and clean transparency.

</details>

<details>
<summary>Exact internals-atlas prompt (built-in imagegen)</summary>

Use case: compositing. Asset: one photo-derived RGBA texture atlas for a realistic phone repair animation, EXACTLY SIX separate upright parts in strict THREE columns by TWO rows. 2048x1536 landscape, ACTUAL transparent background and 8% gutters inside each cell. Orthographic straight top-down, no perspective, retain detailed photographic macro surfaces, no cartoon/CAD simplification. All full-phone parts share identical 1:2.16 silhouette and burgundy metal outer frame, matched to input1's body colour; input2 orange frame must become muted burgundy consistently. No hands, tools, environment, cast shadows outside parts, annotation text, logos, QR/serial/chip markings, or white extraction fringes. Input1: opened rear glass showing its underside and rear phone internals. Input2: front-facing body after battery/support plate removal, with shielded logic board at top and lower battery compartment empty. Input3: rear triple-lens metal camera being removed. Input4: stripped empty internal frame. TOP LEFT: the INNER face of the full rear glass from input1, isolated, flattened upright; dark graphite wireless-charging coil and flex connections, three camera apertures at upper left in the same triangular positions as the burgundy exterior phone. Full clean rounded rectangle, no surrounding body. TOP MIDDLE: full front-facing internal PHONE BODY from input2 after battery plate removed, complete burgundy frame, upper shielded board/front sensor bar installed, graphite lower empty battery cavity, edge screws/connectors. The battery and its cover plate are absent. TOP RIGHT: just the shielded LOGIC BOARD assembly from input2, isolated as a broad upper-phone assembly with black packages, silver shields, gold contacts, fine connectors and mounting holes, about the upper HALF of the phone height; do not stretch it into a full-height long strip. BOTTOM LEFT: the actual REAR CAMERA metal carrier from input3, isolated and truly top-down, two black lens barrels at upper-left/lower-left and third at right-middle on refined silver metal bracket, tiny flex tails and connectors below, no external burgundy camera cover. BOTTOM MIDDLE: full REAR-facing phone BODY from input1 with graphite L-shaped battery and silver shields installed but camera module REMOVED, empty three camera apertures at upper left, matched burgundy frame. This pairs with the removed rear glass. BOTTOM RIGHT: clean stripped internal CHASSIS from input4, matched burgundy frame, empty graphite central cavity, silver perimeter rails, realistic mounting holes and ports, no battery or logic board or camera module. No extra parts. Keep parts separate with clear gutters. No fake glowing contours; clean precise photo cutouts.

</details>


## Hero composition revision and primary-source review — 2026-10-13

Scoped to the hero. Oscar confirmed that the opening is fine and asked for a coherent assembly. His later direction supersedes the earlier floating-camera request: **leave the camera attached to the chassis**, detach the battery/support plate and motherboard, and show their vacant mounting space. He also explicitly withdrew permission to notify Claude/pane `w2:p9K`; no completion message was sent there.

Implemented:

- Exactly one structural chassis, with a recessed empty battery bay over a flat graphite base and vacant board mounting seats. No duplicate populated body/board/battery is baked underneath the detached parts.
- A battery/support assembly with a dark upper bracket, silver lower backing and the stepped corner from the latest separated-plate reference. It moves as one unit.
- A separate horizontal motherboard, positioned below the upper camera region, replacing the incorrect square upper-hardware collage.
- A bright silver three-lens carrier fixed against the chassis throughout opening. Camera optics were mirrored and registered to the chassis aperture triangle, including the offset caused by connector tails. The fixed layer-center separation is .185, equal to half the combined .23/.14 mesh thicknesses; attached surfaces meet rather than floating apart.
- A smaller lower rear-glass inner panel with its coil and no camera apertures. The camera plateau stays in the chassis. Removed the misleading extra front-glass sheet entirely.
- Preserved the depth-opening curve and shallow view; adjusted final spacing for component readability. The final view has no idle rotation or pointer drag, and animation frames stop after settling. Reduced motion begins in the final static view.
- Updated hero labels to Pantalla / Batería / Vidrio trasero and its accessible description. A transparent static render of the same corrected assembly replaces the old blue CSS placeholder, including loading, unavailable WebGL and context-loss fallback. Diagnostic HTML, CSS, copy, atlas bindings and repair timings remain as before.

Changed implementation files: `landing/assets/phone3d.js`, `landing/index.html`, `landing/styles.css`. Hero assets load separately so the diagnostic still uses its original atlases. Its original asset loader and all repair-pose functions were compared against the pre-change copy and are unchanged. Updated this report and PHONE-IMAGE-WORKFLOW.md, and saved the three latest references unchanged under `design/reference/phone/2026-10-13-hero/` with a manifest. Sources, brand references and .dashboard were untouched.

### Composition research

Reviewed [Apple’s iPhone 18 Pro internal/exploded view](https://support.apple.com/en-lamr/127390), [battery procedure](https://support.apple.com/en-lamr/127398), [logic-board procedure](https://support.apple.com/en-lamr/127410), and [iFixit’s iPhone 18 Pro teardown](https://www.ifixit.com/News/119329/inside-the-tiny-unfixable-eye-iphone-18-pro-and-pro-max-teardown). The manufacturer’s view separates the enclosure, rear glass, board and battery/vapor-chamber assembly. The battery procedure removes the display before lifting the attached battery assembly. iFixit confirms a screwed-in tray and a rear panel serving the charging coil. These sources corrected the full-height camera-hole rear cover and the misplaced square motherboard in our first draft. Research images were inspected only; no Apple diagram or newly fetched photo was copied into the landing or supplied to imagegen. Finished photographic assets derive from Oscar’s supplied photos.

**Intentional illustration limit:** Oscar requested the camera stay attached while the motherboard floats separately. Apple’s literal board-removal procedure requires camera/front-camera/top-speaker removal first. The hero preserves the requested exploded illustration; it is not a step-by-step repair procedure. Exact depth, shape and registration remain inferred photographic extrusions, not a measured product scan. The unchanged diagnostic visuals retain their earlier conceptual assets and are outside this hero pass.

### Active new assets

| File | Purpose | Size |
| --- | --- | --- |
| `phone-hero-shell-v3.png` | 1254 × 1254 RGBA; empty chassis and shorter lower coil panel | 1,724,527 bytes |
| `phone-hero-shell-shapes-v3.json` | Two alpha-derived silhouettes; chassis has three apertures, rear glass has zero | 2,439 bytes |
| `phone-hero-components-v3.png` | 1774 × 887 RGBA; silver-backed battery plate, horizontal board, silver carrier | 1,297,295 bytes |
| `phone-hero-components-shapes-v3.json` | Three alpha-derived silhouettes; explicit gutters 0,630,1260,1774 | 6,368 bytes |
| `phone-hero-static-v3.png` | 840 × 1120 transparent browser export of the final assembly | 407,945 bytes |

Built-in imagegen produced the two active photographic atlases; saved outputs were copied unchanged. Python read alpha to make geometry metadata, without changing pixels. The static fallback is a headless-browser render of the code, exported with transparent background at DPR2. Intermediate v1/v2 PNG/JSON files remain as unused comparisons; existing diagnostic assets remain intact.

### Verification

Browser plugin not available; used existing Playwright and cached Chromium with software WebGL at http://127.0.0.1:8765/. No dependencies were installed.

| Check | Result |
| --- | --- |
| Page identity/content, meaningful hero, no framework overlay | Passed |
| 1440px and 390px: six correct meshes, four detached assemblies, camera attached | Passed; screenshots inspected |
| Settled hero render count stays constant; pointer gesture leaves view unchanged | Passed |
| Reduced-motion hero starts fully open and remains still | Passed |
| Original diagnostic: all six choices, rear/front camera, selected component/copy, horizontal charging | Passed at both widths; one diagnostic canvas |
| Normal page exceptions/console errors | None |
| Horizontal overflow | None at either width |
| WebGL unavailable: corrected photographic hero plus original diagnostic SVG and camera text | Passed at both widths; unavailable replay stays hidden |
| JavaScript syntax, HTML local assets and unique IDs | Passed |
| Independent read-only composition review against user/primary references | No blocking defects |

The same primary opening code and diagnostic flows were not broadly retested after only swapping the hero fallback markup; targeted fallback checks and static validation covered that final change. An initial reduced-motion assertion read a dataset before its first animation frame; the check now waits for the actual ready state and passed. This was a test timing issue, not a visual failure.

**Remaining visual limits:** the shallow preserved angle lets the screen overlap some of the plate’s dark upper bracket; the motherboard is small on mobile. They remain distinguishable. Very small low-alpha cutout fringes can be visible in source-image inspection; renderer alpha threshold suppresses them. No claim of user visual approval. Real-device GPU/touch behavior, Safari/Firefox and induced context-loss recovery were not checked. No deploy, commit, purchase, external model or Claude notification.

<details>
<summary>Exact active component-atlas prompt and provenance</summary>

```text
Use case: precise-object-edit.
Asset type: actual transparent RGBA photographic smartphone component atlas for a website exploded-assembly hero.
EDIT TARGET: first input image, existing 1774 x 887 landscape three-column one-row component atlas.
REFERENCE ROLES: second input is the user-supplied complete phone teardown photograph; the true standalone motherboard is the SMALL HORIZONTAL PCB to the middle-right, directly below the maroon rear cover, with one dominant silver rectangular shield can, black packages and gold connectors. Third input is the user's phone photo with a GREEN overlay indicating the true motherboard region BELOW the upper camera-area hardware; the green is only annotation, never a board colour. Fourth input is previous atlas as appearance reference for the bright silver three-lens camera on the RIGHT.

Primary request: correct ONLY the MIDDLE motherboard subject, replacing the existing square upper-phone hardware collage with the real compact HORIZONTAL irregular PCB shown as a detached part in image 2. The replacement board must be approximately 2.3 times wider than tall, with its long axis horizontal in the image. It is an asymmetrical low compact bar: left narrow arm with black packages and fine connectors, broad middle-right section carrying one dominant satin SILVER rectangular RF shield can, dark black/graphite chips and small exposed dark PCB regions, gold edge contacts and fine gold sockets at the right, small natural silver pierced mounting ears and holes. Reconstruct fine realistic photographic electronic detail from image 2. Use the annotated lower region in image 3 only to distinguish it from the hardware above. Do NOT include the square central upper-camera metal shield, the rounded upper-right black camera hardware, upper sensor bar, speaker, optics or complete top-phone silhouette. ZERO lenses, cameras, optical glass, full phone frame, battery, charging socket or long flex array on the motherboard. It is the standalone narrow mainboard below the camera hardware, not an invented square sheet with many generic chips.

Composition: retain exactly THREE columns and ONE row, order LEFT tray, MIDDLE horizontal board, RIGHT camera. Centred isolated middle PCB should occupy about 440–470 pixels width and approximately 195–215 pixels height on the original atlas; its centre can remain near x900,y440, with large clean transparent margins. Ensure the middle board never reaches the adjoining left or right component. No loose duplicated parts.

Preserve the LEFT assembly from image 1: long vertical attached plate with a clearly light matte SILVER lower battery backing, DARK graphite upper support bracket, distinctive stepped lower-right corner, mounting ears and holes. Keep its material, shape, upright perpendicular top view and location. No camera attached to this plate.
Preserve the RIGHT assembly's bright neutral SILVER machined metal carrier appearance from images 1 and 4: EXACTLY THREE distinct black circular photographic lens barrels in triangular placement, reflective glass centres, silver pierced mounting ears and short dark flex connector tails. Keep camera shape, size, location, top-down perspective and neutral studio light. Preserve real transparent pierced mounting holes as in image 4 rather than filling them with a painted grey surface. Do not add or remove lenses or recolour silver.

All three subjects share neutral photographic product lighting, sharp focus, straight orthographic perpendicular overhead viewpoint, realistic matte/satin metal and graphite materials. Preserve the original dimensions and component placement as far as practical. Output a single PNG with genuine RGBA alpha transparency. Outside all physical objects, including holes and generous gutters, is transparent. No text, letters, labels, battery print, logos, branding, QR, chip markings, green overlay, hands, phone housing, workshop, tools, environment, ground plane, shadows outside objects, white fringe, watermark or stray fragments. Do not copy any research diagram or recreate an infographic. Prepare a crisp photographic asset derived only from the supplied user references.
```

Inputs:

- `/home/oscar/Projects/fixnow/landing/assets/phone-hero-components-v2.png`
- `/home/oscar/Projects/fixnow/design/reference/phone/2026-10-13/phone-teardown.png`
- `/home/oscar/Projects/fixnow/design/reference/phone/2026-10-13-hero/motherboard-region.png`
- `/home/oscar/Projects/fixnow/landing/assets/phone-hero-components-v1.png`

Generated source: `/home/oscar/.codex/generated_images/01a1376a-786b-7722-833e-22194d4aa3ef/exec-5bae02ea-8b3a-4dcd-8e9c-8afdaea7fefd.png`. Copied unchanged; SHA-256 `62c82f5d046f2960c5e7cd131d162863158ec164da9e540acf1afcd4d1642ab5`.

```bash
python3 design/tools/trace_phone_atlas.py --input landing/assets/phone-hero-components-v3.png --output landing/assets/phone-hero-components-shapes-v3.json --columns 3 --rows 1 --names tray,board,camera --column-boundaries 0,630,1260,1774
```

</details>

<details>
<summary>Exact active shell-atlas prompt and provenance</summary>

```text
Use case: precise-object-edit.
Asset: one photo-derived RGBA texture atlas for a smartphone HERO exploded assembly.
Image 1 is the EDIT TARGET, a square two-column atlas. Image 2 is the user's editable teardown photograph, supporting the structure and shorter burgundy back-glass panel visible at its upper right. Do not include the teardown photograph background, logos, text or any unrelated parts.

Keep the TWO columns by ONE row atlas layout, approximately1254x1254, generous transparent gutters and genuine alpha background.
LEFT COLUMN: preserve the one full-height stripped CHASSIS from Image1 with its exact upright orthographic appearance, burgundy edge, silver rails and empty camera-aperture triangle. Keep the large empty battery bay with a low flat graphite base membrane, NO battery-shaped raised pouch and NO battery/support plate. Keep the sparse vacant motherboard mounting area below and beside the upper camera region with individual silver open brackets and bosses, NO installed board/chips/shields. Keep its THREE empty transparent camera holes unchanged in position; camera optics will be attached separately in the 3D scene. Do not add another body.
RIGHT COLUMN: REPLACE the incorrect FULL-HEIGHT camera-aperture cover entirely with ONLY a SHORTER LOWER BACK-GLASS INNER PANEL, based on the small burgundy rounded rectangular rear-glass panel at the upper-right of Image2. The upper camera plateau is part of the chassis and DOES NOT detach with this lower glass. Therefore the new panel has NO camera apertures, NO optical holes of any kind, NO lens rings, NO silver camera backing. Its entire thin graphite inner face is a continuous rounded rectangle.
RIGHT panel size relative to LEFT full chassis: width exactly about88% of chassis width, height about65% of chassis height. Thus its width:height is about1:1.56, substantially SHORTER than the full phone. Center it in the RIGHT column with its bottom aligned approximately with the chassis bottom, leaving a large transparent gap above it. DO NOT scale it up to full-phone height. Clean generously rounded corners and only a hairline muted burgundy glass perimeter, physically0.7mm thin.
Inside this shorter glass panel: realistic matte graphite film and a near-circular large wireless-charging COIL centered within the panel, diameter about80% of panel width, with a short subtle alignment trace/tail below and one small black flexible connection tab/contact near its edge. Preserve photographic coil-film surface quality from Image1 but rearrange it to fit the SHORTER panel with round proportions. It is a very thin lightweight lower-cover sheet, not a chassis or entire rear phone. No structural silver perimeter rails, no mounting screw bosses, no charging/speaker ports, no installed chips, no deep cavity, no raised battery, no camera parts.
Style: sharp realistic macro product photography, clean machined silver and graphite materials on left, realistic graphite film and subtle muted burgundy hairline edge on right, straight ORTHOGRAPHIC TOP-DOWN and fully uncropped.
Constraints: EXACTLY TWO separate parts, ONE full chassis LEFT and ONE shorter thin lower rear-glass cover RIGHT. REAL alpha transparency around the two objects and through only the LEFT three camera apertures. No added external shadows, glow, white fringes, coloured edge specks, environment, hands, tools, logo, serial/chip markings, QR code, labels, diagram linework, numbers or watermark. Preserve the single chassis; only the right cover needs its outline and upper-camera area corrected.
```

Editable inputs: `landing/assets/phone-hero-shell-v2.png` and `design/reference/phone/2026-10-13/phone-teardown.png`. Primary-source diagrams were inspection only.

Generated source: `/home/oscar/.codex/generated_images/01a1376a-278f-7473-9158-bd6b02e67729/exec-ffc2f09d-6140-4d46-a6f4-f4833752c3c7.png`. Copied unchanged; SHA-256 `d5583e40975f5b8d8d245d6f95fa4530c2d5db0996279aa71e18877d81aef5ee`.

```bash
python3 design/tools/trace_phone_atlas.py --input landing/assets/phone-hero-shell-v3.png --output landing/assets/phone-hero-shell-shapes-v3.json --columns 2 --rows 1 --names chassis,rearGlass
```

Actual rectangles: chassis `[64,65,542,1120]`; rearGlass `[666,415,522,766]`. Mesh uses the cover’s actual aspect ratio, preserving its coil instead of stretching to the prompt’s approximate target size.

</details>


## Asset continuation checkpoint — 2026-10-13, 20:32 ART

Oscar rejected v3 despite technical QA: middle still looked like a complete phone, rear panel was too small, and parts were too far apart. Codex prepared v4 hollow frame, then v5 FRONT-interior frame/floor/cameraBack from his new exact opened-phone photo, and v6 with the satin rose side reference. Claude implemented v5/v6 as authorized and critically reviewed real headless renders. Codex corrected the floor depth sign, restored the diagnostic material defaults after a global grey change, and applied hero-only rose material/rounded bevels plus v6 photo textures. Claude's last geometry pass tightened depths to display-1.62, tray-.65, board.15, frame.95, rearGlass1.55, offset the board x-.30,y.55, and enlarged cameraBack width2.60. Static fallback v7 matches the latest geometry and rose materials.

Active front PNG/JSON: phone-hero-front-v6 (frame, recessed floor, inside-facing camera backs). The hero uses the original clean display, v3 silver plate/horizontal board, and v4 lower coil panel; v4 frame and v3 rear-side frame are superseded. Older versions remain untouched.

Claude's latest fresh headless checks at1440/390 reached assemblyProgress1.000 with no page errors. His hard critique still identifies dark/small camera backs, modest mobile scale, and partial plate/board overlap. The middle now reads as opened front internals with a recessed empty bay; the lower rear glass is wider and close behind the frame. This is NOT Oscar's visual approval. Root's broad diagnostic/fallback regression after this final hero iteration is still pending; earlier passes remain recorded above. No deploy or commit.

The user re-authorized Claude in w2:p9K for code and critique, so the earlier no-Claude instruction is superseded for this task. Current code/asset ownership and complete resume information are saved in [ASSET-CONTINUATION.md](ASSET-CONTINUATION.md), with the latest material values, UV rectangles, source paths, browser setup and remaining work. New source photos are preserved unchanged in the hero reference folder.

## Rear glass v10 — correct visible face, thin geometry, current fallback

Oscar clarified that “front” is the inward-facing graphite surface of the detached rear glass, while the outside/back must match the phone's rose colour. Version9 had incorrectly shown the rose exterior toward the viewer. Version10 now gives the sheet two separate physical photo faces: inner0 toward the body; outer1 on the reverse. The edge remains rose and thin: depth.008 plus.0015 bevel, rather than the former.045 depth plus.024 bevel. Both surface offsets are.003, so the reverse photo does not create artificial thickness. The outer photo has a slight0xe7c9d4 material calibration; the inner photo is untinted.

Active asset: landing/assets/phone-hero-backglass-v10.png,1426×1103 RGBA,1,890,684bytes; matching phone-hero-backglass-shapes-v10.json. Inner rect[102,47,591,991], outer[731,46,593,992], one component/no holes each. Registered to the existing lower-cover2.95×4.58 footprint at y-.85; the generated photo aspect is normalized slightly to preserve physical cover fit. The hero no longer loads the unused v4 shell atlas. All older assets are retained.

Static-v10 was exported AFTER Claude's latest HERO_TILT=-1.05, HERO_YAW=+.5 and board(-1.0,.2,.25) changes. Both hero src lines point to phone-hero-static-v10.png. Normal1440/390 Playwright animation checks reached1.000 with no page/console errors or overflow. Screenshots were inspected. Reduced motion and no-WebGL fallback checks passed at both widths. Diagnostic loader/geometry/repair-pose source blocks and Claude's latest hero pose were compared unchanged by the glass edit. No new broad diagnostic interaction suite or real-device QA was run. Board/camera readability remains pending visual refinement and Oscar has not approved the result. No deploy or commit.

User references are preserved unchanged: back-glass-two-faces-reference.png, satin-rose-side-reference.png, rejected-inner-backglass-hero.png and rejected-outer-glass-front.png under design/reference/phone/2026-10-13-hero/.

<details>
<summary>Final built-in imagegen prompt and provenance</summary>

```text
Use case: precise-object-edit.
Asset type: two-sided photographic texture atlas for a thin detached lower rear-glass smartphone panel.
Primary request: The hero must show the INWARD-FACING surface of the rear glass toward the open phone. Prepare both real sides, so the opposite side remains rose.
Inputs: Image 1 is the current generated ROSE EXTERIOR panel to preserve. Image 2 is the user's construction reference: LEFT orange object is the outside face, RIGHT dark object is the inward-facing face. Image 3 is the phone colour reference.
Composition: Exactly TWO upright panels in ONE ROW, evenly spaced in two columns on a genuine transparent background. LEFT = inward-facing graphite surface. RIGHT = preserved rose EXTERIOR surface from image 1. Both panels must have exactly the same rounded-rectangle outline and proportions (width:height approximately 1:1.55), the same pixel size and vertical alignment, generous clear transparent gutter, and margins. Perpendicular orthographic view, no perspective or visible side thickness.
LEFT inner face: Match the RIGHT object in image 2, with clean realistic charcoal/graphite protective film, a subtle large circular wireless coil imprint in the upper-middle, the narrow flex/contact details at top-right and bottom, small metallic gold connector pads, and the restrained rectangular graphite films toward the lower half. Refined clean catalog appearance; keep all details within the rounded rectangle. This is a thin glass-backed film sheet, not a metal chassis, phone body, battery or thick raised coil.
RIGHT outside face: Preserve image 1's muted burgundy/dusty rose smooth satin fine-grain material and clean rounded rectangle. No coil or circuitry on this outside surface. No camera aperture/island.
Constraints: Exactly these two faces of the SAME thin panel. Real RGBA alpha; no shadows, background, white fringe, extra fragments, labels, branding, logo or watermark. No thick border, visible extrusion, screws, metal perimeter rails, deep cavity, camera lenses or phone housing. Do not recolour rose to orange, vivid red or silver. Do not put the rose outside face on the left; the left must show the inward graphite surface, the right must show the rose outside surface.
```

Inputs, in order:
- landing/assets/phone-hero-backglass-v9.png (generated exterior to preserve).
- design/reference/phone/2026-10-13-hero/back-glass-two-faces-reference.png (user's paired face/construction reference).
- design/reference/phone/2026-10-13-hero/satin-rose-side-reference.png (user's palette/finish reference).

Built-in imagegen, transparent_background=true. Generated source: /home/oscar/.codex/generated_images/01a13634-b3b8-7440-a72b-a8823baa6302/exec-a3d23b6b-ce4a-4939-859b-ff9a601213cb.png. Copied unchanged. SHA256 e308c8574945dea9d9ee0e91f23fb256cfb0c52933e32e379419102ceeeb84f9.

```bash
python3 design/tools/trace_phone_atlas.py --input landing/assets/phone-hero-backglass-v10.png --output landing/assets/phone-hero-backglass-shapes-v10.json --columns 2 --rows 1 --names glassInner,glassOuter
```

Temporary screenshots/results: /tmp/fixnow-hero-qa/backglass-v10-{1440,390}.png, backglass-v10-results.json and backglass-v10-fallback-{1440,390}.png. The exact final two-face source, metadata and transparent fallback are saved in landing/assets/.

</details>
