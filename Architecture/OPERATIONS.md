# Testing, launch, and production operations

## 1. Reproducible local checks

Use Node.js 24 LTS consistently and run from the project root:

```powershell
npm ci
npm run lint
npm run typecheck
npm run build
npm test -- --project=desktop
```

If the chosen test command reports missing browser binaries, install them with
`npx playwright install chromium firefox webkit` and retry. Linux CI may also
require Playwright's system dependencies. No CI workflow is currently included;
the [.github directory](../.github) contains design tooling rather than an
automated release pipeline.

Run `npm test` for the six configured profiles:

| Project | Engine/profile |
| --- | --- |
| `desktop` | Chromium desktop |
| `mobile` | Chromium Pixel 7-style mobile emulation |
| `firefox` | Desktop Firefox |
| `webkit` | Desktop Safari-style WebKit |
| `ios` | WebKit iPhone 13-style emulation |
| `tablet` | WebKit iPad Mini-style emulation |

The [Playwright configuration](../playwright.config.ts) starts the static preview
at `http://127.0.0.1:4173`. Build first; tests do not automatically rebuild.
An existing preview can be reused outside CI, so stop stale previews before
checking a new release. Close a manually started preview with Ctrl+C.

Use `npm run preview` for manual validation. `next dev` is not a production-export
test, and `next start` is not the correct server for `output: "export"`.

### Known validation note

During this documentation handover, `npm run lint`, `npm run typecheck`,
`npm run build`, and the full desktop suite (`npm test -- --project=desktop`:
76 passed, 2 expected skips) passed. The other five browser/device profiles
were not rerun.

The bundled design-tool folders `.github/` and `.impeccable/` are excluded in
[eslint.config.mjs](../eslint.config.mjs). They contain vendored third-party
scripts (for example a minified screenshot library) that are not part of the
website, and previously produced 93 warnings that broke the zero-warning lint.

### What the tests cover

- [website](../tests/website.spec.ts): all 12 routes, titles/canonicals, runtime
  errors, navigation/fragments, responsive overflow and doubled text, dialogs,
  form contracts/unavailable states, and automated accessibility.
- [home](../tests/home.spec.ts): goals, hero, homepage events and sections.
- [about](../tests/about.spec.ts): combined philosophy/editorial behavior and layout.
- [footer](../tests/footer.spec.ts): shared branding, official channels and footer layout.
- [media](../tests/media.spec.ts): thumbnails, opt-in players, podcast loading and media behavior.
- [sankalpas](../tests/sankalpas.spec.ts): approved rows, note validation/history and responsive table.
- [schedule](../tests/schedule.spec.ts): IST dates, calendar views, ordering, map, and failures.

Tests emulate devices; they are not physical-device certification. OpenStreetMap
tile calls are stubbed in relevant tests, so passing map tests does not establish
real tile-service availability or compliance with its production usage policy.
The local preview also does not verify CDN response headers.

### Testing a configured form

Default disconnected tests do not send real submissions. The configured browser
test intercepts the chosen endpoint and verifies payloads. To exercise that branch,
use a **dedicated disposable staging configuration**, set
`NEXT_PUBLIC_FORMS_ENDPOINT` to a test HTTPS URL, build with that value, and run the
matching test with the same environment value. Never silently point test data at
a production collection service. Restore/rebuild the intended configuration
afterward. Mocked success still does not prove database persistence.

Backend validation, CORS, abuse protection, persistence, duplicate handling,
exports and recovery need separate tests once a backend exists. The acceptance
list is in [Data and forms](./DATA_AND_FORMS.md#7-backend-acceptance-checklist).

## 2. Performance checks

In one terminal, run `npm run preview` after building. In another:

```powershell
npm run measure:performance
npm run measure:performance -- /events/
```

[measure-performance.mjs](../scripts/measure-performance.mjs) performs three
cold-context Chromium/Pixel 7 runs, with 4x CPU throttling, 150ms latency and
1.6Mbps download. It reports per-run and median LCP, CLS, resource sizes, script
sizes and request counts.

These are local lab measurements, not Lighthouse scores or real-user Core Web
Vitals. The preview does not represent CDN compression/caching. Previous results
remain in the [historical reference](./Development/IMPLEMENTATION_REFERENCE.md);
do not present them as measurements of the current production release.

Keep the static export for launch. An Astro migration would require porting
routes, interactivity, accessibility, date behavior and privacy controls, and
repeating the tests. Consider it only after measuring a representative prototype
against the same content and network profile.

## 3. Production launch checklist

### Content and owner approval

- Verify organization copy, event dates/times/venues, selected featured gathering,
  podcast order/availability and social links.
- Confirm image rights and participant permissions; keep originals backed up.
- Retain Lakshya figures as goals unless verified achievement evidence exists.
- Check that all frontend/public inputs are safe to publish, including data
  fields not visually shown.
- Publish a verified contact method and finalize the privacy notice for actual
  hosting, map/media services, collected fields and retention.
- Provide full poster transcripts where important content exists only in images.

### Hosting and integration

- Choose [Cloudflare](./DEPLOY_CLOUDFLARE.md) or [Vercel](./DEPLOY_VERCEL.md);
  set runtime/build configuration and canonical origin.
- Verify HTTPS, certificate activation, `www`/apex redirects, direct deep links,
  unknown-path **404 status**, sitemap and robots URLs.
- Confirm production headers, CSP, hashed-asset caching and no broad stale HTML cache.
- Verify preview protection/indexing controls; no private data in previews.
- Check browser navigation for missing images, JS, CSS or routing `.txt` files.
- If forms remain disabled, ensure the site explains it and provides a real
  alternative contact. If enabled, demonstrate persistence and staff processing.
- Use a verified hosted donation provider only if required. Test provider
  eligibility, receipts/refunds, and the actual hosted flow; this frontend does
  not implement payments or determine tax treatment.
- Review plan terms, billing alerts, domain renewal, account ownership and MFA.

### Real-user checks

- Test current iPhone Safari, Android Chrome, iPad and desktop
  Chrome/Edge/Firefox/Safari, including portrait/landscape.
- Test keyboard-only navigation, visible focus, menu Escape, dialog arrows/Escape,
  focus restoration, larger text/zoom and reduced motion.
- Check with VoiceOver/TalkBack or NVDA. Automated axe checks are not certification.
- Use slow/failed network conditions; verify image/map fallback and form error
  recovery. External video availability belongs to the provider.
- Confirm no YouTube connection before Load; note that OSM tiles are a separate
  external connection when visiting Calendar.

## 4. Release, monitoring, and rollback

1. Review the Git diff, source assets and public configuration.
2. Run the relevant checks against a fresh export.
3. Deploy a preview and validate the actual host's routes/headers.
4. Publish production and record the Git revision/deployment identifier.
5. Smoke-test the real domain; monitor after release.

No monitoring or backup service is installed in this repository. Assign an
operator and configure uptime checks, broken-asset/error alerts, domain/billing
notifications, and, once forms exist, backend failure/rate-limit/export alerts.
Use privacy-safe diagnostics, not logged form bodies.

Keep Git history and approved media originals in separate durable backups.
For future stored responses, configure plan-appropriate database backups/export
and test restore into a non-production environment. Include private spreadsheet
copies in retention/deletion procedures; Git is not a response backup.

To recover from a bad release, restore a known-good host deployment or redeploy a
known-good Git revision, then verify the public domain. External API settings,
database migrations and media objects require their own recovery steps. Avoid
destructive schema changes that prevent the preceding website version working.

## 5. Prioritized next work

| Priority | Work |
| --- | --- |
| Launch | Domain/HTTPS, verified contact, owner/content/privacy approval, tested static hosting, physical-device checks, rollback ownership |
| When collection is required | One small backend + private database, validation/rate limits, staff processing, retention/backups and monitoring |
| As editing grows | Private-sheet importer or CMS with approval/previews; optional CDN media workflow |
| Later, only when needed | Event registration/capacity, ICS feeds, multilingual content, reviewed transcripts, archive search |
| Optional growth | Privacy-reviewed analytics, explicit newsletter opt-in, evidence-based impact reporting |

Do not add all of these at once. The existing website can be released without a
database if disconnected forms and the real contact route are presented honestly.
