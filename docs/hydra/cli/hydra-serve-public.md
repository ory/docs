---
id: hydra-serve-public
title: hydra serve public
description: hydra serve public
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## hydra serve public

Serves Public HTTP/2 APIs

### Synopsis

This command opens one port and listens to HTTP/2 API requests. The exposed API handles requests coming from
the public internet, like OAuth 2.0 Authorization and Token requests, OpenID Connect UserInfo, OAuth 2.0 Token Revokation,
and OpenID Connect Discovery.

This command is configurable using the same options available to "serve admin" and "serve all".

It is generally recommended to use this command only if you require granular control over the privileged and public APIs.
For example, you might want to run different TLS certificates or CORS settings on the public and privileged API.

This command does not work with the "memory" database. Both services (privileged, public) MUST use the same database
connection to be able to synchronize.

## Configuration

Ory Hydra can be configured using environment variables as well as a configuration file. For more information
on configuration options, open the configuration documentation:

>> https://www.ory.sh/hydra/docs/reference/configuration <<


```
hydra serve public [flags]
```

### Options

```
  -h, --help   help for public
```

### Options inherited from parent commands

```
  -c, --config strings   Path to one or more .json, .yaml, .yml, .toml config files. Values are loaded in the order provided, meaning that the last config file overwrites values from the previous config file.
      --dev              Disables critical security checks to improve local development experience. Do not use in production.
      --sqa-opt-out      Disable anonymized telemetry reports - for more information please visit https://www.ory.sh/docs/ecosystem/sqa
```

### See also

* [hydra serve](hydra-serve) Parent command for starting public and administrative HTTP/2 APIs

