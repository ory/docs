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

High-performance multi-network API key service

### Synopsis

API Key Service is a high-performance, multi-network service for managing API keys with support for JWT tokens, JWKS, and various
cryptographic algorithms.

It provides both admin plane and data plane APIs for comprehensive key management.

### Options

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
  -h, --help              help for talos
```

### See also

- [talos jwk](talos-jwk) - Generate JSON Web Keys (JWK/JWKS)
- [talos keys](talos-keys) - Manage API keys
- [talos migrate](talos-migrate) - Database migration tools
- [talos proxy](talos-proxy) - Start the edge proxy (commercial edition only)
- [talos serve](talos-serve) - Start the Ory Talos server (all-in-one mode)
