---
id: talos-jwk-generate
title: talos jwk generate
description: talos jwk generate
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## talos jwk generate

Generate a new JWK key

### Synopsis

Generate a new cryptographic key in JWK format for signing or encryption.

### Options

```
  -h, --help   help for generate
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

* [talos jwk](talos-jwk.md) Generate JSON Web Keys (JWK/JWKS)
* [talos jwk generate ecdsa](talos-jwk-generate-ecdsa.md)	 - Generate an ECDSA key pair
* [talos jwk generate eddsa](talos-jwk-generate-eddsa.md)	 - Generate an EdDSA (Ed25519) key pair
* [talos jwk generate hmac](talos-jwk-generate-hmac.md)	 - Generate an HMAC secret key
* [talos jwk generate rsa](talos-jwk-generate-rsa.md)	 - Generate an RSA key pair

