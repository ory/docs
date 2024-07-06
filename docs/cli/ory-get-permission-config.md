---
id: ory-get-permission-config
title: ory get permission-config
description: ory get permission-config Get Ory Permissions configuration.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory get permission-config

Get Ory Permissions configuration.

### Synopsis

Get the Ory Permissions configuration for an Ory Network project.

```
ory get permission-config [flags]
```

### Examples

```
$ ory get permission-config --project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 --format yaml > permission-config.yaml

$ ory get permission-config --format json   # uses currently selected project

{
  "namespaces": [
    {
      "name": "files",
      "id": 1
	},1
    // ...
  ]
}
```

### Options

```
      --format string      Set the output format. One of default, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help               help for permission-config
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

