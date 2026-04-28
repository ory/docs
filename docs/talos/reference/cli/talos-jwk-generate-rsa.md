---
id: talos-jwk-generate-rsa
title: talos jwk generate rsa
description: talos jwk generate rsa
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## talos jwk generate rsa

Generate an RSA key pair

### Synopsis

Generate an RSA key pair with the specified key size.
Default is 2048 bits. Minimum is 2048 bits.

```
talos jwk generate rsa [flags]
```

### Examples

```
  # Generate RSA key (default: 2048 bits)
  talos jwk generate rsa -o rsa-key.json

  # Generate 4096-bit RSA key
  talos jwk generate rsa --bits 4096 -o rsa-4096.json

  # Generate with custom algorithm
  talos jwk generate rsa --alg RS512 -o rsa-rs512.json

  # Generate public key only
  talos jwk generate rsa --public-only -o rsa-public.json
```

### Options

```
      --alg string      Algorithm override (e.g. RS384, RS512, PS256)
      --bits int        Key size in bits (minimum 2048) (default 2048)
  -h, --help            help for rsa
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

