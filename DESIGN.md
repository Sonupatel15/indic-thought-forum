---
name: Indic Thought Forum
description: "A living heritage forum connecting Indic knowledge, thoughtful dialogue, and purposeful action."
colors:
  heritage-cream: "#f7f5ef"
  clear-white: "#ffffff"
  deep-blue-charcoal: "#182b36"
  muted-slate: "#58656d"
  saffron-orange: "#e97121"
  burnt-saffron: "#a94309"
  warm-stone: "#dedfd8"
  sandstone: "#eeeae1"
  pale-stone: "#eeece5"
  soft-ivory: "#fbfaf6"
  raised-porcelain: "#fdfcf9"
  weathered-slate: "#87908c"
  dark-terracotta: "#8a3608"
  pale-saffron: "#ffcf94"
  heritage-navy: "#162d3a"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2.5rem, 5.25vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 1.16
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.625rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.8
  lead:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1rem, 1.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1.6
    letterSpacing: "0.16em"
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 800
    lineHeight: 1.5
  button-small:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1.5
  filter:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.5
  navigation:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.5
  serif-accent:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.025em"
rounded:
  default: "5px"
spacing:
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.saffron-orange}"
    textColor: "#142a36"
    typography: "{typography.button}"
    rounded: "{rounded.default}"
    padding: "13px 25px"
    height: "51px"
  button-small:
    backgroundColor: "{colors.saffron-orange}"
    textColor: "#142a36"
    typography: "{typography.button-small}"
    rounded: "{rounded.default}"
    padding: "11px 17px"
    height: "44px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.clear-white}"
    typography: "{typography.button}"
    rounded: "{rounded.default}"
    padding: "13px 25px"
    height: "51px"
  button-light:
    backgroundColor: "#fbf6ed"
    textColor: "{colors.deep-blue-charcoal}"
    typography: "{typography.button}"
    rounded: "{rounded.default}"
    padding: "13px 25px"
    height: "51px"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.deep-blue-charcoal}"
    typography: "{typography.filter}"
    rounded: "{rounded.default}"
    padding: "9px 18px"
    height: "44px"
  card-default:
    backgroundColor: "{colors.soft-ivory}"
    textColor: "{colors.deep-blue-charcoal}"
    rounded: "{rounded.default}"
    padding: "30px"
  field-default:
    backgroundColor: "{colors.clear-white}"
    textColor: "{colors.deep-blue-charcoal}"
    typography: "{typography.body}"
    rounded: "{rounded.default}"
    padding: "12px 13px"
    height: "45px"
  navigation-active:
    backgroundColor: "#eee8df"
    textColor: "{colors.burnt-saffron}"
    typography: "{typography.navigation}"
    rounded: "{rounded.default}"
    padding: "10px"
  icon-tile:
    backgroundColor: "#f2e7d8"
    textColor: "{colors.burnt-saffron}"
    rounded: "{rounded.default}"
    size: "55px"
---

# Design System: Indic Thought Forum

## Overview

**Creative North Star: "The Living Heritage Forum"**

Indic Thought Forum's visual language makes heritage feel active and open to inquiry, rather than frozen as display. Warm paper surfaces, blue-charcoal typography, saffron actions, and the site's cultural imagery frame a contemporary space for learning, dialogue, and purposeful participation.

The system should help a broad, young audience learn and understand. Use serious, knowledge-led hierarchy, and present data clearly when the content calls for it; visualization should explain real information, not decorate the page or imply unsupported impact. Controls are clear and confident, while cards remain quiet and well structured.

**Key Characteristics:**
- Living heritage expressed through contemporary content and real community imagery.
- Warm neutrals, a focused saffron accent, and deep navy anchors.
- Clear, serious information hierarchy with purposeful calls to action.
- Quiet, lightly bordered surfaces with restrained ambient depth.

## Colors

The palette pairs warm cream and stone neutrals with blue-charcoal text, a saffron action accent, and heritage navy for strong section anchors.

### Primary
- **Saffron Orange**: The high-visibility action color for primary buttons and selected visual accents. Keep it purposeful so calls to action remain easy to find.

### Secondary
- **Burnt Saffron**: A deeper accent for eyebrow labels, inline links, icons, and emphasis that must remain legible on light surfaces.

### Tertiary
- **Heritage Navy**: A grounding color for image overlays, media frames, and dark call-to-action or quote sections; pair it with light text and the pale saffron focus treatment.

### Neutral
- **Heritage Cream** and **Clear White**: The main page ground and clean control surface.
- **Deep Blue-Charcoal** and **Muted Slate**: High-priority text and quieter supporting copy.
- **Warm Stone**, **Sandstone**, and **Pale Stone**: Dividers and softly differentiated section backgrounds.
- **Soft Ivory** and **Raised Porcelain**: Card and raised content surfaces.
- **Weathered Slate**: Form-control borders.
- **Dark Terracotta** and **Pale Saffron**: Focus indicators on light and dark surfaces respectively.

**The Action Accent Rule.** Use bright saffron for primary actions and short signals; use the deeper accent for supporting text and icon details. Let neutral text and surfaces carry the reading experience.

## Typography

**Display Font:** Manrope (with sans-serif fallback)

**Body Font:** Manrope (with sans-serif fallback)

**Label/Mono Font:** Manrope for labels; no mono family is established.

**Editorial Accent:** Georgia, with Times New Roman and serif fallbacks, is reserved for the wordmark and occasional quotation or editorial note.

**Character:** Manrope supplies a consistent, contemporary voice across display and reading sizes. A restrained serif accent adds editorial contrast without competing with the main information hierarchy.

### Hierarchy
- **Display** (600, responsive clamp, 1.16 line-height): Image-led homepage hero headlines.
- **Headline** (600, responsive clamp, 1.25 line-height): Page and section headings.
- **Title** (600, 1.375rem, 1.25 line-height): Card titles and subsection headings.
- **Body** (400, 1rem, 1.8 line-height): Reading copy and general content; reading sections use a constrained measure.
- **Lead** (400, responsive clamp, 1.7 line-height): Introductory copy that needs more emphasis than body text.
- **Label** (800, 0.75rem, 0.16em tracking, uppercase): Eyebrows and short category labels.
- **Serif accent** (600, 1.125rem in the wordmark, 1.4 line-height): Brand and editorial moments only.

**The One Sans Voice Rule.** Keep Manrope as the display and body workhorse. Use serif type only for the existing brand and editorial accents, never for long-form body copy.

## Layout

The site uses a centered, wide content frame with generous section rhythm, readable text widths, and responsive grids. The main container caps at 1200px, with 48px desktop gutters; it tightens to 32px below 1180px and 20px below 760px. At very narrow widths, the header uses a 16px gutter.

The navigation becomes a vertically arranged menu at 980px and below. Three-column card and event grids reduce to two columns for tablet-sized layouts, then to one column on narrow phones. The Sankalpa table changes to expandable row details at 1024px and below. Keep the hero image-led and full bleed; it grows on wide screens and gives the headline and actions room to remain readable on mobile.

Sections use the shared spacing token, reduced at tablet and phone breakpoints. Favor clear reading order and purposeful whitespace over dense dashboard-like packing. Keep content edges aligned to the same container frame.

## Elevation & Depth

The chosen depth language is tonal layering with subtle borders and restrained, soft ambient shadows. Most cards remain flat at rest; their surface tint, fine border, and spacing do the structural work. Soft shadow appears sparingly around overlays, navigation, and media affordances to separate them from the page without making every card appear raised.

**The Ambient-Only Shadow Rule.** Shadows separate floating or interactive elements from their surroundings; do not use heavy elevation as the default card hierarchy.

## Shapes

Use the shared gently softened corner throughout buttons, cards, form controls, and image frames. Borders are thin and quiet, providing structure without turning every section into a boxed panel. The system favors compact rectangular controls; circular shapes belong to specific icon or media affordances, not the general card language.

## Components

### Buttons
- **Character:** Clear and confident controls that make the next action obvious.
- **Shape:** Use the shared corner token and a compact, sturdy silhouette.
- **Primary:** Saffron fill with dark text, strong Manrope weight, and a small directional icon where it clarifies the action.
- **Hover / Focus:** Hover lifts the control slightly and warms its fill. Keep the visible focus outline high-contrast: a dark terracotta ring on light surfaces and pale saffron on dark surfaces.
- **Outline / Light:** The outline version belongs on dark imagery or sections; the light version belongs on dark backgrounds. Do not substitute either for a primary action on a light page.

### Chips
- **Style:** Quiet, transparent filter controls with a thin neutral border.
- **State:** The selected filter fills with deep blue-charcoal and switches to white text. Preserve a clear pressed state and a generous touch target.

### Cards / Containers
- **Corner Style:** Use the shared corner token.
- **Background:** Soft ivory, raised porcelain, paper, or navy according to the card's role.
- **Shadow Strategy:** Use surface tone and border first; reserve soft ambient shadow for floating overlays and media details.
- **Border:** Prefer a thin warm-neutral edge over a strong outline.
- **Internal Padding:** Follow the card's role and breakpoint; maintain consistent alignment between related cards.

### Inputs / Fields
- **Style:** White surface, one-pixel weathered-slate border, shared corner, and comfortable internal spacing.
- **Focus:** Use a three-pixel dark-terracotta outline with a small offset; keep the border in the same focus color.
- **Error / Disabled:** Use clearly differentiated error and disabled states; preserve readable text and never rely on color alone to communicate status.

### Navigation
- **Desktop:** Sticky, lightly translucent cream header. Keep the wordmark at one end and compact links at the other; indicate the active route with both accent color and a short underline.
- **Mobile:** Replace the horizontal links with a full-width stacked menu at the established navigation breakpoint. Retain the active-page treatment and the high-contrast support action.
- **Brand:** Preserve the supplied logo and wordmark treatment; do not redraw or approximate the identity.

### Hero
- **Image:** Use the supplied heritage panorama with a dark navy overlay so the subject remains atmospheric while the white headline stays readable.
- **Type:** Keep the headline large, left-aligned, and concise, with the second line receiving a pale saffron accent.
- **Actions:** Place the primary saffron action before the outlined secondary action; retain the lower-edge supporting line and in-page discovery link.
- **Responsive behavior:** Preserve the image-led hierarchy at mobile sizes, adjusting crop, overlay, and action stacking rather than replacing the artwork with a generic gradient.

## Do's and Don'ts

### Do:
- **Do** preserve the official logo, heritage artwork, and actual community photography.
- **Do** use the established Manrope hierarchy, warm neutral surfaces, saffron action accent, and deep navy anchors.
- **Do** keep data displays serious and legible, with clear labels, units, and context; use only confirmed information.
- **Do** maintain readable text, visible focus, and clear state distinctions across light and dark surfaces.
- **Do** use generous container alignment and reflow layouts instead of introducing horizontal overflow.

### Don't:
- **Don't** introduce a new color family, display typeface, or competing visual identity without an explicit redesign decision.
- **Don't** replace the heritage hero with a gradient-only banner or add decorative data charts without real information to explain.
- **Don't** use heavy shadows, pill-shaped cards, or ornamental borders as a default treatment.
- **Don't** invent metrics, endorsements, event details, or outcomes to make the site appear more authoritative.
