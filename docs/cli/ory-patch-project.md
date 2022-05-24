---
id: ory-patch-project
title: ory patch project
description: ory patch project Patch an Ory Cloud Project
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory patch project

Patch an Ory Cloud Project

### Synopsis

Use this command to patch your current Ory Cloud Project's service configuration. Only values
specified in the patch will be overwritten. To replace the config use the `update` command instead.

The format of the patch is a JSON-Patch document. For more details please check:

	https://www.ory.sh/docs/reference/api#operation/patchProject
	https://jsonpatch.com

```
ory patch project <id> [flags]
```

### Examples

```
ory patch project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--replace '/name="My new project name"' \
	--add '/services/identity/config/courier/smtp={"from_name":"My new email name"}' \
	--replace '/services/identity/config/selfservice/methods/password/enabled=false' \
	--delete '/services/identity/config/selfservice/methods/totp/enabled'

ory patch project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 \
	--replace '/name="My new project name"' \
	--delete '/services/identity/config/selfservice/methods/totp/enabled'
	--format kratos-config > my-config.yaml
```

### Options

```
      --add stringArray       Add a specific key to the configuration
  -f, --file strings          Configuration file(s) (file://config.json, https://example.org/config.yaml, ...) to update the project
      --format string         Set the output format. One of table, json, yaml, and json-pretty. (default "default")
  -h, --help                  help for project
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

