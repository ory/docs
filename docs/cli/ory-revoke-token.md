---
id: ory-revoke-token
title: ory revoke token
description: ory revoke token Revoke an access or refresh token
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory revoke token

Revoke an access or refresh token

```
ory revoke token the-token [flags]
```

### Examples

```
ory revoke token --client-id a0184d6c-b313-4e70-a0b9-905b581e9218 --client-secret Hh1BjioNNm ciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNT
```

### Options

```
      --client-id string       Use the provided OAuth 2.0 Client ID, defaults to environment variable OAUTH2_CLIENT_ID
      --client-secret string   Use the provided OAuth 2.0 Client Secret, defaults to environment variable OAUTH2_CLIENT_SECRET
  -e, --endpoint string        The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string          Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help                   help for token
      --project string         The project to use, either project ID or a (partial) slug.
  -q, --quiet                  Be quiet with output printing.
      --workspace string       The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### SEE ALSO

* [ory revoke](ory-revoke)	 - Revoke resources

