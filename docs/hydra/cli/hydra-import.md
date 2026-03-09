---
id: hydra-import
title: hydra import
description: hydra import
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra import

Import resources

### Options

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help              help for import
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### See also

* [hydra](hydra) Run and manage Ory Hydra
* [hydra import jwk](hydra-import-jwk)	 - Imports JSON Web Keys from one or more JSON files.
* [hydra import oauth2-client](hydra-import-oauth2-client)	 - Import one or more OAuth 2.0 Clients from files or STDIN

