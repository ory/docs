---
id: ory-update-permission-config
title: ory update permission-config
description: ory update permission-config Update Ory Permissions configuration of an Ory Network project.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory update permission-config

Update Ory Permissions configuration of an Ory Network project.

### Synopsis

Update Ory Permissions configuration of an Ory Network project. All values
of the permission service will be overwritten. To update individual settings use the `patch` command instead.

Compared to the `update project` command, this command updates only the Ory Permissions configuration
and returns the configuration as a result. This command is useful when you want to import configuration from
self-hosted Ory Keto to Ory Network.

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
ory update permission-config [flags]
```

### Examples

```
$ ory update permission-config --project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
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

$ ory update permission-config --project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--file /path/to/keto-config.yaml \
    --format yaml

namespaces:
  - name: files
    # ...
```

### Options

```
  -f, --file strings       Configuration file(s) (file://config.json, https://example.org/config.yaml, ...) to update the permission config
      --format string      Set the output format. One of default, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help               help for permission-config
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

