---
id: ory-patch-identity-config
title: ory patch identity-config
description: ory patch identity-config Patch the Ory Identities configuration of the defined Ory Network project.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory patch identity-config

Patch the Ory Identities configuration of the defined Ory Network project.

### Synopsis

Patch the Ory Identities configuration of the defined Ory Network project. Only values specified in the patch will be overwritten. To replace the config use the `update` command instead.

Compared to the `patch project` command, this command updates only the Ory Identities configuration
and returns the configuration as a result. This command is useful when you want to import configuration from 
self-hosted Ory Kratos to Ory Network. Using this command allows for shorter paths when specifying the flags:

	ory patch identity-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
		--replace '/selfservice/methods/password/enabled=false'

when compared to the `patch project` command:

	ory patch project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
		--replace '/services/identity/config/selfservice/methods/password/enabled=false'

The format of the patch is a JSON-Patch document. For more details please check:

	https://www.ory.sh/docs/reference/api#operation/patchProject
	https://jsonpatch.com

```
ory patch identity-config [project-id] [flags]
```

### Examples

```
$ ory patch identity-config ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--add '/courier/smtp={"from_name":"My new email name"}' \
	--replace '/selfservice/methods/password/enabled=false' \
	--remove '/selfservice/methods/totp/enabled' \
	--format json-pretty

{
  "selfservice": {
    "methods": {
      "password": { "enabled": false }
    }
    // ...
  }
}
```

### Options

```
      --add stringArray       Add a specific key to the configuration
  -f, --file strings          Configuration file(s) (file://config.json, https://example.org/config.yaml, ...) to update the project
      --format string         Set the output format. One of table, json, yaml, json-pretty, and jsonpath. (default "default")
  -h, --help                  help for identity-config
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

