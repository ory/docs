---
id: ory-create-relationships
title: ory create relationships
description: ory create relationships Create relationships from JSON files
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory create relationships

Create relationships from JSON files

### Synopsis

Create relationships from JSON files.
A directory will be traversed and all relationships will be created.
Pass the special filename `-` to read from STD_IN.

```
ory create relationships [flags]
```

### Options

```
      --authority string   Set the authority header for the remote gRPC server.
      --block              Block until the connection is up.
      --format string      Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
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

### SEE ALSO

* [ory create](ory-create)	 - Create Ory Network resources

