# Deploying to Vercel

## Architecture

Deploy the existing **Next.js static export**. Vercel does not require this site
to become a server-rendered application, and there is no need to change frameworks
or move the current images to an external provider.

```text
GitHub -> Vercel Next.js build (npm run build) -> static output -> Vercel CDN
Optional later: browser -> separate HTTPS submission service -> private database
```

No backend is included in this repository. A Vercel deployment alone does not
enable email delivery, database persistence, or payments.

## 1. Local release check

Use the [transfer guide](./TRANSFER_AND_CLEANUP.md) if moving laptops first.
From the project root:

```powershell
npm ci
npm run lint
npm run typecheck
npm run build
```

Use `npm run preview` for a local production preview. Do not use `next start`.
Commit the prepared assets and lockfile, not `node_modules`, `.next`, or `out`.

## 2. Import from GitHub

Create a Vercel project and import the repository.

| Setting | Value |
| --- | --- |
| Framework preset | **Next.js** |
| Root directory | Repository root, unless ITF is a subfolder in the actual GitHub repository |
| Node.js version | **24.x**, where available; keep local and hosting versions aligned |
| Install command | **`npm ci`** |
| Build command | **`npm run build`** |
| Output directory | Leave the Next.js preset's automatic detection; `output: "export"` identifies static export |

For a deliberately generic **Other/static** preset instead, explicitly set the
output directory to **`out`**. Do not mix generic-static output settings with a
server-runtime setup. Inspect build logs to confirm static pages are exported and
there are no unexpected runtime dependencies.

The committed [vercel.json](../vercel.json) already configures security headers.
No additional Vercel CLI installation or duplicate configuration file is required
for the Git/dashboard workflow. [netlify.toml](../netlify.toml) is for another host
and does not configure Vercel.

## 3. Set public environment variables

Set Production and Preview scopes deliberately:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production HTTPS origin; use a known stable staging origin for staging |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Verified public contact address, if available |
| `NEXT_PUBLIC_FORMS_ENDPOINT` | Tested HTTPS JSON service, or empty to keep submission disabled |
| `NEXT_PUBLIC_DONATION_URL` | Verified hosted donation URL, or empty |

Do not enter database passwords, Supabase service keys, or Google/Microsoft
credentials in these fields. They are embedded in public browser output.
Changing values requires a redeployment. Preview submissions should use a
separate staging database/service or stay disabled.

The current site metadata/robots allow indexing; do not assume arbitrary previews
are private. Review Vercel preview protection and search-indexing controls.
Never use previews to display private responses.

## 4. Deploy and configure the domain

Deploy, inspect the build log, and open the assigned Vercel URL. Add the actual
domain under project domain settings and follow the dashboard's current DNS
instructions rather than copying an old hard-coded IP from a guide.

Choose one canonical HTTPS origin, redirect its alternate `www`/apex form, update
`NEXT_PUBLIC_SITE_URL`, and redeploy. Verify certificate readiness and redirect
behavior. Use the same origin in backend CORS configuration.

If DNS is hosted on Cloudflare but the site is on Vercel, DNS ownership does not
mean the site is deployed to Cloudflare Pages. Start with the DNS configuration
Vercel requests; add proxy/cache behavior only deliberately and revalidate it.

## 5. Routes, headers, and caching

- Preserve directory routes and static routing assets. Do not rewrite every URL
  to `/`; unknown URLs must return the generated not-found page with HTTP 404.
- Vercel consumes [vercel.json](../vercel.json), **not** the Netlify/Cloudflare
  `public/_headers` convention. Verify the configured headers on live responses.
- Retain platform-managed caching for hashed framework assets. Do not make HTML
  or mutable image filenames immutable with an indiscriminate custom rule.
- The current CSP permits the existing local assets, OSM tiles and opt-in
  YouTube. Add only the required media/API origins when integrating services,
  and keep the Cloudflare header template consistent if both hosts remain options.
- Image optimization is disabled in [next.config.ts](../next.config.ts).
  Vercel Image Optimization is not being used automatically; prepared WebPs and
  responsive variants remain important.

## 6. Verify production

```powershell
curl.exe -I https://www.example.org/
curl.exe -I https://www.example.org/events/
curl.exe -I https://www.example.org/media/
curl.exe -I https://www.example.org/not-a-real-page/
```

Replace the domain and inspect statuses, redirects, and security headers.
Open deep links directly and after refresh. Test client-side navigation with the
network panel open: no missing `__next.*` routing resources should occur.

Follow the [production checklist](./OPERATIONS.md), including real-device checks,
verified contact information, forms/donations disabled or demonstrably connected,
image loading, map fallback, and YouTube opt-in.

## 7. Database/API options

**Recommended minimal change:** retain this static project and deploy a separate
HTTPS function/service with private database credentials. Set its URL as the
forms endpoint after implementing [Data and forms](./DATA_AND_FORMS.md). This
avoids changing the website's routing/build/preview architecture.

If the team later chooses a full-stack Next.js deployment, remove static export,
replace its finalizer/preview assumptions, implement the POST route and server-only
configuration, and test the resulting runtime deployment. Merely adding an
`app/api` POST handler while keeping `output: "export"` is not a working integration.

## 8. Updates, rollback, and account suitability

Push reviewed changes to generate previews, then release through the chosen
production branch. Record the known-good deployment and Git revision.

Use Vercel's available deployment promotion/rollback controls for the selected
plan, or redeploy a known-good revision. Recheck the custom domain afterward.
Database migrations, external media changes and provider settings are separate
from website rollback and need their own recovery plan.

Review current Vercel plan terms, organizational/commercial eligibility, usage
limits and billing before choosing a plan. Do not assume the website's purpose
automatically qualifies it for a particular free tier.

References:
[Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs),
[project configuration](https://vercel.com/docs/project-configuration),
and [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).
