---
name: Official Editorial
colors:
  surface: '#fbf9fb'
  surface-dim: '#dbd9db'
  surface-bright: '#fbf9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f5'
  surface-container: '#efedef'
  surface-container-high: '#e9e7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1c1d'
  on-surface-variant: '#44474c'
  inverse-surface: '#303032'
  inverse-on-surface: '#f2f0f2'
  outline: '#74777d'
  outline-variant: '#c4c6cd'
  surface-tint: '#4e6077'
  primary: '#00050e'
  on-primary: '#ffffff'
  primary-container: '#0b1f33'
  on-primary-container: '#7587a0'
  inverse-primary: '#b5c8e3'
  secondary: '#44617f'
  on-secondary: '#ffffff'
  secondary-container: '#bddafd'
  on-secondary-container: '#43607d'
  tertiary: '#090300'
  on-tertiary: '#ffffff'
  tertiary-container: '#2e1901'
  on-tertiary-container: '#a27f5b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#b5c8e3'
  on-primary-fixed: '#081d30'
  on-primary-fixed-variant: '#36485e'
  secondary-fixed: '#d0e4ff'
  secondary-fixed-dim: '#acc9ec'
  on-secondary-fixed: '#001d34'
  on-secondary-fixed-variant: '#2c4966'
  tertiary-fixed: '#ffdcbb'
  tertiary-fixed-dim: '#e7bf97'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#5d4123'
  background: '#fbf9fb'
  on-background: '#1b1c1d'
  surface-variant: '#e4e2e4'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.18em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style
The design system embodies the intersection of governmental authority and luxury editorial design. It targets a high-end clientele requiring sworn translations and visa services, evoking feelings of absolute trust, historical permanence, and meticulous precision.

The style is **High-Contrast / Modern**, drawing heavily from the aesthetics of high-security documents (passports, banknotes) and premium broadsheet layouts. It utilizes expansive whitespace, rigorous grid alignments, and fine-line detailing to convey "official state" legitimacy through a "luxury fashion" lens.

## Colors
The palette is anchored by **Deep Midnight Navy**, representing administrative authority, set against a **Warm Ivory Paper** background that mimics high-quality tactile stationery. 

- **Primary & Secondary:** Used for deep structural elements, headers, and primary actions.
- **Brushed Brass:** Reserved for highlights, hairlines, and premium calls to action.
- **Seal Green & Stamp Red:** Functional colors inspired by physical ink stamps used on legalized documents.
- **Surface Tints:** Use the Ivory base for all backgrounds to avoid the sterile "digital white" look.

## Typography
The typography contrasts an authoritative, high-contrast serif for headings with a systematic, utilitarian sans-serif for functional text.

- **Headings:** Use Playfair Display with tight tracking. Headlines should feel "engraved." 
- **Body:** Inter provides the necessary legibility for complex legal information. Maintain a generous line-height of 1.7 for a spacious, luxury feel.
- **Labels:** Always in uppercase with wide letter-spacing (0.18em) to mimic document headers and official seals.
- **Language:** All microcopy and UI labels must follow Belgian French conventions (e.g., using "Septante" and "Nonante" where applicable and preserving proper spacing before punctuation like colon/semicolon).

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop, centered to create the impression of a physical document placed on a desk.

- **Grid:** A 12-column system with 24px gutters.
- **Margins:** Large outer margins (64px+) on desktop to emphasize exclusivity.
- **Rhythm:** Spacing should be disciplined and symmetrical. Use multiples of 8px for vertical rhythm.
- **Separation:** Prefer 1px Brass hairlines over excessive padding to define sections, maintaining the "ledger" aesthetic.

## Elevation & Depth
This design system rejects digital shadows in favor of **Tonal Layers** and **Physical Metaphors**.

- **Shadows:** Avoid drop shadows. Instead, use thin 1px borders in `#DDD8CE` or `#C6A15B` to create separation.
- **Background Blurs:** Use a soft "glass" effect for navigation bars that scroll over content, but maintain the Warm Ivory tint.
- **Imagery:** Photography must be desaturated with a Navy overlay (`#0B1F33` at 40-60% opacity) to ensure it feels part of the document rather than a separate window.
- **Guilloche Patterns:** Use subtle, low-opacity vector patterns in the background of primary sections to mimic security paper.

## Shapes
Shapes are intentionally **Sharp and Precise**.

- **Radius:** Standard components use a 3px to 4px radius. This is just enough to soften the edge without losing the professional "cut paper" look.
- **Seals:** The only exception to the sharp-corner rule is the **Official Seal Motif**, which is a perfect circle used for badges, status indicators, or "Certified" markers.
- **Containers:** Cards should have no shadow, defined only by a 1px border or a slight shift in background tone (e.g., a slightly cooler Ivory).

## Components
- **Buttons:** Sharp corners (3px). Primary buttons are Deep Midnight Navy with Ivory text. Secondary buttons are Ghost style with a Brass outline and Brass text.
- **Input Fields:** Bottom-border only (ledger style) or a full 1px hairline border. Focus states use a 1px Brass border—never a thick glow.
- **Chips/Status:** Use the Seal Green for "Validé" and Stamp Red for "Urgent" or "Express." These should look like ink stamps, slightly desaturated.
- **Dividers:** Always 1px. Use Brass for thematic sections and Hairline Grey for list items.
- **Cards:** No elevation. Use a background fill of 2% Navy over the Ivory base or a simple 1px border.
- **Lists:** Data-heavy lists (e.g., visa requirements) should use monospace-influenced numerals for a technical, precise appearance.