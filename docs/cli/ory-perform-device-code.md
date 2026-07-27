---
id: ory-perform-device-code
title: ory perform device-code
description: ory perform device-code
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory perform device-code

Example OAuth 2.0 Client performing the OAuth 2.0 Device Code Flow

### Synopsis

Performs the device code flow. Useful for getting an access token and an ID token in machines without a browser.
The client that will be used MUST use the "none" or "client_secret_post" token-endpoint-auth-method.

```
ory perform device-code [flags]
```

### Examples

```
ory perform device-code --client-id ...
```

### Options

```
      --audience strings                Request a specific OAuth 2.0 Access Token Audience
      --client-id string                Use the provided OAuth 2.0 Client ID, defaults to environment variable OAUTH2_CLIENT_ID
      --client-secret string            Use the provided OAuth 2.0 Client Secret, defaults to environment variable OAUTH2_CLIENT_SECRET
      --device-auth-url endpoint        Usually it is enough to specify the endpoint flag, but if you want to force the device authorization url, use this flag
  -e, --endpoint string                 The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string                   Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help                            help for device-code
  -p, --port urls.device.verification   Set this to a port number to start a local server that will serve the device authorization page. You need to configure Hydra's urls.device.verification to point to `http://127.0.0.1:<PORT>/device` in this mode. (default -1)
      --project string                  The project to use, either project ID or a (partial) slug.
  -q, --quiet                           Be quiet with output printing.
      --scope strings                   Request OAuth2 scope (default [offline,openid])
      --token-url endpoint              Usually it is enough to specify the endpoint flag, but if you want to force the token url, use this flag
      --workspace string                The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### See also

* [ory perform](ory-perform) Perform a flow

