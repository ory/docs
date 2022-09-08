---
id: oathkeeper-credentials-generate
title: oathkeeper credentials generate
description: oathkeeper credentials generate Generate a key for the specified algorithm
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## oathkeeper credentials generate

Generate a key for the specified algorithm

### Synopsis

Examples:

$ oathkeeper credentials generate --alg ES256 &gt; jwks.json
$ oathkeeper credentials generate --alg RS256 &gt; jwks.json
$ oathkeeper credentials generate --alg RS256 --bits 4096 &gt; jwks.json

```
oathkeeper credentials generate [flags]
```

### Options

```
      --alg string   Generate a key to be used for one of the following algorithms: [HS256 HS384 HS512 ES256 ES384 ES512 EdDSA RS256 RS384 RS512 PS256 PS384 PS512]
      --bits int     The key size in bits. If left empty will default to a secure value for the selected algorithm.
  -h, --help         help for generate
      --kid string   The JSON Web Key ID (kid) to be used. A random value will be used if left empty.
```

### Options inherited from parent commands

```
  -c, --config strings   Path to one or more .json, .yaml, .yml, .toml config files. Values are loaded in the order provided, meaning that the last config file overwrites values from the previous config file.
```

### SEE ALSO

* [oathkeeper credentials](oathkeeper-credentials)	 - Generate RSA, ECDSA, and other keys and output them as JSON Web Keys

