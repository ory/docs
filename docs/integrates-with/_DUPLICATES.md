# Source-of-truth overlaps — integrates-with migration

Some of the new pages under `docs/integrates-with/` describe the
same Ory–vendor integration that an **existing page elsewhere in this
repo already documents**. Those existing pages are the source of
truth — the new `integrates-with/` page should either:

- defer to the existing page (link out and stop), or
- get folded into the existing page as an additional use case, or
- replace the existing page if the new content is materially better.

That call is a docs-team judgment. **This file is just an inventory
of where the overlap is.** Vendors with no existing doc in this repo
aren't tracked here — they live only at
`integrates-with/<type>/<vendor>.mdx` and nothing else needs to be
reconciled.

> Filename prefixed with `_` so Docusaurus' default exclude
> (`**/_*.{md,mdx}`) keeps it out of the built site.

---

## Overlap table

| New page in `integrates-with/` | Existing source-of-truth page | Overlap |
|---|---|---|
| `email-providers/mailchimp-transactional.mdx` | `actions/integrations/mailchimp.mdx` | **Direct.** The existing page is specifically about Mailchimp Transactional (Mandrill) via Ory Actions — same use case the new page covers. |
| `email-providers/mailchimp-transactional-snippet.md` | `actions/integrations/mailchimp.mdx` and `kratos/emails-sms/01_sending-emails-smtp.mdx` | **Direct.** The snippet was authored to be appended as a `### Mailchimp Transactional` section into `01_sending-emails-smtp.mdx`; the standalone Mailchimp Actions page already covers the same flow. |
| `cdp-analytics/mailchimp.mdx` | `actions/integrations/mailchimp.mdx` | **Partial.** Existing page describes both Mailchimp Marketing (audience sync) and Mailchimp Transactional but lands on Transactional. The new page focuses on Marketing audience sync via Actions. |
| `cdp-analytics/mailchimp-marketing.mdx` | `actions/integrations/mailchimp.mdx` | **Partial.** Existing page mentions Marketing as one of the two Mailchimp subsystems; this new page is dedicated to it. |
| `email-providers/brevo-snippet.md` | `kratos/emails-sms/01_sending-emails-smtp.mdx` | **Snippet-into-page.** Authored to be appended as a `### Brevo` section to the existing SMTP page. |
| `email-providers/sparkpost-snippet.md` | `kratos/emails-sms/01_sending-emails-smtp.mdx` | **Snippet-into-page.** Same pattern as Brevo. |
| `sms-providers/sms-providers-snippet.md` | `kratos/emails-sms/10_sending-sms.mdx` | **Snippet-into-page.** Authored to be appended as per-vendor `### Twilio / ### MessageBird / …` sections to the existing SMS page. |
| `social-sign-in/github-app.mdx` | `kratos/social-signin/25_github.mdx` | **Adjacent, not duplicate.** Existing page covers GitHub OAuth App sign-in and has a one-line `:::info` admonition pointing at GitHub Apps but doesn't document the flow. The new page is the dedicated GitHub App walkthrough that admonition gestures at. |
