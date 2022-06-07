---
id: keto-relation-tuple-get
title: keto relation-tuple get
description: keto relation-tuple get Get relation tuples
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## keto relation-tuple get

Get relation tuples

### Synopsis

Get relation tuples matching the given partial tuple.
Returns paginated results.

```
keto relation-tuple get [flags]
```

### Options

```
      --format string         Set the output format. One of table, json, yaml, and json-pretty. (default "default")
  -h, --help                  help for get
      --namespace string      Set the requested namespace
      --object string         Set the requested object
      --page-size int32       maximum number of items to return (default 100)
      --page-token string     page token acquired from a previous response
  -q, --quiet                 Be quiet with output printing.
      --read-remote string    Remote address of the read API endpoint. (default "127.0.0.1:4466")
      --relation string       Set the requested relation
      --subject-id string     Set the requested subject ID
      --subject-set string    Set the requested subject set; format: "namespace:object#relation"
      --write-remote string   Remote address of the write API endpoint. (default "127.0.0.1:4467")
```

### Options inherited from parent commands

```
  -c, --config strings   Config files to load, overwriting in the order specified. (default [/home/runner/keto.yml])
```

### SEE ALSO

* [keto relation-tuple](keto-relation-tuple)	 - Read and manipulate relation tuples

