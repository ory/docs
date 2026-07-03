<!--
This file lives only on the `kapa-sandbox` branch. It documents how writers
test new/changed docs against the isolated kapa.ai sandbox before merging.
Do NOT merge this branch into master.
-->

# kapa.ai content-testing sandbox

This branch (`kapa-sandbox`) is a long-lived testing branch. Push draft docs
here, let the **isolated** kapa sandbox project re-crawl the preview, then ask
the assistant to see how it answers — all without touching the knowledge base
that production users query.

## How it works

1. `kapa-sandbox` gets a **stable Vercel branch alias** (e.g.
   `https://docs-git-kapa-sandbox-<org>.vercel.app`).
2. On preview builds, the site is made **self-referential** (see
   [`docusaurus.config.ts`](docusaurus.config.ts)): `url` is derived from
   `VERCEL_BRANCH_URL`, so the sitemap, canonical tags, and absolute links point
   at the preview host instead of `www.ory.com`. Previews are also marked
   `noindex`.
3. The separate kapa project **`testing-docs-sandbox`** (its own website-id)
   crawls that stable alias, scoped to the preview host + `/docs/`.
4. On preview builds the widget uses the sandbox website-id (via the
   `KAPA_WEBSITE_ID` env var), so you can test in the real "Ask AI" widget.

## Writer workflow

1. **Rebase on master first** so retrieval competes against the real corpus:
   `git fetch origin && git rebase origin/master`.
2. Add or edit your draft docs and push to `kapa-sandbox`.
3. Wait for the **Vercel preview deploy** to finish.
4. **Re-index in kapa:** open the `testing-docs-sandbox` project → the website
   data source → **Re-crawl** (kapa also auto-crawls every 24h). See
   https://docs.kapa.ai/data-sources/refreshes#web-crawling
   - If **>45%** of pages changed, the crawl lands in a **review** state — open
     it in the dashboard and **approve/ingest** it manually before it goes live.
5. **Ask:** use the "Ask AI" widget on the preview site, or the sandbox
   project's playground in the kapa dashboard.
6. Confirm the answer uses/cites your new page. Iterate.

## Testing a specific PR instead of the shared branch

kapa's crawler needs **one stable URL** (no wildcards/regex, no per-commit
URLs). To test a single PR's content:

1. In the kapa source config, **re-point** the source URL to that PR's preview
   alias and re-crawl.
2. Only one PR can be "loaded" at a time; re-point back to the `kapa-sandbox`
   alias when done.

For most work, just use the shared `kapa-sandbox` branch.

### IDs & config (kept out of this public repo)

The kapa project ID and the widget website-id are intentionally **not
committed** here. They live in:

- **Vercel:** env var `KAPA_WEBSITE_ID` scoped to the `kapa-sandbox` branch, set
  to the sandbox project's Website Widget integration id. The widget does not
  load unless this is set.
- **kapa dashboard:** the `testing-docs-sandbox` project and its Website Widget
  integration (the `data-website-id` in the embed snippet is the value for
  `KAPA_WEBSITE_ID`).

**Stable preview alias:** confirm the exact
`docs-git-kapa-sandbox-<org>.vercel.app` host after the first push and point the
kapa website data source at it.
