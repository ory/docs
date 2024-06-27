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
      --authority string   Set the authority header for the remote gRPC server.
      --block              Block until the connection is up.
      --format string      Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help               help for allowed
  -d, --max-depth int32    Maximum depth of the search tree. If the value is less than 1 or greater than the global max-depth then the global max-depth will be used instead.
      --project string     The project to use, either project ID or a (partial) slug.
  -q, --quiet              Be quiet with output printing.
      --workspace string   The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory is](ory-is)	 - Assert the state of Ory Network resources

