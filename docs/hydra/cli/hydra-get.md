---
id: hydra-get
title: hydra get
description: hydra get Get resources
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra get

Get resources

### Options

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, and json-pretty. (default "default")
  -h, --help              help for get
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### SEE ALSO

* [hydra](hydra)	 - Run and manage Ory Hydra
* [hydra get jwks](hydra-get-jwks)	 - Get a JSON Web Key Set by its ID(s)
* [hydra get oauth2-client](hydra-get-oauth2-client)	 - Get one or more OAuth 2.0 Clients by their ID(s)

