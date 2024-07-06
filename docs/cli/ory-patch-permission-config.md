---
id: ory-patch-permission-config
title: ory patch permission-config
description: ory patch permission-config Patch the Ory Permissions configuration of an Ory Network project.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory patch permission-config

Patch the Ory Permissions configuration of an Ory Network project.

### Synopsis

Patch the Ory Permissions configuration of an Ory Network project. Only values
specified in the patch will be overwritten. To replace the config use the `update` command instead.

Compared to the `patch project` command, this command updates only the Ory Permissions configuration
and returns the configuration as a result. This command is useful when you want to import configuration from
self-hosted Ory Keto to Ory Network. Using this command allows for shorter paths when specifying the flags:

	ory patch permission-config --project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
		--replace '/limit/max_read_depth=5'

when compared to the `patch project` command:

	ory patch project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
		--replace '/services/permission/config/limit/max_read_depth=5'

The format of the patch is a JSON-Patch document. For more details please check:

	https://www.ory.sh/docs/reference/api#operation/patchProject
	https://jsonpatch.com

```
ory patch permission-config [flags]
```

### Examples

```
$ ory patch permission-config --project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--add '/namespaces=[{"name":"files", "id": 2}]' \
	--replace '/namespaces/2/name="directories"' \
	--remove '/limit/max_read_depth' \
	--format json-pretty

{
  "namespaces": [
    {
      "name": "files",
      "id": 2
    },
    {
      "name": "directories",
      "id": 3
    },
    // ...
  ]
}
```

### Options

```
      --add stringArray       Add a specific key to the configuration
  -f, --file strings          Configuration file(s) (file://config.json, https://example.org/config.yaml, ...) to update the project
      --format string         Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help                  help for permission-config
      --project string        The project to use, either project ID or a (partial) slug.
  -q, --quiet                 Be quiet with output printing.
      --remove stringArray    Remove a specific key from the configuration
      --replace stringArray   Replace a specific key in the configuration
      --workspace string      The workspace to use, either workspace ID or a (partial) name.
  -y, --yes                   Confirm all dialogs with yes.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
```

### SEE ALSO

* [ory patch](ory-patch)	 - Patch resources

