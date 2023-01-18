---
id: ory-use-project
title: ory use project
description: ory use project Set the project as the default. When no id is provided, prints the currently used default project.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory use project

Set the project as the default. When no id is provided, prints the currently used default project.

```
ory use project [id] [flags]
```

### Examples

```
$ ory use project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89

ID		ecaaa3cb-0730-4ee8-a6df-9553cdfeef89

$ ory use project ecaaa3cb-0730-4ee8-a6df-9553cdfeef89 --format json

{
  "id": "ecaaa3cb-0730-4ee8-a6df-9553cdfeef89
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

* [ory use](ory-use)	 - Use a resource

