# ITF Website Revision Checkpoints

Audit date: 2026-11-09 (IST).
Source of requirements: the supplied 402-line website revision brief.
Completed checkpoints: **0 - Audit and Setup**, **1 - Home Page**, **2 - Footer**, **3 - About Page**, **4 - Sankalpas Page**, **5 - Updates Page**, **6 - Calendar Page**, **7 - Contact Page**, and **8 - Site-wide Design Consistency and Responsiveness**.
Next checkpoint: **9 - Code Quality and Architecture**, awaiting user confirmation.
H-1 through H-12, F-1 through F-3, A-1 through A-5, S-1 through S-4, U-1 through U-9, C-1 through C-7, and CT-1 through CT-2 are verified complete. Other later-checkpoint requirements remain deferred.

## Working agreement

- Implement only the supplied requirements; preserve other wording, layouts, behavior, and assets.
- Complete one checkpoint at a time, validate it, update this document, and make a separate commit.
- Stop after each checkpoint and wait for explicit confirmation before starting the next.
- Use existing assets in `public/images`; do not introduce stock or placeholder images.
- Record every asset move as `old path -> new path` and update every consumer.
- Do not infer missing dates, content, asset ownership, or optional-feature decisions; record and ask.
- Preserve the existing event-card layout and featured-plus-list podcast layout except for requested changes.
- Test phones, tablets, laptops, desktops, and large-screen layouts; distinguish emulation from physical-device testing.

Status vocabulary: **Not started**, **In progress**, **Done**, **Blocked**.
A checked item means that requirement has been verified, not merely inspected.
For unstarted checkpoints, the audit below is a baseline, not implementation completion.

## Full requirement checklist

### Checkpoint 0 - Audit and Setup

- [x] **C0-1 | Done** - Review project structure, page routes, shared components, styles, and image folders; list every event folder and poster.
- [x] **C0-2 | Done** - Create this root-level document with the entire checkpoint checklist before editing application code.
- [x] **C0-3 | Done** - Record existing labels, image references, hard-coded data, and relevant behavior before changes.
- [x] **C0-4 | Done** - Run baseline build and relevant checks, record outcomes, commit only the checkpoint document, and stop for confirmation.

### Checkpoint 1 - Home Page

- [x] **H-1 | Done** - Rename each event's posters consistently within its event folder, use the supplied posters, and show events latest first while preserving the existing layout. All seven years confirmed as 2026 (Q1).
- [x] **H-2 | Done** - Move the five confirmed movement-gallery photos and all their uses to `public/images/sankrant-sanu/event-photos`, rename descriptively, preserve the display, and remove the approved missing sixth gallery record (Q2).
- [x] **H-3 | Done** - Remove "Rooted in heritage. Driven by purpose." and its accompanying dot.
- [x] **H-4 | Done** - Verify hero branding; use properly sized real text for "Indic Thought Forum, Bharateeya Sabhyata Sankalpa" rather than an image where applicable.
- [x] **H-5 | Done** - Remove the purpose-section photo and the "01 /" prefix; keep "Our Purpose" without changing unrelated copy.
- [x] **H-6 | Done** - Remove "02 /" and principle-card numbers 01, 02, and 03; size the "Because an idea finds its purpose only when it becomes action." line appropriately.
- [x] **H-7 | Done** - Use subject-appropriate icons or logos in "Find Your Way"; preserve the section's content and layout; remove its "03 /" prefix as confirmed.
- [x] **H-8 | Done** - Remove "04 /"; keep exactly three latest event cards; match each supplied poster to its event and respect its measured intrinsic size/aspect ratio without cropping or stretching.
- [x] **H-9 | Done** - Remove "05 /" from "Your Journey with ITF".
- [x] **H-10 | Done** - Set Events to "10+" and Sankalpas to "30+" in "Our Shared Lakshya"; retain the unrelated members statistic.
- [x] **H-11 | Done** - Remove "06 /", "ITF / Conversations" image overlays, "Privacy-first preview", and the specified pre-load YouTube/Google disclosure text; preserve working player controls and truthful error states.
- [x] **H-12 | Done** - Remove "07 /" from the homepage moments/gallery section.

### Checkpoint 2 - Footer (Site-wide)

- [x] **F-1 | Done** - Use and correctly size the official ITF logo. Source: `public/images/itf-assets/ITF-Logo.png`; use a lossless, size-bounded local display rendition without changing the original.
- [x] **F-2 | Done** - Ensure the full brand name and tagline are aligned, properly formatted real text.
- [x] **F-3 | Done** - Add X and WhatsApp beside the existing social links, using the exact supplied URLs.

### Checkpoint 3 - About Page

- [x] **A-1 | Done** - Retain and refine the existing shared text-based hero; preserve its original title, description, breadcrumb, and shared layout instead of introducing a duplicate or photo hero.
- [x] **A-2 | Done** - Remove both intro and CTA sparkles on About and its Philosophy compatibility route only; keep other pages unchanged until their checkpoints.
- [x] **A-3 | Done** - Remove the image beside "The Thought Behind the Forum" and use the existing reading-width layout without an empty image column.
- [x] **A-4 | Done** - Remove numbers 01, 02, and 03 from "Principles We Practice"; preserve the principle content/icons and journey-step numbers.
- [x] **A-5 | Done** - Preserve the centered guiding-belief quotation, label, and explanation in an inset light content panel rather than a full-width dark ending-like band.

### Checkpoint 4 - Sankalpas Page

- [x] **S-1 | Done** - Retain the existing shared `PageIntro` hero, consistent with other pages; do not duplicate it.
- [x] **S-2 | Done** - Remove the intro and CTA Gemini-like ornaments on Sankalpas only.
- [x] **S-3 | Done** - Replace every "DJ" reference in tracker owner and next-action data with "Dhananjay", including combined owners and possessives.
- [x] **S-4 | Done** - Align the pathway eyebrow, heading, and full description; balance heading wrapping and constrain description width for phones through TV-sized screens.

### Checkpoint 5 - Updates Page

- [x] **U-1 | Done** - Remove the Gemini-like ornament.
- [x] **U-2 | Done** - Order the main sections Podcasts -> Events -> Plan Your Next Conversation -> Posts -> Gallery; keep relevant section navigation in sync.
- [x] **U-3 | Done** - Verify and include every podcast from the official YouTube channel, newest first; show three initially and three more per "Load more" click; preserve the current podcast layout.
- [x] **U-4 | Done** - Include all events newest first, show three initially, and reveal three more per click until exhausted; remove History/Ideas & Dialogue and similar event filters/categories from this section.
- [x] **U-5 | Done** - Place "Plan Your Next Conversation" immediately after Events.
- [x] **U-6 | Done** - Rename Community Posts to Posts; remove the existing event announcement; use embeds or Instagram-linked cards for all five supplied posts, initially three with "Load more" for the remainder.
- [x] **U-7 | Done** - Show one gallery without Community/Conversation category splits.
- [x] **U-8 | Done** - Include the supplied X and WhatsApp links in social channels. Completed through F-3's shared data/component update; Updates cards and responsive layout are verified.
- [x] **U-9 | Done** - Remove the specified curated-feed text and pre-load YouTube/Google disclosure text.

### Checkpoint 6 - Calendar Page

- [x] **C-1 | Done** - Remove the Gemini-like ornament.
- [x] **C-2 | Done** - Feature the confirmed November 29, 2026 upcoming event above the calendar; shared event data is a prerequisite, but the featured UI remains checkpoint 6.
- [x] **C-3 | Done** - Add the Ganeshaiah event to November 29, 2026 with verified poster details. Completed as H-1's shared-data prerequisite; calendar tests verify its date marker, speaker, 3:00 PM IST timing, and Alliance Francaise venue.
- [x] **C-4 | Done** - Keep month view visible when selecting a date and show that date's events beside the calendar, or below it on small screens.
- [x] **C-5 | Done** - Review and correct calendar month/year labels, weekday headers, controls, and date-cell sizes.
- [x] **C-6 | Done** - Remove the specified confirmed-events heading, lengthy IST explanation, empty-month sentence, and registration-note block.
- [x] **C-7 | Done** - Implement the approved attributed OpenStreetMap-based Bengaluru event map with verified venue pins, pan, zoom, event details, and directions below the calendar in checkpoint 6.

### Checkpoint 7 - Contact Page

- [x] **CT-1 | Done** - Remove the Gemini-like ornament.
- [x] **CT-2 | Done** - Remove the two specified long registration/storage statements where applicable to Contact; preserve explicit unavailable-service behavior and do not silently enable a disconnected form.

### Checkpoint 8 - Site-wide Design Consistency and Responsiveness

- [x] **G-1 | Done** - Define shared typography tokens once for hero titles, section headings, subheadings, body copy, captions, and labels, and use them consistently.
- [x] **G-2 | Done** - Evaluate rounded versus square boxes and cards, choose one coherent corner treatment, and apply it consistently.
- [x] **G-3 | Done** - Align About, Sankalpas, Updates, Calendar, and Contact hero structure, section spacing, and container widths.
- [x] **G-4 | Done** - Test every page, especially heroes, on phone, tablet, laptop, desktop, and large-TV viewport sizes; fix overflow, wrapping, alignment, and image distortion.
- [x] **G-5 | Done** - Verify that all requested numbered section-label prefixes are removed without residual spacing.

### Checkpoint 9 - Code Quality and Architecture

- [ ] **E-1 | Not started** - Keep the site modular, extensible, and scalable using appropriate SOLID/object-oriented principles without unnecessary classes or abstraction in the existing React architecture.
- [ ] **E-2 | Not started** - Reuse or extract hero, section-heading, card, poster-grid, incremental-list, calendar, and approved map components where appropriate.
- [ ] **E-3 | Not started** - Store events, posters, podcasts, posts, gallery entries, statistics, and social links in structured content/configuration; adding an event should require only its data and images.
- [ ] **E-4 | Not started** - Standardize file, folder, and asset naming; remove only code, styles, and assets made unused by these revisions, after checking every reference.

### Final Review

- [ ] **R-1 | Not started** - Verify every requirement against the actual site; mark it Done or document a specific blocker.
- [ ] **R-2 | Not started** - Confirm a clean production build, working local images/internal links, verified external links where accessible, and no browser console/runtime errors.
- [ ] **R-3 | Not started** - Add the final change summary, remaining open items, and recommended next steps to this document.

## Checkpoint 0 audit

### Repository and existing work

- A Git repository exists in this project, with baseline commit `8e69b4f` ("Initial commit").
- Pre-existing unstaged deletions: `public/images/community.webp`, `public/images/event-1.webp`, and `public/images/gathering-6.webp`.
- Pre-existing untracked folders: all seven named event folders below, plus `public/images/itf-assets`.
- These user asset additions/deletions are not part of the checkpoint-0 commit. No files have been restored, renamed, moved, removed, or staged on the user's behalf.
- `node_modules`, `.next`, `out`, Playwright reports/results, and TypeScript build metadata are ignored generated/dependency directories.

### Architecture, routes, and shared surfaces

- Stack: Next.js App Router, React, strict TypeScript, local Manrope variable font, Lucide icons, and one shared global stylesheet. Production output is a static export with trailing-slash routes and unoptimized local images.
- `src/app/layout.tsx` provides the header, skip link, main landmark, footer, font, metadata, icons, and viewport.
- Canonical page routes:
  - `/` -> `src/app/page.tsx`.
  - `/about/` -> `src/app/about/page.tsx`.
  - `/sankalpas/` -> `src/app/sankalpas/page.tsx`.
  - `/events/` -> `src/app/events/page.tsx`, labeled **Updates** (there is no separate `/updates/` page).
  - `/calendar/` -> `src/app/calendar/page.tsx`.
  - `/contact-us/` -> `src/app/contact-us/page.tsx`, using `ContactLayout`.
  - `/join/`, `/support/`, `/privacy/`, and `/accessibility/` remain public pages outside the requested content revisions, except shared-component effects.
- Compatibility routes `/philosophy/`, `/gallery/`, and `/media/` re-export the combined About/Updates pages. Their content, fragment links, active navigation, and canonical metadata must remain consistent.
- `src/app/not-found.tsx`, `robots.ts`, and `sitemap.ts` supply the 404 and SEO endpoints.
- `src/components/sections.tsx` already provides `PageIntro`, `SectionHeading`, `Principles`, `Journey`, and `CommunityCTA`.
- `header.tsx` provides shared `Brand`; `footer.tsx` reuses it and `SocialChannels`.
- `event-list.tsx`, `gallery-grid.tsx`, and `media-dialog.tsx` provide poster/photo grids and the native image dialog with keyboard navigation and focus restoration.
- `media-content.tsx` provides featured/additional podcasts, posts, channels, and the curated-feed notice; `youtube-player.tsx` owns opt-in playback, close/focus behavior, and error messaging.
- `event-calendar.tsx` and `event-schedule.tsx` share events and IST date helpers in `src/lib/schedule.ts` and `use-event-date.ts`.
- `sankalpa-table.tsx` renders `src/lib/sankalpas.ts`; `submission-form.tsx` is shared by Contact and membership.
- There is no existing event map or reusable "Load more" component. No map library is declared.

### Styling and current responsive rules

- `src/app/globals.css` contains shared styles and page/component overrides. Color tokens and `--radius: 5px` exist; a complete shared type scale does not.
- Current sizes vary by component: base body 16px; base h1 `clamp(40px, 4.7vw, 68px)`; base h2 `clamp(30px, 3vw, 42px)`; base h3 22px; `.hero h1` and `.page-intro h1` have separate scales.
- `.container` is capped at 1200px with 96px total horizontal inset at the default breakpoint; section padding is 96px.
- Breakpoints include minimum 1500px and maximum 1180px, 1024px, 760px, and 480px, plus coarse-pointer and reduced-motion rules.
- Mobile navigation replaces desktop navigation at 1180px. The Sankalpa table becomes stacked labeled records at 1024px.
- Existing card radii vary across 2px, 3px, 4px, 5px, and 6px. Circular dots/icon controls are distinct from box/card corner treatment.
- Recommendation for later checkpoints: retain and refine the existing shared text-based `PageIntro` instead of adding duplicate heroes; retain modest rounded cards and consolidate their radius token. Neither recommendation is implemented in this audit.

### Content baseline and exact requirement mappings

| Surface | Current source and behavior | Revision impact |
| --- | --- | --- |
| Home hero | `src/app/page.tsx`: eyebrow with a nested decorative dot, real-text "Awakening Bharat. Inspiring the future.", and a real-text tagline; backgrounds are `heritage-hero.webp` and its mobile variant. | H-3 removes the eyebrow/dot. Header branding is real text already; no full-name branding image is rendered in the hero JSX. Check supplied imagery before H-4 changes. |
| Home purpose | `.about-home` uses `gathering-1.webp`; label is "01 / Our purpose"; actual heading is "A deeper connection. A greater purpose.", not the brief's approximate "conversation" wording. | H-5 targets the photo and label only; do not reword the heading without instruction. |
| Principles | Shared `Principles` renders `principles[].number` from `src/lib/site.ts` in Home and About. Home label is "02 / The way we think". | H-6/A-4 must remove the shared card numbers together; the philosophy footnote is 11px by default and 9px at narrow sizes. |
| Pathways | Home label is "03 / Find your way". The Sankalpas card has a flame icon; the calendar card uses `CalendarDays`. | H-7 concerns icons. Whether the "03 /" prefix is also included in the requested removal sweep needs confirmation (Q4). |
| Home events | "04 / Gather. Listen. Grow." uses compact `EventList`: three past events sorted most recent first via `getEventSchedule`. | Preserve the three-card layout; currently upcoming events are excluded. Confirm whether the new upcoming poster belongs in the latest-three selection (Q4). |
| Poster sizing | `EventList` supplies 1000x1400 dimensions for every poster; CSS fixes the visible height and uses `object-fit: cover`. | Original poster proportions differ; H-8 requires uncropped, undistorted posters without redesigning the cards. The image dialog already uses contain fitting. |
| Home journey | Label is "05 / Your journey with ITF"; `Journey` has its own meaningful step numbers. | Remove only the specified section prefix, not journey-step numbering. |
| Lakshya | Home JSX hard-codes 500+ members, **200+** events, and 100+ Sankalpas. The brief says 220+ events, but the code says 200+. | Requested end values are unambiguous: 10+ events and 30+ Sankalpas; leave members and surrounding wording alone. |
| Home media | "06 / Watch. Listen. Connect."; shared `YouTubePlayer` shows the thumbnail label, privacy-preview heading, and disclosure. | H-11 and U-9 share rendering; retain click-to-load behavior, direct watch links, errors, close controls, and focus handling. |
| Home gallery | "07 / Moments of connection", heading "A forum. A community. A family.", preview of four entries. | H-12 removes its prefix. The brief also names "Moments of Conversation"; preserve actual wording unless explicitly changed. |
| Movement gallery | Updates has "The moments behind the movement." in its gallery; no exact "The Movement Behind the Movement" section exists. | Confirm H-2's target before moving every gallery image (Q2). |
| Footer brand | `Brand` uses `/images/logo-mark.png` and real-text name/tagline. Footer CSS displays the mark at 45x45px and the tagline at 6px at its default rule. | F-1 must use the official supplied logo without duplicating image-baked text; F-2 is formatting/verification, not an image-to-text conversion in current JSX. |
| About | Already uses `PageIntro`; the thought section reuses `gathering-1.webp`; principles are shared; guiding belief is a full-width navy quote band followed by more content. | Keep other copy/sections; remove the selected image and give the quote band a non-terminal treatment. |
| Page ornament | `PageIntro` includes an aria-hidden four-point `intro-ornament`; `CommunityCTA` separately contains a `cta-decoration` sparkle. | Requested pages share the intro. Shared changes affect membership/support/legal pages too; confirm removal scope before touching unrelated decorations (Q5). |
| Sankalpas | Twenty structured tracker records plus six structured personal pathways; owner/next-action strings include DJ, combined names, and a possessive. The wrapping description uses shared `SectionHeading` with a 650px paragraph maximum. | Replace DJ throughout displayed tracker content, not only one owner cell; retain all other tracker content/history behavior. |
| Updates order | Intro -> section navigation -> Plan Your Next Conversation -> Events -> Gallery -> Podcasts -> Community Posts -> Social channels -> CTA. | Reorder the requested five content sections and synchronize fragment navigation while preserving compatibility pages. |
| Events | Four structured events in `src/lib/site.ts`; category filters are All events, History, Ideas & dialogue. Noncompact lists show all past events without incremental loading. | Add supplied events after date confirmation; remove only requested archive categories/filter UI and introduce three-at-a-time loading. |
| Podcasts | Three entries in `src/lib/media.ts`: Shiv Sastry, Queen Tara, and Plastic/Sustainability. There are no publish dates or pagination. | Verify the full official-channel podcast catalog and real publication order; do not infer it from the current array or count every upload as a podcast. External inventory is deferred to checkpoint 5. |
| Posts | Two YouTube-linked cards: Queen Tara announcement and a Places of Worship recap. | Remove the event post and replace the requested Posts surface with the five supplied Instagram sources; do not fabricate post dates/captions. |
| Gallery | Six structured entries with Community/Conversations filters; one referenced image is missing. Home previews the first four. | U-7 removes filtering; H-2 must update every consumer of renamed photos. |
| Social channels | Structured YouTube, Instagram, Facebook profiles; a hard-coded icon lookup is keyed by platform in `media-content.tsx`. Footer/Home/Updates reuse this component. | Add X and WhatsApp in data and icon handling; shared additions also appear on Home without duplicating definitions. |
| Calendar | Month/day/year views already exist; clicking a month date switches to day view. Details appear below. The schedule duplicates the detailed timezone and registration notes. No November event, featured event, or map exists in data/UI. | Add a selected-date panel without replacing month view; remove only specified text, preserve IST scheduling logic and existing navigation semantics where applicable. |
| Contact | `ContactLayout` uses shared intro. The long registration-unavailable notice is currently membership-only, not Contact. Contact retains a shorter service-status line and disabled submit button. The storage statement is shared. | CT-2 must not silently change membership or claim successful submissions without a backend; preserve truthful failure/unavailable behavior. |

### Event folders, original posters, and date evidence

Every event folder currently contains one PNG in `event-poster`; no folder contains `event-photos`.
All seven supplied posters measure **1587 x 2245px**, portrait, exact aspect ratio **1587:2245** (approximately **0.7069:1**).
Poster text was inspected using local Windows OCR; publication still requires confirmation where a year is absent.
The year is not printed in any of these seven posters.

| Event folder / original poster | Poster title / speaker | Printed date and time | Printed venue |
| --- | --- | --- | --- |
| `public/images/bijeet-prasantha/event-poster/12.png` | Hindumisia: Revisiting the Forgotten History of Hindu Hatred & Hindu Genocides; Sri Chakravarti Sulibele and Dr. Bijeet Prasantha | Thursday, 02 April, 5:30 PM; year absent | Suchitra Cinema & Cultural Academy, Banashankari, Bengaluru |
| `public/images/ganeshaiah/event-poster/1.png` | Pepper, Potato, Mould and Gold: How They Shaped Human History; K. N. Ganeshaiah | Sunday, 29 November, 3:00 PM; year absent | Alliance Francaise de Bangalore, Vasanth Nagar, Bengaluru |
| `public/images/manjunath-ajjampura/event-poster/8.png` | Places of Worship Act, 1991; Sri Manjunatha Ajjampura | Saturday, 11 July, 5:30 PM; year absent | Suchitra Cinema & Cultural Academy, Banashankari, Bengaluru |
| `public/images/medha-bhaskaran/event-poster/6.png` | Queen - Tara; Medha Deshmukh Bhaskaran | Saturday, 06 June, 5:30 PM; year absent | Suchitra Cinema & Cultural Academy, Banashankari, Bengaluru |
| `public/images/ram-mohan/event-poster/3.png` | Vedanga Jyotisha: Exploring the Foundations of Indian Astronomy; Shri Ram Mohan | Sunday, 25 October, 3:00 PM; year absent | Alliance Francaise de Bangalore, Vasanth Nagar, Bengaluru |
| `public/images/sankrant-sanu/event-poster/15.png` | Are We Independent? The Battle For India's Mind; Sri Sankrant Sanu | 20 February, 6 PM; year absent | Suchitra Cinema & Cultural Academy, Banashankari, Bengaluru |
| `public/images/shiv-sastry/event-poster/10.png` | Pakistan - Failed State & Its Effect on India; Dr. Shiv Sastry | Saturday, 09 May, 5:30 PM; year absent | Suchitra Cinema & Cultural Academy, Banashankari, Bengaluru |

The existing event dataset explicitly assigns **2026** to February 20, April 2, May 9, and June 6.
The Sankalpa tracker separately groups the Sanu talk under March 2026; this conflicts with the poster/event dataset. Record the discrepancy but do not change tracker talk dates under the unrelated name-only requirement.
There are no coordinates, map URLs, or per-event venue identifiers in the current event model; all four existing events share one Suchitra venue string.

### Remaining image inventory and reference state

There are **25 existing image files** in total: the seven posters above, two supplied ITF assets, and the sixteen root-level images below.

| Existing image path | Intrinsic size | Current application use |
| --- | --- | --- |
| `public/images/itf-assets/ITF-Logo.png` | 1024x1024 | Supplied official logo; not currently referenced by application source |
| `public/images/itf-assets/hero.png` | 3072x2048 | Supplied hero image; not currently referenced by application source |
| `public/images/event-2.webp` | 1000x1402 | Hindumisia event |
| `public/images/event-3.webp` | 1000x1298 | Queen Tara event and old post |
| `public/images/event-4.webp` | 1000x1402 | Shiv Sastry event |
| `public/images/gathering-1.webp` | 1000x666 | Home purpose photo, About thought photo, gallery dataset |
| `public/images/gathering-2.webp` | 1000x666 | Gallery dataset |
| `public/images/gathering-3.webp` | 1000x563 | Gallery dataset |
| `public/images/gathering-4.webp` | 1000x563 | Gallery dataset |
| `public/images/gathering-5.webp` | 1000x666 | Gallery dataset |
| `public/images/heritage-hero-mobile.webp` | 960x640 | Responsive Home hero |
| `public/images/heritage-hero.webp` | 1536x1024 | Home hero and metadata/social previews |
| `public/images/heritage.webp` | 960x570 | No direct application-source reference; asset-preparation input |
| `public/images/logo-mark.png` | 160x160 | Header/footer Brand, favicon, Apple icon |
| `public/images/logo.png` | 180x180 | No direct application-source reference |
| `public/images/podcast-queen-tara.webp` | 960x540 | Queen Tara podcast thumbnail |
| `public/images/podcast-shiv-sastry.webp` | 960x540 | Shiv Sastry podcast thumbnail |
| `public/images/podcast-sustainability.webp` | 960x540 | Sustainability podcast thumbnail |

Missing assets still referenced by `src/lib/site.ts`:

- `/images/event-1.webp`: Sankrant Sanu event poster; replacement poster exists in the named event folder, but switching it belongs to H-1.
- `/images/gathering-6.webp`: sixth gallery entry; no replacement photograph found.

Deleted `community.webp` has no current application-source reference, but `scripts/prepare-assets.mjs` still lists it.
Do not run the legacy asset-preparation script blindly: it fetches external historical assets and would recreate deleted assets and generic names.
`scripts/prepare-media.mjs` refreshes the current three YouTube thumbnails and the mobile hero; it does not discover a full podcast catalog.

### Exact external sources supplied for later checkpoints

- YouTube podcasts: https://www.youtube.com/@IndicThoughtForum
- X: https://x.com/IndicthoughtFor
- WhatsApp: https://chat.whatsapp.com/Lr7Bu6azh5JBJmZpETf7Jf
- Instagram Posts:
  1. https://www.instagram.com/indicthoughtforum/p/DfcL3sFiMKi/
  2. https://www.instagram.com/indicthoughtforum/p/DaxmfnmE2o3/
  3. https://www.instagram.com/indicthoughtforum/p/DZ27VeuCC4k/
  4. https://www.instagram.com/indicthoughtforum/p/DZu3_bzGajl/
  5. https://www.instagram.com/indicthoughtforum/p/DW5XbcbmapO/

## Open Questions

- **Q1 - Event years/details (H-1, C-2, C-3):** Do all seven supplied posters describe 2026 events, specifically Ganeshaiah on **29 November 2026 at 3:00 PM IST** at **Alliance Francaise de Bangalore, Vasanth Nagar**? The poster prints date/time/venue, but no year. Confirm before adding dates.
- **Q2 - Photo scope and missing file (H-2, U-7):** Does "The Movement Behind the Movement" mean the Updates gallery currently titled "The moments behind the movement.", including its Home preview? Are all five existing `gathering-1` through `gathering-5` photographs from Sankrant Sanu, as the brief indicates for that section? Should the deleted `gathering-6.webp` be restored from an approved source, replaced with a supplied photograph, or removed from the gallery dataset? No replacement was found; do not guess or restore it unasked.
- **Q3 - Suggested map (C-7):** Should the interactive map be implemented? If yes, confirm a provider preference or approval for an appropriate attributed map provider, and verify exact venue pins before publication. No provider, keys, or verified coordinates currently exist.
- **Q4 - Home event selection and section prefixes (H-1, H-7, H-8, G-5):** Should the three Home events include the newest upcoming poster (Ganeshaiah), or remain a past-event archive? Also confirm whether "03 /" should be removed from Find Your Way: other prefixes are explicitly requested, while H-7 itself only specifies icons.
- **Q5 - Sparkle scope (A-2, S-2, U-1, C-1, CT-1):** Remove the shared intro ornament only on the five named pages, or everywhere `PageIntro` is used? Should the separate repeated CommunityCTA sparkle remain? This affects otherwise unmentioned pages and must not be assumed.

### Confirmed decisions - 2026-11-09

- **Workflow:** user selected "Checkpoint 1 only, then stop for review".
- **Q1 resolved:** all seven event years are 2026, including the Ganeshaiah poster's November 29, 3:00 PM IST event at Alliance Francaise de Bangalore.
- **Q2 resolved:** user confirmed the movement-gallery mapping and Sankrant Sanu photo ownership. In a separate clarification, selected "Remove the missing photo's gallery entry; keep the five supplied photos". Do not restore or substitute the sixth image.
- **Q3 resolved:** user approved an attributed OpenStreetMap-based map with verified venue pins. Implementation and coordinate verification remain checkpoint 6.
- **Q4 resolved:** Home must include upcoming events, newest date first, and remove the Find Your Way "03 /" prefix.
- **Q5 resolved:** remove all sparkles on the five named pages only, including their CTA decorations; preserve decorations on other pages. Apply this in each page's respective checkpoint, not during the Home revision.

No unresolved content decision blocks checkpoint 1. The original questions above are retained as audit history, not unanswered requests.

## Checkpoint 0 validation record

- Source review: inspected route pages, shared components, structured data, stylesheet tokens/breakpoints, asset-preparation scripts, Next configuration, and Playwright coverage.
- Image inventory: read intrinsic dimensions/formats for all 25 existing images with the installed `sharp` dependency.
- Poster text: used local Windows OCR; no project data was uploaded to an external recognition service.
- Source-reference audit: found 16 distinct literal local-image URLs; 14 resolve and the two missing references are listed above. This is a source audit, not a claim that lazy-loaded browser images all passed.
- Environment observed: Node v26.7.0 and npm 12.0.2; dependencies already installed. No dependency installation was needed.
- Existing local listener on port 3000 was left untouched.
- The production build regenerated the two route-type imports in `next-env.d.ts`; restored those imports to their pre-audit state so the audit leaves no persistent application/configuration changes.
- Validation configuration discrepancy: `npm run preview` binds port **3000**, while Playwright and the README preview instructions expect **4173**. Do not edit application/configuration outside checkpoint 0; use the installed static server explicitly on a free 4173 port for baseline browser validation.
- `npm run build`: **Passed**. All 17 generated pages/endpoints completed; the existing export finalizer normalized 13 Windows routing-segment files.
- `npm run lint`: **Passed**, with zero warnings allowed.
- `npm run typecheck`: **Passed**.
- Temporary export server: started the installed `http-server` directly on `127.0.0.1:4173`, verified HTTP 200, and used it for browser validation without touching the existing port-3000 process.
- Cleanup: stopped the temporary port-4173 server after validation.
- Existing Playwright baseline command: `npm exec -- playwright test website.spec.ts --project=desktop --grep "every public page|layouts fit|all internal home links" --workers=1 --timeout=90000 --reporter=list`.
  - **Passed:** responsive layout test on Home, Join, Updates, Calendar, Sankalpas, About, and Contact at **320, 480, 768, 1024, 1180, 1200, 1440, and 2560 x 900 CSS pixels**, including month/year/day calendar views.
  - **Passed:** internal Home links, sitemap, robots, and 404-page checks.
  - **Failed (pre-existing):** all-public-route runtime/image test stops at `/events/` with **two broken images**, corresponding to the already-deleted `event-1.webp` and `gathering-6.webp`. No application fix was made ahead of the approved checkpoint.
  - Overall result: **2 passed, 1 failed**. Do not describe the current site as free of broken images/console errors.
  - An initial test invocation using a Windows path as the Playwright regex file selector matched no tests; reran successfully with the filename-only selector above. No test/config source was modified.
- Supplemental integrated-browser audit at **3840x2160 CSS pixels**: all **13 public routes** returned HTTP 200, each had one main h1, none had horizontal document overflow, and no JavaScript `pageerror` was observed.
  - `/events/` and its `/gallery/` and `/media/` compatibility pages all exposed the same two missing image URLs.
  - This is a route/overflow smoke check, not a claim of complete visual/accessibility/interaction certification or clean network-console output.
- No external social/podcast availability audit was performed in checkpoint 0; those sources will be verified in the appropriate content checkpoint.
- Physical phone/tablet/TV testing: **Not performed**; do not describe emulation as physical-device certification.

## Checkpoint change records

### Checkpoint 0

- Created: `WEBSITE_REVISION_CHECKPOINTS.md`.
- Application files changed/deleted: none.
- Assets moved/renamed: none.
- Validation: production build, ESLint, TypeScript, internal links, and responsive baseline pass; the pre-existing missing-image browser test fails as documented above.
- Follow-ups: resolve Q1-Q5 and approve checkpoint 1; keep pre-existing user asset changes separate from this documentation commit.
- Commit subject: `Checkpoint 0: Audit and setup` (documentation only).

### Checkpoint 1 - Completed implementation record

- H-1 through H-12 are implemented and verified Done. C-3 is also verified Done through the required shared event-data update.
- Home keeps the original title, body copy, event grid, four-photo gallery preview, journey steps, and featured-podcast layout except for the explicit requested changes.
- Full hero branding is DOM text. Existing desktop/mobile hero artwork contains no OCR-detectable branding text; no replacement background or stock image was introduced.
- The purpose section becomes a single readable text column after removing its photograph. Obsolete Home image/eyebrow styles and their breakpoint overrides were removed.
- Commitment and calendar pathways use Lucide ListChecks and CalendarDays icons.
- All seven confirmed events use their supplied posters and measured 1587x2245 dimensions. Poster cards no longer crop, stretch, add a gradient over, or zoom into the poster.
- Home shows November 29, October 25, and July 11 initially, newest first; status and actual venue derive from each event and the current IST date.
- Shared data adds the three missing events to the existing calendar/schedule as a necessary H-1 dependency; this also implements C-3's data requirement. Calendar featured-event/panel/map UI remains deferred.
- All five photo references, including About and legacy preparation output paths, use the Sankrant Sanu directory. The supplied photo pixels and existing captions/layout remain unchanged.
- Scope gates: Home hides principle numbers and preview-only YouTube copy through backward-compatible shared-component props. About numbers, Updates preview copy, footer branding/social links, and all page sparkles remain for their authorized checkpoints.
- Error/loaded status, click-to-load, direct YouTube links, close controls, and focus restoration are preserved; no automatic provider connection was added.
- Structured `homeStatistics` keeps 500+ members and sets 10+ events and 30+ Sankalpas.

#### Asset moves

| Old path (under `public/images`) | New path (under `public/images`) |
| --- | --- |
| `bijeet-prasantha/event-poster/12.png` | `bijeet-prasantha/event-poster/hindumisia-2026-04-02.png` |
| `ganeshaiah/event-poster/1.png` | `ganeshaiah/event-poster/pepper-potato-mould-and-gold-2026-11-29.png` |
| `manjunath-ajjampura/event-poster/8.png` | `manjunath-ajjampura/event-poster/places-of-worship-act-2026-07-11.png` |
| `medha-bhaskaran/event-poster/6.png` | `medha-bhaskaran/event-poster/queen-tara-2026-06-06.png` |
| `ram-mohan/event-poster/3.png` | `ram-mohan/event-poster/vedanga-jyotisha-2026-10-25.png` |
| `sankrant-sanu/event-poster/15.png` | `sankrant-sanu/event-poster/are-we-independent-2026-02-20.png` |
| `shiv-sastry/event-poster/10.png` | `shiv-sastry/event-poster/pakistan-failed-state-2026-05-09.png` |
| `gathering-1.webp` | `sankrant-sanu/event-photos/community-gathering.webp` |
| `gathering-2.webp` | `sankrant-sanu/event-photos/community-conversation.webp` |
| `gathering-3.webp` | `sankrant-sanu/event-photos/audience-participation.webp` |
| `gathering-4.webp` | `sankrant-sanu/event-photos/speaker-and-participants.webp` |
| `gathering-5.webp` | `sankrant-sanu/event-photos/community-connections.webp` |

Generated previews (new files, not moves; the original PNGs above remain unchanged):

- `public/images/bijeet-prasantha/event-poster/hindumisia-2026-04-02.webp`
- `public/images/ganeshaiah/event-poster/pepper-potato-mould-and-gold-2026-11-29.webp`
- `public/images/manjunath-ajjampura/event-poster/places-of-worship-act-2026-07-11.webp`
- `public/images/medha-bhaskaran/event-poster/queen-tara-2026-06-06.webp`
- `public/images/ram-mohan/event-poster/vedanga-jyotisha-2026-10-25.webp`
- `public/images/sankrant-sanu/event-poster/are-we-independent-2026-02-20.webp`
- `public/images/shiv-sastry/event-poster/pakistan-failed-state-2026-05-09.webp`

#### Files and review notes

- Created: `tests/home.spec.ts` with explicit Home-content, ordering/status, intrinsic-image, responsive-aspect-ratio, dialog, and media-error/focus requirements.
- Changed: `src/app/page.tsx`, `src/app/globals.css`, `src/lib/site.ts`, `src/lib/media.ts`, `src/components/sections.tsx`, `src/components/event-list.tsx`, `src/components/media-content.tsx`, `src/components/youtube-player.tsx`, `src/app/about/page.tsx` (renamed photo reference/dimensions only), `scripts/prepare-assets.mjs`, `tests/website.spec.ts`, `tests/schedule.spec.ts`, `README.md`, and this document.
- Removed from published content: the missing sixth gallery record. The previously deleted old Sanu poster is replaced by the supplied named poster. Asset deletions recorded with this replacement/cleanup: `public/images/event-1.webp` and `public/images/gathering-6.webp`; both were already absent at audit and neither was restored.
- Review note: legacy generic event WebPs are deliberately not deleted until checkpoint 9's unused-asset review. The unrelated pre-existing `community.webp` deletion and supplied `itf-assets` folder remain outside this checkpoint's commit.
- Review note: retained category filters/past-only listing on Updates until checkpoint 5. All-event catalog loading and Instagram/YouTube inventory are not claimed complete.
- Review note: no physical-device certification or live external YouTube playback is implied by mocked-player tests.
- Poster-size review: the supplied original PNGs are 4.6-5.8 MB each. Preserve all originals for the viewer, but use full-dimension local WebP previews in cards and the existing poster-based post. Added `assets:posters` with explicit path/dimension checks and a 256 KiB preview budget; no network downloads or replacement artwork are involved.
- Validation follow-up: the first regression run passed 36 tests but exposed a pre-existing iframe error-handler problem. React delegates capture-phase errors but does not attach a non-delegated iframe error listener; changed the existing handler to `onErrorCapture` so a non-bubbling frame error actually surfaces the existing fallback status. The new Home test exercises this path.
- Commit subject: `Checkpoint 1: Home page updates`.
- Core implementation commit: `ddb26a3`. A separate checkpoint-1 performance follow-up records the seven generated `.webp` preview siblings, `scripts/prepare-event-posters.mjs`, the `package.json` command, and preview data/component/test/documentation updates; the original checkpoint commit is not amended.
- Follow-up commit subject: `Checkpoint 1: Optimize poster previews`.

#### Validation

- `npm run build`: **Passed**, all 17 static pages/endpoints generated; 13 Windows routing-segment files normalized.
- `npm run lint`: **Passed**, zero warnings.
- `npm run typecheck`: **Passed**; build-generated `next-env.d.ts` imports restored to their pre-checkpoint state rather than committed.
- `node --check scripts/prepare-assets.mjs`: **Passed**. The download script was deliberately not executed against the supplied assets.
- Core desktop regression command:
  `npm exec -- playwright test home.spec.ts website.spec.ts media.spec.ts schedule.spec.ts --project=desktop --workers=3 --timeout=90000 --reporter=list`.
  Result: **37 passed, 1 intentionally skipped** (the existing mobile-only menu test in a desktop project), no failures.
- Additional Home command:
  `npm exec -- playwright test home.spec.ts --project=mobile --project=firefox --project=webkit --project=ios --project=tablet --workers=3 --timeout=90000 --reporter=list`.
  Result: **25 passed**, no failures.
- Core verification: **62 passed, 1 intentional skip**. Home is covered on all six configured profiles: desktop Chromium, Android/Pixel-style Chromium, desktop Firefox, desktop WebKit, iPhone-style WebKit, and iPad-style WebKit.
- Home layout/poster checks on every profile cover **320, 393, 480, 768, 1024, 1440, 1920, 2560, and 3840 CSS-pixel widths**, height 900px below 2560px and 2160px for the largest sizes.
- Verified: exactly three newest cards, upcoming/today/archive status changes at fixed IST dates, actual venues, original-poster dialogs and focus restoration, measured pixel dimensions, displayed intrinsic aspect ratio to three decimal places, `object-fit: contain`, no hover scaling, correct one/two/three-column layout, aligned poster rows, no horizontal overflow, no hero-brand overlap, and a minimum 14px philosophy footnote.
- All seven poster URLs and five relocated photo URLs return HTTP 200. The earlier two missing-image baseline errors are resolved through the supplied replacement poster and approved gallery-record removal.
- Existing all-public-route tests pass for 13 routes with no recorded runtime/console/HTTP errors or broken loaded images. Internal links, SEO endpoints, compatibility routes/fragments, and automated WCAG A/AA checks also pass.
- Verified zero external media requests before opt-in. Mocked-player tests cover keyboard opt-in, capture-phase error status, direct YouTube links, closing, and restored focus.
- Direct Playwright screenshots were visually inspected at **1440x1000** and **393x851**, plus the complete desktop event-card row. Temporary inspection screenshots were removed after review.
- Reused the user's already-running export preview at port 4173 after confirming HTTP 200; no server was started or stopped in this checkpoint. The shared browser tab is left on Home for review.
- No dependencies were installed. No physical-device or live external-provider certification is claimed.

#### Poster-preview performance follow-up

- Original poster pixels/files are preserved for full-size dialogs. Card previews retain the exact 1587x2245 dimensions and aspect ratio; no cropping or resizing is introduced.
- `npm run assets:posters`: **Passed**. All seven previews are **193-230 KiB**, below the enforced **256 KiB** per-preview limit. The command uses only local supplied originals.
- Measured Home's latest-three poster payload: **14,669,160 bytes -> 625,202 bytes**, a **95.74% reduction** before opening a full-size poster.
- Re-ran `npm run build`, `npm run lint`, and `npm run typecheck`: **Passed**.
- Final preview/Home tests: `npm exec -- playwright test home.spec.ts --workers=3 --timeout=90000 --reporter=list`: **30 passed** across all six browser/device profiles.
- Final affected route/media checks:
  `npm exec -- playwright test website.spec.ts media.spec.ts --project=desktop --grep "every public page|media previews|every podcast|curated event posts|responsive hero" --workers=3 --timeout=90000 --reporter=list`: **5 passed**.
- The new network assertions verify that Home requests exactly its three WebP poster previews before a poster is opened, and that opening the viewer requests the original PNG. Asset tests check format, intrinsic dimensions, HTTP status, and actual response-body byte limits for every preview.
- The existing native TypeScript import pattern emits Node's informational `MODULE_TYPELESS_PACKAGE_JSON` warning in the local generation command; it does not affect the successful build, types, lint, or browser checks. Project-wide module settings were intentionally not changed.

#### Review handoff

- No checkpoint-1 requirement remains blocked.
- Review Home first; then confirm checkpoint 2 for the official footer logo, brand formatting, and X/WhatsApp links.
- Resolved map/sparkle decisions are recorded above for their later checkpoints; their implementation is not claimed complete.
- The legacy preview-port configuration discrepancy remains a documented later tooling follow-up; it did not prevent production-export validation using the existing 4173 listener.

### Checkpoint 2 - Completed implementation record

- F-1 through F-3 are implemented and verified Done. U-8 is also verified Done through the shared social component. No About-page changes or later UI redesign were made.
- Original official logo: `public/images/itf-assets/ITF-Logo.png`, 1024x1024 RGBA, 661,124 bytes. It is an emblem without image-baked brand text.
- Preserved the original and generated `public/images/itf-assets/itf-logo-footer.webp`: lossless, transparent, 168x168 for 56px display at up to 3x density; actual size **23,334 bytes**, within the 32 KiB limit.
- Keep the header logo, favicon, Apple icon, and all non-footer branding treatments unchanged.
- Reuse `Brand footer` and `site.name`/`site.tagline`; use readable 18-20px name and 12px tagline typography, contain-fit the logo, and allow natural text/social-link wrapping.
- Add the exact supplied X and WhatsApp URLs once in `socialProfiles`; expand the typed icon lookup using existing Lucide icons and preserve new-tab notices and `noopener noreferrer`.
- Shared-component effect: Footer, Home's compact links, and Updates' social-channel cards all receive the two links. U-8 is complete through this reuse; other checkpoint-5 items remain deferred.
- New files: `scripts/prepare-branding.mjs`, `public/images/itf-assets/itf-logo-footer.webp`, and `tests/footer.spec.ts`.
- Changed files: `src/components/header.tsx` (footer branch of Brand and shared text data only), `src/components/media-content.tsx`, `src/lib/media.ts`, `src/app/globals.css`, `package.json` (local asset command only), `README.md`, and this document.
- Files deleted: none. Asset moves/renames: none. No dependencies or third-party assets are added.
- Review note: destination URLs are owner-supplied; platform availability, login requirements, and WhatsApp admission are controlled by those platforms. Testing must not join the group or imply a verification badge.
- Test review: Sharp can reorder flatten/resize operations in one pipeline. The fidelity oracle now materializes the resized source before compositing, rather than weakening a failed tolerance. The generated WebP matches all 84,672 visible RGB channel values exactly on the footer background.
- Commit subject: `Checkpoint 2: Footer branding and social links`.

#### Validation

- `npm run assets:branding`: **Passed**. Reads only the existing official PNG and writes the derived local WebP; no network downloads or source-asset changes.
- `npm run build`, `npm run lint`, and `npm run typecheck`: **Passed**. All 17 pages/endpoints generated; 13 Windows route-segment files normalized. Restored build-generated `next-env.d.ts` imports to their pre-checkpoint state rather than committing them.
- Desktop selection:
  `npm exec -- playwright test footer.spec.ts media.spec.ts website.spec.ts --project=desktop --grep "footer|media previews|verified social channels|every public page|key pages|layouts fit|mobile menu" --workers=3 --timeout=90000 --reporter=list`.
  The eight other checks passed, with one intentional desktop skip for the mobile-only menu case. The first fidelity assertion exposed the test-oracle ordering issue described above, not a logo mismatch.
- Corrected fidelity case:
  `npm exec -- playwright test footer.spec.ts --project=desktop --grep "faithful lightweight" --workers=1 --timeout=90000 --reporter=list`: **1 passed**. No tolerance was widened; the visible RGB comparison is exact.
- Additional browser/device command:
  `npm exec -- playwright test footer.spec.ts website.spec.ts --project=mobile --project=firefox --project=webkit --project=ios --project=tablet --grep "footer uses|footer logo|all public footers|mobile menu" --workers=3 --timeout=90000 --reporter=list`: **13 passed, 7 intentional skips**, no failures.
  Five skips avoid duplicating the full-route sweep outside desktop; two skip mobile-menu tests in desktop Firefox/WebKit profiles.
- Effective final selected checks: **22 passed, 8 intentional profile-specific skips**. All previously failing assertions were corrected and rerun successfully.
- Footer and shared Updates cards were checked on Home and Updates at **320, 393, 480, 768, 1024, 1180, 1200, 1440, 1920, 2560, and 3840 CSS-pixel widths** across all six configured profiles. Heights were 900px below 2560px and 2160px for the largest widths.
- Verified 56x56 contain-fit logo dimensions, faithful official-source pixels/transparency, unchanged header asset, 18px minimum name size, 12px minimum tagline size, left alignment/vertical centering, no clipped copy or horizontal overflow, five footer links with at least 44px height, and five nonoverflowing Updates cards.
- All 13 public routes have the expected logo, real-text branding, retained YouTube/Instagram/Facebook profiles, exact X/WhatsApp destinations, new-tab notices, and safe link attributes. Home/Updates shared links are also verified.
- Existing all-route runtime/image checks, automated WCAG A/AA checks, multi-page responsive checks, navigation labels, zero-external-request media behavior, and mobile-menu/focus behavior pass.
- Direct desktop **1440x1000** and phone **393x851** footer screenshots were visually inspected; temporary inspection files were removed after review.
- Reused the user's already-running `127.0.0.1:4173` export preview after verifying HTTP 200. No preview/dev server was started or stopped. No dependencies were installed.
- External destinations were not opened, no WhatsApp group was joined, and no physical-device certification or platform-availability guarantee is claimed.

#### Review handoff

- No checkpoint-2 item remains blocked.
- The original official logo and all existing footer wording/navigation remain intact. Only the footer logo rendition, brand formatting, and requested social-link additions changed.
- Review the footer on any page; checkpoint 3 (About) awaits confirmation. Keep its previously confirmed sparkle-removal scope and other About requirements for that next checkpoint.

### Checkpoint 3 - Completed implementation record

- A-1 through A-5 are implemented and verified Done. Stop before Sankalpas.
- Hero recommendation: About already has the shared text-based `PageIntro` used by the other interior pages. Keep that consistent structure and original copy, remove its ornament, and avoid a duplicate hero or an unrequested background image.
- Added backward-compatible `showOrnament` flags to `PageIntro` and `CommunityCTA`, defaulting to true. About disables both, including through `/philosophy/`; unmentioned pages retain their existing decorations.
- Removed the thought-section photo and its empty split layout. Reused the existing 780px reading-width helper and retained every paragraph/heading.
- Removed principle numbers from the shared component/data. Home and About are the only consumers, and Home already hid the numbers; simplified its now-unnecessary prop without a visual Home change. Journey numbers remain untouched.
- Restyled guiding belief as a contained white panel with the shared radius/border, orange leading accent, navy serif quotation, and readable muted explanation. Preserved its wording/order and all following editorial/journey/CTA content.
- Removed only directly orphaned split-image/card-number styles and breakpoint overrides; leave unrelated cleanup for checkpoint 9.
- Changed: `src/app/about/page.tsx`, `src/components/sections.tsx`, `src/app/page.tsx` (Principles call only), `src/lib/site.ts` (principle number fields only), `src/app/globals.css`, `README.md`, and this document.
- Created: `tests/about.spec.ts`. Deleted files: none. Asset moves/renames: none; all five Sankrant Sanu photographs remain available to the gallery.
- Review note: canonical `/about/` and compatibility `/philosophy/` must stay synchronized, including metadata, navigation, and `#philosophy` links.
- Review note: the other four named pages' ornament removals remain deferred to their respective checkpoints, in accordance with the confirmed page-specific scope.
- Visual review: balanced the quotation's soft-wrapped lines on phones to avoid isolating "build,"; retained the original explicit line break and wording. This rule affects only the About quote panel, not other pages' headings.
- Commit subject: `Checkpoint 3: About page updates`.

#### Validation

- `npm run build`, `npm run lint`, and `npm run typecheck`: **Passed**. All 17 static pages/endpoints generated; 13 Windows route-segment files normalized.
- Restored the two build-generated imports in `next-env.d.ts` to their pre-checkpoint state rather than committing generated configuration changes.
- Desktop regression command:
  `npm exec -- playwright test about.spec.ts website.spec.ts home.spec.ts --project=desktop --grep "About|every public page|key pages|combined sections|affected navigation|short section labels|layouts fit|Home has real-text" --workers=3 --timeout=90000 --reporter=list`: **10 passed**.
- Additional browser/device command before the final wrap refinement:
  `npm exec -- playwright test about.spec.ts --project=mobile --project=firefox --project=webkit --project=ios --project=tablet --workers=3 --timeout=90000 --reporter=list`: **10 passed, 5 intentional skips**.
- After visual review, added quote-only balanced wrapping, rebuilt/linted/type-checked, and ran the final complete About selector:
  `npm exec -- playwright test about.spec.ts --workers=3 --timeout=90000 --reporter=list`: **13 passed, 5 intentional skips**, no failures.
  The five skips avoid repeating the full other-page ornament sweep outside desktop; About content/layout are checked on all six configured profiles.
- Both `/about/` and `/philosophy/` were checked at **320, 393, 480, 768, 1024, 1180, 1200, 1440, 1920, 2560, and 3840 CSS-pixel widths**. Heights were 900px below 2560px and 2160px for the largest widths.
- Verified one shared hero/h1, original title/description and thought-section paragraphs, correct canonical metadata/navigation, no About images or sparkles, three unnumbered principle cards with unchanged content/icons, five numbered journey steps, intact contribution/membership links, and retained gallery image availability/use on Home.
- Verified the 780px reading column, inset quote width up to 1200px, at least 16px viewport inset, white panel distinct from the footer, 4px accent, centered Georgia quotation, balanced wrapping, explanation at least 14px, unclipped content, no horizontal overflow, and immediate continuation into the original heritage section.
- All 11 other public-page surfaces retain their existing ornament counts. All 13 public routes pass existing runtime/console/HTTP/image checks and automated WCAG A/AA checks; combined content, navigation labels, compatibility fragments, multi-page responsive checks, and completed Home behavior pass.
- Visually inspected the desktop hero/thought section at **1440x1000**, desktop quote with following content, and the final balanced phone quote/continuation at **393x851**. Temporary inspection screenshots were removed after review.
- Reused the user's existing `127.0.0.1:4173` export preview after verifying HTTP 200. No preview/dev server was started or stopped; no dependencies were installed.
- No physical-device certification or live external-provider check is claimed.

#### Review handoff

- No checkpoint-3 item remains blocked.
- The heading/copy, quote wording, journey, CTA actions, footer, and gallery assets are preserved. About's two decorative sparkles and thought photo are intentionally removed; the same About content remains accessible via `/philosophy/`.
- Review About, then checkpoint 4 (Sankalpas), which is now complete. Stop before checkpoint 5 until the user confirms.

### Checkpoint 4 - Completed implementation record

- S-1 through S-4 are implemented and verified Done. Preserve the existing shared `PageIntro` hero and its copy; adding another hero would duplicate the same visual surface.
- Disabled both `PageIntro` and `CommunityCTA` ornaments on Sankalpas only. Their default remains unchanged elsewhere.
- Expanded all abbreviated owner and next-action references in `src/lib/sankalpas.ts` to `Dhananjay`, including combined owners, “Dhananjay's office,” and next-action sentences. Other tracker data and the seven-column public table are unchanged.
- Scoped pathway heading styles to the Sankalpas contribution section: consistent left alignment, balanced heading wrapping, and a readable maximum text width for the full description. Existing pathway cards and their grid are unchanged.
- Changed: `src/app/sankalpas/page.tsx`, `src/app/globals.css`, `src/lib/sankalpas.ts`, `tests/sankalpas.spec.ts`, `README.md`, and this document. Created/deleted files: none. Asset moves/renames: none.
- Regression tests assert one existing shared hero, no Sankalpas intro/CTA ornaments, no remaining `DJ` in owner or next-action data, and complete/aligned pathway copy.
- The tracker layout fixture now opens its `<details>` element directly to avoid cross-engine click flakiness; row-spacing assertions allow 0.1 CSS pixel for browser geometry rounding. Separate note-history tests still exercise the user-facing keyboard interaction.
- Commit subject: `Checkpoint 4: Sankalpas page updates`.

#### Validation

- `npm run build`, `npm run lint`, and `npm run typecheck`: **Passed**. All 17 static routes/endpoints generated; 13 Windows route-segment files normalized. Restored build-generated `next-env.d.ts` imports to their committed baseline.
- `npm exec -- playwright test sankalpas.spec.ts --workers=3 --timeout=90000 --reporter=list`: **60 passed** across desktop Chromium, mobile Chromium, desktop Firefox, desktop WebKit, iPhone WebKit, and iPad WebKit.
- `npm exec -- playwright test website.spec.ts --project=desktop --grep "every public page|key pages|layouts fit|short section labels" --workers=2 --timeout=90000 --reporter=list`: **4 passed**.
- The pathway eyebrow, heading, and complete description were checked at **320, 393, 480, 768, 1024, 1180, 1200, 1440, 1920, 2560, and 3840 CSS-pixel widths** across all six configured browser/device profiles. Viewport height was 900px below 2560px and 2160px at the two largest widths. Checks verified exact copy, shared left alignment, no clipping or horizontal overflow, phone wrapping, and description width at or below 760px.
- Reused the user's existing `127.0.0.1:4173` static preview after verifying HTTP 200. No preview/dev server was started or stopped; no dependencies were installed.
- No physical-device certification or manual screenshot review is claimed.

#### Review handoff

- No checkpoint-4 item remains blocked. The existing hero and pathway cards are preserved; only Sankalpas' two ornaments, full-name references, and pathway-heading wrapping/alignment changed.
- Review Sankalpas, then confirm checkpoint 5 (Updates). Do not begin it until confirmed.

### Checkpoint 5 - Completed implementation record

- U-1 through U-9 are implemented and verified Done. U-8 remains complete through the shared social data/component work from checkpoint 2.
- Removed the intro and CTA ornaments on Updates only. Reordered the page and fragment navigation to Podcasts -> Events -> Plan Your Next Conversation -> Posts -> Gallery, followed by Social Channels.
- Verified the official channel's uploads playlist and checked the ten included long-form podcast/conversation titles and channel attribution. The list follows playlist order, newest first; shorts and a separately titled lecture were excluded. No unavailable publication dates were inferred. Preserved the previous Shiv Sastry Home feature independently of the Updates ordering.
- Kept the featured-plus-list podcast layout and click-to-load player. Updates initially shows three podcast players and loads the next three per click. Events list all seven confirmed entries newest first, initially three and then three per click, without category filters. Posts link to all five supplied Instagram URLs, initially three and then the remaining two; Instagram captions and dates are not reproduced because they were not reliably available without login. The gallery is a single unfiltered collection.
- Removed the curated-feed notice and pre-load YouTube/Google disclosure from Updates while retaining click-to-load behavior, direct watch links, and post-opt-in player status/error states.
- Changed: `src/app/events/page.tsx`, `src/app/globals.css`, `src/components/event-list.tsx`, `src/components/gallery-grid.tsx`, `src/components/media-content.tsx`, `src/lib/media.ts`, `tests/about.spec.ts`, `tests/home.spec.ts`, `tests/media.spec.ts`, `tests/website.spec.ts`, `README.md`, and this document.
- Created seven local podcast thumbnails: `public/images/podcast-cjp-protest.webp`, `public/images/podcast-hindu-genocides.webp`, `public/images/podcast-indian-history-kannada.webp`, `public/images/podcast-medha-bhaskaran.webp`, `public/images/podcast-northeast-india.webp`, `public/images/podcast-pakistan-failed-state.webp`, and `public/images/podcast-places-of-worship.webp`. No files were deleted or moved.
- Commit subject: `Checkpoint 5: Updates page changes`.

#### Validation

- `npm run build`, `npm run lint`, and `npm run typecheck`: **Passed**. Restored build-generated `next-env.d.ts` to its committed baseline.
- `npm exec -- playwright test media.spec.ts --workers=3 --timeout=90000 --reporter=list`: **48 passed** across all six configured browser/device profiles.
- Desktop selector checks in `website.spec.ts`, `home.spec.ts`, and `about.spec.ts`: **8 passed**. The corrected event-category assertion and unified gallery check also passed separately.
- Responsive Updates tests covered **320–3840 CSS-pixel widths** across all six configured browser/device profiles. Tests also cover section order/navigation, podcast/event/post pagination and links, gallery behavior, player privacy behavior, and preservation of the Home feature.
- `git diff --check`: **Passed**. Visually inspected the Updates intro/navigation, podcast feature, event archive, and Instagram-linked post cards in the existing local preview at `127.0.0.1:4173`.
- No physical-device certification or live Instagram/YouTube content verification is claimed.

#### Review handoff

- No checkpoint-5 item remains blocked. Review the podcast inclusion criterion (ten long-form conversations from the official uploads playlist) and neutral Instagram-linked cards; no captions or dates were invented.
- The Home feature remains pinned to its previous episode. Updates player previews still require an explicit user click before loading YouTube.
- Checkpoint 6 (Calendar) was next. Stop here and wait for explicit user confirmation before starting it.

### Checkpoint 6 - Completed implementation record

- C-1 through C-7 are implemented and verified Done. C-3's shared event data was completed in checkpoint 1; this checkpoint adds the featured event and calendar/map experience.
- Disabled the intro and CTA ornaments on Calendar only. Featured the confirmed November 29, 2026 Ganeshaiah gathering with its locally hosted poster and confirmed date, time, speaker, and venue above the calendar.
- Selecting a date now retains month view and updates an adjacent selected-date schedule panel; the panel stacks below the date grid on small screens. Day and year views, month/year labels, weekday order, selectors, previous/next controls, and Today reset remain functional. Kept date cells at least 48px high on phones, 60px on tablet layouts, and 80px at larger sizes.
- Removed the calendar's "Confirmed events" heading, long timezone explanation, no-events period sentence, and registration note. Kept the short IST legend and date-specific status information.
- Added an interactive Leaflet map using OpenStreetMap tiles, visible attribution, keyboard-accessible zoom controls and venue markers, event details in marker popups and venue cards, and OpenStreetMap location/directions links. Verified venue coordinates against OpenStreetMap's venue records: Alliance Francaise de Bangalore way 35277205 at **12.9913969, 77.5968841**; Suchitra Cinema and Cultural Academy way 495472305 at **12.9260031, 77.5697863**. Every event venue must have a mapped record or the map raises an explicit error.
- Added `leaflet` and `@types/leaflet`; no API key or additional map service is used. Visible tile and data attribution links to the OpenStreetMap copyright/ODbL information.
- Changed: `package.json`, `package-lock.json`, `README.md`, `src/app/calendar/page.tsx`, `src/app/globals.css`, `src/app/layout.tsx`, `src/components/event-calendar.tsx`, `src/components/event-schedule.tsx`, `src/lib/site.ts`, `tests/schedule.spec.ts`, `tests/website.spec.ts`, and this document.
- Created: `src/components/calendar-featured-event.tsx`, `src/components/event-map.tsx`. Deleted files: none. Asset moves/renames: none. Restored build-generated `next-env.d.ts` to its committed baseline.
- Commit subject: `Checkpoint 6: Calendar page updates`.

#### Validation

- `npm run build`, `npm run lint`, and `npm run typecheck`: **Passed**. All 17 static routes/endpoints generated; 13 Windows route-segment files normalized.
- `npm exec -- playwright test schedule.spec.ts --workers=3 --timeout=90000 --reporter=list`: **72 passed** across all six configured browser/device profiles. Covers calendar selection/view state, date ordering, year/month controls, selected-date event details, map markers/popups, attribution, directions links, and zoom controls.
- `npm exec -- playwright test website.spec.ts --project=desktop --grep "every public page|key pages|layouts fit|all internal home links" --workers=2 --timeout=90000 --reporter=list`: **4 passed**, including all-route runtime/image checks, automated WCAG A/AA, responsive layouts at **320–2560 CSS pixels**, and internal links/SEO endpoints. OpenStreetMap tiles were stubbed in automated browser tests; live tile-service availability is not certified.
- `git diff --check`: **Passed**. Visually inspected the Calendar hero/featured event in the existing local preview; the map's marker, zoom, and attribution controls were present in its browser snapshot.
- Dependency installation reported **7 moderate advisories**; no broad audit fix or unrelated dependency upgrade was applied.
- No physical-device certification is claimed.

#### Review handoff

- No checkpoint-6 item remains blocked. Review the chosen OSM venue coordinates and the one-day selected-event panel; the existing full schedule and IST date logic remain in place.
- The map uses the public OSM tile service and includes required contributor attribution. External tile loading and OSM directions were not live-provider certified in the automated suite.
- Checkpoint 7 (Contact) was next. Stop here and wait for explicit user confirmation before starting it.

### Checkpoint 7 - Completed implementation record

- CT-1 and CT-2 are implemented and verified Done. Removed the Contact page's intro ornament while retaining the shared hero structure and original copy.
- The long "Online registration is not available yet..." notice already applied only to Join, not Contact. Preserved that notice and the privacy/storage wording on Join. On Contact, removed the separate "Details entered here are not transmitted or stored" statement while keeping the explicit "Sending unavailable: service connection required" status and disabled Send message button when no endpoint is configured. No submission is sent or presented as successful without a configured service.
- The existing Contact form-validation and status behavior is unchanged when a service is configured; its concise data-use statement remains available in that case.
- Changed: `src/components/contact-layout.tsx`, `src/components/submission-form.tsx`, `tests/about.spec.ts`, `tests/website.spec.ts`, `README.md`, and this document. Created/deleted files: none. Asset moves/renames: none. Restored build-generated `next-env.d.ts` to its committed baseline.
- Updated the shared ornament-scope regression to reflect Calendar's completed Checkpoint 6 ornament removal while preserving the Join and other-page expectations.
- Commit subject: `Checkpoint 7: Contact page updates`.

#### Validation

- `npm run build`, `npm run lint`, and `npm run typecheck`: **Passed**. All 17 static routes/endpoints generated; 13 Windows route-segment files normalized.
- `npm exec -- playwright test about.spec.ts website.spec.ts --project=desktop --grep "every public page|key pages|layouts fit|all internal home links" --workers=2 --timeout=90000 --reporter=list`: **4 passed**, covering all-route runtime/image checks, automated WCAG A/AA, responsive layouts at **320–2560 CSS pixels**, and internal links/SEO endpoints.
- `npm exec -- playwright test about.spec.ts website.spec.ts --project=desktop --grep "page-specific ornament removal|unconfigured services" --workers=2 --timeout=90000 --reporter=list`: **2 passed**. Verified Contact has no intro ornament or redundant storage statement; its sending status remains explicit and submit stays disabled; Join retains its registration-unavailable notice.
- `git diff --check`: **Passed**. No live form endpoint was configured or contacted.
- No physical-device certification is claimed.

#### Review handoff

- No checkpoint-7 item remains blocked. Contact's unavailable-service status and disabled submit remain; Join retains its distinct membership-registration explanation.
- Checkpoint 8 (Site-wide Design Consistency and Responsiveness) is complete; its implementation and validation record follows.

### Checkpoint 8 - Completed implementation record

- G-1 through G-5 are implemented and verified Done. Added shared responsive typography tokens for hero titles, section headings, subheadings, body copy, lead copy, captions, and labels. The distinct Home photo hero remains intact while using the shared hero-title scale.
- Standardized cards, boxes, buttons, and badges on the existing 5px `--radius`; intentional circular controls and square calendar cells retain their shape.
- About, Sankalpas, Updates, Calendar, and Contact retain their shared `PageIntro`, section spacing, and 1200px-capped container system. Responsive tests verify that shared hero and full-width content containers align while preserving About's intentionally narrow reading column.
- Expanded responsive coverage to all 13 public routes at 320, 375, 480, 768, 1024, 1180, 1200, 1440, 1920, 2560, and 3840 CSS pixels. Tests check horizontal overflow, heading fit, image aspect ratio, shared hero/container alignment, and every section eyebrow for numbered prefixes or leftover separators.
- Updated the footer external-request regression to allow only the expected, attributed OpenStreetMap tile hosts while still rejecting other unrequested social embeds.
- Changed: `src/app/globals.css`, `tests/website.spec.ts`, `tests/footer.spec.ts`, `README.md`, and this document. Created/deleted files: none. Asset moves/renames: none.
- Commit subject: `Checkpoint 8: Site-wide design consistency and responsiveness`.

#### Validation

- `npm run build`: **Passed**. All 17 static routes/endpoints generated; 13 Windows route-segment files normalized.
- `npm run lint` and `npm run typecheck`: **Passed**.
- `npm exec -- playwright test website.spec.ts --project=desktop --grep "layouts fit phone" --workers=2 --timeout=90000 --reporter=list`: **1 passed**. All 13 public routes fit at all 11 viewport widths, including image-ratio checks.
- `npm exec -- playwright test website.spec.ts --project=desktop --grep "every public page|key pages|shared typography" --workers=2 --timeout=90000 --reporter=list`: **3 passed**, covering all-route runtime/image checks, automated WCAG A/AA, shared typography, and section-label prefixes.
- `npm exec -- playwright test footer.spec.ts --project=desktop --grep "all public footers retain" --workers=2 --timeout=90000 --reporter=list`: **1 passed**. The external-request check allows only the three OpenStreetMap tile hosts required by the Calendar map.
- Full desktop suite `npm exec -- playwright test --project=desktop --workers=2 --timeout=90000 --reporter=list`: **57 passed, 1 skipped**.
- No physical-device certification is claimed.

#### Review handoff

- No G-1 through G-5 item remains blocked. Review the shared scale values and 5px corner choice. Automated tests use desktop Chromium viewport emulation; no physical-device certification is claimed.
- Checkpoint 9 (Code Quality and Architecture) is next. Stop here and wait for explicit user confirmation before starting it.

### Checkpoint 9 and final review

Not started. Append its item statuses, changed/created/deleted files, exact asset moves, validation commands/results, assumptions/open questions, and independent commit reference.
Stop after checkpoint 8 and do not begin checkpoint 9.
