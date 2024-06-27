---
id: ory-update-oauth2-config
title: ory update oauth2-config
description: ory update oauth2-config Update the Ory OAuth2 & OpenID Connect configuration of an Ory Network project.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory update oauth2-config

Update the Ory OAuth2 & OpenID Connect configuration of an Ory Network project.

### Synopsis

Update the Ory OAuth2 & OpenID Connect configuration of an Ory Network project. All values
of the OAuth2 service will be overwritten. To update individual settings use the `patch` command instead.

Compared to the `update project` command, this command updates only the Ory OAuth2 & OpenID Connect
configuration and returns the configuration as a result. This command is useful when you want to import configuration
from self-hosted Ory Hydra to Ory Network.

The full configuration payload can be found at:

	https://www.ory.sh/docs/reference/api#operation/updateProject.

This command expects the contents of the `/services/oauth2/config` key, so for example:

    {
	  "namespaces": [
        {
          "name": "files",
          "id": 2
        },
        // ...
      ]
    }


```
ory update oauth2-config [flags]
```

### Examples

```
$ ory update oauth2-config --project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--file /path/to/config.json \
	--file /path/to/config.yml \
	--file https://example.org/config.yaml \
	--file base64://<json> \
	--format json

{
  "oauth2": {
    "pkce": {
      "enabled": true
    }
  },
  // ...
}

$ ory update oauth2-config --project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--file /path/to/keto-config.yaml \
    --format yaml

oauth2:
  pkce:
    enabled: true
# ...
```

### Options

```
  -f, --file strings       Configuration file(s) (file://config.json, https://example.org/config.yaml, ...) to update the oAuth2 config
      --format string      Set the output format. One of default, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help               help for oauth2-config
      --project string     The project to use, either project ID or a (partial) slug.
  -q, --quiet              Be quiet with output printing.
      --workspace string   The workspace to use, either workspace ID or a (partial) name.
  -y, --yes                Confirm all dialogs with yes.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
```

### SEE ALSO

* [ory update](ory-update)	 - Update resources

