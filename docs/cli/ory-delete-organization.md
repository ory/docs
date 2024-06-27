---
id: ory-delete-organization
title: ory delete organization
description: ory delete organization Delete the organization with the given ID
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory delete organization

Delete the organization with the given ID

```
ory delete organization <id> [--project=PROJECT_ID] [flags]
```

### Options

```
  -h, --help               help for organization
      --project string     The project to use, either project ID or a (partial) slug.
      --workspace string   The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
      --format string   Set the output format. One of default, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory delete](ory-delete)	 - Delete resources

