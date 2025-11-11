---
id: hydra-perform-device-code
title: hydra perform device-code
description: hydra perform device-code
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra perform device-code

An exemplary OAuth 2.0 Client performing the OAuth 2.0 Device Code Flow

### Synopsis

Performs the device code flow. Useful for getting an access token and an ID token in machines without a browser.
The client that will be used MUST use the "none" or "client_secret_post" token-endpoint-auth-method.

```
hydra perform device-code [flags]
```

### Examples

```
hydra perform device-code --client-id ...
```

### Options

```
      --audience strings           Request a specific OAuth 2.0 Access Token Audience
      --client-id string           Use the provided OAuth 2.0 Client ID, defaults to environment variable OAUTH2_CLIENT_ID
      --client-secret string       Use the provided OAuth 2.0 Client Secret, defaults to environment variable OAUTH2_CLIENT_SECRET
      --device-auth-url endpoint   Usually it is enough to specify the endpoint flag, but if you want to force the device authorization url, use this flag
  -h, --help                       help for device-code
      --scope strings              Request OAuth2 scope (default [offline,openid])
      --token-url endpoint         Usually it is enough to specify the endpoint flag, but if you want to force the token url, use this flag
```

### Options inherited from parent commands

```
  -e, --endpoint string   The API URL this command should target. Alternatively set using the ORY_SDK_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -H, --http-header :     A list of additional HTTP headers to set. HTTP headers is separated by a : , for example: `-H 'Authorization: bearer some-token'`.
  -q, --quiet             Be quiet with output printing.
      --skip-tls-verify   Do not verify TLS certificates. Useful when dealing with self-signed certificates. Do not use in production!
```

### See also

* [hydra perform](hydra-perform) Perform OAuth 2.0 Flows

