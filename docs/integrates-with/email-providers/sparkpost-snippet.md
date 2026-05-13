# SparkPost — section snippet to append to sending-emails-smtp.mdx

> **Primary documentation:**
> [Sending emails via SMTP](../../kratos/emails-sms/01_sending-emails-smtp.mdx).
> This file is a draft `### SparkPost` section intended to be appended
> into that page (alphabetically). The Ory SMTP page is the source of
> truth for email courier configuration.

---

### SparkPost

[SparkPost](https://www.sparkpost.com) (a Bird/MessageBird company) —
enterprise-grade transactional email platform with per-region US / EU
hosting.

<Admonition type="note" title="Community-contributed integration">
Reference: [ory/integrates/email-providers/sparkpost](https://github.com/ory/integrates/tree/main/email-providers/sparkpost).
</Admonition>

<Tabs>
<TabItem value="smtp" label="SMTP" default>

Use the following connection URI:

```
# US
smtps://SMTP_Injection:<sparkpost-api-key>@smtp.sparkpostmail.com:587

# EU
smtps://SMTP_Injection:<sparkpost-api-key>@smtp.eu.sparkpost.com:587
```

The SMTP login is the literal string `SMTP_Injection` for all
customers. The password is your SparkPost API key with the
**Send via SMTP** permission.

</TabItem>
<TabItem value="http" label="HTTP">

Use SparkPost's
[Transmissions API](https://developers.sparkpost.com/api/transmissions/)
via Kratos's HTTP courier:

```yaml title="kratos.yml"
courier:
  delivery_strategy: http
  http:
    request_config:
      url: https://api.sparkpost.com/api/v1/transmissions    # or api.eu.sparkpost.com
      method: POST
      body: file:///etc/config/kratos/mail.template.jsonnet
      headers:
        "Authorization": "<sparkpost-api-key>"
        "Content-Type": "application/json"
```

</TabItem>
</Tabs>

SparkPost separates US and EU accounts — pick data residency before
integration; account migrations are not trivial.
