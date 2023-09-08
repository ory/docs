---
id: kratos-list-identities
title: kratos list identities
description: kratos list identities List identities
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## kratos list identities

List identities

### Synopsis

Return a list of identities.

```
kratos list identities [flags]
```

### Examples

```
kratos list identities --page-size 100
```

### Options

```
  -h, --help                help for identities
      --page-size int       maximum number of items to return (default 100)
      --page-token string   page token acquired from a previous response
```

### Options inherited from parent commands

```
  -e, --endpoint string   The URL of Ory Kratos' Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "default")
  -q, --quiet             Be quiet with output printing.
```

### SEE ALSO

* [kratos list](kratos-list)	 - List resources

