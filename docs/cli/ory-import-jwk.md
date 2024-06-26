---
id: ory-import-jwk
title: ory import jwk
description: ory import jwk Imports JSON Web Keys from one or more JSON files.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory import jwk

Imports JSON Web Keys from one or more JSON files.

### Synopsis

This command allows you to import JSON Web Keys from one or more JSON files or STDIN to the JSON Web Key Store.

Currently supported formats are raw JSON Web Keys or PEM/DER encoded data. If the JSON Web Key Set exists already,
the imported keys will be added to that set. Otherwise, a new set will be created.

```
ory import jwk set-id file-1 [file-2] [file-n] [flags]
```

### Examples

```
ory import jwk my-set ./path/to/jwk.json ./path/to/jwk-2.json --format json
ory import jwk my-set ./path/to/rsa.key ./path/to/rsa.pub --use enc
```

### Options

```
      --alg string         Sets the "alg" value of the JSON Web Key if not "alg" value was defined by the key itself. Required when importing PEM/DER encoded data.
  -e, --endpoint string    The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string      Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help               help for jwk
      --project string     The project to use, either project ID or a (partial) slug.
  -q, --quiet              Be quiet with output printing.
      --use string         Sets the "use" value of the JSON Web Key if no "use" value was defined by the key itself. Required when importing PEM/DER encoded data. (default "sig")
      --workspace string   The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory import](ory-import)	 - Import resources

