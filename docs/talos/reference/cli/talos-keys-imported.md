---
id: talos-keys-imported
title: talos keys imported
description: talos keys imported
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos keys imported

Manage imported API keys

### Synopsis

Import, list, get, revoke, and delete externally-created API keys.

### Options

```
      --format string   Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help            help for imported
  -q, --quiet           Be quiet with output printing.
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos keys](talos-keys) Manage API keys
- [talos keys imported batch-import](talos-keys-imported-batch-import) - Batch import API keys from a JSON file
- [talos keys imported delete](talos-keys-imported-delete) - Permanently delete an imported API key
- [talos keys imported get](talos-keys-imported-get) - Get details of an imported API key
- [talos keys imported import](talos-keys-imported-import) - Import an external API key
- [talos keys imported list](talos-keys-imported-list) - List imported API keys
- [talos keys imported revoke](talos-keys-imported-revoke) - Revoke an imported API key
