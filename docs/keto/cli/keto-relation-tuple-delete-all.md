---
id: keto-relation-tuple-delete-all
title: keto relation-tuple delete-all
description: keto relation-tuple delete-all
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## keto relation-tuple delete-all

Delete ALL relationships matching the relation query.

### Synopsis

Delete all relationships matching the relation query.
It is recommended to first run the command without the `--force` flag to verify that the operation is safe.

```
keto relation-tuple delete-all [flags]
```

### Options

```
      --authority string                      Set the authority header for the remote gRPC server.
      --block                                 Block until the connection is up.
      --force                                 Force the deletion of relationships
      --format string                         Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help                                  help for delete-all
      --insecure-disable-transport-security   Disables transport security. Do not use this in production.
      --insecure-skip-hostname-verification   Disables hostname verification. Do not use this in production.
      --namespace string                      Set the requested namespace
      --object string                         Set the requested object
  -q, --quiet                                 Be quiet with output printing.
      --read-remote string                    Remote address of the read API endpoint. (default "127.0.0.1:4466")
      --relation string                       Set the requested relation
      --subject-id string                     Set the requested subject ID
      --subject-set string                    Set the requested subject set; format: "namespace:object#relation"
      --write-remote string                   Remote address of the write API endpoint. (default "127.0.0.1:4467")
```

### Options inherited from parent commands

```
  -c, --config strings   Config files to load, overwriting in the order specified. (default [/home/runner/keto.yml])
```

### See also

* [keto relation-tuple](keto-relation-tuple) Read and manipulate relationships

