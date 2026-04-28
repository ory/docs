---
id: talos-keys-issued-update
title: talos keys issued update
description: talos keys issued update
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## talos keys issued update

Update an issued API key

```
talos keys issued update [key-id] [flags]
```

### Options

```
      --allowed-cidrs string       Comma-separated CIDR ranges for IP restriction (empty string removes restrictions)
      --format string              Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help                       help for update
      --metadata string            JSON metadata for the API key
      --name string                New name for the API key
  -q, --quiet                      Be quiet with output printing.
      --rate-limit-quota int       Maximum requests allowed per window (0 = no limit)
      --rate-limit-window string   Rate limit window duration (e.g., 60s, 5m)
      --scopes string              Comma-separated list of scopes
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

* [talos keys issued](talos-keys-issued.md) Manage issued API keys

