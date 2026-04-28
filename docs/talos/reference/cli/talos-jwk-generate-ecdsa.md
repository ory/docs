---
id: talos-jwk-generate-ecdsa
title: talos jwk generate ecdsa
description: talos jwk generate ecdsa
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## talos jwk generate ecdsa

Generate an ECDSA key pair

### Synopsis

Generate an ECDSA key pair using the specified elliptic curve.
Key size is determined by the curve: P-256 (256-bit), P-384 (384-bit), P-521 (521-bit).
Default curve: P-256.

```
talos jwk generate ecdsa [flags]
```

### Examples

```
  # Generate P-256 key (default)
  talos jwk generate ecdsa -o ecdsa-key.json

  # Generate P-384 key with custom key ID
  talos jwk generate ecdsa --curve P-384 --kid prod-ec-key -o ecdsa-p384.json

  # Generate P-521 key
  talos jwk generate ecdsa --curve P-521 -o ecdsa-p521.json
```

### Options

```
      --curve string    Elliptic curve (P-256, P-384, P-521) (default "P-256")
  -h, --help            help for ecdsa
      --jwks            Output as JWKS (JSON Web Key Set)
      --kid string      Key ID (JWK Thumbprint used if not provided)
  -o, --output string   Output file (writes to stdout if not specified)
      --public-only     Output public key only
      --use string      Key usage: 'sig' for signing, 'enc' for encryption (default: sig)
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

* [talos jwk generate](talos-jwk-generate.md) Generate a new JWK key

