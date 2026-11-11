# Indic Thought Forum

The public website for Indic Thought Forum, built with Next.js App Router, React,
and TypeScript. It includes community information, events, a calendar and venue
map, Sankalpas, photographs, podcasts, and participation forms.

The project produces a **static website**. No application server, database, user
accounts, or payment processing is included. Enquiry submission and online
donations stay unavailable until their respective services are configured.

## Requirements

- Node.js 22.18 or newer; **Node.js 24 LTS recommended** locally and on the host.
- npm 10 or newer.
- Git for source control.

## Local development

Run from the project root:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open <http://127.0.0.1:3000>. Copy the environment file only on first setup; do not
overwrite an existing local configuration. Available variables are described in
[.env.example](./.env.example) and the [architecture guide](./Architecture/ARCHITECTURE.md#6-configuration).
All `NEXT_PUBLIC_*` values are public, build-time configuration, never secrets.

## Production build

```powershell
npm run lint
npm run typecheck
npm run build
npm run preview
```

Open <http://127.0.0.1:4173>. The build creates [out](./out), the deployable static
site. Use **`npm run build`**, not a direct `next build`: the script also fixes
Windows export routing filenames. Do not use `next start`.

Prepared images are committed in [public/images](./public/images); no image
downloads or asset-regeneration commands are required for an ordinary build.

## Tests

After building:

```powershell
npm test -- --project=desktop
```

If Playwright reports missing browsers, install them with
`npx playwright install chromium firefox webkit`, then retry. Run `npm test` for
all six configured browser/device profiles. See [testing and release checks](./Architecture/OPERATIONS.md).

## Project layout

| Location | Responsibility |
| --- | --- |
| [src/app](./src/app) | Pages, layout, styling, SEO, sitemap, and robots |
| [src/components](./src/components) | Shared UI and interactive features |
| [src/lib](./src/lib) | Published content, configuration, dates, and form transport |
| [public](./public) | Images and static-host header rules |
| [scripts](./scripts) | Asset preparation, export finalization, and performance measurement |
| [tests](./tests) | Playwright and automated accessibility checks |
| [Architecture](./Architecture) | Architecture, deployment, data, media, and handover guides |

## Documentation

- [Architecture and module map](./Architecture/ARCHITECTURE.md) - what exists, how it works, and recommended production decisions.
- [Images and media](./Architecture/IMAGES_AND_MEDIA.md) - local assets, Drive/OneDrive, CDN options, and publishing.
- [Database, Google Sheets, and Excel](./Architecture/DATA_AND_FORMS.md) - anonymous response collection and required backend changes.
- [Cloudflare deployment](./Architecture/DEPLOY_CLOUDFLARE.md).
- [Vercel deployment](./Architecture/DEPLOY_VERCEL.md).
- [Laptop transfer and cleanup](./Architecture/TRANSFER_AND_CLEANUP.md) - what to copy, exclude, and restore.
- [Production operations](./Architecture/OPERATIONS.md) - verification, launch checklist, backups, and rollback.

Product context is in [PRODUCT.md](./PRODUCT.md); visual conventions are in
[DESIGN.md](./DESIGN.md). Previous implementation notes are retained under
[Architecture/Development](./Architecture/Development).
