---
id: ory-create-relationships
title: ory create relationships
description: ory create relationships Create relation tuples from JSON files
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory create relationships

Create relation tuples from JSON files

### Synopsis

Create relation tuples from JSON files.
A directory will be traversed and all relation tuples will be created.
Pass the special filename `-` to read from STD_IN.

```
ory create relationships [flags]
```

### Options

```
      --format string    Set the output format. One of table, json, yaml, json-pretty, and jsonpath. (default "default")
  -h, --help             help for relationships
      --project string   The project to use, either project ID or a (partial) slug.
  -q, --quiet            Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory create](ory-create)	 - Create Ory Network resources

