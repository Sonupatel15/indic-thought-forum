# ITF Website Revision - Round 2 Checkpoints

Audit date: 2026-11-10 (IST).
Source: the supplied 317-line Round 2 brief.
Current checkpoint: **7 - Updates complete**. Waiting for confirmation before Checkpoint 8.

## Working agreement

- Implement only the supplied Round 2 requirements; preserve Round 1 changes.
- Complete, validate, document, and commit one checkpoint at a time; stop for confirmation before continuing.
- Before changing an item, record its exact source location and existing behavior here.
- Proposed content edits require approval before application.
- Use existing assets, shared components, data, and design tokens; do not invent content.
- No new dependencies without explanation and approval.
- Statuses: **Not started**, **In progress**, **Done**, **Blocked**.
- A checked box means verified completion, not just an audit finding.
- Preserve the pre-existing uncommitted changes in `WEBSITE_REVISION_CHECKPOINTS.md`, `src/app/globals.css`, and `tests/website.spec.ts`. Do not include those changes in Round 2 commits.

## Requirement checklist

### Checkpoint 0 - Audit

- [x] **R2-0-1 | Done** - Locate the header, hero, footer, Home sections, Privacy, Accessibility, About, Sankalpas, Updates, Calendar, Contact, "Find your place here", and every "Become a member" link/page.
- [x] **R2-0-2 | Done** - Record current sizes, spacing, colours, shared tokens, relevant behaviors, and exact change targets for every Round 2 item.
- [x] **R2-0-3 | Done** - Create this separate tracking file before application code changes; leave the Round 1 tracking file untouched.
- [x] **R2-0-4 | Done** - Verify the baseline build, running site, and console; record blockers, commit only this audit, and stop for confirmation.

### Checkpoint 1 - Header and Global Branding

- [x] **R2-G-1 | Done** - Use the footer's exact logo file in the header, appropriately sized and aligned on all screens.
- [x] **R2-G-2 | Done** - Determine whether the header brand name/tagline are text or an image; retain and document existing real text, otherwise replace the image branding with suitable real text.
- [x] **R2-G-3 | Done** - Remove all Next.js logos/icons, default public images, visible badges, favicon and associated metadata/references; do not introduce any replacement tab icon. Delete assets only after verifying no other uses.

### Checkpoint 2 - Home

- [x] **R2-H-1 | Done** - Remove only the decorative line beside "Indic Thought Forum" in the hero.
- [x] **R2-H-2 | Done** - Reduce "Gather. Listen. Grow." and "Conversations that stay with you." to approximately 75% of their current size at every breakpoint; revert and record if inconsistent with neighboring headings.
- [x] **R2-H-3 | Done** - Remove social links/icons only from "Watch. Listen. Connect."; preserve the rest of the section.

### Checkpoint 3 - Footer

- [x] **R2-F-1 | Done** - Remove the entire Explore and Get Involved repeated navigation groups.
- [x] **R2-F-2 | Done** - Retain all social links including X and WhatsApp; balance placement across devices, use suitable mobile tap targets, and record final icon/target sizes.
- [x] **R2-F-3 | Done** - Point "Find your place here" in "Begin with a thought. Make it a movement." to Contact; remove its former page/route and update all incoming links. Approved: consolidate the site-wide `/join/` migration from R2-S-1/R2-S-2 into this checkpoint to avoid broken links.

### Checkpoint 4 - Privacy and Accessibility

- [x] **R2-P-1 | Done** - Removed only the decorative intro sparkle from both pages.
- [x] **R2-P-2 | Done** - Reviewed both pages against actual site behavior, recorded exact wording, obtained user approval, and applied the approved content edits without adding unverified policies or contact details.

### Checkpoint 5 - About

- [x] **R2-A-1 | Done** - Set "For those who want to build, not just debate." on the same `--navy` background as "From a shared thought. To a meaningful tomorrow."; matched its text colors and verified contrast.
- [x] **R2-A-2 | Done** - Verified the existing 40px CTA-to-footer gap across responsive widths; left it unchanged as approved.

### Checkpoint 6 - Sankalpas

- [x] **R2-S-1 | Done** - All six "I'd like to contribute" links go to Contact with their existing area IDs; every linked Contact form now verifies the correct selected interest.
- [x] **R2-S-2 | Done** - Reverified the full migration inventory from Checkpoint 3, absence of live `/join/` references and route, its 404 response, sitemap exclusion, and working Contact destinations.

### Checkpoint 7 - Updates

- [x] **R2-U-1 | Done** - Shared grid-aware loading rounds initial/batch counts upward to complete responsive rows, permits only exhausted remainders, and preserves visible items/player state on resize. Featured podcast and compact Home counts are unchanged.
- [x] **R2-U-2 | Done** - Reduced only Updates posters to 80% of card width, capped at 280px; retained intrinsic aspect ratio and full uncropped images.
- [x] **R2-U-3 | Done** - Used the shared responsive section-spacing token for balanced Updates content gaps, the planning callout, closing CTA, and CTA-to-footer gap.
- [x] **R2-U-4 | Done** - Reduced Posts grid/card width, visual height, gap, and padding with a centered responsive layout.
- [x] **R2-U-5 | Done** - Matched footer social glyph/box sizes (17px/25px) and reduced Updates social cards while preserving all five profiles and accessible targets.

### Checkpoint 8 - Calendar

- [ ] **R2-C-1 | Not started** - Align sizes and spacing throughout the page to existing shared spacing tokens.
- [ ] **R2-C-2 | Not started** - Beside the calendar (below it on small screens), show this month's upcoming events from real IST today, ascending, initially three or a neatly fitting count, with Load more and an empty state; never hard-code today.
- [ ] **R2-C-3 | Not started** - Keep the current map but replace venue groups with upcoming event items only; show title/date/time/speaker/venue and both map/directions links, initially three with Load more; clicking an item selects, centers, and opens its existing-data marker popup; exclude past events everywhere in this map/list.
- [ ] **R2-C-4 | Not started** - All events: separately show three upcoming and three past with independent Load more; Upcoming/Past tabs: three initially and Load more; reuse responsive complete-row logic.

### Checkpoint 9 - Contact

- [ ] **R2-CT-1 | Not started** - Provide clearly separated Join the Community and Contribute to the Community forms with labels, required indicators, validation, accessible errors, and only existing configured submission services.
  - Join: name, email, optional phone, city, referral source, optional message.
  - Contribute: name, email, optional phone, contribution area, availability, required contribution message.
  - Record absent backend/service as an open question; do not add one.
- [ ] **R2-CT-2 | Not started** - Add Other to "I'm interested in"; when selected, reveal a required custom-interest text field.

### Final review

- [ ] **R2-FINAL-1 | Not started** - Check every requirement against the live site; mark Done or Blocked with reasons.
- [ ] **R2-FINAL-2 | Not started** - Verify clean build, no broken links/images/removed-route references, and no console errors or warnings.
- [ ] **R2-FINAL-3 | Not started** - Verify no unintended Round 1 regressions or out-of-scope changes.
- [ ] **R2-FINAL-4 | Not started** - Record final changes, remaining open items, and questions needing answers.

## Checkpoint 0 - Evidence and baseline

### Scope and preservation

- The existing Git repository is usable. The most recent existing commit at audit start was `03bcc2b` ("Checkpoint 9: Code quality and architecture").
- At audit start, the Round 1 checkpoint file, global stylesheet, and website test file already had uncommitted changes. These include the <=360px header fit adjustment and expanded responsive checks. They were inspected, not edited or included in the Round 2 audit commit.
- Created this file before any application edits. Only this tracking document is a persistent Round 2 change for Checkpoint 0.
- The production build regenerated the route-type imports in `next-env.d.ts`; those two generated changes were restored to their pre-audit values. No application behavior changed.
- No dependency, asset, content, route, size, spacing, or colour was changed. Every "after" value for this checkpoint equals its "before" value.
- The existing production preview at `http://127.0.0.1:4173` was reused; no server was started or stopped. Temporary browser tabs created for the audit were closed.

### Route and component inventory

Paths and line numbers below refer to the audit baseline; later edits may move lines. The site's actual Contact route is `/contact-us/`, and its actual Updates route is `/events/`. Do not invent `/contact/` or `/updates/` routes.

| Surface | Existing route | Exact source / component / element |
| --- | --- | --- |
| Site-wide shell | All public routes | `src/app/layout.tsx:35`: `RootLayout`, shared `Header`, `main#main-content`, shared `Footer`; stylesheet import at line 3 |
| Header and branding | All public routes | `src/components/header.tsx:9`: `Brand`; line 13: logo `Image`; line 14: real-text `strong` and `small`; line 18: `Header`; CSS `src/app/globals.css:66` |
| Home hero | `/` | `src/app/page.tsx:14`: `.hero`; line 20: action links; line 21: `.hero-signature > .signature-line`; CSS `src/app/globals.css:79` and line 90 |
| Home purpose | `/` | `src/app/page.tsx:26`: `section#our-purpose` / `.about-copy`; no purpose photo |
| Home principles | `/` | `src/app/page.tsx:30`: `.philosophy-section`, `SectionHeading`, `Principles`; shared component `src/components/sections.tsx:21` |
| Home pathways | `/` | `src/app/page.tsx:32`: `section[aria-label="Sankalpas and calendar"]`, `.pathway-grid` |
| Home event section | `/` | `src/app/page.tsx:37`: `.soft-section`, `SectionHeading` containing both requested phrases, `EventList compact` |
| Home journey | `/` | `src/app/page.tsx:39`: `SectionHeading` / `Journey`; shared component `src/components/sections.tsx:25` |
| Home goals | `/` | `src/app/page.tsx:41`: `.lakshya`; data `src/lib/site.ts:99` |
| Home media/social | `/` | `src/app/page.tsx:43`: `section[aria-label="Podcasts and social media"]`, `FeaturedPodcast`, the section-local `SocialChannels compact` |
| Home gallery / ending | `/` | `src/app/page.tsx:44`: `GalleryGrid preview`; line 45: `CommunityCTA`; line 46: `.support-strip` |
| Footer | All public routes | `src/components/footer.tsx:7`: `Footer`; line 16: compact social links; line 17: Explore; line 18: Get involved; line 19: closing invitation and "Find your place here"; CSS `src/app/globals.css:176` |
| Privacy | `/privacy/` | `src/app/privacy/page.tsx:8`: `Privacy`, `PageIntro`, `.legal-copy`; policy date at line 10 and conditional form/service copy |
| Accessibility | `/accessibility/` | `src/app/accessibility/page.tsx:7`: `Accessibility`, `PageIntro`, `.legal-copy` |
| About | `/about/` | `src/app/about/page.tsx:8`: `About`; line 14: `.quote-section`; line 17: `CommunityCTA showOrnament={false}` |
| Sankalpas | `/sankalpas/` | `src/app/sankalpas/page.tsx:12`: `Sankalpas`; line 15: tracker; line 16: six pathway cards and contribution links; line 18: CTA |
| Updates | `/events/` | `src/app/events/page.tsx:13`: `Events`; lines 16-23: section navigation, podcasts, event archive, plan block, posts, gallery, social channels, CTA |
| Calendar | `/calendar/` | `src/app/calendar/page.tsx:22`: `Calendar`; line 26: featured gathering; line 28: `EventCalendar`; line 30: `EventMap`; line 31: complete `EventSchedule`; line 33: CTA |
| Contact | `/contact-us/` | `src/app/contact-us/page.tsx:6`: `Contact` -> `ContactLayout`; `src/components/contact-layout.tsx:8` and line 11: aside, membership link, suspended `SubmissionForm` |
| Membership page | `/join/` | `src/app/join/page.tsx:4`: membership metadata; line 6: `Join` -> `ContactLayout membership` |
| Compatibility routes | `/philosophy/`, `/gallery/`, `/media/` | `src/app/philosophy/page.tsx:1` re-exports About; `src/app/gallery/page.tsx:1` and `src/app/media/page.tsx:1` re-export Updates. Preserve these routes and verify propagated shared changes. |

### Requirement-specific change targets and current behavior

| IDs | Verified exact target and baseline |
| --- | --- |
| R2-G-1 | `Brand`'s conditional `Image` in `src/components/header.tsx:13`: header uses `/images/logo-mark.png`; footer uses `/images/itf-assets/itf-logo-footer.webp`. Reuse the footer's exact file, not a second rendition. Official original remains `public/images/itf-assets/ITF-Logo.png`. |
| R2-G-2 | `src/components/header.tsx:14` already renders `site.name` and `site.tagline` as real text. Values originate in `src/lib/site.ts:11`. No image-text replacement is necessary; retain the text. |
| R2-G-3 | `src/app/layout.tsx:23` declares both icon and apple-touch-icon as `/images/logo-mark.png`; these exact links appear in the live document. No `next.svg`, `vercel.svg`, public SVG/ICO files, App Router icon/favicon assets, or visible Next.js production badges were found. `scripts/prepare-assets.mjs:29` creates `logo-mark.png` from the heritage asset; it is not established as a Next.js logo. Its consumers are the header, metadata, and the header assertion in `tests/footer.spec.ts:39`. Remove tab-icon metadata as requested, and check consumers before any deletion. Do not remove the Next.js framework dependency/imports. |
| R2-H-1 | Only `.hero-signature > span.signature-line` in `src/app/page.tsx:21`; its CSS is `src/app/globals.css:90`. Other hero dividers/content are outside scope. |
| R2-H-2 | `src/app/page.tsx:37`: "Gather. Listen. Grow." is actually the `SectionHeading` eyebrow span, and "Conversations that stay with you." is its h2, not a subtitle paragraph. Target these two text elements only; do not shrink shared headings across the site. |
| R2-H-3 | Remove only the `SocialChannels compact` instance at `src/app/page.tsx:43`; preserve `FeaturedPodcast`, heading, description, media link, and footer/social instances elsewhere. |
| R2-F-1 / R2-F-2 | `src/components/footer.tsx:17` and line 18 contain the two entire link groups. Footer social links are `SocialChannels compact` at line 16, built in `src/components/media-content.tsx:34` from `src/lib/media.ts:18`. All five profiles, including the existing exact X and WhatsApp URLs, must remain unchanged. Current social links sit below the footer brand description. |
| R2-F-3 | `src/components/footer.tsx:19`: "Find your place here" currently links to `/join/`, not a distinct invitation page. The entire `.footer-note` is hidden at <=1180px by `src/app/globals.css:560`; rebalance this existing requested footer block as part of the footer checkpoint. Route deletion overlaps R2-S-1/R2-S-2; the user approved consolidation into Checkpoint 3. |
| R2-P-1 | Both legal pages omit the `showOrnament` prop on `PageIntro`, which defaults to true. The symbol is in `src/components/sections.tsx:18`. Set page-local ornament flags; do not globally remove unrelated page ornaments. |
| R2-P-2 | Review `src/app/privacy/page.tsx:10` onward and `src/app/accessibility/page.tsx:8` against `SubmissionForm`, `sendSubmission`, `YouTubePlayer`, gallery/poster dialogs, and `EventMap`. YouTube opt-in players and forms still exist; do not remove their notices merely because the brief uses them as examples. Privacy currently describes locally served previews, external social links, conditional forms/donations, no browser drafts, and provider processing; policy date is 31 October 2026. A wording proposal and approval remain Checkpoint 4 work, not permission to change legal text now. |
| R2-A-1 | `src/app/about/page.tsx:14` `.quote-section` uses `--white`; closing `CommunityCTA` uses `--navy` via `src/app/globals.css:165`. Quote heading/body currently use dark `--ink`/`--muted`, so changing only the background would lose contrast. Use existing suitable light-text values and verify contrast when this item is implemented; preserve quotation text, inset layout, and Round 1 structure. |
| R2-A-2 | About ends immediately after `CommunityCTA`; there is no About-only spacer. `src/app/globals.css:164` gives every `.cta-wrap` a 40px bottom margin. Live About, Updates, Calendar, and Sankalpas match. User approved retaining the matching 40px gap unchanged. |
| R2-S-1 / R2-S-2 | Six pathway links in `src/app/sankalpas/page.tsx:16` use `/join/?area=${s.id}`. Shared CTA, footer, Home, Contact, Support, sitemap, membership route, and dependent tests/docs are included in the complete inventory below. Execute with Checkpoint 3 as approved; Checkpoint 6 re-verifies completion. |
| R2-U-1 | Shared `src/lib/use-incremental-list.ts:5` currently slices a fixed visible count and increments by three; no column/resize logic exists. `MorePodcasts` at `src/components/media-content.tsx:15` starts with two archive items plus the separate featured item; `SocialPosts` at line 23 starts with three; `EventList` at `src/components/event-list.tsx:12` starts with three. Current grid columns: podcast archive and posts 2 above 760px / 1 below; events 3 above 760px / 2 at 481-760px / 1 at <=480px. Approved rounding is upward to whole grid rows; retain the separate featured podcast layout, ordering, exhausted-list behavior, and three-item base batch. Scope the shared hook changes so Home's compact latest-three events stay exactly three. |
| R2-U-2 | `src/app/events/page.tsx:18` `#events`, actual heading "Ideas worth revisiting."; `src/components/event-list.tsx:24` `.event-image > Image`; CSS `src/app/globals.css:118` and line 119. Posters are already width 100%, height auto, object-fit contain; reduce their display scale without changing originals or globally altering Home's poster layout. |
| R2-U-3 | `src/app/events/page.tsx:17` `#podcasts` ("Stay with the conversation"), line 18 `#events` ("From the ITF archive"), line 19 `#plan-conversation`, line 23 `CommunityCTA` (eyebrow "Every contribution begins with you"). Preserve existing wording; no renaming was approved. Existing `.section` rules hard-code responsive padding; there is no shared section-spacing custom property yet. Reuse those existing spacing values through one shared token rather than introducing competing spacing logic. |
| R2-U-4 | `SocialPosts` in `src/components/media-content.tsx:23`; CSS `src/app/globals.css:417`: two-column grid; line 419: 310px visual height (280px <=480px); line 425: 30px copy padding (24px <=480px). |
| R2-U-5 | `src/app/events/page.tsx:22` `#social-channels`, existing eyebrow "Find us in your everyday" and h2 "Your feed. A little more thought."; not literally "Find Us Every Day". `SocialChannels` at `src/components/media-content.tsx:34` has a noncompact branch with 25px glyphs and full cards. Footer uses its compact branch with 17px glyphs. User instruction: "no renaming". |
| R2-C-1 | `src/app/calendar/page.tsx:25` onward; shared heading/featured card, `EventCalendar`, `EventMap`, complete schedule, support strip, CTA. Component sizing lives in `src/app/globals.css:279` through line 369, with <=1024px, <=760px and <=480px overrides. Preserve existing day/month/year controls and original poster dialogs. |
| R2-C-2 | `src/components/event-calendar.tsx:27`: `EventCalendar`; `.calendar-details` currently lists only the selected date (or the selected year), using `EventSchedule`. It does not show the current month's upcoming list. Current month defaults to real IST today. Reuse `getIndiaDateKey` (`src/lib/schedule.ts:9`), `getEventSchedule` (line 25), and `useEventDate` (`src/lib/use-event-date.ts:15`), which refreshes on focus and every minute. Keep existing date navigation while wiring the requested month panel. |
| R2-C-3 | `src/components/event-map.tsx:8` groups all seven events by the two verified venues, regardless of date; `EventMap` at line 23 creates all venue markers and a venue-grouped list. Markers/popups exist, but list items do not select markers. Reuse existing Leaflet map, attribution, error state, and directions helper; add date filtering and event selection without new venue/coordinate data. |
| R2-C-4 | `src/components/event-schedule.tsx:18`: `EventSchedule`; `renderGroup` at line 33 currently maps entire upcoming/past groups, with filters but no Load more. All lists are single-column schedules; add independent group counts through the shared hook, preserving order and poster-index/focus behavior. Calendar detail uses the same component, so explicitly preserve its intended selected-date/year behavior. |
| R2-CT-1 | `src/components/contact-layout.tsx:11` renders one `SubmissionForm`; `src/components/submission-form.tsx:12` toggles Contact vs membership. Current Contact fields: name, email, optional phone, required interest, required message, consent, honeypot. No city, referral, or availability fields exist. Membership currently requires phone, unlike the requested two new forms. IDs currently assume a single form and must be unique if two are rendered together. Reuse existing validation/error/unavailable-service handling; do not display a success without a configured service. |
| R2-CT-2 | `src/components/submission-form.tsx:59`: `select#area`, Contact label "I'm interested in", six Sankalpa categories plus Events & collaboration and General enquiry. No Other option or conditional custom-interest input exists. Preserve the relevant interest field when reorganizing Contact into two forms; finalize placement during Checkpoint 9. |

### All membership-route consumers

No separate "Find your place here" page exists. `/join/` is the only membership route. All runtime link definitions below must be migrated together before removing it; shared components repeat those links on multiple routes.

| Existing link/reference | Exact location | Planned destination/action (not applied) |
| --- | --- | --- |
| "Find your place here" | `src/components/footer.tsx:19` | `/contact-us/` |
| "Become a member" in Get involved | `src/components/footer.tsx:18` | Remove with the entire requested Get involved group |
| "Become a Member" shared CTA | `src/components/sections.tsx:30` | `/contact-us/`; preserve label unless an approved requirement changes it |
| Shared CTA instances | `src/app/page.tsx:45`, `src/app/about/page.tsx:17`, `src/app/sankalpas/page.tsx:18`, `src/app/events/page.tsx:23`, `src/app/calendar/page.tsx:33` | Updated through the shared component; also propagates to Philosophy, Gallery, and Media compatibility routes |
| "Join the Movement" | `src/app/page.tsx:20` | `/contact-us/` |
| "I'd like to contribute" (six cards) | `src/app/sankalpas/page.tsx:16` | Contact; preserve the existing valid area context where supported |
| "Looking to become a member?" | `src/components/contact-layout.tsx:11` | Contact; avoid an unhelpful self-link once the new Contact forms exist |
| "Explore volunteering" | `src/app/support/page.tsx:14` | Contact, retaining community context where supported |
| Membership route and canonical metadata | `src/app/join/page.tsx:4` and line 6 | Remove page/route after all consumers migrate |
| Public sitemap entry | `src/app/sitemap.ts:7` | Remove `join/` entry |
| Dependent route/behavior tests | `tests/website.spec.ts:7`, line 49, line 112, line 132; `tests/about.spec.ts:39` and line 52; `tests/footer.spec.ts:56`; `tests/sankalpas.spec.ts:143` | Update only expectations coupled to the explicitly removed route/changed destinations |
| Directly related documentation | `README.md:27` onward (included pages, membership behavior, configuration, form contract, browser route counts) | Update affected descriptions/counts and contract when the respective implementation changes land; do not rewrite unrelated documentation |

### Current sizes, spacing, and colours

These are baseline values, not newly chosen Round 2 values. All remain unchanged after Checkpoint 0.

| Target | Current values / source |
| --- | --- |
| Shared colours | `src/app/globals.css:1`: `--paper: #f7f5ef`, `--white: #fff`, `--ink: #182b36`, `--muted: #58656d`, `--orange: #e97121`, `--orange-dark: #a94309`, `--line: #dedfd8`, `--soft: #eeeae1`, `--navy: #162d3a`; radius 5px |
| Shared typography | Root `--type-heading: clamp(1.875rem, 3vw, 2.625rem)`; <=760px `clamp(1.625rem, 5vw, 2rem)`; <=480px `clamp(1.5rem, 6.5vw, 1.875rem)`. `--type-label: .6875rem` (11px at baseline root), `--type-subheading: 1.375rem`, body 1rem, caption .875rem. |
| Container and section spacing | `src/app/globals.css:44`: container min(1200px, 100%-96px); <=1180px 100%-64px; <=760px 100%-40px. `.section` padding-block 96px / 75px <=1180px / 58px <=760px. No section-spacing token currently exists. |
| Header image / row | `src/app/globals.css:67`: header min-height 94px, gap 30px; <=1180px 80px/22px; <=760px 76px. Logo CSS 52px square desktop/tablet, 46px <=760px, 43px <=480px, 40px <=360px. Brand gap 11px desktop, 7px <=1180px, 6px <=360px. Image markup dimensions are 58x58 header / 56x56 footer. |
| Header real text | `src/app/globals.css:70`: Georgia/Times serif name 18px, weight 600, line-height 1.4; tagline 7.5px, weight 700, uppercase, line-height 2. <=1180px effective name/tagline 19px/8px; <=760px 17px/7px; <=480px 16px/6.6px; <=360px 15px/6px. |
| Home decorative line | `src/app/globals.css:90`: 32px x 1px, background #d8c6a9; signature flex gap 14px. Remove the line only at its checkpoint. |
| Home requested event text | Eyebrow 11px, weight 800, line-height 1.6, colour `--orange-dark`, 13px bottom margin; h2 uses responsive `--type-heading`. Scoped 75% targets would be 8.25px eyebrow and 75% of each responsive h2 value; these are not applied and remain subject to the brief's visual/revert condition. |
| Footer grid | `src/app/globals.css:177`: 1.5fr / 1fr / 1.1fr / 1.3fr, gap 50px, padding-block 65px 50px; <=1180px three columns, gap 30px, invitation hidden; <=760px two columns with full-width about block, gap 30px 20px, padding 43px 35px. Background #eeeae1, top border #e6e3d8; bottom row padding 22px. |
| Footer social targets | `src/app/globals.css:401` through line 408: flex wrapping, 7px gap, 20px top margin; anchors minimum height 44px, 11px text, 5px internal gap, padding 4px 8px 4px 4px; icon boxes 25px square, glyph 17px, outgoing arrow 13px. Keep target height accessible when rebalancing. |
| About quote | `src/app/globals.css:212`: `--white` background, `--line` border, 4px `--orange` start border, clamp(28px,5vw,56px) block / clamp(20px,4vw,48px) inline padding. Quote uses `--ink`, Georgia, clamp(30px,4vw,50px), line-height 1.45; explanatory text uses `--muted`. |
| Shared closing CTA | `src/app/globals.css:164`: wrapper top margin 0 and bottom margin 40px. Panel padding 58px 60px; <=1180px 44px 38px; <=760px 35px 28px; <=480px 32px 24px; gap 25px. Background `--navy`, heading white, eyebrow #f8b57c, body #c1ccce. |
| Updates section alignment | `.section-heading` gap 35px / bottom margin 39px (<=760px gap 17px / bottom margin 28px). `#plan-conversation` `.upcoming-note` has 50px top margin and 26px 30px padding; <=760px 30px top margin / 22px padding. Consecutive `.section` siblings can accumulate two padding blocks; no token coordinates those gaps with the unpadded closing CTA. |
| Event poster grid | `src/app/globals.css:116`: 3 columns / 27px gap, 20px gap <=1180px; <=760px 2 columns / 30px 18px gap with an odd-final-card span/max-width rule; <=480px 1 column / 35px gap. All posters preserve 1587:2245 ratio, 100% width / auto height / object-fit contain. |
| Podcast archive | `src/app/globals.css:396`: 2 columns, 32px gap, 55px top margin / 45px top padding; <=760px 1 column, 38px gap/margin and 35px top padding. Featured podcast is a separate 1.35fr / 1fr editorial layout, 45px gap, stacked <=760px. |
| Posts | `src/app/globals.css:417`: 2 columns, 30px gap; 1 column <=760px. Visual height 310px / 280px <=480px, internal padding 35px. Copy padding 30px / 24px <=480px; title 25px, copy 14px, link 13px. |
| Updates social cards | `src/app/globals.css:409`: 3 columns, gap 23px, padding 30px, internal gap 26px, icon boxes 55px and glyphs 25px. <=1180px padding 25px; <=760px single column, row-oriented cards, padding 28px / gap 22px; <=480px padding 23px / gap 18px / icon boxes 45px. |
| Calendar controls and grid | `src/app/globals.css:310`: period label 28px (21px <=480px), navigation gap 18px / margin-block 28px (10px / 22px <=480px), arrow buttons >=44px, selectors 16px gap / 52px controls, legend margin 22px. Calendar cell minimum heights 80px / 60px <=760px / 48px <=480px. |
| Calendar details / map layout | `src/app/globals.css:335`: month columns 1.35fr / .65fr, minimum detail width 240px, gap 28px; <=1024px 1.15fr / .85fr, min 230px, gap 18px; stacked <=760px. Map layout at line 348: 1.25fr / .75fr, min list width 300px, gap 28px; <=1024px 1.15fr / .85fr, min 280px, gap 18px; stacked <=760px. Map height 470px / 380px <=760px, venue-card padding 22px / gap 16px. |
| Calendar feature / schedule | Feature card padding 28px, gap clamp(24px,5vw,64px), bottom margin 62px; <=760px padding 22px, gap 24px, margin 48px. Schedule groups gap 38px, heading bottom margin 20px; items 82px / fluid / auto columns, gap/padding 28px; <=760px date width 70px / gap20px / padding25px; <=480px date width58px / gap15px. |
| Contact forms | `src/app/globals.css:433`: aside/form columns .85fr / 1.35fr, gap 56px, stacked <=760px. Form padding 38px, 26px <=1180px, 30px <=760px, 24px 20px <=480px. Field grid 2 columns / gap22px 18px / top margin30px, single column <=1180px; inputs >=45px, 12px text (16px on small/coarse-pointer devices); textarea >=130px; label11px / bottom margin8px. |

### Live responsive measurements

Measured in browser CSS pixels on the existing production export. Fractional values reflect the browser's actual layout/scrollbar calculations; they are not proposed replacement sizes.

| Viewport width | Screen category | Header logo | Section block padding | Home event eyebrow / h2 | Updates poster width x height | Post visual width x height | Updates social icon box |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 393px | Phone | 43x43 | 58px | 11px / 25.584px | 338.4x478.7 | 336.8x280 | 45x45 |
| 768px | Tablet | 52x52 | 75px | 11px / 30px | 216.3x305.9 | 327.8x310 | 55x55 |
| 1280px | Laptop | 52x52 | 96px | 11px / 38.4px | 371.6x525.7 | 567.8x310 | 55x55 |
| 1440px | Desktop | 52x52 | 96px | 11px / 42px | 382x540.4 | 583.4x310 | 55x55 |
| 3840px | Large TV-style viewport | 52x52 | 96px | 11px / 42px | 382x540.4 | 583.4x310 | 55x55 |

- Across these five widths, the measured first footer social target was 106.8x44px with a 25x25px icon box; glyph source size is 17px.
- About quote background stayed rgb(255,255,255); padding was 28px 20px at 393px, 38.4px 30.72px at 768px, and 56px 48px at 1280/1440/3840px.
- About's CTA-to-footer gap was 40px at every measured width, matching the same shared wrapper elsewhere.
- All 13 public routes were checked at every width: 65 successful HTTP 200 navigations, no detected horizontal overflow, no detected broken loaded images, and zero captured console warnings, console errors, or page errors.
- These are automated browser/emulation checks, not certification on physical phones, tablets, laptops, desktops, or TV hardware.

### Validation results

| Check | Result |
| --- | --- |
| `npm run build` | Passed: Next production compilation, TypeScript build checks, all static routes, and finalizer (13 normalized Windows route-segment files). No build errors or application warnings. |
| `npm run lint` | Passed, zero warnings (`--max-warnings=0`). |
| `npm run typecheck` | Passed. |
| Targeted existing Playwright suite | 12 passed in 29.6s, desktop and mobile projects. Command: `npx playwright test tests/website.spec.ts tests/home.spec.ts tests/media.spec.ts --project=desktop --project=mobile --grep "every public page|all internal home links|affected navigation links|every supplied poster|Updates orders sections|unconfigured services"` |
| Targeted suite coverage | All 13 routes and canonical/compatibility URLs, runtime errors, navigation/fragment targets, Home internal links and SEO endpoints, supplied posters/photos, Updates section ordering, and unavailable form/payment behavior. Map tiles are mocked by the existing website tests; real map loading was checked separately below. |
| Real browser preview | The rebuilt static export is responsive at port 4173; source and live section text, logos, favicon metadata, initial card counts, Contact unavailable state, and seven venue-list event entries were confirmed. |
| Real current-date/map check | Browser IST date was 2026-11-10, calculated using `Asia/Kolkata`. Map reached `data-map-ready="true"` with two venue markers and nine loaded real tiles, with no captured warnings/errors after network idle. Existing data contains one upcoming event (29 November 2026) and six past events on this date; do not invent more events to fill requested counts. |
| Existing behavior retained | Live Updates still starts with three total podcasts (one featured + two archive), three events, three posts. Home latest-three behavior, section labels/order, X/WhatsApp data, compatibility routes, forms, and players were not changed. |

### Decisions obtained during the audit

These answers resolve audit ambiguities only; they do not authorize starting the next checkpoint.

1. **Membership route overlap:** user selected "Consolidate all /join/ link changes and route removal into Checkpoint 3; verify again in Checkpoint 6". R2-S-1/R2-S-2 therefore become approved prerequisites of R2-F-3, with separate verification in Checkpoint 6.
2. **Section wording:** user replied "no renaming". Preserve actual labels "From the ITF archive", "Ideas worth revisiting.", "Find us in your everyday", and "Your feed. A little more thought."; target their existing sections rather than adding/renaming content.
3. **Complete responsive rows versus initial three:** user selected "Round up to the next complete row (three becomes four in a two-column grid); retain featured podcast layout". Apply complete rows independently to the podcast archive grid, leaving the featured item separate.
4. **About footer gap:** user selected "Leave the matching 40px gap unchanged and document that no extra spacer exists". R2-A-2 requires verification/documentation, not an unnecessary spacing edit.

### Open questions / approval gates

- **Checkpoint continuation:** wait for explicit confirmation before starting Checkpoint 1. All implementation checkpoints remain Not started.
- **Privacy/Accessibility wording:** no legal/content edit has been proposed or applied yet. In Checkpoint 4, list exact before/proposed wording and wait for approval, including any wording needed for the eventual Contact form field changes. Existing players/forms are real, not absent features.
- **Contact service:** the live send button is disabled and says "Sending unavailable: service connection required." `src/lib/site.ts:15` accepts an optional configured endpoint, but no service is connected in this preview. Per the brief, do not add a backend, email service, or third-party integration. Any future service connection needs separate operator direction; new forms must remain truthfully unavailable meanwhile.
- **Contact structure and existing interest field:** choose tabs versus separated cards and confirm where the existing "I'm interested in" field belongs when implementing Checkpoint 9; the requested new Join/Contribute field lists do not explicitly place this existing field. Do not silently drop it.
- **No invented data:** Calendar can show only one upcoming event at the audit date; exhausted-list and empty-month states are necessary. Use only `events` and `eventMapLocations` in `src/lib/site.ts`, with their existing verified venue coordinates.
- No new dependencies are needed for any audited change at this stage. No unresolved missing source location blocks Checkpoint 0.

### Checkpoint 0 completion

- **Files changed:** this tracking document only.
- **Application components/elements changed:** none.
- **Before/after sizes, spacing, colours:** unchanged; baseline recorded above.
- **Screen sizes tested:** 393, 768, 1280, 1440, and 3840px live browser widths, plus existing desktop 1440x1000 and Pixel 7 mobile test profiles.
- **Commit scope:** this document only, in the separate "Round 2 - Checkpoint 0: Audit" commit.
- **Next step:** stop and await confirmation for Checkpoint 1.

## Checkpoint completion records

Checkpoint 1 is complete. Future checkpoint records must include item status, exact files/components/elements, before/after sizes/spacing/colours, screen sizes tested, open questions, validation outcomes, and each separate commit.

### Checkpoint 1 - Header and Global Branding

- **R2-G-1 | Done.** In `src/components/header.tsx`, `Brand` now renders `/images/itf-assets/itf-logo-footer.webp` for both header and footer. This reuses the already optimized, faithful 168x168 WebP asset verified against `public/images/itf-assets/ITF-Logo.png`; no duplicate logo or new asset was introduced.
- **R2-G-2 | Done.** Header brand text was already real text (`site.name` and `site.tagline`) in `src/components/header.tsx`; retained it unchanged. The audited baseline typography and alignment are unchanged.
- **R2-G-3 | Done.** Removed `icons` metadata from `src/app/layout.tsx`. The production export has no `rel=icon` or `apple-touch-icon` metadata, no favicon/icon files, and no stale references to the old header logo or Next/Vercel images. Inspection confirmed there were no Next.js-branded images in `public` and no visible Next.js badges, so none were deleted. Retained `public/images/logo-mark.png`: it is generated from the existing heritage image by `scripts/prepare-assets.mjs` and is not a Next.js default image; the user prohibited replacing a tab icon with an ITF logo, not the existing non-Next source asset.
- **Files/components changed:**
  - `src/components/header.tsx`: `Brand` logo `Image` source now always matches the footer's `itf-logo-footer.webp`; intrinsic `width`/`height` attributes now both use 56px, matching the footer markup. Existing image CSS, `object-fit: contain`, and responsive alignment are unchanged.
  - `src/app/layout.tsx`: removed only the `icons` metadata property; retained all other metadata.
  - `tests/footer.spec.ts`: verifies header/footer share the optimized asset, preserve real-text branding, and render no tab icon, Next/Vercel image, or Next.js badge.
  - `WEBSITE_REVISION_ROUND2_CHECKPOINTS.md`: records completion and validation.
- **Before -> after measurements:** Header logo source `logo-mark.png` (160x160 intrinsic) -> footer-matching `itf-logo-footer.webp` (168x168 intrinsic); markup dimensions 58x58 -> 56x56. Computed on-screen header logo dimensions stayed 52x52 desktop/tablet, 46x46 at <=760px, 43x43 at <=480px, and 40x40 at <=360px; existing `object-fit: contain`, flex centering/gap, header sizes, text sizes/alignment, and all colors remained unchanged. Footer remains 56x56 CSS size using the same 168x168 asset. Explicit icon metadata and its two live icon links changed to none; no page content, spacing token, or color changed.
- **Screen sizes tested:** Footer logo/brand/social reflow suite at 320, 393, 480, 768, 1024, 1180, 1200, 1440, 1920, 2560, and 3840 CSS px across Home and Updates. Every public route was also loaded in desktop 1440px and Pixel-style mobile profiles.
- **Validation:** `npm run build`, `npm run lint`, and `npm run typecheck` passed. `npx playwright test tests/footer.spec.ts`: 13 passed, 5 expected skips across desktop, mobile, Firefox, WebKit, iOS, and tablet projects. `npx playwright test tests/website.spec.ts --project=desktop --project=mobile --grep "every public page is statically available"`: 2 passed, covering all 13 routes in each profile with no runtime/console errors, HTTP errors, broken images, or overflow. Export inspection confirmed zero icon/legacy-logo references; full-suite logo checks verified the reused asset and footer behavior.
- **Open questions or assumptions:** No blockers. No Next.js-branded public assets or visible production badges existed to remove. No new dependencies were required.
- **Commit:** to be recorded after the Checkpoint 1-only commit.
- **Next step:** stop and await confirmation before Checkpoint 2.

### Checkpoint 2 - Home

- **R2-H-1 | Done.** Removed only the decorative `.signature-line` span next to the real-text branding in the Home hero (`src/app/page.tsx`). Removed its now-unused 32x1px CSS rule from `src/app/globals.css`; the signature text, hero, actions, and other dividers remain.
- **R2-H-2 | Done.** Scoped the size reduction to the Home conversation section with `.home-conversation-section`; the shared `SectionHeading` and every other page remain unchanged. The eyebrow "Gather. Listen. Grow." went from `var(--type-label)` (11px) to `calc(var(--type-label) * .75)` (8.25px). Its h2 "Conversations that stay with you." went from `var(--type-heading)` to `calc(var(--type-heading) * .75)`. This tracks the existing responsive heading token rather than hard-coding a viewport-specific size. Representative before -> after h2 sizes: 393px 25.584px -> 19.188px, 768px 30px -> 22.5px, 1280px 38.4px -> 28.8px, 1440px and 3840px 42px -> 31.5px. The eyebrow is 11px -> 8.25px at every width. Screenshot and responsive comparison found the smaller label and title remain legible and visually balanced beside other section headings, so no reversion was needed. Description, heading line-height, margins, spacing, and colors are unchanged.
- **R2-H-3 | Done.** Removed only the `SocialChannels compact` element and its now-unused import from the Home "Watch. Listen. Connect." section (`src/app/page.tsx`). The section heading, description, media link, featured podcast, and player remain; footer and Updates social channels are unchanged.
- **Files/components changed:**
  - `src/app/page.tsx`: Home hero signature child, a modifier class on the "Gather..." section, and only the Home "Watch..." `SocialChannels` element/import.
  - `src/app/globals.css`: removed the unused `.signature-line` rule and added responsive-token-based 75% typography rules scoped to `.home-conversation-section`.
  - `tests/home.spec.ts`: added checks for removal scope, retained podcast/footer links, and exact 75% sizes at 16 viewport widths.
  - `WEBSITE_REVISION_ROUND2_CHECKPOINTS.md`: recorded status and verification.
- **Before -> after colors and spacing:** no colors, dimensions other than requested font sizes, section spacing, or layout gaps were changed. The hero signature flex gap remains (one child, therefore no visible gap); the existing hero, event cards, and social sections elsewhere are unchanged.
- **Screen sizes tested:** Heading scale at 320, 360, 361, 393, 480, 481, 760, 761, 768, 1024, 1180, 1200, 1440, 1920, 2560, and 3840 CSS px across Chromium desktop/mobile, Firefox, WebKit desktop, iOS-style, and tablet projects. Existing Home poster/overflow regression test additionally covers 320, 393, 480, 768, 1024, 1440, 1920, 2560, and 3840px.
- **Validation:** `npm run build`, `npm run lint`, and `npm run typecheck` passed. Full `npx playwright test tests/home.spec.ts`: 36 passed across six browser/device projects. `npx playwright test tests/media.spec.ts --grep "verified social channels"`: 6 passed, confirming Updates social links still work. Browser-suite validation confirmed the removed Home social component does not affect the featured podcast or footer links. An initial strict-font assertion was adjusted for normal Firefox subpixel rounding (less than 0.05px); the full rerun passed. Two concurrent Playwright invocations once encountered temporary trace-file collisions; sequential reruns passed.
- **Open questions or assumptions:** None. No application behavior beyond the listed Home changes was altered.
- **Commit:** to be recorded after the Checkpoint 2-only commit.
- **Next step:** stop and await confirmation before Checkpoint 3.

### Checkpoint 3 completion - Footer and approved membership migration

- **R2-F-1 | Done:** removed the complete Explore and Get involved groups from `src/components/footer.tsx`, not merely hidden them.
- **R2-F-2 | Done:** retained all five existing profile URLs in the existing `SocialChannels compact` component beneath the brand. `src/app/globals.css` changes the footer from four columns (1.5fr/1fr/1.1fr/1.3fr) to two shrink-safe columns (1.5fr/1fr), stacking into one column at <=760px. Removed the <=1180px three-column override and hidden invitation rule. The closing invitation is now visible at all widths.
- **Before/after sizes and spacing:** social glyphs remain 17px inside 25px boxes, outgoing arrows 13px, link minimum height 44px, social gap 7px, top margin 20px; brand logo remains 56px. Desktop footer gap stays 50px (30px at <=1180px), padding stays 65px/50px; mobile gap becomes 30px instead of 30px/20px, padding stays 43px/35px. Footer background #eeeae1, border #e6e3d8, text colors and all typography remain unchanged.
- **R2-F-3 / R2-S-1 / R2-S-2 | Done:** removed `src/app/join/page.tsx` and its sitemap entry (`src/app/sitemap.ts`). No replacement or redirect route was introduced. The old route returns HTTP 404; the export contains neither the route nor references to it.
- **Complete changed-link inventory:**
  - `src/components/footer.tsx`: Find your place here -> `/contact-us/`; Become a member removed with Get involved.
  - `src/components/sections.tsx`: shared Become a Member CTA -> `/contact-us/`, covering Home, About/Philosophy, Sankalpas, Updates/Gallery/Media, Calendar.
  - `src/app/page.tsx`: Join the Movement -> `/contact-us/`.
  - `src/app/sankalpas/page.tsx`: all six I'd like to contribute links -> `/contact-us/?area=<existing-id>`.
  - `src/app/support/page.tsx`: Explore volunteering -> `/contact-us/?area=community`.
  - `src/components/contact-layout.tsx`: Looking to become a member? -> `/contact-us/#contact-form`; `src/components/submission-form.tsx` adds the corresponding form anchor. This points visitors to the existing form rather than an unhelpful page-only self-link.
  - The existing Contact form already supports the area query; all six pathway selections remain prefilled correctly. No new fields, wording, service connection, or Contact redesign was introduced.
- **Other directly related files:** `README.md` documents the current 12 routes, footer layout, and Contact migration; `tests/footer.spec.ts`, `tests/website.spec.ts`, `tests/about.spec.ts`, `tests/sankalpas.spec.ts` now assert the new destinations, route removal, visible invitation, and removed navigation groups. The footer test's obsolete Home-social assertion was aligned with completed R2-H-3; no social data changed.
- **Uncommitted work review requested by user:** all three pre-existing staged files were necessary: the <=360px header fit fix in `src/app/globals.css`, its expanded all-route responsive test in `tests/website.spec.ts`, and its existing Round 1 evidence in `WEBSITE_REVISION_CHECKPOINTS.md`. Confirmed with 3 passing responsive profiles (desktop/mobile/tablet), then committed separately as `3a2297e` before Checkpoint 3 changes. No pre-existing changes were discarded. The build-generated `next-env.d.ts` path changes were restored, not committed.
- **Validation:** production build, strict typecheck, and lint passed. Full desktop suite: 58 passed, 1 expected skip. Cross-browser footer/Contact migration selections: 25 passed, 5 expected skips across mobile Chromium, Firefox, desktop WebKit, iOS-style, and tablet profiles. Footer reflow checks cover 320, 393, 480, 768, 1024, 1180, 1200, 1440, 1920, 2560, 3840 CSS px; current desktop all-route matrix covers 18 widths. Tests cover no broken internal links/images, no runtime errors, accessible layouts, all existing social URLs, original Contact validation/unavailable state, preselected interests, no links to the removed route, and 404 for the removed route. No physical-device certification is claimed.
- **Open questions:** none for this checkpoint. The disconnected form service remains unchanged; two new Contact forms remain Checkpoint 9. Privacy/Accessibility wording still requires proposal and approval in Checkpoint 4.
- **Checkpoint commit subject:** `Round 2 - Checkpoint 3: Footer and Contact migration`.
- **Next step:** stop; wait for confirmation before Checkpoint 4.

## Content proposals and approval

### Checkpoint 4 progress

- **R2-P-1 | Done:** `src/app/privacy/page.tsx` and `src/app/accessibility/page.tsx` previously used the default `PageIntro` ornament (`src/components/sections.tsx` renders `✦` when `showOrnament` is true). Passed `showOrnament={false}` only on these two page intros; the shared component and all other routes are unchanged. Added a regression test for both routes.
- **Privacy review:** form fields and conditional form availability match `SubmissionForm`, `sendSubmission`, and `site.formsEndpoint`; YouTube embeds only load after the visitor opts in; local social cards are curated outbound links; donations are conditional on the configured hosted URL. Replaced unverified claims about submission use and hosting logs with wording that states what is known from the site code and what the operator must confirm.
- **Accessibility review:** keyboard navigation, focus visibility, skip link, form labels, image-viewer keyboard controls/focus return, and reduced-motion behavior are present in the implementation. The archive-poster limitation is consistent with the available poster images and event text. Barrier-report instructions now reflect whether a public email or connected form is configured.
- **Approved and applied wording:** the user approved the exact proposal above. Privacy now says the form sends submitted information to the configured enquiry service, the site code does not implement mailing-list subscription, and the operator must confirm service use/retention; it no longer asserts unverified host log practices. Privacy requests and accessibility reports now use the configured public email if present, otherwise the contact form only if its service is connected, and state when neither route is available. The Privacy last-updated date was changed to 10 November 2026 with user approval.
- **Validation:** `npm run build`, `npm run lint`, and `npm run typecheck` passed. Targeted Playwright tests passed on desktop and mobile for both pages’ ornament and configured-contact copy. The automated WCAG A/AA checks also passed on both profiles.
- **Checkpoint commit subject:** `Round 2 - Checkpoint 4: Privacy and Accessibility`.
- **Next step:** complete; Checkpoint 5 is recorded below.

### Checkpoint 5 completion - About

- **R2-A-1 | Done:** `src/app/about/page.tsx` renders the quote panel at `.quote-section`; `src/app/globals.css` now gives it the existing `--navy` token used by `.community-cta`. Matched the CTA’s existing eyebrow (`#f8b57c`), heading (`#fff`), and body (`#c1ccce`) colors. Preserved quotation, alignment, padding, accent border, and other layout.
- **Contrast:** against `--navy` (`#162d3a`), the eyebrow is 8.09:1, quotation 14.28:1, and supporting text 8.70:1. All exceed WCAG AA’s 4.5:1 normal-text threshold.
- **R2-A-2 | Done:** no spacer or margin was changed. The actual gap from the closing `.community-cta` panel to the footer remains 40px at each tested width, matching the shared `.cta-wrap` bottom margin.
- **Tests:** expanded `tests/about.spec.ts` to compare quote background and text colors with the CTA, calculate each text contrast ratio, and measure the CTA-to-footer gap at 320, 393, 480, 768, 1024, 1180, 1200, 1440, 1920, 2560, and 3840 CSS px on About and its `/philosophy/` compatibility route. Updated the existing ornament sweep to reflect Checkpoint 4’s removal on Privacy and Accessibility.
- **Validation:** `npm run build`, `npm run lint`, and `npm run typecheck` passed. `npx playwright test tests/about.spec.ts --project=desktop --project=mobile` passed: 5 passed, 1 expected desktop-only sweep skipped on mobile. Responsive, contrast, content, and route assertions passed.
- **Checkpoint commit subject:** `Round 2 - Checkpoint 5: About`.
- **Next step:** stop; wait for confirmation before Checkpoint 6.

### Checkpoint 6 verification - Sankalpas

- **Implementation status:** the membership route/link migration was completed in Checkpoint 3 as approved. No application or sitemap changes were needed in this verification checkpoint.
- **R2-S-1 | Done:** all six `src/app/sankalpas/page.tsx` contribution links preserve their area IDs in `/contact-us/?area=<id>`. Expanded `tests/sankalpas.spec.ts` to click every link and verify the Contact form selects the corresponding `sankalpas` category, not only the first pathway.
- **R2-S-2 | Done:** rechecked the complete incoming-link inventory documented in Checkpoint 3: footer invitation, shared CTA, Home hero, six Sankalpa pathways, Contact membership prompt, and Support volunteering link. They route to Contact or the existing relevant Contact interest. Search found no live `/join/` references in `src` or `README.md`; the remaining test references intentionally assert no links, a 404, and sitemap exclusion. `src/app/join` is absent, `/join/` returns 404, and `sitemap.xml` excludes it.
- **Validation:** `npm run lint` and `npm run typecheck` passed. Targeted Playwright verification passed on desktop and mobile: Sankalpa interest destinations/prefill, footer migration and removed-route assertions, internal Home links/SEO, affected navigation and legacy routes, and all public pages. Result: 9 passed, 1 expected mobile profile skip.
- **Checkpoint commit subject:** `Round 2 - Checkpoint 6: Sankalpas`.
- **Next step:** stop; wait for confirmation before Checkpoint 7.

### Checkpoint 7 completion - Updates

- **R2-U-1 | Done:** extended `src/lib/use-incremental-list.ts` with opt-in complete-row loading and a grid ref observed by `ResizeObserver`. Column counts come from the actual computed grid, not a duplicated JavaScript breakpoint table. Initial counts and each three-item base increment round upward to full rows, capped at real data length. Resize can reveal more cards but never hides already-visible content or remounts existing keyed players. `EventList` opts in only for the full archive; compact Home remains exactly three.
  - Fresh navigation: podcasts remain one featured plus two archive cards at all widths; events show three in one/three columns or four in two columns; posts show three in one column or four in two columns.
  - Podcast archive batches are 2 -> 5 -> 8 -> 9 in one column and 2 -> 6 -> 9 in two columns, plus the unchanged featured episode. Events/posts preserve newest/source order and show all seven/five records before removing their independent Load more buttons. Exhausted remainders are retained.
- **R2-U-2 | Done:** scoped `#events .event-image` to 80% of its card width and a 280px cap (previously full card width). At 1440px the measured poster is now 280px rather than its 382px card width; smaller cards receive the same 20% reduction until the cap applies. `height: auto` and `object-fit: contain` remain; original image files, dialogs, Home images, and aspect ratios are unchanged.
- **R2-U-3 | Done:** introduced `--section-spacing` using the existing 96px desktop, 75px <=1180px, and 58px <=760px scale. Ordinary `.section` padding is behaviorally unchanged. Updates uses half-token section edges so neighboring content is one token apart, half-token callout margins, token-based heading/archive/control spacing, and one-token gaps before the closing CTA and from CTA to footer. Removed the old accumulated double-section spacing and planning callout's independent 50px/30px top margins on Updates. Other pages retain their 40px CTA-to-footer spacing.
- **R2-U-4 | Done:** Posts grid is centered and limited to 1040px for two columns (cards up to 508px) or 520px for one column; grid gap is 24px rather than 30px. Visuals are 230px above 760px and 200px below, down from 310px/280px. Copy/visual padding is 24px instead of 30px/35px on larger layouts. Existing post text, source links, and all five records are unchanged.
- **R2-U-5 | Done:** Updates social glyphs changed from 25px to the footer's existing 17px, icon boxes from 55px/45px to 25px, card padding from 30px/25px/28px/23px to 20px, gaps from 26px/22px/18px to 16px, and titles from 27px to 20px. All five profiles, descriptions, labels, new-tab notices, and at-least-44px targets remain. Footer sizing/behavior is unchanged.
- **Files and documentation:** changed the shared loading hook, `EventList`, media components, Updates page composition/classes, scoped CSS, and `tests/media.spec.ts`. Updated `README.md` to document complete-row counts, resizing, reduced presentation, and shared spacing. No labels were renamed, no data/assets or dependencies were added, and Calendar/Contact work was not started.
- **Validation:** production build, lint, and strict typecheck passed. Media + Home suites: 34 passed across desktop/mobile. Selected website route, internal-link, archive, content-preservation, all-route responsive, and automated WCAG A/AA checks: 12 passed across desktop/mobile. Complete-row/resize/sizing/spacing tests: 16 passed across Firefox, desktop WebKit, iOS-style, and tablet profiles. The responsive matrix includes 320, 393, 480, 481, 600, 760, 761, 768, 1024, 1180, 1200, 1440, 1920, 2560, and 3840 CSS px across the selected tests. Verified original ordering, exhaustion, no dropped cards, retained active playback, uncropped images, equal measured content/CTA gaps, unchanged Home counts, and matching social icon scales.
- **Cross-page spacing regression:** the existing About/Philosophy responsive reflow test also passed (1 additional desktop test), explicitly confirming their closing CTA-to-footer gap remains 40px.
- **Visual verification:** inspected loaded desktop posters and Posts at 1440px and social cards at 393px in the browser; content remains balanced and readable. This is browser/emulation verification, not physical-device certification.
- **Checkpoint commit subject:** `Round 2 - Checkpoint 7: Updates`.
- **Next step:** stop; wait for confirmation before Checkpoint 8.
