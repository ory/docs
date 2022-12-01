---
id: ory-get-project
title: ory get project
description: ory get project Get the complete configuration of an Ory Network project.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory get project

Get the complete configuration of an Ory Network project.

```
ory get project <id> [flags]
```

### Examples

```
$ ory get project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89

ID		ecaaa3cb-0730-4ee8-a6df-9553cdfeef89
SLUG	good-wright-t7kzy3vugf
STATE	running
NAME	Example Project

$ ory get project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 --format json

{
  "name": "Example Project",
  "identity": {
	"services": {
	  "config": {
		"courier": {
		  "smtp": {
			"from_name": "..."
		  }
		  // ...
		}
	  }
	}
  }
}
```

### Options

```
      --format string   Set the output format. One of table, json, yaml, json-pretty, and jsonpath. (default "default")
  -h, --help            help for project
  -q, --quiet           Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory get](ory-get)	 - Get a resource

