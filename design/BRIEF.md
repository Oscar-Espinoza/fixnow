# FixNow landing: build brief (for Codex)

## Goal
Build a static landing page for FixNow (Apple repair and sales service, Buenos Aires, Argentina) in `/home/oscar/Projects/fixnow/landing/`:

- `landing/index.html`
- `landing/styles.css`
- `landing/assets/` (logo files, favicon)

It will be deployed to a Hostinger static site. Plain HTML and CSS. No build tools, no frameworks. Minimal JS only if the source needs it (check the source; it probably needs none).

## Source of truth
- **Layout and copy:** `design/source/Taller.dc.html` (desktop, 1440px wide) and `design/source/TallerMovil.dc.html` (phone, 390px wide). These are the "B · Taller" concept, the approved design.
- **Ignore** the Chat concept entirely (it was removed). Do not link to `Chat.dc.html`.
- **Brand:** `design/brand/` has rendered pages of the brand book (`bp5-05.png` logo, `bp6-06.png` logo on color, `bp8-08.png` isologo, `bp12-12.png` and `bp13-13.png` typography, `bp15-15.png` and `bp16-16.png` color and contrast, `logo_hi-05.png` high-res logo page). Use the values below. The brand book wins over the source file's colors and fonts.

## One responsive page, not two
Build a single `index.html` that uses the desktop layout at 900px and wider, and the phone layout below 900px. Use the phone artboard's content and structure for the small size. Keep the section ids from the source: `#top`, `#proceso`, `#sucursales`, `#diagnostico`, `#accesorios`, `#contacto`. No horizontal page scroll. 16px side gutter on phones.

## Brand overrides (apply everywhere)
The source uses a different palette and fonts. Replace them as follows, and keep the values as CSS custom properties on `:root`:

| Role | Source value | Brand value |
|---|---|---|
| Primary blue (accent, buttons, logo top) | `#1E5EFF`, `#4D85FF` | `#0066FF` |
| Light background | `#F2F3F5`, `#EEF0F3`, `#E6E9EF` | `#F6F6F6` |
| Mid grey (dividers, secondary) | `#C3C9D4`, `#9AA3B2` | `#CCCCCC` |
| Secondary blue | n/a | `#2651A7` |
| Black (text, dark sections) | `#07080A`, `#0F1115`, `#0B0B0F` | `#141414` |
| Gradient for dark hero or feature blocks | n/a | `#3333CC` to `#4997F6` (blue gradient, as in the brand book's negative) |
| Body grey text | `#5E6673`, `#4A515C` | keep the readable value; check 4.5:1 contrast on `#F6F6F6` |

Typography: the brand font is **Gotham** (Book, Medium, Ultra). It is licensed and not on Google Fonts. Use this stack: `font-family: 'Gotham', 'Montserrat', system-ui, sans-serif`. Load Montserrat from Google Fonts (weights 400, 500, 800). Use Ultra-like weight (800) for titles and Book/Medium (400/500) for body. Replace JetBrains Mono (the source's "mono" labels) with Montserrat, uppercase, letter-spaced, small. Do not add a monospace font.

## Logo
The brand book (pages 5 to 10 of the PDF) defines:
- **Horizontal** and **vertical** logotype. The isologo is a rounded trapezoid with an ECG line. The top half is blue `#0066FF`, the bottom half is grey iron (about `#BBBFC3`, check against `bp5-05.png`). "Fix" is grey, "Now" is blue, in a heavy sans.
- **Negative** (for dark or blue backgrounds): everything white or light grey.
- **Isologo** alone for favicon, avatar, and small spaces.
- **Clear space:** keep the margin shown on the brand book's page 1.5.
- Do not distort, rotate, or recolor the logo.

Create in `landing/assets/`:
- `logo-horizontal.svg`, `logo-vertical.svg`, `logo-horizontal-white.svg`, `isologo.svg`
- `favicon.png` (or `.svg`) from the isologo

Preferred: trace or redraw the logo as clean SVG, checked against `bp5-05.png` and `bp8-08.png`. If the SVG does not match the brand book, export a transparent PNG at 1200px or more wide from `logo_hi-05.png` (crop the logo area) and say so in your report.

## Copy
Keep the Spanish copy from the source as written. Keep placeholders such as `[YOUR PRICE]` and `Lorem ipsum` in the same places the source has them. Do not invent facts, prices, or stats.

Keep the `wa.me` links as they are in the source. Mention in the report that they are placeholders if the numbers look like placeholders.

## Constraints
- Images: the source has no real image files (it uses placeholder boxes). Keep the placeholder boxes, and make sure they have an alt text or aria-label.
- Accessibility: real `<button>` and `<a href>` elements, labels on inputs, alt text on images, visible focus styles.
- Do not touch `design/source/`, `design/brand/`, or `.dashboard/`.
- Do not run `hostinger`, `git commit`, `git push`, or any deploy. Claude does the deploy.

## Self-check before reporting (quick)
- Every `src`, `href`, and `url()` in `index.html` and `styles.css` points to a file that exists in `landing/`, or to a real external URL.
- No leftover source colors (`#1E5EFF`, `#07080A`, `#4D85FF`) and no `JetBrains`.
- No `Chat.dc.html` links.

Do not open a browser or render screenshots unless something looks broken and you need to confirm it.

## Report
When finished:
1. Write `design/REPORT.md` with: the file list, the logo method used (SVG or PNG), any decisions you made, and anything you could not match from the source.
2. Send Claude a short message with `herdr agent prompt w2:p9K "<short summary and the path to design/REPORT.md>"`.
3. Keep the message short. Do not paste the whole report.
