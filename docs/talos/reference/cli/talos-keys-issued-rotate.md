---
id: talos-keys-issued-rotate
title: talos keys issued rotate
description: talos keys issued rotate
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## talos keys issued rotate

Rotate an issued API key (revokes old key, creates new one)

```
talos keys issued rotate [key-id] [flags]
```

### Options

```
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help              help for rotate
      --metadata string   JSON metadata for the rotated key
      --name string       New name for the rotated API key
  -q, --quiet             Be quiet with output printing.
      --scopes string     Comma-separated list of scopes for the rotated key
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

* [talos keys issued](talos-keys-issued.md) Manage issued API keys

