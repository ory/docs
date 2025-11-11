---
id: hydra-perform-authorization-code
title: hydra perform authorization-code
description: hydra perform authorization-code
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra perform authorization-code

Example OAuth 2.0 Client performing the OAuth 2.0 Authorize Code Flow

### Synopsis

Starts an example web server that acts as an OAuth 2.0 Client performing the Authorize Code Flow.
This command will help you to see if Ory Hydra has been configured properly.

This command must not be used for anything else than manual testing or demo purposes. The server will terminate on error
and success, unless if the --no-shutdown flag is provided.

```
hydra perform authorization-code [flags]
```

### Examples

```
hydra perform authorization-code --client-id ... --client-secret ...
```

### Options

```
      --audience strings       Request a specific OAuth 2.0 Access Token Audience
      --auth-url endpoint      Usually it is enough to specify the endpoint flag, but if you want to force the authorization url, use this flag
      --client-id string       Use the provided OAuth 2.0 Client ID, defaults to environment variable OAUTH2_CLIENT_ID
      --client-secret string   Use the provided OAuth 2.0 Client Secret, defaults to environment variable OAUTH2_CLIENT_SECRET
  -h, --help                   help for authorization-code
      --https                  Sets up HTTPS for the endpoint using a self-signed certificate which is re-generated every time you start this command
      --max-age int            Set the OpenID Connect max_age parameter. -1 means no max_age parameter will be used. (default -1)
      --no-open                Do not open the browser window automatically
      --no-shutdown            Do not terminate on success/error. State and nonce will be regenerated when auth flow has completed (either due to an error or success).
  -p, --port int               The port on which the server should run (default 4446)
      --prompt strings         Set the OpenID Connect prompt parameter
      --redirect string        Force a redirect url
      --response-mode string   Set the response mode. Can be query (default) or form_post.
      --scope strings          Request OAuth2 scope (default [offline,openid])
      --skip                   Skip login and/or consent steps if possible. Only effective if you have configured the Login and Consent UI URLs to point to this server.
      --state string           Force a state value (insecure)
      --token-url endpoint     Usually it is enough to specify the endpoint flag, but if you want to force the token url, use this flag
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

