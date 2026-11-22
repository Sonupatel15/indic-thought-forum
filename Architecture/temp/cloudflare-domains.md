# Cloudflare domains and Git deployment

| Purpose | Hostname |
| --- | --- |
| Canonical production site | `https://www.indicthoughtforum.org` (the current project setting; verify it in your dashboard) |
| `.org` apex | `indicthoughtforum.org`, redirect to the canonical hostname if not already configured |
| Planned `.com` | `indicthoughtforum.com` and `www.indicthoughtforum.com`, examples until the domain is purchased and confirmed |
| Production Worker | `indic-thought-forum` |
| PR preview | Cloudflare supplies a branch-specific `workers.dev` URL after a successful preview build |

## 1. Copy the files, then connect the existing Worker

1. Extract the handoff ZIP into the real Git repository's root on a feature branch, keeping the paths intact. Review `git status --short` and `git diff` before staging. Copy the dependency manifest and lockfile together. Run `npm ci`, `npm run typecheck`, and `npm run build:cloudflare`. Keep local `.env` files, generated builds, and credentials out of Git.
2. In [Cloudflare](https://dash.cloudflare.com/), go to **Workers & Pages > indic-thought-forum > Settings > Builds**. Connect the actual GitHub repository. Install or grant the Cloudflare Workers & Pages GitHub app access to that repository if needed. Reuse the production Worker; do not create a second production Worker for the `.com`.
3. Configure Workers Builds:

   | Setting | Value |
   | --- | --- |
   | Production branch | Your GitHub default branch, typically `main` |
   | Root directory | Repository root (or the folder containing `package.json` in a monorepo) |
   | Build command | `npm run build:cloudflare` |
   | Production deploy command | `npm run deploy:cloudflare` |
   | Branch control | Enable **Preview Builds** |
   | Preview command | `npx opennextjs-cloudflare populateCache remote && npx wrangler preview` |
   | Build variables | `NODE_VERSION=24.22.3` (or later supported Node 24 patch); `NPM_VERSION=11`; `NEXT_PUBLIC_SITE_URL=https://www.indicthoughtforum.org` |

   Workers Builds installs dependencies; if you configure an explicit install, use `npm ci` with dev dependencies. The preview command copies this project's OpenNext cache into the Worker assets before uploading the branch Preview. Do not use `npm run preview:cloudflare` here: it starts a local server. `npm run upload:cloudflare` creates a Worker **Version**, not an isolated branch **Preview**.
4. If the existing Worker shows a **Set up Worker Previews** banner, review and complete the one-time switch. Make sure the branch has the updated [Wrangler configuration](../wrangler.jsonc) with `"previews": {}`. The current public pages use branch-built assets; no production API or storage needs to be added for them. If you later add bindings, use preview-safe resources and test them separately; a service binding can target production. Keep shared build variables safe for feature branches. Do not expose production secrets or enable live submissions in previews; leave the public form/donation settings unset unless you have an intentionally scoped setup.
5. Push a branch in the connected repository and open a PR against the default branch. Each subsequent push updates the same branch Preview URL. Cloudflare's GitHub app posts the build status and Preview URL to the PR; the deployment also gets a URL for that exact build. If the URL is missing, verify branch controls, preview command and host settings, and retry the build or push a new commit with the PR open. These URLs are public unless you enable Cloudflare Access; `workers.dev` branch Previews send `X-Robots-Tag: noindex`, which is not access control.
6. Merge the PR. The resulting push to the configured default branch deploys one new version to the production Worker. A direct push to that branch also deploys, so require PRs and the Cloudflare build check in GitHub branch protection if you want to enforce review. No GitHub Actions deployment workflow is needed with Workers Builds. If the target repository already has a workflow deploying this Worker, choose one deployment owner to avoid double publishing; keep unrelated CI.

## 2. Add the `.com` after purchase

**Recommended: keep `.org` canonical and redirect the `.com` to it.** A merge updates the `.org` Worker; visitors entering the `.com` immediately get the same updated site via the redirect. This preserves current links and SEO and avoids building twice.

1. Register the `.com` with Cloudflare Registrar if available, or with a registrar of your choice. If using another registrar, add the domain to the same Cloudflare account, review imported records, and update the nameservers at the registrar. Wait for the Cloudflare zone to show **Active** and HTTPS coverage for the apex and `www`. Do not delete existing mail records.
2. On the `.org` Worker, verify **Settings > Domains & Routes** already lists `www.indicthoughtforum.org` as a **Custom Domain**. Add it there if needed after checking for any existing DNS record or service that would conflict. No change is needed if this is already working.
3. In the `.com` zone, create a **proxied** A record for `@` and another for `www`, both pointing to Cloudflare's redirect-only placeholder `192.0.2.1`, provided these names are not already used by another service. These records let Cloudflare answer requests without a separate origin.
4. In the `.com` zone, open **Rules > Redirect Rules > Create rule**. Match the exact `.com` names using:

   ```text
   http.host in {"indicthoughtforum.com" "www.indicthoughtforum.com"}
   ```

   Use a **Dynamic** target `concat("https://www.indicthoughtforum.org", http.request.uri.path)`, status **301**, and enable **Preserve query string**. Substitute the domain you actually buy. If the apex `.org` needs a redirect, set the equivalent rule in the `.org` zone for `indicthoughtforum.org` only. Do not match the canonical hostname; that would create a redirect loop.
5. Verify the redirect before announcing the domain:

   ```powershell
   curl.exe -I "https://indicthoughtforum.com/calendar/?ref=domain-test"
   curl.exe -I "https://www.indicthoughtforum.com/about/"
   curl.exe -I "https://www.indicthoughtforum.org/calendar/"
   ```

   The `.com` commands should return `301` with the expected `.org` destination and preserved query string; the canonical route should return `200`. Open the PR preview separately and confirm a branch-only change is not present on production until merge.

**Alternative: keep `.com` visible in the address bar.** Instead of the redirect setup, attach the confirmed `.com` hostname(s) to the **same Worker** under **Domains & Routes > Add > Custom Domain**. Do not create the redirect-only DNS placeholders for this option. Cloudflare creates the DNS record and certificate for the Worker attachment. The content will be live on both hostnames after one deployment; keep one canonical hostname for sitemap and metadata.

## 3. What needs changing in the repo

- For PR previews, the handoff already includes the `previews` block. Keep the existing Worker name and self-reference. Leave `workers_dev` enabled for the suggested setup, and protect previews with Cloudflare Access if private.
- Buying a `.com`, redirecting it, or attaching it in the dashboard **does not require a hostname change in code** if `.org` stays canonical. Do not add a second deploy command or replace the `.org` in [`.env.example`](../.env.example).
- If you later promote `.com` to canonical, set `NEXT_PUBLIC_SITE_URL` to the confirmed `.com` origin in Workers Builds, update the example and fallback in [`.env.example`](../.env.example) and [`src/lib/site.ts`](../src/lib/site.ts), and rebuild. Switch the redirects so every alias points **to** the new canonical hostname. Verify canonical tags, `robots.txt`, and `sitemap.xml` after deployment.

References: [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/), [branch control](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/), [GitHub PR comments](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/#pull-request-comment), [Worker Previews](https://developers.cloudflare.com/workers/previews/), [custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), and [domain redirects](https://developers.cloudflare.com/fundamentals/manage-domains/redirect-domain/).
