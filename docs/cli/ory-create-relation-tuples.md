---
id: ory-create-relation-tuples
title: ory create relation-tuples
description: ory create relation-tuples Create relation tuples from JSON files
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory create relation-tuples

Create relation tuples from JSON files

### Synopsis

Create relation tuples from JSON files.
A directory will be traversed and all relation tuples will be created.
Pass the special filename `-` to read from STD_IN.

```
ory create relation-tuples [flags]
```

### Options

```
  -h, --help             help for relation-tuples
      --project string   The project to use
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory create](ory-create)	 - Create Ory Cloud resources

