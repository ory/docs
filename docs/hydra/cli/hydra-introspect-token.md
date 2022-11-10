---
id: hydra-introspect-token
title: hydra introspect token
description: hydra introspect token Introspect an OAuth 2.0 Access or Refresh Token
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra introspect token

Introspect an OAuth 2.0 Access or Refresh Token

```
hydra introspect token the-token [flags]
```

### Examples

```
{{ .CommandPath }} --client-id a0184d6c-b313-4e70-a0b9-905b581e9218 --client-secret Hh1BjioNNm ciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNT
```

### Options

```
  -h, --help            help for token
      --scope strings   Additionally check if the scope was granted.
```

### Options inherited from parent commands

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, and jsonpath. (default "default")
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### SEE ALSO

* [hydra introspect](hydra-introspect)	 - Introspect resources

