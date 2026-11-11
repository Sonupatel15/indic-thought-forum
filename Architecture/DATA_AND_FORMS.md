# Database, Google Sheets, Excel, and response collection

## 1. Current state and recommendation

There is **no backend or database in this repository**. Public events, podcasts,
and Sankalpas come from typed source files. The two Contact forms send JSON only
when `NEXT_PUBLIC_FORMS_ENDPOINT` is configured; otherwise they are disabled and
entered information is not transmitted or saved.

**Recommended durable setup:** keep the static website, add one small external
HTTPS submission service, and store responses in managed PostgreSQL, for example
Supabase. Supabase Auth is **not required** for this design. Staff can initially
use a protected provider dashboard and controlled exports instead of building
an admin application.

If staying entirely on Cloudflare is more important than database portability,
**Worker + D1** is a simpler provider-native alternative. Do not deploy both
databases for the same initial requirement.

| Choice | Appropriate when | Important limitations |
| --- | --- | --- |
| PostgreSQL / Supabase | Reliable response history, filtering, future reporting and integrations | Requires a server-side write endpoint, private access rules, backups and an operator |
| Worker + D1 | Small enquiry workflow standardized on Cloudflare | SQLite semantics and Cloudflare-specific bindings/tooling; not PostgreSQL |
| Private Google Sheet through backend | Very small team/volume and spreadsheet-centric processing | Quotas, concurrent writes, access control, retries, deduplication and spreadsheet formula safety still need work |
| Excel workbook in OneDrive/SharePoint through backend | Team already operates in Microsoft 365 | Microsoft Graph permissions, workbook sessions/concurrency and throttling must be handled |
| Hosted Google/Microsoft Form link | Fastest collection with minimal custom backend work | Replace/link the custom UI intentionally; existing JSON form transport is not directly compatible |
| Local `.xlsx` file in the project | Offline analysis/export only | Not a live concurrent write database and cannot persist submissions on static hosting |

Pricing, quotas, backup features, regions, and organizational eligibility must be
checked for the selected provider/plan. Do not assume a free tier guarantees
production availability or backups.

## 2. Target production data flow

```mermaid
sequenceDiagram
    participant V as Visitor browser
    participant A as HTTPS submission service
    participant D as Private database
    participant J as Reporting/notification job
    V->>A: OPTIONS preflight when cross-origin
    A-->>V: Allow approved origin, POST, Content-Type
    V->>A: POST JSON enquiry, no cookies
    A->>A: Size/type/field/consent/spam/rate checks
    A->>D: Parameterized insert and commit
    D-->>A: Durable record ID
    A-->>V: 2xx JSON {"success": true}
    J->>D: Read accepted work using private credentials
    J->>J: Send notification/export; retry failures
```

Only acknowledge success after a durable insert, or after a deliberately chosen
durable queue has accepted responsibility. Sending an email alone is not reliable
storage. If spreadsheet export fails after the database insert, preserve the
accepted record and retry the export rather than asking visitors to resubmit.

**No visitor authentication** does not mean **public database access**. The browser
may anonymously POST a validated enquiry; it must not list, edit, or delete
responses. CORS is a browser rule, not spam prevention or endpoint authentication.
Provider accounts, exports, and staff access must remain protected.

## 3. Exact existing frontend contract

Authoritative code:
[Submission type and transport](../src/lib/forms.ts) and
[form fields and submission behavior](../src/components/submission-form.tsx).

- `POST`, `Content-Type: application/json`, `Accept: application/json`.
- `credentials: "omit"`; no login/session cookie.
- Browser abort timeout: 15 seconds. An aborted browser request may still have
  committed on the backend; see duplicate handling below.
- Only a 2xx response whose parsed JSON contains **`"success": true`** is success.
  An empty 204 response, HTML thank-you page, redirect to a login screen, or
  `{ "ok": true }` does not satisfy this contract.
- HTTP 429 gets a specific retry-later message; other non-2xx responses get a
  generic failure message. Backend error details are not currently rendered.
- Failed requests keep entered data; successful requests reset the form.

### Join the Community

```json
{
  "type": "membership",
  "name": "Example Member",
  "email": "member@example.com",
  "phone": "",
  "area": "Culture & heritage",
  "message": "",
  "city": "Bengaluru",
  "referralSource": "A friend",
  "consent": true,
  "website": ""
}
```

When `area` is `"Other"`, the payload also contains required `customInterest`.
The HTML field named `interest` is translated to JSON `area`; do not write a
backend expecting an `interest` property instead.

### Contribute to the Community

```json
{
  "type": "contact",
  "name": "Example Contributor",
  "email": "contributor@example.com",
  "phone": "",
  "area": "Knowledge & dialogue",
  "message": "I can help organize reading circles.",
  "availability": "Weekends",
  "consent": true,
  "website": ""
}
```

`website` is a hidden honeypot, not the visitor's requested website URL. Legitimate
submissions leave it empty. Do not publish or treat it as ordinary profile data.

### Validation to implement on the server

Client checks are UX only. Validate incoming JSON independently:

| Field | Existing UI constraint / server expectation |
| --- | --- |
| `type` | Exact `"membership"` or `"contact"` |
| `name` | Required trimmed text, 2-100 characters |
| `email` | Required valid email, at most 254 characters |
| `phone` | Optional; if present, 7-20 characters using digits, spaces, `+`, `-`, parentheses |
| `area` | Required exact approved value from list below |
| `message` | Contribute: required, 10-3000 characters. Join: empty or 10-3000 characters |
| `city` | Join only: required, 2-100 characters |
| `referralSource` | Join only: required, 2-200 characters |
| `customInterest` | Join with Other only: required, 2-200 characters |
| `availability` | Contribute only: required, 2-200 characters |
| `consent` | Must be Boolean `true`; record server-side receipt time and policy version |
| `website` | Must be empty; reject populated honeypots |

Area allowlist:

- Culture & heritage
- Knowledge & dialogue
- Community & seva
- Youth & education
- Nature & responsibility
- Arts & expression
- Events & collaboration
- General enquiry
- Other (**Join only**)

Set a request-body cap, for example 16 KiB, enforce JSON and known field types,
and reject invalid payloads rather than filling missing required values silently.
Use parameterized queries. Rate-limit with a shared/durable mechanism rather than
per-process memory, set a sensible traffic budget, and keep logs free of names,
emails, phones, full bodies, and credentials.

If adding Turnstile or another challenge, verify tokens **server-side** and update
the frontend type/transport, UI, CSP, privacy notice, and tests. The current payload
has no challenge token; an endpoint that requires one is not yet compatible.

## 4. Database model

Start with one private `submissions` table. This is a **schema outline**, not an
applied migration or claim that a database has been provisioned.

| Column | PostgreSQL type | Purpose |
| --- | --- | --- |
| `id` | `uuid` primary key | Server-generated stable submission identity |
| `created_at` | `timestamptz` | Server receipt timestamp |
| `type` | constrained `text` | membership/contact |
| `name`, `email`, `phone`, `area`, `message` | `text` with appropriate null/length constraints | Shared fields; optional phone/message may be empty according to form kind |
| `city`, `referral_source`, `custom_interest`, `availability` | nullable `text` | Conditional fields, constrained by submission type |
| `consent`, `consent_received_at`, `privacy_version` | `boolean`, `timestamptz`, `text` | Evidence of consent and applicable notice version |
| `status` | constrained `text` | Internal workflow, such as new/in_progress/closed |
| `idempotency_key` | nullable unique `text` | Add when implementing request deduplication |

Use database constraints alongside application validation, index `created_at` and
relevant workflow fields, and apply versioned migrations. Do not make email unique:
the same person may send more than one legitimate enquiry.

For Supabase, keep this table in a private/non-exposed schema where practical.
If using an exposed schema, enable RLS and revoke browser-role access; add **no
anonymous SELECT or general INSERT policy** for this backend-only design.
Privileged service credentials bypass RLS and belong only in the backend's secret
store. Prefer appropriately scoped server access and test that anonymous reads
and writes fail.

For D1, use SQLite-compatible column types, checks and migrations instead of
copying a PostgreSQL migration. Access it through a Worker binding, not a public
browser database credential.

## 5. Changes required to connect a backend

### Keep the current frontend deployment static (recommended)

1. Provision the private database and apply its migration.
2. Deploy a separate Worker, Vercel Function project, Supabase Edge Function, or
   equivalent small HTTPS service. Pick one runtime and its supported database
   driver/HTTP API; do not assume Node TCP clients work in every edge runtime.
3. Configure private credentials only in that service. Suggested backend-only
   settings include allowed origins, database connection/service credentials,
   rate limits, retention policy version, and optional notification credentials.
4. Implement POST/OPTIONS, the validation above, abuse controls, durable write,
   and exactly the frontend success contract.
5. For cross-origin requests, allow only explicitly approved production and
   staging origins, `POST, OPTIONS`, and `Content-Type`. Include `Vary: Origin`
   for reflected approved origins, and return CORS headers on error responses too.
   Do not allow arbitrary preview domains to submit into production storage.
6. Point `NEXT_PUBLIC_FORMS_ENDPOINT` to the verified HTTPS endpoint and rebuild
   the website. Do not put database/Google service keys into that value.
7. Narrow `connect-src` in both host header configurations to required origins.
   Update [the privacy page](../src/app/privacy/page.tsx) with actual providers,
   fields collected (including city, referral, custom interest and availability),
   purposes, retention, access/deletion process, and contact method.
8. Test real persistence using a dedicated staging database, then check staff
   access, deletion, backups, and monitoring before enabling production.

A service that validates Supabase JWTs by default must be deliberately configured
for this anonymous enquiry flow and protected with validation/abuse controls.
Never put a privileged key in the browser merely to bypass that restriction.

### If you want one full-stack Next.js project on Vercel instead

That is a **different deployment architecture**: remove `output: "export"`,
replace the static-export build/finalizer/preview assumptions, add a real route
handler such as `src/app/api/submissions/route.ts`, configure server-only secrets,
and test the server deployment and headers. An absolute HTTPS endpoint still
fits the current frontend configuration; use a staging deployment URL while
testing. Do not simply add the route while retaining static export.

On Cloudflare, retaining Pages for the website and adding a separate Worker avoids
a framework-runtime migration. Pages Functions are another option, but their
code, bindings, routing, and function response headers must be explicitly deployed;
copying `out` alone does not deploy an API.

### Duplicate handling

The current frontend sends no idempotency key and does not retry automatically.
Disabling the button while pending prevents double-clicks, not timeout/retry
duplicates. For a stronger collection guarantee, add a stable per-attempt key
to [Submission](../src/lib/forms.ts) and the form state, retain it for retries,
reset it only after confirmed success/new enquiry, and enforce uniqueness in the
database. Repeated accepted requests should return the same success. Document
this as an explicit contract change and test it.

## 6. Google Sheets and Excel

### Recommended: database first, private spreadsheet second

Export approved response fields to a private Sheet/CSV or workbook for staff.
Use stable submission IDs so retries update/deduplicate rather than append twice.
Restrict sharing to the responsible team. Record export failures without losing
the database record, and account for copies/exports in the retention policy.

Google Sheets API credentials or Microsoft Graph credentials stay on the backend.
Use Sheets `RAW` input or equivalent safe handling so leading `=`, `+`, `-`, or `@`
does not become an executable formula. Sanitize CSV/Excel exports too; a quoted
CSV field alone is not sufficient formula-injection protection.

### Sheets-only collection

For a small workflow, the backend can validate and append directly to a private
Sheet, then return success only after the append is confirmed. Still implement
rate limits, controlled access, quota/error handling, deduplication, and backups.
It has fewer relational/integrity guarantees than a database.

Do **not** paste an Apps Script web-app URL into the current endpoint and assume
compatibility. The browser's JSON POST requires a CORS preflight, and Apps Script
Content Service can redirect responses. Verify the whole browser protocol; a
server-side proxy using the Sheets API is more controllable. `mode: "no-cors"`
is not a fix: an opaque response cannot confirm `{ "success": true }`.

A hosted Google Form can collect directly into Sheets with less engineering.
That requires an intentional UI/link change; do not show a custom-form success
message without a verifiable response.

### Spreadsheet-managed public content

This is separate from collecting private form responses:

```text
Private editorial Sheet/Excel
  -> build-time importer using private CI credentials
  -> validate approved public fields and stable IDs
  -> typed source/generated snapshot
  -> review + static build
  -> CDN
```

No importer exists yet. Initially, the developer can manually review/import
approved data into [sankalpas.ts](../src/lib/sankalpas.ts) or
[site.ts](../src/lib/site.ts). Later, add a validation/import script, source schema,
publish trigger, preview step and failure policy. A failed import should fail
publishing or explicitly preserve a dated approved snapshot, not silently publish
partial data. Never use the response-collection sheet as the public content feed.

## 7. Backend acceptance checklist

- Both payload types persist correctly, including conditional fields and Unicode.
- Missing/invalid fields, oversized bodies, false consent, honeypots, and
  unsupported areas fail; valid requests do not require visitor login.
- Anonymous callers cannot read or modify stored responses.
- Correct-origin preflight succeeds; disallowed origins fail; direct non-browser
  abuse is rate-limited independently of CORS.
- Database failure/timeouts never produce a success response.
- Retry after an ambiguous timeout does not duplicate records once idempotency
  is implemented; until then the operational duplicate risk is understood.
- Spreadsheet or email outages leave durable records available for retry.
- Staff can retrieve, export, delete, back up, and restore test records.
- Client bundles, repository history and logs contain no private service keys.

References: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security),
[Cloudflare D1](https://developers.cloudflare.com/d1/),
[Apps Script web apps](https://developers.google.com/apps-script/guides/web),
and [Content Service](https://developers.google.com/apps-script/guides/content).
