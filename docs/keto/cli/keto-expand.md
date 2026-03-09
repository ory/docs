---
id: keto-expand
title: keto expand
description: keto expand
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## keto expand

Expand all subjects that have the relation on the object

### Synopsis

Expand all subjects that have the relation on the object, including how access is granted.

Example:
```
keto expand view Doc:readme
```



```
keto expand <relation> <object_namespace>:<object_id> [flags]
```

### Options

```
      --authority string                      Set the authority header for the remote gRPC server.
      --block                                 Block until the connection is up.
      --format string                         Set the output format. One of default, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help                                  help for expand
      --insecure-disable-transport-security   Disables transport security. Do not use this in production.
      --insecure-skip-hostname-verification   Disables hostname verification. Do not use this in production.
  -d, --max-depth int32                       Maximum depth of the tree to be returned. If the value is less than 1 or greater than the global max-depth then the global max-depth will be used instead.
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

