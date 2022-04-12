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

List identities (paginated)

```
kratos list identities [&lt;page&gt; &lt;per-page&gt;] [flags]
```

### Examples

```
kratos ls identities 100 1
```

### Options

```
  -h, --help   help for identities
```

### Options inherited from parent commands

```
  -e, --endpoint string   The URL of Ory Kratos&#39; Admin API. Alternatively set using the KRATOS_ADMIN_URL environmental variable.
  -f, --format string     Set the output format. One of table, json, and json-pretty. (default &#34;default&#34;)
  -q, --quiet             Be quiet with output printing.
```

### SEE ALSO

- [kratos list](kratos-list) - List resources
