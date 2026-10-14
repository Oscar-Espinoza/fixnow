# FixNow Design System

Brand reference for FixNow, an Apple repair and sales service in Buenos Aires, Argentina ("Servicios y venta Apple"). Source: the FixNow Brand Book (Figurattez, 2023). Tokens live in `tokens.json`.

## Content fundamentals

- **Language:** Spanish (Rioplatense). Use "vos" or the plain imperative consistent with the existing copy ("Reparamos. Actualizamos.", "Visitanos en nuestras sucursales").
- **Tone (brand book 0.1):** a sliding scale between the poles. Fun ↔ serious: sits near *serious*. Formal ↔ casual: near *casual*. Respectful ↔ irreverent: near *respectful*. Enthusiastic ↔ passionate: *passionate*. In practice: direct, confident, friendly, knowledgeable. Never jokey, never stiff.
- **Headlines:** short, imperative, two beats. Example: "Reparamos. Actualizamos." Keep them to one or two lines.
- **Support copy:** one plain sentence. Name what the customer gets, not how the shop works. Example: "Tenemos los mejores equipos con garantía de calidad."
- **Placeholders:** where a fact is missing (prices, addresses, phone numbers), write a visible placeholder such as `[YOUR PRICE]`. Never invent prices, stats or testimonials.

## Visual foundations

**Color.** Blue is the brand; the rest is neutral. Use the palette by share, not equally:
- Ground: `surface-100` (#f6f6f6) with white `surface-000` cards. About 70% of any layout.
- Ink: `ink` (#141414) for text and dark sections.
- Blue: `brand-blue` (#0066ff) for the primary action and one key accent per screen. Keep blue under 15% of a layout.
- Gradient (`brand-gradient-start` → `brand-gradient-end`): hero and feature blocks only, with white text. Never on small text blocks.
- Grey: `iron-grey` (#b9bfc3) is part of the logo; use it as decoration, never for text.
- Contrast: `brand-blue` on `surface-100` is 4.47:1, just under the 4.5:1 text minimum. Use `text-blue` (#0057d9) for blue text and links; keep `brand-blue` for fills, large headings and icons.

**Typography.** Brand face: Gotham (Book 400, Medium 500, Ultra 800), licensed; not hosted here. Until the licensed files are added, the stack falls back to Montserrat (Google Fonts), the nearest open match.
- Titles: Ultra (800), tight leading.
- Body: Book (400) and Medium (500) for emphasis.
- Labels: Medium, uppercase, slight letter-spacing, `ink-muted`.

**Spacing and layout.** Standard steps 8 / 16 / 24 / 48 px (`space-2`, `space-4`, `space-6`, `space-12`). Side gutter 16 px on phones. Content sits on a light ground with generous space; avoid crowding.

**Shape.** Radii 12 px (controls and cards) and 24 px (feature panels). The logo's trapezoid mark has its own rounded corners; never round it further.

**Imagery.** Real photos of repair work, devices and the shop. Prefer close, natural light. Overlay type on photos only over a dark scrim so contrast holds. No stock-looking gradient overlays on people.

**Motion.** Subtle and short. Fades and small slides (200 to 300 ms). Respect `prefers-reduced-motion`.

## Logo

![Horizontal logo](/_blob/a28ff0a4225bdadfbbf709c996135d35)

![Vertical logo](/_blob/f477c190c03bf82b4ba78b10405542f0)

![Isologo](/_blob/bb1626ae7ad93c38e406ab9e5e53a846)

Negative (white) version: ![Horizontal logo, white](/_blob/7945ee922e9da529200c45b265a0b10a)

The logo is a horizontal or vertical logotype: an isologo (rounded trapezoid with an ECG heart-rate line, top half `brand-blue`, bottom half `iron-grey`) plus the "Fix" (grey) / "Now" (blue) wordmark in a heavy sans.

- **Positive:** the colors above, on white or `surface-100`.
- **Negative:** all white, on `brand-gradient` or `ink`. Use the white version, never the colored one.
- **Isologo alone:** favicon, avatar, and any space too small for the wordmark (below 25% scale of the logotype, the brand book's minimum).
- **Clear space:** keep the margin shown in brand book page 1.5 on every side.
- **Never:** stretch, rotate, recolor, add shadows or outlines, place on busy photos, or rebuild the wordmark in another font.

## Iconography and patterns

- **Patterns:** the isologo repeated on a grid (brand book 4.1), at low contrast, as a background texture only.
- **Icons:** simple line icons with rounded caps, in `ink` or `brand-blue`. Use device icons (phone, laptop, earbuds, mouse) from the same style family.
- **Social avatar:** isologo on the blue gradient, rounded square or circle.

## Usage rules

- Name tokens, not hex values, in new components.
- Text is `ink` on `surface-100` or `surface-000`, or white on `brand-gradient-start`/`ink`. Anything else needs a contrast check first.
- Buttons: primary = `brand-blue` fill with white text (4.83:1); secondary = white fill with `ink` text and a `line` border.
