---
id: ory-patch-oauth2-config
title: ory patch oauth2-config
description: ory patch oauth2-config Patch the Ory OAuth2 & OpenID Connect configuration of the specified Ory Network project.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory patch oauth2-config

Patch the Ory OAuth2 & OpenID Connect configuration of the specified Ory Network project.

### Synopsis

Patch the Ory OAuth2 & OpenID Connect configuration of the specified Ory Network project. Only values
specified in the patch will be overwritten. To replace the config use the `update` command instead.

Compared to the `patch project` command, this command updates only the Ory OAuth2 & OpenID Connect 
configuration and returns configuration as a result. This command is useful when you want to import configuration 
from self-hosted Ory Hydra to Ory Network. Using this command allows for shorter paths when specifying the flags:

	ory patch oauth2-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
		--replace '/strategies/access_token="jwt"'

when compared to the `patch project` command:

	ory patch project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
		--replace '/strategies/access_token="jwt"'

The format of the patch is a JSON-Patch document. For more details please check:

	https://www.ory.sh/docs/reference/api#operation/patchProject
	https://jsonpatch.com

```
ory patch oauth2-config [project-id] [flags]
```

### Examples

```
$ ory patch oauth2-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--replace '/strategies/access_token="jwt"' \
	--add '/ttl/login_consent_request="1h"' \
	--remove '/strategies/scope' \
	--format json-pretty

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
      --add stringArray       Add a specific key to the configuration
  -f, --file strings          Configuration file(s) (file://config.json, https://example.org/config.yaml, ...) to update the project
      --format string         Set the output format. One of table, json, yaml, json-pretty, and jsonpath. (default "default")
  -h, --help                  help for oauth2-config
  -q, --quiet                 Be quiet with output printing.
      --remove stringArray    Remove a specific key from the configuration
      --replace stringArray   Replace a specific key in the configuration
  -y, --yes                   Confirm all dialogs with yes.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
```

### SEE ALSO

* [ory patch](ory-patch)	 - Patch resources

