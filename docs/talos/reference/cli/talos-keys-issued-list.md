---
id: talos-keys-issued-list
title: talos keys issued list
description: talos keys issued list
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos keys issued list

List issued API keys

```
talos keys issued list [flags]
```

### Options

```
      --actor string        Filter by actor ID
      --format string       Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help                help for list
      --page-size int32     Number of items per page (default: 50, max: 1000)
      --page-token string   Cursor token for pagination
  -q, --quiet               Be quiet with output printing.
      --status string       Filter by status (KEY_STATUS_ACTIVE, KEY_STATUS_REVOKED, KEY_STATUS_EXPIRED)
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos keys issued](talos-keys-issued) Manage issued API keys
