# SMS providers — section snippets for sending-sms.mdx

> **Primary documentation:**
> [Sending SMS](../../kratos/emails-sms/10_sending-sms.mdx). This file
> is a collection of draft per-vendor `### Vendor` sections intended
> to be appended into that page (it currently uses Twilio as the only
> example and has no per-vendor sections). The Ory SMS page is the
> source of truth for SMS courier configuration; if anything below
> disagrees with the live SMS docs, defer to those.

---

### Twilio

Already used as the canonical example in this page — values reproduced
here for cross-vendor comparison:

```yaml
url: https://api.twilio.com/2010-04-01/Accounts/{$ACCOUNT_SID}/Messages.json
method: POST
headers:
  Content-Type: application/x-www-form-urlencoded   # required — Twilio rejects JSON
auth:
  type: basic_auth
  config:
    user: {$ACCOUNT_SID}
    password: {$AUTH_TOKEN}
```

Reference: [ory/integrates/sms-providers/twilio](https://github.com/ory/integrates/tree/main/sms-providers/twilio).

---

### MessageBird (Bird)

```yaml
url: https://rest.messagebird.com/messages
method: POST
headers:
  Content-Type: application/json
  Authorization: AccessKey {$MESSAGEBIRD_API_KEY}
```

Body Jsonnet must strip the leading `+` from Ory's E.164 recipient
(MessageBird expects MSISDN format):

```jsonnet
function(ctx) {
  body: std.manifestJsonEx({
    originator: 'YourApp',
    recipients: [
      if std.startsWith(ctx.recipient, '+')
      then std.substr(ctx.recipient, 1, std.length(ctx.recipient) - 1)
      else ctx.recipient,
    ],
    body: ctx.body,
  }, '  '),
}
```

Reference: [ory/integrates/sms-providers/messagebird](https://github.com/ory/integrates/tree/main/sms-providers/messagebird).

---

### Plivo

```yaml
url: https://api.plivo.com/v1/Account/{$AUTH_ID}/Message/
method: POST
headers:
  Content-Type: application/json
auth:
  type: basic_auth
  config:
    user: {$AUTH_ID}
    password: {$AUTH_TOKEN}
```

Plivo accepts E.164 directly (no `+` stripping). For production, use a
**Powerpack** (number pool with intelligent routing) — replace `src`
with `powerpack_uuid` in the Jsonnet body.

Reference: [ory/integrates/sms-providers/plivo](https://github.com/ory/integrates/tree/main/sms-providers/plivo).

---

### Sinch

```yaml
# US stack
url: https://us.sms.api.sinch.com/xms/v1/<service-plan-id>/batches
# EU stack
# url: https://eu.sms.api.sinch.com/xms/v1/<service-plan-id>/batches
method: POST
headers:
  authorization: Bearer {$SINCH_API_TOKEN}
  content-type: application/json
```

Sinch enforces per-country sender registration — using the wrong
sender for a region silently degrades delivery.

Reference: [ory/integrates/sms-providers/sinch](https://github.com/ory/integrates/tree/main/sms-providers/sinch).

---

### Vonage (Nexmo)

```yaml
url: https://rest.nexmo.com/sms/json
method: POST
headers:
  Content-Type: application/json
# No `auth:` block — Vonage authenticates via API key + secret in the
# request BODY, not headers.
```

Body Jsonnet:

```jsonnet
function(ctx) {
  body: std.manifestJsonEx({
    api_key: '{$VONAGE_API_KEY}',
    api_secret: '{$VONAGE_API_SECRET}',
    from: 'YourApp',
    to: ctx.recipient,
    text: ctx.body,
  }, '  '),
}
```

Vonage accepts E.164 with or without the leading `+`; strip the `+` in
Jsonnet if a country rejects the `+` form.

Reference: [ory/integrates/sms-providers/vonage](https://github.com/ory/integrates/tree/main/sms-providers/vonage).

---

### WhatsApp Business

WhatsApp doesn't provide a standard OAuth flow — "WhatsApp login" in
practice means **passwordless OTP delivered through WhatsApp**. This is
a courier-spi variant — see
[ory/integrates/sms-providers/whatsapp](https://github.com/ory/integrates/tree/main/sms-providers/whatsapp)
for the full webhook-handler-based pattern (Kratos courier posts to a
custom handler which forwards to WhatsApp Cloud API as an
authentication-template message).

Configuration requires:
- Meta Business Manager with WhatsApp Business enabled.
- A pre-approved AUTHENTICATION-category template (Meta review
  required — typically under an hour).
- A WhatsApp Business phone number ID + system-user permanent access
  token.

WhatsApp courier is configured under `courier.channels` rather than
`courier.sms` because it requires the custom handler.

Reference: [ory/integrates/sms-providers/whatsapp](https://github.com/ory/integrates/tree/main/sms-providers/whatsapp).
