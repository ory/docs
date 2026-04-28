---
id: talos-keys-batch-verify
title: talos keys batch-verify
description: talos keys batch-verify
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos keys batch-verify

Verify multiple credentials in a single request

```
talos keys batch-verify [credentials...] [flags]
```

### Options

```
      --format string   Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help            help for batch-verify
      --no-cache        Bypass verification cache (sends Cache-Control: no-cache header)
  -q, --quiet           Be quiet with output printing.
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos keys](talos-keys.md) Manage API keys
