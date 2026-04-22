---
id: talos-jwk-generate-hmac
title: talos jwk generate hmac
description: talos jwk generate hmac
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos jwk generate hmac

Generate an HMAC secret key

### Synopsis

Generate a symmetric HMAC secret key. Default size is 512 bits. Minimum is 256 bits. Algorithm is determined by key size:
256→HS256, 384→HS384, ≥512→HS512.

```
talos jwk generate hmac [flags]
```

### Examples

```
  # Generate 512-bit HMAC secret (default)
  talos jwk generate hmac -o hmac-secret.json

  # Generate 256-bit HMAC secret
  talos jwk generate hmac --bits 256 -o hmac-256.json

  # Generate with custom key ID
  talos jwk generate hmac --kid signing-secret-1 -o hmac-key.json
```

### Options

```
      --bits int        Key size in bits (default 512, minimum 256) (default 512)
  -h, --help            help for hmac
      --jwks            Output as JWKS (JSON Web Key Set)
      --kid string      Key ID (JWK Thumbprint used if not provided)
  -o, --output string   Output file (writes to stdout if not specified)
      --use string      Key usage: 'sig' for signing, 'enc' for encryption (default: sig)
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos jwk generate](talos-jwk-generate) Generate a new JWK key
