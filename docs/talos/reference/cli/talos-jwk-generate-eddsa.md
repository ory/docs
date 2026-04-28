---
id: talos-jwk-generate-eddsa
title: talos jwk generate eddsa
description: talos jwk generate eddsa
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## talos jwk generate eddsa

Generate an EdDSA (Ed25519) key pair

### Synopsis

Generate an EdDSA key pair using the Ed25519 curve.
Ed25519 uses a fixed 256-bit key size.

```
talos jwk generate eddsa [flags]
```

### Examples

```
  # Generate with auto-generated key ID
  talos jwk generate eddsa -o signing-key.json

  # Generate with custom key ID
  talos jwk generate eddsa --kid prod-key-1 -o signing-key.json

  # Generate public key only
  talos jwk generate eddsa --public-only -o public-key.json

  # Generate as JWKS format
  talos jwk generate eddsa --jwks -o keys.jwks.json
```

### Options

```
  -h, --help            help for eddsa
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

