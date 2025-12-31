---
id: production
title: Go to production
---

Read this document to prepare for production when self-hosting Ory Kratos.  
Feel free to [open an issue or pull request](https://github.com/ory/docs/) when you have an idea how to improve this
documentation.

Read more about [deployment fundamentals and requirements for Ory](../../oss/deployment).

## Database

Ory Kratos requires a production-grade database such as PostgreSQL, MySQL, CockroachDB. Don't use SQLite in production!

## Security

When preparing for production it's paramount to omit the `--dev` flag from `kratos serve`.

### HTTP clients

In some scenarios you might want to disallow HTTP calls to private IP ranges. To configure this feature, set the following
configuration:

```yaml
clients:
  http:
    disallow_private_ip_ranges: true
```

If enabled, all outgoing HTTP calls done by Ory Kratos will be checked whether they're against a private IP range. If that's the
case, the request will fail with an error.

### Admin API

Never expose the Ory Kratos Admin API to the internet unsecured. Always require authorization. A good practice is to not expose
the Admin API at all to the public internet and use a Zero Trust Networking Architecture within your intranet.

## Scaling

There are no additional requirements for scaling Ory Kratos, just spin up another container!
