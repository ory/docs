---
id: ory-update-identity-config
title: ory update identity-config
description: ory update identity-config Update Ory Cloud Project's Identity Service Configuration
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory update identity-config

Update Ory Cloud Project's Identity Service Configuration

### Synopsis

Use this command to replace your current Ory Cloud Project&#39;s identity service configuration. All values
of the identity service will be overwritten. To update individual settings use the `patch` command instead.

Compared to the `update project` command, this command only updates the identity service configuration
and also only returns the identity service configuration as a result. This command is useful when you want to
import an Ory Kratos config as well, for example.

The full configuration payload can be found at:

	https://www.ory.sh/docs/reference/api#operation/updateProject.

This command expects the contents of the `/services/identity/config` key, so for example:

	{
	  &#34;courier&#34;: {
		&#34;smtp&#34;: {
		  &#34;from_name&#34;: &#34;...&#34;
		}
		// ...
	  }
	}


```
ory update identity-config project-id [flags]
```

### Examples

```
$ ory update identity-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--name \"my updated name\" \
	--file /path/to/config.json \
	--file /path/to/config.yml \
	--file https://example.org/config.yaml \
	--file base64://<json> \
	--format json

{
  "courier": {
	"smtp": {
	  "from_name": "..."
	}
	// ...
  }
}

$ ory update kratos-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--name \"my updated name\" \
	--file /path/to/kratos-config.yaml \
    --format yaml

courier:
  smtp:
    # ...
```

### Options

```
  -f, --file strings    Configuration file(s) (file://config.json, https://example.org/config.yaml, ...) to update the project
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -h, --help            help for identity-config
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
```

### SEE ALSO

* [ory update](ory-update)	 - Update resources

