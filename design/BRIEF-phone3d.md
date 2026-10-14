# FixNow landing: procedural 3D iPhone (brief for Codex)

## Goal
Replace the SVG/CSS exploded phone in the diagnostic section (`#diagnostico`) with a 3D phone built in code with Three.js. It should look like a real phone (not a flat drawing), rotate gently, and explode into its internal layers. No external 3D model files, no Apple images. Build every asset yourself, in code.

## Scope
- Create all assets needed: the 3D geometry, materials, a lighting environment, and any textures (generate them on a canvas in code, e.g. the screen wallpaper and PCB texture).
- Keep the existing diagnostic list and its synced selection. Tapping a diagnostic highlights the matching 3D part and shows its label. The mapping is: screen -> display, battery -> battery, back glass -> back cover, camera -> camera module, water damage -> logic board, charging -> charging port.
- Keep the floating WhatsApp button and everything else untouched.

## Look (target: convincing, not perfect)
- Body: 18 Pro proportions (about 1 : 2.16), flat-sided titanium frame with rounded corners. Use a bevelled extrude (rounded rectangle, bevel radius about 3 to 4 mm, scaled down), not a hard drawn outline. Metallic material: metalness about 1, roughness about 0.3 to 0.4, slight color variation (natural titanium grey).
- Front: glass with a dark, glossy screen (subtle gradient, a dynamic-island pill, and a soft wallpaper gradient made on a canvas). Glass gets a subtle reflection.
- Back: glass (roughness about 0.1, light transmission or transparency), with a camera bump (rounded square, three lens circles with dark glass and a metallic ring, a small flash).
- Side buttons: small rounded bars on the frame.
- Lighting: image-based lighting from a procedurally generated environment map (e.g. Three.js `RoomEnvironment` if it's available, or a canvas gradient converted with PMREM) plus one soft key light and a rim light. Soft shadows on a neutral ground plane, or none if it looks cleaner.
- No hard outlines or CSS borders around the 3D canvas.

## Internal layers (exploded view)
Each layer is a separate mesh group, stacked along the depth axis:
1. Back glass + camera bump (top of the stack when exploded, toward the viewer)
2. Battery: a rounded flat box, blue-tinted with thin separation lines (the 18 Pro battery is in the lower part of the body)
3. Logic board: dark green PCB with a few chip boxes and a copper-coloured trace texture (generated on canvas), placed under the battery
4. Mid-frame / chassis: titanium frame ring
5. Display: glass front + screen (bottom of the stack when exploded, toward the viewer)

Motion:
- Assembled by default. On scroll into view, layers separate along the depth axis by about 0.9 to 1.2 of the phone thickness (more on desktop, less on phones).
- Tapping a diagnostic moves the matching layer forward a little, highlights it in brand blue `#0066FF` (emissive or outline material, not a CSS border), and shows its label.
- Gentle auto-rotation (about 6 to 8 degrees each side). Stop rotating while the user drags.
- Reduced motion: no rotation, no explode animation. Show the assembled phone and let the user tap parts.

## Mobile first
- The canvas sits above the diagnostic list, centered. Width 280 px on phones, 420 px on desktop, aspect ratio about 1 : 1.1. Use `width: 100%; max-width` and height auto. No horizontal scroll.
- Pixel ratio capped at 2 (1.5 on low-end devices). Only render while the section is visible (IntersectionObserver), pause otherwise.
- Load Three.js from a pinned cdnjs or unpkg URL (exact version, at least two weeks old, with a UMD or module build that works in a plain page). Add `<script defer>` in the head or import it in the module. Confirm the URL returns 200 before using it.

## Fallback
If WebGL is unavailable, or Three.js fails to load, keep the current SVG/CSS exploded phone as the fallback, so the section still works.

## Constraints
- Plain HTML/CSS/JS in `landing/`. One pinned Three.js dependency is allowed. No other libraries.
- Keep the existing copy, layout and section ids.
- Keep the total new JS reasonably small. The 3D module should be a separate file, e.g. `landing/assets/phone3d.js`, and be loaded only when the section is near the viewport.
- Do not touch `design/` except your own report, and `.dashboard/`.
- No deploy, no commit.

## Checks
- Open the page in a headless browser at 390 px and 1440 px wide, and confirm the 3D phone renders, the tap-to-highlight works, and there is no horizontal scroll. Check the console for errors. If you can't run a browser, say so.
- Confirm the fallback works with WebGL disabled.

## Report
1. Update `design/REPORT.md` with a "3D phone" section: files, Three.js version and URL, what each internal layer is, and any limits.
2. Reply to me at `w2:p9K` with one line: `herdr agent prompt w2:p9K "<summary>"`.
