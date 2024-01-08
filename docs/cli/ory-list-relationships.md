---
id: ory-list-relationships
title: ory list relationships
description: ory list relationships List relation tuples
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory list relationships

List relation tuples

### Synopsis

List relation tuples matching the given partial tuple.
Returns paginated results.

```
ory list relationships [flags]
```

### Options

```
      --authority string     Set the authority header for the remote gRPC server.
      --block                Block until the connection is up.
      --format string        Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help                 help for relationships
      --namespace string     Set the requested namespace
      --object string        Set the requested object
      --page-size int32      maximum number of items to return (default 100)
      --page-token string    page token acquired from a previous response
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

* [ory list](ory-list)	 - List resources

