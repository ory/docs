---
id: hydra-delete-jwk
title: hydra delete jwk
description: hydra delete jwk Delete one or more JSON Web Key Sets by their set ID
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra delete jwk

Delete one or more JSON Web Key Sets by their set ID

### Synopsis

This command deletes one or more JSON Web Key Sets by their respective set IDs.

```
hydra delete jwk <id-1> [<id-2> ...] [flags]
```

### Examples

```
{{ .CommandPath }} <set-1> <set-2> <set-3>
```

### Options

```
  -h, --help   help for jwk
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

* [hydra delete](hydra-delete)	 - Delete resources

