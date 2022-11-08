---
id: ory-is-allowed
title: ory is allowed
description: ory is allowed Check whether a subject has a relation on an object
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory is allowed

Check whether a subject has a relation on an object

### Synopsis

Check whether a subject has a relation on an object. This method resolves subject sets and subject set rewrites.

```
ory is allowed <subject> <relation> <namespace> <object> [flags]
```

### Options

```
      --format string     Set the output format. One of table, json, yaml, json-pretty, and jsonpath. (default "default")
  -h, --help              help for allowed
  -d, --max-depth int32   Maximum depth of the search tree. If the value is less than 1 or greater than the global max-depth then the global max-depth will be used instead.
      --project string    The project to use
  -q, --quiet             Be quiet with output printing.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory is](ory-is)	 - Assert the state of Ory Network resources

