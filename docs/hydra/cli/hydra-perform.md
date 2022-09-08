---
id: hydra-perform
title: hydra perform
description: hydra perform Perform OAuth 2.0 Flows
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra perform

Perform OAuth 2.0 Flows

### Options

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, and json-pretty. (default "default")
  -h, --help              help for perform
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### SEE ALSO

* [hydra](hydra)	 - Run and manage Ory Hydra
* [hydra perform authorization-code](hydra-perform-authorization-code)	 - An exemplary OAuth 2.0 Client performing the OAuth 2.0 Authorize Code Flow
* [hydra perform client-credentials](hydra-perform-client-credentials)	 - Perform the OAuth2 Client Credentials Flow

