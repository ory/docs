---
id: ory-delete-jwk
title: ory delete jwk
description: ory delete jwk Delete one or more JSON Web Key Sets by their set ID
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory delete jwk

Delete one or more JSON Web Key Sets by their set ID

### Synopsis

This command deletes one or more JSON Web Key Sets by their respective set IDs.

```
ory delete jwk <id-1> [<id-2> ...] [flags]
```

### Examples

```
ory delete jwk <set-1> <set-2> <set-3>
```

### Options

```
  -e, --endpoint string    The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string      Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -h, --help               help for jwk
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

* [ory delete](ory-delete)	 - Delete resources

