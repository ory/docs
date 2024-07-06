---
id: ory-update-identity-config
title: ory update identity-config
description: ory update identity-config Update the Ory Identities configuration of an Ory Network project.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory update identity-config

Update the Ory Identities configuration of an Ory Network project.

### Synopsis

Update the Ory Identities configuration of an Ory Network project. All values
will be overwritten. To update individual settings use the `patch` command instead.

Compared to the `update project` command, this command updates only the Ory Identities configuration
and returns the configuration as a result. This command is useful when you want to import configuration from
self-hosted Ory Kratos to Ory Network.

The full configuration payload can be found at:

	https://www.ory.sh/docs/reference/api#operation/updateProject.

This command expects the contents of the `/services/identity/config` key, so for example:

	{
	  "courier": {
		"smtp": {
		  "from_name": "..."
		}
		// ...
	  }
	}


```
ory update identity-config [flags]
```

### Examples

```
$ ory update identity-config --project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
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

$ ory update identity-config --project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--file /path/to/kratos-config.yaml \
    --format yaml

courier:
  smtp:
    # ...
```

### Options

```
  -f, --file strings       Configuration file(s) (file://config.json, https://example.org/config.yaml, ...) to update the identity config
      --format string      Set the output format. One of default, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help               help for identity-config
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

