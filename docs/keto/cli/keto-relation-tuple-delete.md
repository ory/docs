---
id: keto-relation-tuple-delete
title: keto relation-tuple delete
description: keto relation-tuple delete
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## keto relation-tuple delete

Delete relationships defined in JSON files

### Synopsis

Delete relationships defined in the given JSON files.
A directory will be traversed and all relationships will be deleted.
Pass the special filename `-` to read from STD_IN.

```
keto relation-tuple delete <relation-tuple.json> [<relation-tuple-dir>] [flags]
```

### Options

```
      --authority string                      Set the authority header for the remote gRPC server.
      --block                                 Block until the connection is up.
      --format string                         Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help                                  help for delete
      --insecure-disable-transport-security   Disables transport security. Do not use this in production.
      --insecure-skip-hostname-verification   Disables hostname verification. Do not use this in production.
  -q, --quiet                                 Be quiet with output printing.
      --read-remote string                    Remote address of the read API endpoint. (default "127.0.0.1:4466")
      --write-remote string                   Remote address of the write API endpoint. (default "127.0.0.1:4467")
```

### Options inherited from parent commands

```
  -c, --config strings   Config files to load, overwriting in the order specified. (default [/home/runner/keto.yml])
```

### See also

* [keto relation-tuple](keto-relation-tuple) Read and manipulate relationships

