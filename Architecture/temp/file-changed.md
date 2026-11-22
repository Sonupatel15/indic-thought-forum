# Copy-ready handoff: dependency, website, and deployment changes

Extract the updated handoff ZIP into the root of your Git checkout, on a feature branch. This list covers the dependency remediation, responsive posters, requested page edits, and Cloudflare setup from this handoff. No files need to be deleted to apply it. The historical cleanup notes below are separate and are not instructions to delete files for this handoff.

| Files (repository-relative) | Change |
| --- | --- |
| [`package.json`](../package.json), [`package-lock.json`](../package-lock.json) | Updated audited dependencies. Copy together and install with `npm ci`. |
| [`src/app/page.tsx`](../src/app/page.tsx), [`src/components/event-list.tsx`](../src/components/event-list.tsx), [`src/app/globals.css`](../src/app/globals.css) | One responsive homepage poster row; homepage copy-card removals and spacing; scoped About, footer, and tracker styles. |
| [`src/app/about/page.tsx`](../src/app/about/page.tsx), [`public/images/about-rigveda.webp`](../public/images/about-rigveda.webp) | Added local manuscript image and removed the visible caption. |
| [`src/app/sankalpas/page.tsx`](../src/app/sankalpas/page.tsx), [`src/components/footer.tsx`](../src/components/footer.tsx), [`src/components/event-map.tsx`](../src/components/event-map.tsx) | Filtered deprioritised rows, removed footer values, and removed duplicate map credit while retaining in-map attribution. |
| [`src/components/contact-layout.tsx`](../src/components/contact-layout.tsx), [`src/components/submission-form.tsx`](../src/components/submission-form.tsx) | Kept the Join form and retained interest prefill from Sankalpa links. |
| [`tests/about.spec.ts`](../tests/about.spec.ts), [`tests/footer.spec.ts`](../tests/footer.spec.ts), [`tests/home.spec.ts`](../tests/home.spec.ts), [`tests/media.spec.ts`](../tests/media.spec.ts), [`tests/sankalpas.spec.ts`](../tests/sankalpas.spec.ts), [`tests/schedule.spec.ts`](../tests/schedule.spec.ts), [`tests/website.spec.ts`](../tests/website.spec.ts) | Updated regression coverage for the requested behavior. |
| [`.gitignore`](../.gitignore), [`README.md`](../README.md), [`wrangler.jsonc`](../wrangler.jsonc), [`temp/cloudflare-domains.md`](./cloudflare-domains.md), [`temp/file-changed.md`](./file-changed.md) | Enabled Wrangler branch Preview configuration, documented the dashboard setup and domain routing, and made both handoff notes trackable. |

Review `git diff` before staging, especially if your target branch has its own Cloudflare configuration. Follow [cloudflare-domains.md](./cloudflare-domains.md) to connect Git, enable PR Preview URLs, and add the `.com` after purchase.

## Historical Cloudflare Workers deployment cleanup

| File | Status | Reason |
| --- | --- | --- |
| `netlify.toml` | Deleted (verified) | Configured Netlify to publish `out`, which the Cloudflare Workers build does not produce. |
| `vercel.json` | Deleted (verified) | Vercel-only headers configuration. The active deployment uses Next.js headers for Worker responses and `public/_headers` for static assets. |
| `scripts/finalize-export.mjs` | Deleted (verified) | Windows-only workaround for static exports; no build or deployment command uses it. |
| [`.gitignore`](../.gitignore) | Verified; no further change | `/temp/*` ignores the root `temp` contents, including nested scratch files. `!/temp/file-changed.md` keeps this chart eligible to be tracked. Both cases were tested in a temporary Git repository because this folder is an extracted ZIP, not a Git checkout. |
| [`README.md`](../README.md) | Updated | Removed references to the retired deployment files. |
| [`tests/media.spec.ts`](../tests/media.spec.ts) | Updated | Checks the YouTube embed policy in the active Next.js config instead of the deleted Vercel template. |

Compared this folder with the original project ZIP: the three files marked **Deleted** are the only original files missing. There are no remaining references to those paths outside this chart. No files were deleted during this follow-up.

## Production asset storage

The initial audit found 46 images totaling 49.09 MiB. After the cleanup, [`public/images`](../public/images) contains 35 WebP files totaling 3.19 MiB. The browser requests only the images it needs.

| Asset group | Inventory | Current use and recommendation |
| --- | --- | --- |
| Homepage hero | 2 WebP, 0.40 MiB | Desktop and mobile versions; the desktop image also appears in social metadata. Keep both on Cloudflare. The desktop file is about 306 KiB and is the first image to measure if optimizing homepage load. |
| Event poster previews | 7 WebP, 1.40 MiB | Cards, schedules, and poster dialogs use these. Keep on Cloudflare. |
| Event poster originals | 7 PNG, 33.91 MiB | Moved out of `public` to [`asset-sources/images`](../asset-sources/images). The poster generator still uses them; the site and dialogs still use the same WebP URLs. Old direct PNG URLs are no longer served by the new build. |
| Gallery | 15 WebP, 0.47 MiB | Five photos with 360px and 720px variants. The [gallery](../src/components/gallery-grid.tsx) constructs variant URLs dynamically, so all 15 are used. Keep on Cloudflare. Archive full-resolution originals separately if available and approved for storage. |
| Podcast thumbnails | 10 WebP, 0.89 MiB | Served locally before a visitor opts into YouTube. Keep on Cloudflare. |
| Branding | 1 public WebP, 23 KiB; 1 source PNG, 646 KiB | Kept the header/footer WebP at its existing URL. Moved the source PNG out of `public` and updated its [generator](../scripts/prepare-branding.mjs) and [test](../tests/footer.spec.ts). |
| Other assets | 1 header file, bundled Manrope font, external map/video | Keep [`public/_headers`](../public/_headers) for Cloudflare. Next.js bundles the font from its dependency. OpenStreetMap tiles and opt-in YouTube video stay with their existing providers. None belongs in Drive for website delivery. |

| Storage option | Recommendation |
| --- | --- |
| [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) | **Best for the live site now.** Keep optimized, approved web images in `public/images`; OpenNext packages them and Cloudflare serves them at existing same-origin `/images/...` URLs. All audited images are below Cloudflare's [25 MiB per-file limit](https://developers.cloudflare.com/workers/platform/limits/#static-assets). |
| [Google Drive](https://drive.google.com/) | **Use for private originals and team handoff, not live image URLs.** In an organization-owned [Shared Drive](https://support.google.com/drive/answer/7286514) if available, create `Indic Thought Forum / Website Assets / Originals`, with `Brand`, `Hero`, `Event Posters`, and `Gallery` subfolders. Keep sharing restricted to named people or groups. Confirm publication rights and photo permissions before publishing derivatives. |
| [Cloudflare R2](https://developers.cloudflare.com/r2/buckets/public-buckets/) | Consider later if a large public library or frequent media updates need to ship independently of the website. Use a production custom domain or same-origin Worker routes, and recheck image URLs and security headers before switching. No migration is needed now. |
| Drive folder link | No project-specific folder was created or verified. Open [Google Drive](https://drive.google.com/), create the restricted `Website Assets` folder, then use **Share > Copy link**. Share that link with collaborators, not in public page markup. No files were uploaded. |

### Where to put a live image

1. Put the approved web copy in [`public/images`](../public/images) in the project. For example, [`public/images/heritage-hero.webp`](../public/images/heritage-hero.webp) is served at `/images/heritage-hero.webp` on the deployed site. To replace an existing image without changing a page, keep its exact filename and subfolder. A new filename is accessible by URL after deployment but will not appear on a page automatically.
2. If Cloudflare Workers Builds is connected to Git, commit and push the image to the configured production branch. For a manual deployment, run `npm run deploy` from the project root once Wrangler is authenticated. OpenNext copies the files into `.open-next/assets` and uploads them with the Worker; do not put files in that generated folder or upload them separately to R2.
3. In the [Cloudflare dashboard](https://dash.cloudflare.com/), open **Workers & Pages > indic-thought-forum**. Once the deployment succeeds, open its website URL and append `/images/heritage-hero.webp` (or your image path) to verify it. Keep private originals in Drive, outside `public`.

### Public image cleanup

| Former public path | Status | Reason or new location |
| --- | --- | --- |
| `public/images/itf-assets/hero.png` | Deleted | No site, generator, or test consumer found. The desktop and mobile WebP heroes are unchanged. |
| `public/images/heritage.webp` | Deleted | Not served by any page; removed from [`prepare-assets.mjs`](../scripts/prepare-assets.mjs). |
| `public/images/logo-mark.png` | Deleted | No page or metadata uses it; the asset script no longer regenerates it. |
| `public/images/bijeet-prasantha/event-poster/hindumisia-2026-04-02.png` | Moved out of `public` | [`asset-sources/images/bijeet-prasantha/event-poster/hindumisia-2026-04-02.png`](../asset-sources/images/bijeet-prasantha/event-poster/hindumisia-2026-04-02.png) |
| `public/images/ganeshaiah/event-poster/pepper-potato-mould-and-gold-2026-11-29.png` | Moved out of `public` | [`asset-sources/images/ganeshaiah/event-poster/pepper-potato-mould-and-gold-2026-11-29.png`](../asset-sources/images/ganeshaiah/event-poster/pepper-potato-mould-and-gold-2026-11-29.png) |
| `public/images/itf-assets/ITF-Logo.png` | Moved out of `public` | [`asset-sources/images/itf-assets/ITF-Logo.png`](../asset-sources/images/itf-assets/ITF-Logo.png) |
| `public/images/manjunath-ajjampura/event-poster/places-of-worship-act-2026-07-11.png` | Moved out of `public` | [`asset-sources/images/manjunath-ajjampura/event-poster/places-of-worship-act-2026-07-11.png`](../asset-sources/images/manjunath-ajjampura/event-poster/places-of-worship-act-2026-07-11.png) |
| `public/images/medha-bhaskaran/event-poster/queen-tara-2026-06-06.png` | Moved out of `public` | [`asset-sources/images/medha-bhaskaran/event-poster/queen-tara-2026-06-06.png`](../asset-sources/images/medha-bhaskaran/event-poster/queen-tara-2026-06-06.png) |
| `public/images/ram-mohan/event-poster/vedanga-jyotisha-2026-10-25.png` | Moved out of `public` | [`asset-sources/images/ram-mohan/event-poster/vedanga-jyotisha-2026-10-25.png`](../asset-sources/images/ram-mohan/event-poster/vedanga-jyotisha-2026-10-25.png) |
| `public/images/sankrant-sanu/event-poster/are-we-independent-2026-02-20.png` | Moved out of `public` | [`asset-sources/images/sankrant-sanu/event-poster/are-we-independent-2026-02-20.png`](../asset-sources/images/sankrant-sanu/event-poster/are-we-independent-2026-02-20.png) |
| `public/images/shiv-sastry/event-poster/pakistan-failed-state-2026-05-09.png` | Moved out of `public` | [`asset-sources/images/shiv-sastry/event-poster/pakistan-failed-state-2026-05-09.png`](../asset-sources/images/shiv-sastry/event-poster/pakistan-failed-state-2026-05-09.png) |

Verified that all 35 remaining web images match the original bytes and are included in the Cloudflare build. The poster/gallery and branding tests passed against local Cloudflare preview, including checks that the original PNG URLs now return 404.

### React development console warning

| File | Status | Change |
| --- | --- | --- |
| [`next.config.ts`](../next.config.ts) | Updated | Allows `'unsafe-eval'` only in development so React can reconstruct debugging call stacks. Production Worker and static asset policies still block it. |
| [`README.md`](../README.md) | Updated | Documents the difference between development and production. |