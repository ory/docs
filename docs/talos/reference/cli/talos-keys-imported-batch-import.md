---
id: talos-keys-imported-batch-import
title: talos keys imported batch-import
description: talos keys imported batch-import
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos keys imported batch-import

Batch import API keys from a JSON file

### Synopsis

Batch import API keys from a JSON file. Each request is limited to 1000 keys; the server rejects batches that exceed this limit.

```
talos keys imported batch-import --file keys.json [flags]
```

### Options

```
      --file string     Path to JSON file with key array, or '-' for stdin
      --format string   Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help            help for batch-import
  -q, --quiet           Be quiet with output printing.
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos keys imported](talos-keys-imported.md) Manage imported API keys
