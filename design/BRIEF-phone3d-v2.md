# FixNow landing: put the 3D phone into the diagnostic card (v2)

## Problem
1. The 3D exploded phone was added as a separate section/block. Remove it.
2. The diagnostic section already has a phone card (left list, right phone + text, see the desktop layout). The animation must live inside that card, replacing the static phone drawing there.
3. The markup has two copies of the diagnostic heading ("¿Qué necesitás reparar?", around lines 100 and 157 of `landing/index.html`), and the exploded phone appears in both copies. Keep one diagnostic section. Use one phone instance per visible layout (desktop card / mobile card), not duplicate DOM.

## What to do
- In `landing/index.html`: remove the extra exploded-phone section and the duplicate heading/markup, keeping the desktop card layout (list left, phone + detail right) for >= 900px and the stacked mobile layout below 900px. Keep all diagnostic ids that the JS relies on.
- The phone in the card should be the 3D phone from `assets/phone3d.js`. Keep the SVG phone only as the fallback.
- Keep the caption/note as is ("Ilustración conceptual · iPhone 18 Pro"). Do not claim the internals are real.
- Tapping a diagnostic in the list selects the matching part and updates the card text, as now.

## Realism (as far as code allows)
- Improve materials: brushed titanium frame with subtle roughness variation, glass with a soft reflection, screen with a dark gradient, camera lenses with glass and rings, side buttons.
- Add small plausible details that are not claims about real parts: a few screws, connectors, and a thin PCB texture. Keep them generic (no part numbers, no Apple branding).
- Lighting: a soft studio environment map plus key and rim light. No hard outlines.
- Keep reduced-motion and the SVG fallback.

## Checks
- Render at 390 px and 1440 px. Confirm: only one phone per visible layout, no horizontal scroll, the list selection still drives the card, and the removed section is gone.
- Check the console for errors.

## Report
- Update `design/REPORT.md` with the changes. Reply to me at `w2:p9K` with one line. No deploy, no commit.
