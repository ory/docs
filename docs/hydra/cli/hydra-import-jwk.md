---
id: hydra-import-jwk
title: hydra import jwk
description: hydra import jwk
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra import jwk

Imports JSON Web Keys from one or more JSON files.

### Synopsis

This command allows you to import JSON Web Keys from one or more JSON files or STDIN to the JSON Web Key Store.

Currently supported formats are raw JSON Web Keys or PEM/DER encoded data. If the JSON Web Key Set exists already,
the imported keys will be added to that set. Otherwise, a new set will be created.

```
hydra import jwk set-id file-1 [file-2] [file-n] [flags]
```

### Examples

```
hydra import jwk my-set ./path/to/jwk.json ./path/to/jwk-2.json --format json
hydra import jwk my-set ./path/to/rsa.key ./path/to/rsa.pub --use enc
```

### Options

```
      --alg string   Sets the "alg" value of the JSON Web Key if not "alg" value was defined by the key itself. Required when importing PEM/DER encoded data.
  -h, --help         help for jwk
      --use string   Sets the "use" value of the JSON Web Key if no "use" value was defined by the key itself. Required when importing PEM/DER encoded data. (default "sig")
```

### Options inherited from parent commands

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### See also

* [hydra import](hydra-import) Import resources

