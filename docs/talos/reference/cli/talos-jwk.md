---
id: talos-jwk
title: talos jwk
description: talos jwk
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos jwk

Generate JSON Web Keys (JWK/JWKS)

### Synopsis

Generate cryptographic keys in JSON Web Key (JWK) format. Supports EdDSA (Ed25519), ECDSA (P-256, P-384, P-521), RSA, and HMAC
algorithms.

### Options

```
  -h, --help   help for jwk
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos](talos.md) Multi-tenant API key management service
- [talos jwk generate](talos-jwk-generate.md) - Generate a new JWK key
- [talos jwk get](talos-jwk-get.md) - Fetch the server's JSON Web Key Set (JWKS)
