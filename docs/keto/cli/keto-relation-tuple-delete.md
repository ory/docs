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

Delete relationship tuples from inline arguments or JSON files and folders

### Synopsis

Delete relationship tuples from inline arguments or JSON files and folders.

Inline example:
```
keto relation-tuple delete User:alice owner Doc:readme
```

From file or folder:
```
keto relation-tuple delete -f relationships1.json -f relationships2.json
keto relation-tuple delete -f relationships-dir1 -f relationships-dir2
```

If a directory is provided, all JSON files inside it are processed.
Use '-' as filename to read from STD_IN:
```
keto relation-tuple delete -f -
```

```
keto relation-tuple delete <subject_namespace>:<subject_id> <relation> <object_namespace>:<object_id> [flags]
```

### Options

```
      --authority string                      Set the authority header for the remote gRPC server.
      --block                                 Block until the connection is up.
  -f, --file strings                          Read relationships from JSON files or directories (use the special filename - for stdin)
      --format string                         Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
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

