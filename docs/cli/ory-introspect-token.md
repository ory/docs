---
id: ory-introspect-token
title: ory introspect token
description: ory introspect token Introspect an OAuth 2.0 Access or Refresh Token
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory introspect token

Introspect an OAuth 2.0 Access or Refresh Token

```
ory introspect token the-token [flags]
```

### Examples

```
{{ .CommandPath }} --client-id a0184d6c-b313-4e70-a0b9-905b581e9218 --client-secret Hh1BjioNNm ciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNT
```

### Options

```
  -h, --help             help for token
      --project string   The project to use
      --scope strings    Additionally check if the scope was granted.
```

### Options inherited from parent commands

```
  -c, --config string     Path to the Ory Cloud configuration file.
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, and json-pretty. (default "default")
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
  -y, --yes               Confirm all dialogs with yes.
```

### SEE ALSO

* [ory introspect](ory-introspect)	 - Introspect resources

