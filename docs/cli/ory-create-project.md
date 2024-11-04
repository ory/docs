---
id: ory-create-project
title: ory create project
description: ory create project Create a new Ory Network project
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory create project

Create a new Ory Network project

```
ory create project [flags]
```

### Options

```
      --create-workspace string   Create a new workspace with the given name and use it for the project
  -e, --environment environment   The environment of the project. Valid values are: prod, stage, dev (default dev)
      --format string             Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help                      help for project
  -n, --name string               The name of the project, required when quiet mode is used
  -q, --quiet                     Be quiet with output printing.
      --use-project               Set the created project as the default
      --workspace string          The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory create](ory-create)	 - Create Ory Network resources

