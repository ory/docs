---
id: talos-keys-issued
title: talos keys issued
description: talos keys issued
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos keys issued

Manage issued API keys

### Synopsis

Get, list, update, and rotate issued API keys.

### Options

```
      --format string   Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help            help for issued
  -q, --quiet           Be quiet with output printing.
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos keys](talos-keys) Manage API keys
- [talos keys issued get](talos-keys-issued-get) - Get details of an issued API key
- [talos keys issued issue](talos-keys-issued-issue) - Issue a new API key
- [talos keys issued list](talos-keys-issued-list) - List issued API keys
- [talos keys issued rotate](talos-keys-issued-rotate) - Rotate an issued API key (revokes old key,
  creates new one)
- [talos keys issued update](talos-keys-issued-update) - Update an issued API key
