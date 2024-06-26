---
id: ory-get-oauth2-config
title: ory get oauth2-config
description: ory get oauth2-config Get Ory OAuth2 & OpenID Connect configuration.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory get oauth2-config

Get Ory OAuth2 & OpenID Connect configuration.

### Synopsis

Get the Ory OAuth2 & OpenID Connect configuration for an Ory Network project.

```
ory get oauth2-config [flags]
```

### Examples

```
$ ory get oauth2-config --project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 --format yaml > oauth2-config.yaml

$ ory get oauth2-config --format json   # uses currently selected project

{
  "oauth2": {
    "client_credentials": {
      "default_grant_allowed_scope": false
    },
    "expose_internal_errors": true,
    "grant": {
      "jwt": {
        "iat_optional": false,
        "jti_optional": false,
        "max_ttl": "720h0m0s"
      }
    }
  },
  // ...
}
```

### Options

```
      --format string      Set the output format. One of default, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help               help for oauth2-config
      --project string     The project to use, either project ID or a (partial) slug.
      --workspace string   The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory get](ory-get)	 - Get a resource

