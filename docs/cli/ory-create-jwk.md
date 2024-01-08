---
id: ory-create-jwk
title: ory create jwk
description: ory create jwk Create a JSON Web Key Set with a JSON Web Key
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory create jwk

Create a JSON Web Key Set with a JSON Web Key

```
ory create jwk <set-id> [<key-id>] [flags]
```

### Examples

```
ory create jwk <my-jwk-set> --alg RS256 --use sig
```

### Options

```
      --alg string        The algorithm to be used to generated they key. Supports: RS256, RS512, ES256, ES512, EdDSA (default "RS256")
  -e, --endpoint string   The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help              help for jwk
      --project string    The project to use, either project ID or a (partial) slug.
      --public            Only return public keys
  -q, --quiet             Be quiet with output printing.
      --use string        The intended use of this key. Supports: sig, enc (default "sig")
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory create](ory-create)	 - Create Ory Network resources

