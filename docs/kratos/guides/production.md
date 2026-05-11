---
id: production
title: Go to production
---

Read this document to prepare for production when self-hosting Ory Kratos.  
Feel free to [open an issue or pull request](https://github.com/ory/docs/) when you have an idea how to improve this
documentation.

Read more about [deployment fundamentals and requirements for Ory](../../oss/deployment.mdx).

## Database

Ory Kratos requires a production-grade database such as PostgreSQL, MySQL, CockroachDB. Don't use SQLite in production!

## Security checklist

Before deploying to production, review and explicitly set the following security-critical configuration values. Do not rely on
defaults in a production environment.

When preparing for production it's paramount to omit the `--dev` flag from `kratos serve`.

### Secrets

Review the secrets section of the [Configuration](../reference/configuration.mdx).

Do not rely on the defaults in production, and set a custom secret value for `default`, `cookie`, `pagination` and `cipher`.
Generate a cryptographically secure random value, for example:

```sh
openssl rand -base64 32
```

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

### Filesystem sandbox (Ory Network / OEL)

Ory Network and Ory Enterprise License binaries activate a
[Landlock filesystem sandbox](../../security-compliance/landlock-sandbox.mdx) for `kratos serve` on Linux 5.13 and later. The
config files, TLS material, the courier template directory, the SQLite database directory, and every `file://` URI referenced in
the loaded configuration (identity schemas, OIDC mappers, web-hook bodies, courier templates, tokenizer JWKS files, and so on)
are auto-allowed at startup; every other path is denied by the kernel. If you depend on files the auto-discovery does not see —
for example a corporate CA bundle pointed to by `SSL_CERT_FILE`, a JSON Schema `$ref` fragment inside an identity schema body, or
a legacy config field that takes a bare path instead of a `file://` URI — list them under `security.landlock.allowed_paths`
before going to production.

## Scaling

There are no additional requirements for scaling Ory Kratos, just spin up another container!
