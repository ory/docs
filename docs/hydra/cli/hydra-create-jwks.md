---
id: hydra-create-jwks
title: hydra create jwks
description: hydra create jwks Create a JSON Web Key Set with a JSON Web Key
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra create jwks

Create a JSON Web Key Set with a JSON Web Key

```
hydra create jwks set-id [key-id] [flags]
```

### Examples

```
hydra createjwks my-jwk-set --alg RS256 --use sig
```

### Options

```
      --alg string   The algorithm to be used to generated they key. Supports: RS256, RS512, ES256, ES512, EdDSA (default "RS256")
  -h, --help         help for jwks
      --use string   The intended use of this key. Supports: sig, enc (default "sig")
```

### Options inherited from parent commands

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, and json-pretty. (default "default")
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### SEE ALSO

* [hydra create](hydra-create)	 - Create resources

