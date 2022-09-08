---
id: hydra-import
title: hydra import
description: hydra import Import resources
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
      --format string     Set the output format. One of table, json, yaml, and json-pretty. (default "default")
  -h, --help              help for import
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### SEE ALSO

* [hydra](hydra)	 - Run and manage Ory Hydra
* [hydra import client](hydra-import-client)	 - Import OAuth 2.0 Clients from files or STDIN
* [hydra import jwk](hydra-import-jwk)	 - Imports JSON Web Keys from one or more JSON files.

