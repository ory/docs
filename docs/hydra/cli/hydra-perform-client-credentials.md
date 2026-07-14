---
id: hydra-perform-client-credentials
title: hydra perform client-credentials
description: hydra perform client-credentials
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra perform client-credentials

Perform the OAuth2 Client Credentials Flow

### Synopsis

Performs the OAuth 2.0 Client Credentials Flow. Useful to exchange a client_id and client_secret for an access_token.
using the CLI.

```
hydra perform client-credentials [flags]
```

### Examples

```
hydra perform client-credentials --client-id ... --client-secret
```

### Options

```
      --audience strings       Request a specific OAuth 2.0 Access Token Audience.
      --client-id string       Use the provided OAuth 2.0 Client ID, defaults to environment variable OAUTH2_CLIENT_ID.
      --client-secret string   Use the provided OAuth 2.0 Client Secret, defaults to environment variable OAUTH2_CLIENT_SECRET.
  -h, --help                   help for client-credentials
      --scope strings          OAuth2 scope to request.
```

### Options inherited from parent commands

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### See also

* [hydra perform](hydra-perform) Perform OAuth 2.0 Flows

