---
id: ory-get-identity-config
title: ory get identity-config
description: ory get identity-config Get Ory Identities configuration.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory get identity-config

Get Ory Identities configuration.

### Synopsis

Get the Ory Identities configuration for an Ory Network project.

```
ory get identity-config [flags]
```

### Examples

```
$ ory get identity-config --project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 --format yaml > identity-config.yaml

$ ory get identity-config --format json   # uses currently selected project

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
      --format string      Set the output format. One of default, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help               help for identity-config
      --project string     The project to use, either project ID or a (partial) slug.
      --workspace string   The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory get](ory-get)	 - Get a resource

