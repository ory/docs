---
id: hydra-delete
title: hydra delete
description: hydra delete
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra delete

Delete resources

### Options

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help              help for delete
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### See also

* [hydra](hydra) Run and manage Ory Hydra
* [hydra delete access-tokens](hydra-delete-access-tokens)	 - Delete all OAuth2 Access Tokens of an OAuth2 Client
* [hydra delete jwk](hydra-delete-jwk)	 - Delete one or more JSON Web Key Sets by their set ID
* [hydra delete oauth2-client](hydra-delete-oauth2-client)	 - Delete one or more OAuth 2.0 Clients by their ID(s)

