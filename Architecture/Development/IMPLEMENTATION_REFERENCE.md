# Historical implementation reference

This is the previous README, preserved for implementation history and earlier
measurements. It is not the current operating guide. Some descriptions reflect
earlier revisions (including gallery filters, poster viewers, and mobile tracker
layout). Use the [current architecture](../ARCHITECTURE.md) and
[project README](../../README.md) for the current implementation and instructions.

A complete, responsive public website built with **Next.js App Router, React, and strict TypeScript**. It preserves the reference site's cream, saffron, and navy identity, authorized branding, heritage artwork, and community photographs while providing complete, directly addressable pages.

## Requirements and quick start

- Node.js 22.18+ (Node.js 24 LTS recommended)
- npm 10+

TypeScript is pinned to 6.0.3 because the current Next.js ESLint integration does not yet support the TypeScript 7 compiler API.

```powershell
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`. To preview the **production static export**:

```powershell
npm run build
npm run preview
```

Open `http://127.0.0.1:4173`. The deployable website is generated in `out`. Do not use `next start`: this project intentionally exports static HTML.

On Windows, the build also runs `scripts/finalize-export.mjs`. Next.js 16.4's exporter creates nested route-segment files using Windows separators, while its browser router requests dotted filenames. The finalizer corrects only those generated `__next.*` segment paths, refuses filename collisions, and leaves framework source untouched. It is a no-op on other platforms. Route, network-error, and navigation tests exercise the finalized export; publish the result of **`npm run build`**, not a direct `next build`.

## Included pages and behavior

- Home, About, Sankalpas, Updates, Calendar
- Contact (including membership enquiries), Support, Privacy, Accessibility, custom 404
- Responsive mobile navigation, active-page indicators, skip navigation
- Filterable event archive with original poster viewer
- Side-by-side homepage features for Sankalpas and the event calendar
- Day, month, and year calendar views, a selected-date panel, a featured gathering, and an attributed OpenStreetMap venue map
- Curated podcasts and community-post cards, official social links, and click-to-load YouTube players
- Filterable photo gallery with native modal focus management, arrow navigation, and Escape support
- Separate, validated Join the Community and Contribute to the Community forms; Sankalpa pathways prefill the contribution area, and "Other" reveals a required custom interest
- Explicit unavailable states until real form/payment services are configured
- Pre-rendered HTML, per-page SEO metadata, canonical URLs, social cards, sitemap, robots
- A preloaded self-hosted variable font, responsive WebP hero, local podcast thumbnails, and no third-party media connection before opt-in
- Reduced-motion support, keyboard interactions, and deployment security-header templates

The mobile header also provides ordinary navigation links when JavaScript is
disabled. Interactive calendars, image viewers, players, and form submissions
still require JavaScript. Venue links remain available if the map or its tile
background fails. The image viewer reports unavailable images and keeps its
44px controls reachable in short viewports.

The project has **no database, admin dashboard, authentication, payment processing, or form backend**, in accordance with the selected public-website scope.

**About** combines About Us and Philosophy at `/about/`. **Updates** combines Events, Gallery, Podcasts, community posts, and social channels at `/events/`, with section links for easy navigation. The short labels are consistent across navigation, footer, breadcrumbs, and page titles; the existing URLs are unchanged. The old `/philosophy/`, `/gallery/`, and `/media/` URLs remain static compatibility pages that render the same combined content, with canonical metadata pointing to the combined route. Navigation and the sitemap use the combined routes.

Contact has separate Join the Community and Contribute to the Community forms. When no endpoint is configured, both send buttons are disabled and each form explains that entered details are not transmitted or stored. The separate membership route has been removed; all membership invitations lead to the Join form, while Sankalpa pathways preserve their selected contribution area.

## Browser and device compatibility

The website targets **current, JavaScript-enabled browsers on phones, tablets, laptops, and desktops**. Responsive design is not a guarantee of compatibility with every physical device, operating-system version, embedded browser, or accessibility configuration.

The automated production-export suite uses these six profiles:

| Profile | Engine | What this verifies |
| --- | --- | --- |
| Desktop Chrome | Chromium | Desktop routes, navigation, interactions, layout, and automated accessibility |
| Android-style Pixel 7 | Chromium with touch/mobile emulation | Narrow layouts, touch controls, mobile menu, and form behavior |
| Desktop Firefox | Firefox | An independent browser engine, including native form and dialog behavior |
| Desktop Safari-style | Playwright WebKit | Safari-engine compatibility, including keyboard focus restoration |
| iPhone 13-style | WebKit with mobile emulation | iOS-style viewport/touch behavior and mobile interactions |
| iPad Mini-style | WebKit with tablet emulation | Tablet layout, touch controls, and navigation |

Shared typography scales cover hero titles, section headings, subheadings, body copy, captions, and labels; cards and boxes use one 5px corner radius. Responsive reflow tests cover **320, 375, 480, 768, 1024, 1180, 1200, 1440, 1920, 2560, and 3840 CSS pixels** on all 12 public routes, including compatibility URLs. They check horizontal overflow and heading fit at every width, shared hero/content alignment on About, Sankalpas, Updates, Calendar, and Contact, and image aspect ratios. Automated WCAG A/AA checks include all 12 public routes. Coarse-pointer devices get at least 44px image-viewer controls and 16px form inputs to reduce unwanted focus zoom on iOS.

Additional regression checks cover doubled text size at 360, 390, 768, 1024,
1280, and 1440px, mobile navigation
without JavaScript, the image viewer at 390x400, failed viewer images, and failed
map tiles. Gallery source sizes follow the preview and full-gallery layouts.

These are **automated engine tests and emulated devices on the development machine**, not tests on physical Android/iOS hardware or shipping macOS Safari. Modern Edge and other Chromium browsers are expected to behave similarly, but their branded browser distributions are not separately certified here. Internet Explorer, obsolete browsers without native dialog support, smart TVs, and embedded in-app browsers are not declared supported.

Before public launch, manually test real iPhone Safari, Android Chrome, an iPad, desktop Chrome/Edge/Firefox/Safari, portrait/landscape, browser zoom and larger system text, slow connections, and VoiceOver/TalkBack or NVDA. Check the actual deployed HTTPS site, not only the local preview. The current site is a website, not a native app or offline-capable PWA.

## Configuration

Copy `.env.example` to `.env.local` and set the variables you need. `NEXT_PUBLIC_*` values are public, embedded at **build time**, and must never contain secrets. Rebuild after changing them.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical HTTPS site origin; defaults to `https://www.indicthoughtforum.org`. Change for the actual deployment domain. |
| `NEXT_PUBLIC_FORMS_ENDPOINT` | HTTPS JSON submission endpoint. If unset, forms explain their unavailable state and submission is disabled. |
| `NEXT_PUBLIC_DONATION_URL` | Verified HTTPS hosted donation page. If unset, online donations are disabled. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional verified email shown on contact pages. |

Configured URLs are validated. Invalid URLs or email configuration stop the build instead of silently publishing broken integrations. This project assumes deployment at the root of a domain.

### Form endpoint contract

The frontend sends `POST` with `Content-Type: application/json`, without cookies. Join submissions use the membership payload:

```json
{
  "type": "membership",
  "name": "Example Member",
  "email": "member@example.com",
  "phone": "+91 98765 43210",
  "area": "Culture & heritage",
  "city": "Bengaluru",
  "referralSource": "A friend",
  "message": "",
  "consent": true,
  "website": ""
}
```

Contribute submissions use `type: "contact"` and add `availability`; their `message` is required. Join submissions use `type: "membership"`; `city` and `referralSource` are required, `message` is optional, and `customInterest` is sent only when `area` is `"Other"`. `phone` may be empty in either form. `website` is a honeypot. A successful response must be a 2xx status with JSON **`{ "success": true }`**. No other response is displayed as success. Rate limits, unconfirmed responses, timeouts, and failures are surfaced to the visitor, and entered information is retained for retry. Drafts are not stored in local storage.

When no endpoint is configured, each Contact form keeps its explicit unavailable-service status and disabled submit button. Neither form sends or stores an unconfigured submission.

**Open question:** this repository does not include or configure a form backend. Before enabling `NEXT_PUBLIC_FORMS_ENDPOINT`, the site owner must select the service and verify that it accepts both payload shapes (including city, referral source, contribution availability, and custom interest), routes them to the right team, and meets the site's validation, privacy, retention, and delivery requirements. No backend or service was added in this checkpoint.

Before enabling an endpoint, implement **server-side validation**, length limits, strict type/area allowlists, consent checks, honeypot rejection, rate limiting, spam protection, safe email delivery/storage, and appropriate retention. Client-side checks are not a security boundary. Only acknowledge success after the enquiry has been durably accepted. Configure CORS to allow the production origin and `POST`/`OPTIONS` with `Content-Type`; never embed API keys in the frontend.

### Donations

Provide a verified hosted checkout or donation-page URL. The website intentionally does not collect card data, invent bank details, set provider-specific amounts, claim tax eligibility, or simulate a successful payment. Verify the provider's registration, receipt, refund, tax, and privacy requirements before publishing.

## Content and assets

- Shared editorial content and archive entries: `src/lib/site.ts`
- Approved talk-led Sankalpa tracker and note history: `src/lib/sankalpas.ts`
- Curated podcast episodes, social posts, and profile links: `src/lib/media.ts`
- Routes and metadata: `src/app`
- Shared components: `src/components`
- Design system and responsive styling: `src/app/globals.css`
- Optimized, self-hosted images: `public/images`

The owner supplied the Sankalpa tracker as pasted tabular data. The public table displays seven columns: Talk date, Talk topic, Speaker, Sankalpa, Status, Owner, and Notes. It contains the 20 approved rows; source rows 20-21 marked "No publishable sankalpa" are excluded and their contents are not included in the public data. Month-level dates and "POC" are retained literally; exact talk dates are not inferred from the event archive. Surrounding whitespace and the spelling of "Deprioritised" are normalized for display. Priority, due date, last updated, and next action are retained in the approved records but do not add visible columns. The existing six personal-contribution pathways remain below the tracker and link to Contact with their interest.

The approved tracker expands the owner's "DJ" abbreviation to "Dhananjay" in owner and next-action records, including combined-owner and possessive references.

At 1024px and below, each table row reflows into seven vertically labeled fields, keeping long Sankalpa titles and notes readable without horizontal page scrolling.

All note arrays are intentionally empty, as requested, including where the supplied sheet had blocker text. Notes are **source-managed and read-only**, not a shared editing service. To add an approved note, append `{ id, updatedAt, text }` to that record's `notes`, using a unique non-empty note ID and a canonical UTC ISO timestamp such as `2026-11-01T10:00:00.000Z`, then rebuild and redeploy. The latest timestamp appears in the row by default; older notes are available through a keyboard-accessible Previous notes dropdown, newest first. Timestamps are displayed in IST. Blank text, duplicate IDs, and invalid timestamps stop rendering/build rather than silently publishing broken history. No notes are fabricated, and no Add note or shared-saving functionality is implied.

The combined Events page composes the existing `EventList`, `GalleryGrid`, podcast, post, and social-channel components. Maintain their records in the shared content files above and rebuild/redeploy. To add approved blogs later, add a dedicated content array and a section using the existing `SectionHeading` and card patterns, then add its anchor to the page's section navigation. No blog records, placeholder articles, or empty blog navigation have been published.

Repeated load-more behavior for event, podcast, and Instagram-post lists is shared through `useIncrementalList`; keep page-specific card markup in its existing feature component.

The owner confirmed permission to reuse the reference site's branding, text, and images. Source image URLs and the repeatable optimization process are in `scripts/prepare-assets.mjs`:

```powershell
npm run assets:prepare
```

Prepared images are already included; do not make downloads part of the production build. The preparation script regenerates the hero, heritage-derived logo mark, and five gallery photos; it does not regenerate legacy event-card images or poster assets. Heritage hero artwork is described as artwork, not a documentary photograph. The seven supplied event posters live in their named event folders under `public/images`, with descriptive topic-and-date filenames. Their dates, speakers, times, and venues come from the posters; the owner confirmed all seven years as **2026** on 9 November 2026. Home shows the latest three event dates, including upcoming events, with complete, uncropped posters. The Updates archive includes all confirmed events newest first. Each card displays the actual venue and its current IST date-based status, not an implied registration offer.

The five confirmed Sankrant Sanu photographs are stored in `public/images/sankrant-sanu/event-photos`; all gallery references use those paths. The photo was removed from About in checkpoint 3, while its Home/Updates gallery use is retained. The owner approved removing the deleted sixth photograph's gallery record. The original gallery layouts and captions are retained. The `assets:prepare` script targets the renamed photo paths and does not manage the seven supplied PNG posters.

Event cards use a local WebP `previewImage` with the same full 1587x2245 dimensions and a **256 KiB maximum**; original PNGs are preserved and loaded only when opening a poster viewer. Generate previews from the local originals with `npm run assets:posters` after adding event data. The command checks declared dimensions and fails explicitly for invalid paths or an oversized result; it makes no network requests.

Home-page numbers are labeled as **Lakshya goals**, not achieved impact metrics. Their structured data is `homeStatistics` in `src/lib/site.ts`: 500+ members, 10+ events, and 30+ Sankalpas. Sankalpa categories are contribution ideas, not claims of currently operating programs. See [the revision checkpoints](./WEBSITE_REVISION_CHECKPOINTS.md) for verified scope, asset moves, and review follow-ups.

### About and Philosophy

About retains the shared text-based `PageIntro` hero, breadcrumb, original heading/description, and `/about/` canonical metadata. `/philosophy/` continues to render the same combined content. The thought section is now a photo-free reading column; its original wording, principles, following editorial content, journey, and contribution invitations remain, now linking to Contact.

`PageIntro` no longer renders a sparkle ornament on any page, including Support. `CommunityCTA` accepts `showOrnament={false}`; only Home keeps its CTA sparkle. Shared principles are now unnumbered on both Home and About; journey-step numbers remain. The guiding belief retains its centered serif quotation, label, and explanation within an inset white panel with an orange accent, rather than a full-width dark band resembling the page's end.

### Podcasts and social publishing

The Updates page lists ten long-form podcasts from the official ITF channel in newest-first uploads-playlist order. Each video title and channel author was checked through YouTube oEmbed; short promotional clips and the separately titled lecture are not listed as podcasts. Updates initially shows one featured episode plus two archive cards. Archive load-more uses a three-item base batch rounded upward to complete the current grid's rows. Events and posts likewise start at three rounded upward (four in a two-column grid); only an exhausted list may have an incomplete final row. `useIncrementalList` observes the rendered grid columns, fills rows on resize, and never hides already-visible cards. The homepage features the same newest podcast as Updates and retains exactly three event cards. The Updates page also links to the five Instagram posts supplied in the revision brief; post dates and captions are not reproduced.

Updates posters are limited to 80% of their card width and 280px, retaining their uncropped aspect ratio. Posts use a centered grid up to 1040px wide (520px when single-column), 230px visuals on larger screens, and 200px visuals on small screens. The shared `--section-spacing` token preserves the site's existing 96/75/58px responsive section scale; Updates uses it for consistent content gaps, and every page that ends with the community CTA (About, Sankalpas, Updates, Calendar) uses it for the CTA-to-footer gap. Home keeps its support strip between the CTA and footer.

The channel's [About page](https://www.youtube.com/@IndicThoughtForum/about) links back to the reference website and identifies [Instagram](https://www.instagram.com/indicthoughtforum/) and [Facebook](https://www.facebook.com/indicthoughtforum). This is the provenance for those accounts, checked on 31 October 2026; it is not a claim about a platform verification badge. The X and WhatsApp URLs were supplied directly by the owner for the footer revision. No LinkedIn account or unrestricted WhatsApp group access is implied.

- **Podcasts:** edit `podcasts` in `src/lib/media.ts` in newest-first order with a stable ID, the 11-character YouTube video ID, verified title/guest/description, topic, and a local thumbnail path. `homeFeaturedPodcast` uses `podcasts[0]`, keeping the homepage feature in sync with Updates.
- **Instagram posts:** edit `socialPosts` with the original supplied post URL. The Updates cards intentionally link to Instagram without copying captions, dates, or post imagery.
- **Channels:** edit `socialProfiles` only after confirming ownership. Social links open externally with `noopener noreferrer`.
- **Refresh thumbnails:** run `npm run assets:media`. The script reads the same podcast data, downloads approved video thumbnails, optimizes them locally, and creates the smaller mobile hero. A failed download is an error, not a silently substituted image.
- **Refresh reference assets:** if running `npm run assets:prepare`, follow it with `npm run assets:media` to regenerate the responsive hero.
- **Publish:** rebuild and redeploy after content changes. This is intentionally a curated selection, not an automatic or real-time feed. No social API credentials are required or exposed.

Players connect to **youtube-nocookie.com only after an explicit Load action**. There are no YouTube thumbnails, API scripts, preconnects, or iframes requested before that action. The loaded frame can be closed, which removes it and restores focus. A direct YouTube link is always available, including when embedding is disabled, unavailable, or JavaScript is not used.

Home and Updates omit the thumbnail's "ITF / Conversations" overlay, privacy-preview heading, and pre-load disclosure. This is a presentation-only change: click-to-load, direct watch links, post-opt-in connection/error status, and keyboard focus restoration remain active. Updates also omits the curated-feed notice.

YouTube's privacy-enhanced domain is **not anonymous playback or a guarantee of zero cookies/storage**. After opt-in, Google/YouTube controls its player and may process the visitor's information. The choice is not persisted across reloads. The privacy notice describes this boundary; social-platform login and post availability remain outside the site's control.

### Footer branding

The header and footer share the official `public/images/itf-assets/ITF-Logo.png` emblem rendition with the real-text name/tagline from `site`; there is no tab icon. The Next.js development indicator is disabled with `devIndicators: false` in `next.config.ts`. The footer displays a 56px square, contain-fitted logo with 18-20px brand text and a 12px tagline that can wrap naturally.

Run `npm run assets:branding` to regenerate the local `itf-logo-footer.webp` from the official source. This preserves transparency, uses lossless WebP at 168x168 for 3x-density display, checks a 32 KiB budget, and leaves the original PNG untouched. No external download is involved.

Footer and Updates social links share `socialProfiles` in `src/lib/media.ts`. The five profiles include the supplied X and WhatsApp links with accessible names, new-tab notices, and `noopener noreferrer`. Merely rendering a link does not connect to either provider or join the group. The footer uses a centered 1200px container with 24px gutters and a top-aligned three-column brand/values/invitation grid. From 600px to 1023px, Brand and Values share a row and the invitation spans the next; below 600px, all columns stack and the bottom bar centers. The brand contains one row of 38px circular social links with 18px icons, aria-labels, title tooltips, accent hover/focus fills, and visible keyboard outlines. A single divider separates the grid from the copyright/navigation bar. Updates retains labeled profile cards, 17px glyphs in 25px boxes, and at least 44px-high targets. Repeated Explore/Get involved groups are removed; the closing invitation links to Contact on every viewport.

### Maintaining the event calendar

`src/lib/site.ts` contains the single shared `events` array used by the calendar, schedule, and event archive. The Calendar page defaults to the complete current IST month. Day view initially shows today; year view initially shows all twelve months of the current year. Switching views preserves a navigated date; Today restores the current period in any view.

Month selection offers all twelve months. The year field accepts years 1-9999 with native validation and an Apply year action. Previous/next controls follow the active view and keep month/year selectors synchronized across year boundaries. Selecting a month date keeps the month grid visible and updates its selected-date event panel; the Day control opens the standalone day view. Year cards open month view. Year view uses a responsive twelve-month overview rather than twelve small date grids. Event details and original poster controls are reused from the schedule. This is not a booking system or external calendar integration.

Month view also lists the current IST month's upcoming events, earliest first, independently of the navigated calendar month. The list shows three events initially and adds three at a time; it updates with the shared IST date hook and has an explicit empty state. The complete schedule independently paginates its upcoming and past groups in batches of three, and its Upcoming/Past filters use the same initial count. Selected-date and selected-year details remain complete rather than paginated.

The November 29, 2026 Ganeshaiah gathering is featured above the calendar. `eventMapLocations` lists the verified OSM venue records and coordinates used by the interactive Leaflet map. Coordinates correspond to the mapped Alliance Francaise way 35277205 (12.9913969, 77.5968841) and Suchitra Cinema and Cultural Academy way 495472305 (12.9260031, 77.5697863). The map and its linked event list include upcoming events only; event cards provide the title, date/time, speaker, venue, location-map and directions links. Cards open the existing venue marker popup and center the map. The list shows three events initially and adds three at a time, with an explicit empty state and no past-event markers. Keep every event venue mapped; the map fails explicitly at build/render time if an event has no corresponding venue coordinates.

Calendar section spacing follows the shared responsive `--section-spacing` token. Keep map, event cards, calendar details, the complete schedule, support strip, and closing CTA aligned to this scale.

Each event requires:

| Field | Meaning |
| --- | --- |
| `id` | A unique, stable identifier |
| `title`, `speaker`, `category` | Approved public event details; category must match the TypeScript union |
| `date` | A real calendar date in `YYYY-MM-DD` format |
| `displayDate` | A matching human-readable date for the original poster/archive |
| `startTime` | Verified 24-hour `HH:mm` start time in India Standard Time |
| `venue` | Confirmed venue/address, not an inferred location |
| `image` | A locally hosted, authorized poster path |
| `previewImage` | A local WebP card preview generated from `image`, preserving its aspect ratio; original PNG remains for the viewer |
| `imageWidth`, `imageHeight` | The poster's measured intrinsic pixel dimensions; the supplied seven PNGs are 1587x2245 |

The current start times are taken from the posters: 15:00 for October and November, 17:30 for April, May, June, and July, and 18:00 for February. End times and durations are not invented.

- Upcoming events sort earliest first; past events sort most recent first.
- The event date is interpreted in **Asia/Kolkata (IST, UTC+05:30)**, independently of the visitor's time zone.
- Today's events remain labeled **Today** through the end of the India calendar day. This is not a claim that the event is currently live.
- Date classification refreshes after hydration, once per minute, and when the window regains focus. An open page can move an event into the archive without a rebuild.
- Home's three event cards use the same date classification and show the newest event dates; the Updates archive includes all confirmed events newest first.
- Empty states explicitly say no upcoming dates are announced. Past posters do not imply that registration is open.
- Invalid event dates or times fail explicitly during rendering/build rather than publishing an incorrect schedule.
- Adding or editing actual event content still requires a **rebuild and redeploy**. No admin editing interface or database has been added.

To publish a new confirmed event, add its approved record and optimized poster, update content-specific test expectations where appropriate, run the checks below, and deploy a fresh build. Do not add demonstration dates to the public array simply to populate the upcoming section. Keep clock-boundary fixtures and date-ordering assertions meaningful when updating legitimate content.

## Validation

```powershell
npm run lint
npm run typecheck
npm run build
npm test
```

If Playwright reports that a browser is missing, run `npx playwright install chromium firefox webkit`, then retry. Tests serve the actual production export and cover public routes, browser/network errors, navigation, responsive overflow, gallery controls, archive/schedule filters, focus restoration, the separate Join/Contribute forms, conditional custom interest, validation/reset, explicit disconnected-service behavior, links, metadata, and mocked form payload/response handling. Calendar tests verify current IST day/month/year defaults, every month selection, previous/next month and day transitions across years, leap February, year navigation and drill-down, Today reset, midnight rollover, invalid year/date rejection, month-upcoming updates, independent schedule pagination, upcoming-only map filtering, map selection/centering/popups, and correct sorting without modifying the shared data. Combined-section tests check retained editorial text, event/gallery/media records, compatibility URLs, and section anchors. Responsive tests also check narrow calendar selector widths and alignment. Media tests verify zero external requests before consent, keyboard activation, player removal and focus restoration, source links, permitted embed origin, responsive image selection, and the single font preload. Automated player tests use a mocked provider frame rather than contacting Google; they do not verify live external playback availability.

For focused checks, use `npx playwright test media.spec.ts --project=desktop` or `npx playwright test schedule.spec.ts --project=desktop`, and select `--project=firefox`, `--project=webkit`, `--project=mobile`, `--project=ios`, or `--project=tablet` as needed. Mobile-menu tests are intentionally skipped in the three desktop profiles.

Build before testing. Automated axe checks run against every public page at WCAG A/AA rule levels. The unconfigured-service test is skipped when real integration environment variables are set. Do not send test submissions to real services; use a test endpoint. The test runner starts and stops its own preview server unless a preview is already running on port 4173.

## Performance and the Astro decision

**Recommendation: keep the current Next.js static export for this release.** It already serves pre-rendered HTML without a Next.js runtime server. A framework change is not needed to add podcasts, social content, SEO, or responsive layouts.

The UI improvements include more readable body/supporting copy, less compressed navigation with an earlier mobile breakpoint, consistent media-card hierarchy, and an aspect-ratio-reserved video frame that does not shift when a player is enabled. Performance changes include:

- A **104 KiB mobile hero** instead of the approximately 306 KiB desktop image on phone widths; the browser selects one image, not both.
- One local variable Manrope font, preloaded by `next/font/local`, instead of five separate weight imports.
- Disabled speculative navigation prefetching in the shared header/footer to avoid loading many unrelated routes on slow connections. Pages still use client navigation on demand.
- Lazy local media previews; no YouTube player scripts or network connections on first load.

### Reproducible local measurements

With the production preview running, use:

```powershell
npm run measure:performance
# Optional separate measurement of the media page:
npm run measure:performance -- /media/
```

The existing Playwright Chromium installation is used. Each measurement makes three cold-context runs with a Pixel 7 profile, **4x CPU throttling, 150ms latency, and 1.6Mbps download**. The script prints individual runs and medians.

| Home-page metric | Before this enhancement | After this enhancement |
| --- | ---: | ---: |
| Median local LCP | 5,556 ms | 3,068 ms |
| Median encoded resource body sizes | 1,026 KiB | 718 KiB |
| Median resource requests | 27 | 13 |
| Median layout shift (CLS) | 0.001 | 0 |
| JavaScript resource bodies | 493 KiB | 489 KiB |

These are **local lab results**, not Lighthouse scores, production CDN transfer sizes, real-user Core Web Vitals, or a guarantee of performance on every device. The preview serves uncompressed static resources. The observed improvement is approximately 45% in local median LCP and 30% in resource bodies; client JavaScript remains a meaningful part of the payload. The measured LCP is still above the 2.5-second good threshold under this deliberately throttled profile. Validate the deployed CDN with compression/caching and measure real-user p75 LCP, INP, and CLS before claiming Core Web Vitals compliance.

### When Astro would help

| Consideration | Current Next.js export | Astro alternative |
| --- | --- | --- |
| Hosting | Static HTML/assets, no application server needed | Also supports static HTML/assets |
| Interactive features | Existing React navigation, filters, date updates, image viewers, and consent controls | React or smaller islands can hydrate selectively, potentially lowering initial JavaScript |
| Content-heavy pages | Already pre-rendered, but the Next/React client runtime remains | A strong fit for mostly static editorial pages with limited interactive islands |
| SEO and accessibility | Already implemented and tested; still requires approved content and manual QA | Not automatically better; metadata, semantic structure, and accessible interactions still need implementation |
| Forms, CMS, social feeds, payments | Require real services regardless of framework | The same service and privacy obligations remain |
| Migration cost | No rewrite required for this release | Port routing, layout, metadata, date behavior, privacy controls, and repeat the complete compatibility suite |

If low-end mobile performance remains a problem after deployment, prototype the home and media pages in Astro, using the same assets, content, and privacy behavior. Compare **compressed JavaScript, the same throttled lab metrics, real-user results when available, and maintenance cost**. Migrate only if the measured improvement and content-first workflow justify the rewrite. Do not migrate merely to change the framework name.

## Deployment

### Netlify

The included `netlify.toml` runs `npm run build` and publishes `out`. `public/_headers` supplies security headers and immutable caching for hashed framework assets.

### Vercel

Import as a Next.js project, use `npm run build`, and set the public environment variables. Next.js static export is supported; `vercel.json` supplies the corresponding security headers.

### Other static hosting

Upload the **contents** of `out` to an HTTPS static host. Preserve route directories and configure directory index serving and `404.html` as the missing-page response. Do not rewrite every request to the home page: each route has its own generated HTML. Translate the headers from `public/_headers` into the host's configuration.

The CSP template permits inline framework hydration scripts/styles, HTTPS connections for the future form service, and frames only from `https://www.youtube-nocookie.com`. Third-party frame permissions do not load a player by themselves; the consent component controls creation. A stricter deployment can generate script hashes and restrict `connect-src` to the verified endpoint. Review deployment-specific headers and ensure HTML is revalidated while hashed framework files are cached immutably. HSTS should be configured by the operator only after HTTPS and subdomain readiness are confirmed.

## Production launch checklist

- Verify owner-approved copy, archive details, image rights, and the canonical domain.
- Set a verified contact method; the default deployment has no invented email address.
- Connect and exercise the real form service, including delivery, failure, CORS, and abuse protection.
- Connect a verified donation provider if donations are required.
- Have the operator/legal reviewer finalize privacy obligations, provider disclosures, and retention.
- Check headers on the deployed host, HTTPS, static deep links, and 404 status.
- Run all checks and desktop/mobile acceptance tests against the release build.
- Confirm accessibility with keyboard and assistive-technology testing. Automated checks are not certification.

The public website is buildable and deployable as-is, but **real message delivery and online donations are deliberately unavailable until configured and verified**.

## Recommended enhancement roadmap

These are recommendations, **not claims of already implemented services**. Complete the launch-critical items before enabling collection of personal information or payments.

### P0 - Launch-critical

| Enhancement | Work needed | Acceptance criteria |
| --- | --- | --- |
| Real enquiries and membership processing | Connect an HTTPS backend with server validation, abuse protection, durable acceptance, authorized access, and email delivery. Define who responds. | A valid enquiry reaches the responsible team; invalid/spam requests are rejected; service failures never show success; personal data is not exposed in logs. |
| Verified contact, legal, and content approval | Publish a real contact method, approve event dates/venues/posters, confirm content rights, and finalize privacy/provider/retention disclosures. | A named operator approves the release; visitors have a working contact route and an accurate privacy notice. |
| Donations, if required for launch | Use a verified hosted payment provider; confirm organizational eligibility, receipt, refund, tax, webhook, and reconciliation requirements. Keep secrets server-side. | Test payments, failures, duplicate webhooks, receipts, and refunds end to end; no unverified tax claims or card collection in this frontend. |
| Production hosting and release controls | Configure the real domain, HTTPS, headers, canonical URL, directory routes, 404 status, cache policy, deployment checks, and rollback. | A deployed smoke test passes all deep links and headers; a known-good version can be restored; no stale HTML refers to missing assets. |
| Physical-device and assistive-technology QA | Test actual mobile/tablet hardware, current branded desktop browsers, keyboard, screen readers, zoom, large text, and slow networks. | Navigation, forms, posters, and schedule remain usable; blockers are resolved or explicitly documented before launch. |
| Operational ownership and monitoring | Establish uptime/error alerts, privacy-safe diagnostics, backups for future stored data, and an incident/contact process. | The operator receives a test alert and can explain recovery and data-retention procedures. |

### P1 - Day-to-day operations and event experience

| Enhancement | Recommended approach | Expected benefit / verification |
| --- | --- | --- |
| Admin/CMS for events and Sankalpas | Add role-based access, drafts, editorial approval, validated dates, audit history, and publish-triggered deployments. | Staff can publish approved updates without source edits; unauthorized users cannot publish; edits can be reviewed and reversed. |
| Media publishing and optional feeds | Extend the CMS to podcasts, approved thumbnails, source URLs, topics, transcripts, and editorial approval. If automation is needed, fetch/copy snapshots at build time or through a cached backend using official APIs/feeds. | Editors can preview and publish real content; API failures retain an explicitly dated approved snapshot; credentials stay server-side; pages never scrape social platforms in the visitor's browser. |
| Accessible podcast discovery | Add reviewed episode pages, transcripts, chapter links, language labels, and search by guest/topic. Add VideoObject metadata only after verifying upload dates, duration, and other required fields. | Episodes are shareable and understandable without watching; no fabricated dates, captions, or structured metadata are published. |
| Event registrations and capacity | Add a transactional backend for capacity, waitlists, confirmations, cancellations, and organizer exports. | Concurrent registrations cannot exceed capacity; confirmation and cancellation flows are verified. |
| Calendar subscriptions and downloads | Add stable event IDs, verified start/end information, ICS downloads/feed, and Google/Apple/Outlook import links. | Imports retain the correct IST time, event identity, updates, and cancellation status across providers. |
| Full accessible poster transcripts | Publish reviewed text alternatives for all poster details, including regional-language content; improve small-text readability after user testing. | A screen-reader user can obtain the same essential event information without interpreting an image. |
| Multilingual content | Add owner-reviewed language routes and translated navigation, event details, forms, and legal text; preserve canonical/hreflang relationships. | Language switching retains page context and no important content is left untranslated. |
| Archive discovery | Add search and category/year filters when the archive grows; use stable event detail URLs for sharing. | Visitors can find an event by title, speaker, date, and topic; no dead-end or inconsistent search results. |

### P2 - Growth after core operations are reliable

- **Privacy-respecting analytics:** measure actual enquiry completion, event interest, and content usefulness, with consent where required and no personal information in URLs or events.
- **Opt-in newsletters:** use confirmed opt-in, unsubscribe, delivery monitoring, and preference management; never reuse an enquiry as automatic subscription consent.
- **Verified impact reporting:** replace goals with achievements only when supported by records, an update date, and an accountable source.
- **Event structured data and richer sharing:** add schema only for verified event details, availability, and locations; validate it against the deployed pages.
- **Optional PWA/offline reading:** cache public content only, define update/expiry behavior, and avoid storing sensitive forms or queuing personal submissions without a deliberate privacy design.

Do not add all enhancements at once. Prioritize a trustworthy contact/registration workflow, verified event publishing, and real-device usability before adding growth features.
