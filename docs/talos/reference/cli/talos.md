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

Multi-network API key service

### Synopsis

API Key Service is a multi-network service for managing API keys, with support for JWT tokens, JWKS, and several cryptographic
algorithms.

It provides separate admin and public APIs for key management.

### Options

```
      --config string     path to a config file (without it, only schema defaults and TALOS_-prefixed env vars apply)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
  -h, --help              help for talos
```

### See also

- [talos jwk](talos-jwk.md) - Generate JSON Web Keys (JWK/JWKS)
- [talos keys](talos-keys.md) - Manage API keys
- [talos migrate](talos-migrate.md) - Database migration tools
- [talos proxy](talos-proxy.md) - Start the edge proxy for caching verification requests (commercial edition)
- [talos serve](talos-serve.md) - Start the Ory Talos server (all-in-one mode)
