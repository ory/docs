<!--
This file lives only on the `wassimoo/feat-add-kapa-sandbox` branch. It documents
how writers test new/changed docs against the isolated kapa.ai sandbox.
Do NOT merge this branch into master.
-->

# kapa.ai content-testing sandbox

`wassimoo/feat-add-kapa-sandbox` is a long-lived testing branch. Push draft docs
here, let the **isolated** kapa sandbox project re-crawl the preview, then ask
the assistant to see how it answers — all without touching the knowledge base
that production users query.

- **Preview site:**
  https://docs-git-wassimoo-feat-add-kapa-sandbox-ory.vercel.app/docs/welcome
- **kapa project:** `testing-docs-sandbox`

## How it works

1. The branch gets a **stable Vercel branch alias**:
   `https://docs-git-wassimoo-feat-add-kapa-sandbox-ory.vercel.app`.
2. On preview builds the site is made **self-referential** (see
   [`docusaurus.config.ts`](docusaurus.config.ts)): `url` is derived from
   `VERCEL_BRANCH_URL`, so the sitemap, canonical tags, and absolute links point
   at the preview host instead of `www.ory.com`. Previews are also marked
   `noindex`.
3. The separate kapa project **`testing-docs-sandbox`** (its own website-id)
   crawls that stable alias, scoped to the preview host + `/docs/`.
4. The "Ask AI" widget on the preview uses the sandbox website-id (hardcoded
   default in `docusaurus.config.ts`, see [IDs & config](#ids--config)), so you
   test against the sandbox knowledge base, not production.

## Test your changes in kapa (the main loop)

After you edit docs and want to see how kapa answers:

1. **(Optional) Rebase on master** so retrieval competes against the real
   corpus: `git fetch origin && git rebase origin/master`.
2. **Push** your changes to `wassimoo/feat-add-kapa-sandbox`.
3. **Wait for the Vercel preview deploy** to finish (check the deployment is
   live at the preview URL above).
4. **Re-crawl in kapa:** dashboard → `testing-docs-sandbox` project → the
   Website data source → **Re-crawl now**. (kapa also auto-crawls every 24h.)
5. **Review & ingest — don't skip this.** If **>45%** of pages changed (always
   true for the first crawl, and for large edits), the crawl lands in a
   **"review" state** and does **not** go live automatically. Open it in the
   dashboard and **approve/ingest** it. Small edits (≤45%) go live on their own.
   Ref: https://docs.kapa.ai/data-sources/refreshes#web-crawling
6. **Ask.** Use the "Ask AI" widget on the preview site, or the sandbox
   project's **playground** in the kapa dashboard.
7. **Confirm** the answer uses/cites your updated page. Iterate from step 2.

> Turnaround note: a crawl of the full docs (~1,700 pages) takes a while, and
> nothing changes in the assistant's answers until the crawl has been
> **ingested** (step 5). If an answer says "the knowledge sources don't contain
> enough information," the crawl hasn't been ingested yet (or the source
> URL/scope is wrong).
