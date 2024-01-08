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
ory introspect token AYjcyMzY3ZDhiNmJkNTY --project 32197be3-8e57-4009-becd-9d38dbde129c
```

### Options

```
  -e, --endpoint string   The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help              help for token
      --project string    The project to use, either project ID or a (partial) slug.
  -q, --quiet             Be quiet with output printing.
      --scope strings     Additionally check if the scope was granted.
```

### Options inherited from parent commands

```
  -c, --config string     Path to the Ory Network configuration file.
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
  -y, --yes               Confirm all dialogs with yes.
```

### SEE ALSO

* [ory introspect](ory-introspect)	 - Introspect resources

