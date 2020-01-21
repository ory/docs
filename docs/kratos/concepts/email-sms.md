---
id: email-sms
title: Notifications via E-Mail and SMS
---

ORY Kratos sends out-of-band messages via SMS or E-Mail. These messages are required for several use cases:

- Sending an account activation email
- Verifying an E-Mail Address or Mobile Phone Number via SMS
- Sending a 2FA SMS
- ...

## Sending E-Mails via SMTP

To get ORY Kratos running, you must set up an SMTP server. This can be done in the configuration file using an absolute
URL with the `smtp` schema:

```yaml
courier:
  smtp:
    connection_uri: smtp://test:test@my-smtp-server:1025/
```

### Templates

A future version of ORY Kratos will allow you to define your own E-Mail messages using the Go Template engine extended
by [sprig's template functions](http://masterminds.github.io/sprig/). It will be possible to internationalize these
templates.

## Sending SMS

Sending SMS is currently not supported but will be supported in a future version of ORY Kratos.
