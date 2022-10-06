---
id: hydra-list-oauth2-clients
title: hydra list oauth2-clients
description: hydra list oauth2-clients List OAuth 2.0 Clients
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra list oauth2-clients

List OAuth 2.0 Clients

### Synopsis

This command list an OAuth 2.0 Clients.

```
hydra list oauth2-clients [flags]
```

### Examples

```
{{ .CommandPath }} --page-token eyJwYWdlIjoxfQ --page-size 10
```

### Options

```
  -h, --help                help for oauth2-clients
      --page-size int       maximum number of items to return (default 100)
      --page-token string   page token acquired from a previous response
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

* [hydra list](hydra-list)	 - List resources

