---
id: ory-delete-relation-tuples
title: ory delete relation-tuples
description: ory delete relation-tuples Delete ALL relation tuples matching the relation query.
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory delete relation-tuples

Delete ALL relation tuples matching the relation query.

### Synopsis

Delete all relation tuples matching the relation query.
It is recommended to first run the command without the `--force` flag to verify that the operation is safe.

```
ory delete relation-tuples [flags]
```

### Options

```
      --all                  Delete all relation tuples
      --force                Force the deletion of relation tuples
  -h, --help                 help for relation-tuples
      --namespace string     Set the requested namespace
      --object string        Set the requested object
      --project string       The project to use
      --relation string      Set the requested relation
      --subject-id string    Set the requested subject ID
      --subject-set string   Set the requested subject set; format: "namespace:object#relation"
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Cloud configuration file.
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory delete](ory-delete)	 - Delete resources

