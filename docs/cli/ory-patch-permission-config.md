---
id: ory-patch-permission-config
title: ory patch permission-config
description: ory patch permission-config Patch an Ory Cloud Project's Permission Config
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory patch permission-config

Patch an Ory Cloud Project's Permission Config

### Synopsis

Use this command to patch your current Ory Cloud Project's permission service configuration. Only values
specified in the patch will be overwritten. To replace the config use the `update` command instead.

Compared to the `patch project` command, this command only updates the permission service configuration
and also only returns the permission service configuration as a result. This command is useful when you want to
import an Ory Keto config as well, for example. This allows for shorter paths when specifying the flags

	ory patch identity-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
		--replace '/limit/max_read_depth=5'

when compared to the `patch project` command:

	ory patch project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
		--replace '/services/permission/config/limit/max_read_depth=5'

The format of the patch is a JSON-Patch document. For more details please check:

	https://www.ory.sh/docs/reference/api#operation/patchProject
	https://jsonpatch.com

```
ory patch permission-config <project-id> [flags]
```

### Examples

```
$ ory patch permission-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--add '/namespaces={"name":"files", "id": 2}' \
	--replace '/namespaces/2/name="directories"' \
	--delete '/limit/max_read_depth' \
	--format json

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
      --format string         Set the output format. One of table, json, yaml, and json-pretty. (default "default")
  -h, --help                  help for permission-config
  -q, --quiet                 Be quiet with output printing.
      --remove stringArray    Remove a specific key from the configuration
      --replace stringArray   Replace a specific key in the configuration
  -y, --yes                   Confirm all dialogs with yes.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
```

### SEE ALSO

* [ory patch](ory-patch)	 - Patch resources

