# FixNow landing: phone exploded view + floating WhatsApp (brief for Codex)

## Goal
1. Add the floating WhatsApp button that is missing from the current landing.
2. Add one animated phone visual to the diagnostic section (`#diagnostico`): an exploded view of an iPhone 18 Pro (latest released model, per Wikipedia, released 2026-09-18). Mobile first.

## Asset rule (important)
Do not use Apple's photos, renders or marketing images. Build an original illustration in SVG + CSS. Do not copy the reference screenshots (`/home/oscar/Pictures/Screenshots/Screenshot from 2026-10-13 15-24-28.png` and `...15-24-18.png`) pixel for pixel; use them only for layout and motion ideas. Internal layers are illustrative, not an accurate teardown. Do not label them as Apple parts.

## 1. Floating WhatsApp button
- Fixed bottom-right, 56px circle on mobile, WhatsApp green or brand blue `#0066FF`, icon + `aria-label="Escribinos por WhatsApp"`.
- Links to the same `https://wa.me/` placeholder as the rest of the page (keep the placeholder; do not invent a number).
- Respect `env(safe-area-inset-bottom)`. Don't cover the sticky header or the diagnostic buttons.

## 2. Exploded phone (diagnostic section)
- Shape: rounded rectangle, 18 Pro proportions (about 1 : 2.16), titanium-grey frame, edge-to-edge screen with dynamic island. Light, clean, brand colors (`#141414`, `#CCCCCC`, `#0066FF`, `#F6F6F6`).
- Layers, top to bottom: glass front, screen panel, battery (blue), logic board (grey with a simple trace pattern), rear glass/back cover. Each layer is a separate element.
- Motion: on scroll into view, layers separate vertically (about 60 to 90px apart on mobile, wider on desktop), then settle when the user taps a diagnostic (screen, battery, back glass, camera, water damage). Tapping a diagnostic highlights its layer in `#0066FF` and shows its label. Keep it in sync with the existing diagnostic list.
- Reduced motion: no animation, show the layers in their separated state.
- Mobile first: the phone visual sits above the diagnostic list, centered, max width about 280px on phones, 420px on desktop. No horizontal scroll.
- Accessibility: visuals are `aria-hidden`; the diagnostic buttons stay the real controls.

## Constraints
- Plain HTML/CSS/JS, no libraries, no network calls beyond existing fonts.
- Keep the existing layout, copy and section ids. Only add what is described here.
- Do not touch `design/`, `.dashboard/` or any file outside `landing/` except the brief's own report.
- No deploy, no commit.

## Report
1. Update `design/REPORT.md` with a short "Phone + WhatsApp" section: files changed, asset method, what is illustrative.
2. Send Claude a short message: `herdr agent prompt w2:p9K "<one-line summary>"`.
