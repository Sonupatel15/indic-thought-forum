# ITF Website Revision Checkpoints

Audit date: 2026-11-09 (IST).
Source of requirements: the supplied 402-line website revision brief.
Completed checkpoints: **0 - Audit and Setup** and **1 - Home Page**.
Next checkpoint: **2 - Footer**, awaiting user confirmation.
H-1 through H-12 are verified complete. Later UI checkpoints remain deferred; C-3 is complete through the shared event-data prerequisite.

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

- [ ] **F-1 | Not started** - Use and correctly size the official ITF logo. Actual source confirmed as `public/images/itf-assets/ITF-Logo.png`, not the approximate path in the notes.
- [ ] **F-2 | Not started** - Ensure the full brand name and tagline are aligned, properly formatted real text.
- [ ] **F-3 | Not started** - Add X and WhatsApp beside the existing social links, using the exact supplied URLs.

### Checkpoint 3 - About Page

- [ ] **A-1 | Not started** - Recommend and implement a hero treatment consistent with other pages, taking the existing shared `PageIntro` into account.
- [ ] **A-2 | Not started** - Remove the Gemini-like sparkle ornament from this page.
- [ ] **A-3 | Not started** - Remove the image beside "The Thought Behind the Forum".
- [ ] **A-4 | Not started** - Remove numbers 01, 02, and 03 from "Principles We Practice".
- [ ] **A-5 | Not started** - Preserve the guiding-belief section's format while changing its treatment so it no longer resembles the end of the page.

### Checkpoint 4 - Sankalpas Page

- [ ] **S-1 | Not started** - Recommend and implement a hero consistent with other pages, without duplicating the existing `PageIntro`.
- [ ] **S-2 | Not started** - Remove the Gemini-like ornament.
- [ ] **S-3 | Not started** - Replace every "DJ" reference in displayed Sankalpa content with "Dhananjay", including combined owners, possessives, and next actions.
- [ ] **S-4 | Not started** - Fix alignment and responsive wrapping of "Where will you begin?", its heading, and the complete contribution-pathways description on phones through TV-sized screens.

### Checkpoint 5 - Updates Page

- [ ] **U-1 | Not started** - Remove the Gemini-like ornament.
- [ ] **U-2 | Not started** - Order the main sections Podcasts -> Events -> Plan Your Next Conversation -> Posts -> Gallery; keep relevant section navigation in sync.
- [ ] **U-3 | Not started** - Verify and include every podcast from the official YouTube channel, newest first; show three initially and three more per "Load more" click; preserve the current podcast layout.
- [ ] **U-4 | Not started** - Include all events newest first, show three initially, and reveal three more per click until exhausted; remove History/Ideas & Dialogue and similar event filters/categories from this section.
- [ ] **U-5 | Not started** - Place "Plan Your Next Conversation" immediately after Events.
- [ ] **U-6 | Not started** - Rename Community Posts to Posts; remove the existing event announcement; use embeds or Instagram-linked cards for all five supplied posts, initially three with "Load more" for the remainder.
- [ ] **U-7 | Not started** - Show one gallery without Community/Conversation category splits.
- [ ] **U-8 | Not started** - Include the supplied X and WhatsApp links in social channels.
- [ ] **U-9 | Not started** - Remove the specified curated-feed text and pre-load YouTube/Google disclosure text.

### Checkpoint 6 - Calendar Page

- [ ] **C-1 | Not started** - Remove the Gemini-like ornament.
- [ ] **C-2 | Not started** - Feature the confirmed November 29, 2026 upcoming event above the calendar; shared event data is a prerequisite, but the featured UI remains checkpoint 6.
- [x] **C-3 | Done** - Add the Ganeshaiah event to November 29, 2026 with verified poster details. Completed as H-1's shared-data prerequisite; calendar tests verify its date marker, speaker, 3:00 PM IST timing, and Alliance Francaise venue.
- [ ] **C-4 | Not started** - Keep month view visible when selecting a date and show that date's events beside the calendar, or below it on small screens.
- [ ] **C-5 | Not started** - Review and correct calendar month/year labels, weekday headers, controls, and date-cell sizes.
- [ ] **C-6 | Not started** - Remove the specified confirmed-events heading, lengthy IST explanation, empty-month sentence, and registration-note block.
- [ ] **C-7 | Not started** - Implement the approved attributed OpenStreetMap-based Bengaluru event map with verified venue pins, pan, zoom, event details, and directions below the calendar in checkpoint 6.

### Checkpoint 7 - Contact Page

- [ ] **CT-1 | Not started** - Remove the Gemini-like ornament.
- [ ] **CT-2 | Not started** - Remove the two specified long registration/storage statements where applicable to Contact; preserve explicit unavailable-service behavior and do not silently enable a disconnected form.

### Checkpoint 8 - Site-wide Design Consistency and Responsiveness

- [ ] **G-1 | Not started** - Define shared typography tokens once for hero titles, section headings, subheadings, body copy, captions, and labels, and use them consistently.
- [ ] **G-2 | Not started** - Evaluate rounded versus square boxes and cards, choose one coherent corner treatment, and apply it consistently.
- [ ] **G-3 | Not started** - Align About, Sankalpas, Updates, Calendar, and Contact hero structure, section spacing, and container widths.
- [ ] **G-4 | Not started** - Test every page, especially heroes, on phone, tablet, laptop, desktop, and large-TV viewport sizes; fix overflow, wrapping, alignment, and image distortion.
- [ ] **G-5 | Not started** - Verify that all requested numbered section-label prefixes are removed without residual spacing.

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

### Checkpoints 2-9 and final review

Not started. For each checkpoint, append its item statuses, changed/created/deleted files, exact asset moves, validation commands/results and screen sizes, assumptions/open questions, and independent commit reference.
Stop after checkpoint 1 and do not begin checkpoint 2 until the user confirms.
