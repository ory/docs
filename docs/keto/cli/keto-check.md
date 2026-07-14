---
id: keto-check
title: keto check
description: keto check
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## keto check

Check whether a subject has a relation on an object

### Synopsis

Check whether a subject has a relation on an object.

Example:
```
keto check User:Alice view Doc:readme
```

Legacy format 'keto check <subject_namespace>:<subject_id> <relation> <object_namespace> <object_id>' is deprecated.

```
keto check <subject_namespace>:<subject_id> <relation> <object_namespace>:<object_id> [flags]
```

### Options

```
      --authority string                      Set the authority header for the remote gRPC server.
      --block                                 Block until the connection is up.
      --format string                         Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help                                  help for check
      --insecure-disable-transport-security   Disables transport security. Do not use this in production.
      --insecure-skip-hostname-verification   Disables hostname verification. Do not use this in production.
  -d, --max-depth int32                       Maximum depth of the search tree. If the value is less than 1 or greater than the global max-depth then the global max-depth will be used instead.
  -q, --quiet                                 Be quiet with output printing.
      --read-remote string                    Remote address of the read API endpoint. (default "127.0.0.1:4466")
      --write-remote string                   Remote address of the write API endpoint. (default "127.0.0.1:4467")
```

### Options inherited from parent commands

```
  -c, --config strings   Config files to load, overwriting in the order specified. (default [/home/runner/keto.yml])
```

### See also

* [keto](keto) Global and consistent permission and authorization server

