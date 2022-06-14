---
id: keto-check
title: keto check
description: keto check Check whether a subject has a relation on an object
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## keto check

Check whether a subject has a relation on an object

### Synopsis

Check whether a subject has a relation on an object. This method resolves subject sets and subject set rewrites.

```
keto check <subject> <relation> <namespace> <object> [flags]
```

### Options

```
      --format string         Set the output format. One of table, json, yaml, and json-pretty. (default "default")
  -h, --help                  help for check
  -d, --max-depth int32       Maximum depth of the search tree. If the value is less than 1 or greater than the global max-depth then the global max-depth will be used instead.
  -q, --quiet                 Be quiet with output printing.
      --read-remote string    Remote address of the read API endpoint. (default "127.0.0.1:4466")
      --write-remote string   Remote address of the write API endpoint. (default "127.0.0.1:4467")
```

### Options inherited from parent commands

```
  -c, --config strings   Config files to load, overwriting in the order specified. (default [/home/runner/keto.yml])
```

### SEE ALSO

* [keto](keto)	 - Global and consistent permission and authorization server

