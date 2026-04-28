---
id: talos
title: talos
description: talos
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos

Multi-tenant API key management service

### Synopsis

Ory Talos manages the full lifecycle of API credentials: issuing keys, verifying them at low latency, deriving short-lived JWT or
macaroon tokens, and revoking access. It exposes a separate admin plane (issue, rotate, revoke, derive) and data plane (verify,
self-revoke) so each can be scaled and secured independently.

### Options

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
  -h, --help              help for talos
```

### See also

- [talos jwk](talos-jwk.md) - Generate JSON Web Keys (JWK/JWKS)
- [talos keys](talos-keys.md) - Manage API keys
- [talos migrate](talos-migrate.md) - Database migration tools
- [talos proxy](talos-proxy.md) - Start the edge proxy for caching verification requests
- [talos serve](talos-serve.md) - Start the Ory Talos server (all-in-one mode)
