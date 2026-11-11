# Moving the project to another laptop

## Short answer

Copy the **source project**, not its installed dependencies or generated output.
Keep the lockfile, prepared images, configuration, tests and documentation.
Run `npm ci` and rebuild on the other laptop.

Nothing must be deleted from this laptop first. The safest approach is to
**exclude disposable files while copying**, retain the original until the new
copy builds, and only then consider cleanup. No files are automatically deleted
by this guide or the copy command below.

## What to keep or skip

| Path / category | Copy? | Reason |
| --- | --- | --- |
| [src](../src) | Keep | All pages, components, content, and form behavior |
| [public](../public) | Keep | Prepared images, original posters, branding sources and header rules; not everything is regenerable offline |
| [scripts](../scripts) | Keep | Build finalizer and maintenance tools |
| [tests](../tests), [playwright.config.ts](../playwright.config.ts) | Keep | Verification suite and browser configuration |
| [Architecture](./), [README](../README.md), [PRODUCT](../PRODUCT.md), [DESIGN](../DESIGN.md) | Keep | Project knowledge and handover |
| [package.json](../package.json), [package-lock.json](../package-lock.json) | Keep both | Commands and reproducible dependency installation |
| [next.config.ts](../next.config.ts), [tsconfig.json](../tsconfig.json), [eslint.config.mjs](../eslint.config.mjs) | Keep | Build, types and lint configuration |
| [vercel.json](../vercel.json), [netlify.toml](../netlify.toml), [.gitignore](../.gitignore), [.env.example](../.env.example) | Keep | Hosting templates, ignore rules and safe env template |
| [.github](../.github) | Keep by default | Optional design agents/skills/hooks, not installed dependencies; review bundled executables before execution |
| `.git` | **Keep if continuing this repository** | Commit history, branches and remotes; omitting it creates a source snapshot, not a repository clone |
| `.impeccable` | Keep tracked design metadata | Optional tooling; local configuration may be machine-specific and should be reviewed |
| `node_modules` | Skip / regenerable | Large platform-specific installed dependencies; restore with `npm ci` |
| `.next` | Skip / regenerable | Development/build cache and generated Next output |
| `out` | Skip for development transfer | Static build output; rebuild locally. Keep a separate copy only if intentionally transferring a deployable artifact |
| `playwright-report`, `test-results` | Skip / disposable | Test reports, screenshots, traces; may contain test-entered data |
| `*.tsbuildinfo` | Skip / regenerable | TypeScript incremental cache |
| [next-env.d.ts](../next-env.d.ts) | Keep; regenerable if omitted | Next-generated declarations; this repository currently tracks it |
| Local `.env*` files other than `.env.example` | Do not put in ordinary shared copy/Git | Recreate locally or transfer separately through an approved secure method |
| Logs and `.DS_Store` | Skip after checking provenance | Diagnostic/OS-generated files, not project inputs |
| Revision checkpoint markdown files | Keep by default | Historical records; optional runtime-wise, not build garbage |

Browser downloads for Playwright normally live in a user cache outside this
directory. They do not need to be copied; install them on the new machine if
the runner reports them missing. Copying Windows dependencies to macOS/Linux is
not supported; `npm ci` installs the correct target-platform packages.

## Existing duplicates and optional design tooling

The root [first checkpoint](../WEBSITE_REVISION_CHECKPOINTS.md) and
[second checkpoint](../WEBSITE_REVISION_ROUND2_CHECKPOINTS.md) currently have
byte-identical counterparts in [Development](./Development). They are small.
Keep them during handover. If consolidating later, update referring links before
removing a copy; they are not generated cache files.

The [historical README](./Development/IMPLEMENTATION_REFERENCE.md) preserves prior
implementation details. Current instructions are in the root README and the
new architecture guides.

The `.github` agents/skills/hooks and `.impeccable` metadata are not needed to
serve the built website, but they are part of the editing workflow. Do not
delete them as if they were `node_modules`. Review local design-tool settings
for machine-specific paths. Do not copy tools from an untrusted source and
execute them merely because they are present.

Do not delete images just because a page does not currently display them.
Original PNGs are inputs to preparation scripts, and other source assets may
be intentional archive material. Unused asset cleanup requires a separate
reference check and backup.

## Safe Windows copy without cleaning the source

Use a **new destination directory**, not an existing project. Edit the destination
to the actual external drive/transfer folder. Run from the ITF project root:

```powershell
$source = (Get-Location).Path
$destination = "E:\Transfer\ITF"
if (Test-Path -LiteralPath $destination) {
    throw "Choose a new destination so existing work cannot be overwritten."
}
robocopy $source $destination /E /XJ /R:2 /W:2 `
    /XD "$source\node_modules" "$source\.next" "$source\out" `
        "$source\playwright-report" "$source\test-results" `
    /XF "*.tsbuildinfo" "*.log" ".env*"
$copyExitCode = $LASTEXITCODE
if ($copyExitCode -ge 8) {
    throw "Copy failed with robocopy exit code $copyExitCode. Inspect the output."
}
Copy-Item -LiteralPath ".env.example" -Destination $destination
```

Robocopy exit codes 0-7 are non-fatal results; 8 or greater indicates failure.
This uses no mirror/purge option, follows no directory junctions, retains `.git`,
and excludes environment files before restoring only the safe example template.
It does not remove anything from the source. Review the destination afterward.
Other private files not named `.env*` still require a manual review.

If you prefer an archive tool, use the same exclusions and explicitly include
hidden `.git` files when preserving history. File Explorer copies can accidentally
omit hidden metadata or include all installed packages; verify the result.

## Restore and verify on the new laptop

Install Node.js 24 LTS and Git. Open a terminal in the copied root:

```powershell
node --version
npm --version
git status --short
npm ci
Copy-Item .env.example .env.local
npm run lint
npm run typecheck
npm run build
npm test -- --project=desktop
```

Only create `.env.local` if it does not already exist. Re-enter verified public
configuration and rebuild when it changes. If browser installation is missing,
run `npx playwright install chromium firefox webkit` and retry tests.

Run `npm run preview`, open <http://127.0.0.1:4173>, and check Home, a refreshed
deep link, Calendar, images and Contact. Reauthorize GitHub locally; do not copy
SSH private keys, browser sessions, access tokens or account caches as part of
this repository handover.

## Push to GitHub without losing history

If `.git` was retained, **do not run `git init` again**. Inspect first:

```powershell
git status --short
git branch --show-current
git remote -v
git diff --stat
git ls-files ".env*" "node_modules/*" ".next/*" "out/*"
```

Expected environment tracking is `.env.example` only, with no installed/build
files tracked. Ignore rules do not untrack files already in Git. If actual
credentials have been committed, stop and rotate them; deleting a local file
does not remove it from history.

Review files before staging, then:

```powershell
git add .
git diff --cached --stat
git diff --cached
git commit -m "Document architecture and production handover"
```

For a brand-new empty GitHub repository with no existing remote, add its URL:

```powershell
git remote add origin https://github.com/YOUR-OWNER/YOUR-REPOSITORY.git
git push -u origin HEAD
```

If `origin` already exists, confirm it is the intended destination before using
it. Do not force-push or overwrite another repository to bypass a rejection.
If the copy intentionally omitted `.git`, initialize a new repository only after
deciding that losing the old local history is acceptable.

Once GitHub is available, cloning the repository on future machines is preferable
to manually transferring folders. Keep the original laptop copy until the new
checkout, images, build, and any separate environment configuration are verified.
