# Brevo — section snippet to append to sending-emails-smtp.mdx

> **Primary documentation:**
> [Sending emails via SMTP](../../kratos/emails-sms/01_sending-emails-smtp.mdx).
> This file is a draft `### Brevo` section intended to be appended into
> that page (alphabetically, between the existing per-vendor sections).
> The Ory SMTP page is the source of truth for email courier
> configuration.
>
> **How to use this snippet**: paste the section below into
> `docs/kratos/emails-sms/01_sending-emails-smtp.mdx`. The page already
> imports `Tabs` etc.; no extra imports needed.

---

### Brevo

[Brevo](https://www.brevo.com) (formerly Sendinblue) — European email
platform with strong GDPR posture; common when EU-hosted email
infrastructure is required.

<Admonition type="note" title="Community-contributed integration">
Reference: [ory/integrates/email-providers/brevo](https://github.com/ory/integrates/tree/main/email-providers/brevo).
</Admonition>

<Tabs>
<TabItem value="smtp" label="SMTP" default>

Use the following connection URI to
[send emails using Brevo](https://help.brevo.com/hc/en-us/articles/209462765)
via SMTP relay:

```
smtps://<brevo-smtp-login>:<brevo-smtp-key>@smtp-relay.brevo.com:587
```

The SMTP login is your Brevo account email. The SMTP key is generated
under **Brevo → SMTP & API → SMTP** (distinct from Brevo API keys).

</TabItem>
<TabItem value="http" label="HTTP">

Use Brevo's
[Transactional Email API](https://developers.brevo.com/reference/sendtransacemail)
via Kratos's HTTP courier:

```yaml title="kratos.yml"
courier:
  delivery_strategy: http
  http:
    request_config:
      url: https://api.brevo.com/v3/smtp/email
      method: POST
      body: file:///etc/config/kratos/mail.template.jsonnet
      headers:
        "api-key": "<your-brevo-api-key>"
        "content-type": "application/json"
```

</TabItem>
</Tabs>

To configure Brevo as your email provider, go to <ConsoleLink route="project.emailConfiguration" />.
