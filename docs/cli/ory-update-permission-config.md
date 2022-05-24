---
id: ory-update-permission-config
title: ory update permission-config
description: ory update permission-config Update Ory Cloud Project's Permission Service Configuration
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory update permission-config

Update Ory Cloud Project's Permission Service Configuration

### Synopsis

Use this command to replace your current Ory Cloud Project's permission service configuration. All values
of the permission service will be overwritten. To update individual settings use the `patch` command instead.

Compared to the `update project` command, this command only updates the permission service configuration
and also only returns the permission service configuration as a result. This command is useful when you want to
import an Ory Keto config as well, for example.

The full configuration payload can be found at:

	https://www.ory.sh/docs/reference/api#operation/updateProject.

This command expects the contents of the `/services/permission/config` key, so for example:

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
ory update permission-config <project-id> [flags]
```

### Examples

```
$ ory update permission-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--file /path/to/config.json \
	--file /path/to/config.yml \
	--file https://example.org/config.yaml \
	--file base64://<json> \
	--format json

{
  "namespaces": [
    {
      "name": "files",
      "id": 2
	},
    // ...
  ]
}

$ ory update permission-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--file /path/to/keto-config.yaml \
    --format yaml

namespaces:
  - name: files
    # ...
```

### Options

```
  -f, --file strings    Configuration file(s) (file://config.json, https://example.org/config.yaml, ...) to update the permission config
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -h, --help            help for permission-config
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
```

### SEE ALSO

* [ory update](ory-update)	 - Update resources

