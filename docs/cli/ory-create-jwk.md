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
{{ .CommandPath }} <my-jwk-set> --alg RS256 --use sig
```

### Options

```
      --alg string       The algorithm to be used to generated they key. Supports: RS256, RS512, ES256, ES512, EdDSA (default "RS256")
  -h, --help             help for jwk
      --project string   The project to use
      --use string       The intended use of this key. Supports: sig, enc (default "sig")
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory create](ory-create)	 - Create Ory Network resources

