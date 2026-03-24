---
id: ory-create-relationships
title: ory create relationships
description: ory create relationships
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory create relationships

Create relationship tuples from inline arguments or JSON files and folders

### Synopsis

Create relationship tuples from inline arguments or JSON files and folders.

Inline example:
```
keto relation-tuple create User:alice owner Doc:readme
```

From file or folder:
```
keto relation-tuple create -f relationships1.json -f relationships2.json
keto relation-tuple create -f relationships-dir1 -f relationships-dir2
```

If a directory is provided, all JSON files inside it are processed.
Use '-' as filename to read from STD_IN:
```
keto relation-tuple create -f -
```

```
ory create relationships [flags]
```

### Options

```
      --authority string   Set the authority header for the remote gRPC server.
      --block              Block until the connection is up.
  -f, --file strings       Read relationships from JSON files or directories (use the special filename - for stdin)
      --format string      Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help               help for relationships
      --project string     The project to use, either project ID or a (partial) slug.
  -q, --quiet              Be quiet with output printing.
      --workspace string   The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### See also

* [ory create](ory-create) Create Ory Network resources

