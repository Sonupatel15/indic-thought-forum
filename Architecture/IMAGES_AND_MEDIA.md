# Images and media

## Recommendation for this project

**Keep the prepared images in [public/images](../public/images) for now.**
Git-backed deployment uploads them with the site and the host's CDN serves them.
There is no need to upload the same files separately to Google Drive, OneDrive,
Cloudflare R2, or Vercel Blob for the first release.

At this review the public directory contains 47 files totaling approximately
49.09 MiB. The largest is the approximately 11.32 MiB source `hero.png` in
[itf-assets](../public/images/itf-assets). Each file is below Cloudflare Pages'
currently documented 25 MiB per-file limit. Total deployment size is not the same
as a visitor's initial download: browsers request only assets used by a page.
However, **everything in public is deployed and publicly reachable**, including
source artwork and originals that are not displayed.

## Storage choices

| Option | Suitable use | Decision |
| --- | --- | --- |
| Repository + `public/images` | Current small, developer-maintained collection | Best starting point; portable, versioned, no integration work |
| Google Drive / OneDrive | Private originals, backups, team review, handover | Good working archive, not the website's image delivery service |
| Cloudflare R2 + custom media domain | Large or frequently updated public media archive | Good later, especially with Cloudflare hosting; derivatives are still your responsibility |
| Image CDN such as Cloudinary | Editor uploads, transformations, responsive variants | Useful if convenience justifies provider cost and integration |
| Vercel Blob | Object storage managed alongside a Vercel deployment | Viable later; not a prerequisite for static export and not automatic image resizing |
| Database blobs/base64 | Application records | Avoid for these public media assets; keep object keys/URLs in structured records |

Drive/OneDrive share URLs may be preview pages rather than image responses;
sharing permissions, redirects, quotas, and organization policy can change.
They do not provide the predictable image URLs, cache policy, and transformation
workflow of a media service. Do not depend on copied temporary download links.

Retain an approved-original archive in a restricted shared drive, but publish
optimized derivatives through the website/CDN. Never expose a private archive
using an unrestricted share link just to make the website work.

## Current asset layout and consumers

| Assets | Used for |
| --- | --- |
| `heritage-hero.webp`, `heritage-hero-mobile.webp` | Desktop/mobile home hero; desktop artwork also supplies the sharing image |
| `itf-assets/ITF-Logo.png` | Official source logo for the branding preparation script |
| `itf-assets/itf-logo-footer.webp` | Actual Header/Footer logo derivative |
| `<speaker>/event-poster/*.png` | Seven supplied original posters, retained as local sources |
| `<speaker>/event-poster/*.webp` | Event cards, featured event, and poster dialogs |
| `sankrant-sanu/event-photos/*.webp` | Five full gallery photos and their 360/720px derivatives |
| `podcast-*.webp` | Ten local YouTube episode previews |
| Other legacy/source files | Preserved project assets; verify references before removing |

Paths are declared in [site.ts](../src/lib/site.ts) and
[media.ts](../src/lib/media.ts); branding is referenced by
[header.tsx](../src/components/header.tsx). The home hero and social image metadata
also have references in [page.tsx](../src/app/page.tsx) and
[layout.tsx](../src/app/layout.tsx).

Unlike the old README description, current poster viewers use `previewImage`,
not the original PNG. Keep originals for regeneration; do not assume opening a
viewer requires a multi-megabyte PNG download.

## Adding an event poster

1. Obtain permission and verify the actual date, speaker, time, and venue.
2. Add the PNG under a descriptive speaker/event directory. Follow existing
   lowercase, hyphenated filenames containing the event date.
3. Add a unique event record in [site.ts](../src/lib/site.ts): original `image`,
   matching `.webp` `previewImage`, exact dimensions, ISO date, `HH:mm` IST time,
   display date, speaker, category, and venue.
4. Add verified coordinates/OSM reference if the venue is new. Venue strings
   must match the event data exactly.
5. Run `npm run assets:posters`. It checks input paths/dimensions, preserves PNGs,
   and produces full-dimension WebPs no larger than **256 KiB**.
6. Review readability and uncropped appearance. If the result exceeds the budget,
   deliberately adjust the source/preparation workflow; do not ignore the failure.
7. Build, preview Home/Updates/Calendar, open the dialog, then commit both source
   and derivative with the content change. Review the calendar's explicit
   featured-event selection separately.

## Adding a gallery photo or podcast

For gallery photos, prepare an orientation-corrected 1000px-wide WebP, remove
unnecessary EXIF/location data, add approved title/alt/category data to `gallery`,
and run `npm run assets:gallery`. This produces 360px and 720px variants, preserving
aspect ratio with a **180 KiB** maximum per derivative. The gallery's `picture`
element selects these variants; ordinary Next.js Image markup alone does not
resize images in this export.

For podcasts, add an approved record with a valid 11-character YouTube ID and a
local flat `/images/*.webp` thumbnail path in [media.ts](../src/lib/media.ts).
Run `npm run assets:media`, review the generated files, build, and check that no
YouTube player connects until Load is chosen. That command refreshes **all**
podcast thumbnails and the mobile hero, so review the entire asset diff.

Do not host large video files in this repository. Keep the existing opt-in hosted
video approach unless deliberately adopting a video delivery service.

## Asset commands: maintenance, not deployment prerequisites

| Command | Inputs / side effects |
| --- | --- |
| `npm run assets:prepare` | Downloads configured reference sources; regenerates desktop hero, heritage image, legacy mark, and five full gallery photos |
| `npm run assets:media` | Downloads YouTube thumbnails; also derives mobile hero from desktop hero |
| `npm run assets:posters` | Local PNG originals + event records; validates and generates WebP posters |
| `npm run assets:gallery` | Local 1000px gallery photos; generates 360/720px WebPs |
| `npm run assets:branding` | Local official PNG; generates 168x168 lossless WebP within 32 KiB |

Do not run downloading commands automatically in production builds. Builds use the
committed results, independent of upstream media availability. After refreshing
full gallery sources, regenerate variants too. `assets:prepare` does not replace
the supplied posters or regenerate the official Header/Footer logo.

## Later move to an image CDN or R2

This is a proposed migration, not an installed integration:

1. Select the storage owner, billing account, region needs, access policy, and
   stable HTTPS custom domain, for example `media.example.org`.
2. Upload only approved public derivatives and any originals intended for public
   downloads. Keep private/source archives elsewhere.
3. Use versioned object names when images change. Set the correct image content
   type and a suitable cache policy. Do not overwrite an immutable URL.
4. Update every image consumer and metadata reference, not just `site.ts`.
   `GalleryGrid` currently constructs variant paths by replacing `.webp`;
   preserve that naming contract or deliberately change its data model.
5. Adapt the preparation scripts: they currently write local files and some
   require `/images/...` paths. Do not replace these source paths with remote
   URLs and expect the scripts to keep working.
6. Add the exact media origin to `img-src` in both
   [public/_headers](../public/_headers) and [vercel.json](../vercel.json).
   Update the privacy notice because the browser will contact another origin.
7. Keep `images.unoptimized: true` unless implementing a compatible custom
   image loader. A static export has no built-in runtime optimization endpoint.
8. Test responsive sources, dialogs, metadata/social cards, missing images, CSP,
   and HTTPS. Only remove local copies after the complete deployed migration
   works and the originals have a separate backup.

Public image display usually does not require a browser `fetch` CORS integration;
canvas/download workflows may. Bucket upload credentials must remain server-side.
R2 by itself is object storage, not an automatic responsive-image pipeline.

## Rights and publishing safeguards

Approve image rights and identifiable-person permissions, use meaningful text
alternatives, and retain source attribution records. Hero heritage artwork is
artwork, not evidence of a photographed event. Provide reviewed poster transcripts
where essential information exists only inside images. Never place private
member photographs or unapproved source material in `public`.

Reference: [Cloudflare Pages asset limits](https://developers.cloudflare.com/pages/platform/limits/)
and [R2 public buckets/custom domains](https://developers.cloudflare.com/r2/buckets/public-buckets/).
Check current plan limits before a large media expansion.
