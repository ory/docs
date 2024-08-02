---
id: ory-list-identities
title: ory list identities
description: ory list identities List identities
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## ory list identities

List identities

### Synopsis

Return a list of identities.

The consistency defaults to `eventual` and can be set to `strong` or `eventual`.
Eventual consistency means that the list operation will return faster and might not include recently created or updated identities. Replication lag is about 5 seconds.

```
ory list identities [flags]
```

### Examples

```
ory list identities --page-size 100 --consistency eventual
```

### Options

```
      --consistency string   The read consistency to use. Can be either "strong" or "eventual". Defaults to "eventual". (default "eventual")
  -h, --help                 help for identities
      --page-size int        maximum number of items to return (default 100)
      --page-token string    page token acquired from a previous response
      --project string       The project to use, either project ID or a (partial) slug.
      --workspace string     The workspace to use, either workspace ID or a (partial) name.
```

### Options inherited from parent commands

```
  -c, --config string   Path to the Ory Network configuration file.
      --format string   Set the output format. One of default, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -q, --quiet           Be quiet with output printing.
  -y, --yes             Confirm all dialogs with yes.
```

### SEE ALSO

* [ory list](ory-list)	 - List resources

