# Deploying to Cloudflare

## Architecture

Use **Cloudflare Pages for this existing static export**. No Next.js adapter,
Worker runtime, OpenNext integration, or framework rewrite is needed to serve it.
Cloudflare also offers Workers-based framework hosting, but that is a different
path and is not required here.

```text
GitHub -> Pages build (npm run build) -> out -> Pages CDN -> custom HTTPS domain
Optional later: browser -> separate Worker -> private D1/PostgreSQL
```

The optional backend is not part of this deployment. With the current configuration,
forms and donations remain disabled unless their HTTPS services are supplied.

## 1. Prepare the repository

Follow [laptop transfer](./TRANSFER_AND_CLEANUP.md) if needed. Commit source,
lockfile, configuration, prepared images, tests and documentation to GitHub.
Exclude dependencies, build output and local environment files.

From the project root:

```powershell
npm ci
npm run lint
npm run typecheck
npm run build
```

Confirm the build generates `out\index.html`, `out\404.html`,
`out\about\index.html`, `out\_headers`, and framework assets under `out\_next`.
All of `out`, not just HTML, must be deployed.

## 2. Create the Pages project

In the Cloudflare dashboard, choose Workers & Pages, create an application,
choose **Pages**, and import the GitHub repository. UI labels may change.

| Setting | Value |
| --- | --- |
| Production branch | Your approved release branch, commonly `main` |
| Root directory | Repository root; use `ITF` only if that folder is actually inside a larger GitHub repository |
| Framework preset | Next.js Static HTML Export, if offered |
| Build command | **`npm run build`**, overriding a preset's direct `next build` |
| Build output directory | **`out`** |
| Node version | Set `NODE_VERSION=24` |
| Dependencies | Use the committed npm lockfile; use `npm ci` if an install override is available |

Do not choose a server-rendered Next.js adapter for this static deployment.
The [existing Next configuration](../next.config.ts) already specifies export.
No new Wrangler file is necessary for the dashboard/Git integration path.

## 3. Configure environments and deploy

Set production and preview values separately:

| Variable | Production value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your canonical HTTPS origin |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Verified public address, if available |
| `NEXT_PUBLIC_FORMS_ENDPOINT` | Leave empty until a tested HTTPS service exists |
| `NEXT_PUBLIC_DONATION_URL` | Leave empty until a verified hosted page exists |

Values are public and build-time; rebuild after changes. Use a staging enquiry
service for previews rather than the production response database. These variables
must never contain provider secrets.

Deploy and inspect the build log. If no custom domain is ready, use the assigned
`https://<project>.pages.dev` origin as a temporary canonical value, then rebuild
with the final domain before launch.

## 4. Add the custom domain

Add it through **Pages custom domains first**, then follow the DNS instructions.
For an apex domain, Cloudflare generally requires managing that zone; for a
subdomain, follow the provided CNAME instructions. Wait for certificate activation
and verify HTTPS before directing visitors there.

Choose either `www` or the apex as canonical, redirect the other at the host/DNS
platform, and use that same origin in site configuration and backend CORS.
Avoid a redirect loop. Review whether the `pages.dev` copy and previews should be
restricted or redirected/index-blocked; `robots.txt` alone is not access control.

## 5. Routes, headers, and caching

- Pages serves directory `index.html` routes directly. Keep the generated
  top-level `404.html` so unknown paths return a real not-found response rather
  than Pages' SPA fallback.
- Do **not** add `/* /index.html 200` or another catch-all rewrite.
- [public/_headers](../public/_headers) is copied to `out\_headers` and applies
  security headers to static responses, plus immutable caching to hashed
  `/_next/static/*` assets.
- Prefer Pages' default caching for other files. Do not set a broad Cache
  Everything rule or long immutable TTL on HTML or unversioned image paths.
- Confirm actual headers on deployed pages, not only the presence of the file.
  The local `http-server` preview does not apply Pages `_headers` rules.
- If adding Functions later, return appropriate headers from those functions:
  static `_headers` rules are not a replacement for API response headers.

## 6. Verify the live release

Replace the example domain:

```powershell
curl.exe -I https://www.example.org/
curl.exe -I https://www.example.org/calendar/
curl.exe -I https://www.example.org/philosophy/
curl.exe -I https://www.example.org/not-a-real-page/
```

Expected: real pages resolve (possibly after a trailing-slash redirect), missing
pages return **404**, and HTML responses carry the configured CSP, frame, referrer,
permissions, and content-type protections. Also inspect an actual hashed JS/CSS
URL from the page to verify immutable caching.

Complete the [production checklist](./OPERATIONS.md): deep-link refresh, client
navigation without failed routing `.txt` requests, images, map fallback, opt-in
YouTube, legal/contact information and form availability.

## 7. Optional data collection and rollback

For Cloudflare-native collection, deploy a separate Worker with a D1 binding or
a supported connection to PostgreSQL, then use its HTTPS URL as the forms endpoint.
Implement [the existing payload contract and privacy controls](./DATA_AND_FORMS.md)
before enabling the website. Frontend and backend are separate deploys.

For a bad website release, restore a known-good Pages production deployment using
the dashboard rollback controls, or redeploy the known-good Git revision. Verify
the public domain afterward. Website rollback does not roll back database changes.
Keep database migrations compatible across adjacent releases.

## Limits and references

At review time Pages documents a 25 MiB per-file maximum and 20,000 files for a
Free-plan site. The current public assets are below that per-file limit; inspect
the entire export again as the project grows. Move large files to object storage,
not Drive share URLs.

- [Cloudflare static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Serving pages, 404 behavior, and caching](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)

Check current dashboard/runtime availability and plan terms before launch.
