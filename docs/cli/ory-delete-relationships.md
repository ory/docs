---
id: ory-delete-relationships
title: ory delete relationships
description: ory delete relationships Delete ALL relationships matching the relation query.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory delete relationships

Delete ALL relationships matching the relation query.

### Synopsis

Delete all relationships matching the relation query.
It is recommended to first run the command without the `--force` flag to verify that the operation is safe.

```
ory delete relationships [flags]
```

### Options

```
      --all                  Delete all relation tuples
      --authority string     Set the authority header for the remote gRPC server.
      --block                Block until the connection is up.
      --force                Force the deletion of relationships
      --format string        Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help                 help for relationships
      --namespace string     Set the requested namespace
      --object string        Set the requested object
      --project string       The project to use, either project ID or a (partial) slug.
  -q, --quiet                Be quiet with output printing.
      --relation string      Set the requested relation
      --subject-id string    Set the requested subject ID
      --subject-set string   Set the requested subject set; format: "namespace:object#relation"
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory delete](ory-delete)	 - Delete resources

