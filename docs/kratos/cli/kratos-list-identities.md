---
id: kratos-list-identities
title: kratos list identities
description: kratos list identities
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## kratos list identities

List identities

### Synopsis

Return a list of identities.

The consistency defaults to `eventual` and can be set to `strong` or `eventual`.
Eventual consistency means that the list operation will return faster and might not include recently created or updated identities. Replication lag is about 5 seconds.

```
kratos list identities [flags]
```

### Examples

```
kratos list identities --page-size 100 --consistency eventual
```

### Options

```
      --consistency string   The read consistency to use. Can be either "strong" or "eventual". Defaults to "eventual". (default "eventual")
  -h, --help                 help for identities
      --page-size int        maximum number of items to return (default 100)
      --page-token string    page token acquired from a previous response
```

### Options inherited from parent commands

```
  -e, --endpoint string   The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -q, --quiet             Be quiet with output printing.
```

### See also

* [kratos list](kratos-list) List resources

