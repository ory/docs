---
id: ory-list-relation-tuples
title: ory list relation-tuples
description: ory list relation-tuples List relation tuples
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory list relation-tuples

List relation tuples

### Synopsis

List relation tuples matching the given partial tuple.
Returns paginated results.

```
ory list relation-tuples [flags]
```

### Options

```
  -h, --help                 help for relation-tuples
      --namespace string     Set the requested namespace
      --object string        Set the requested object
      --page-size int32      maximum number of items to return (default 100)
      --page-token string    page token acquired from a previous response
      --project string       The project to use
      --relation string      Set the requested relation
      --subject-id string    Set the requested subject ID
      --subject-set string   Set the requested subject set; format: "namespace:object#relation"
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
      --format string   Set the output format. One of default, json, yaml, and json-pretty. (default "default")
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory list](ory-list)	 - List resources

