# Mailchimp Transactional — section snippet to append to sending-emails-smtp.mdx

> **Primary documentation:**
> [Mailchimp integration with Ory Actions](../../actions/integrations/mailchimp.mdx)
> covers Mailchimp Transactional (Mandrill) end-to-end;
> [Sending emails via SMTP](../../kratos/emails-sms/01_sending-emails-smtp.mdx)
> is the canonical SMTP courier configuration page. This file is a
> draft `### Mailchimp Transactional` section intended to be appended
> into the SMTP page; both linked pages take precedence over this
> snippet if they disagree.

---

### Mailchimp Transactional (Mandrill)

[Mailchimp Transactional](https://mailchimp.com/developer/transactional/)
(formerly Mandrill) — paid add-on to Mailchimp for transactional email.
Natural choice when Mailchimp marketing is already in place.

<Admonition type="note" title="Community-contributed integration">
Reference: [ory/integrates/email-providers/mailchimp-transactional](https://github.com/ory/integrates/tree/main/email-providers/mailchimp-transactional).
</Admonition>

Use the following connection URI:

```
smtps://apikey:<md-mandrill-api-key>@smtp.mandrillapp.com:465
```

The SMTP username can be any string (Mandrill ignores it but it must
be present — `apikey` is conventional). The password is your Mandrill
API key from
[mandrillapp.com → Settings → SMTP & API Info](https://mandrillapp.com/settings).

Mailchimp Transactional is **distinct from the Mailchimp marketing
audience integration** documented under
[actions/integrations/mailchimp](../../actions/integrations/mailchimp.mdx)
— that one adds users to a Mailchimp list at registration; this one
delivers transactional emails (verification, recovery, MFA).
