---
id: talos-keys-issue
title: talos keys issue
description: talos keys issue
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## talos keys issue

Issue a new API key

```
talos keys issue [name] [flags]
```

### Options

```
      --actor string               Actor ID (required)
      --allowed-cidrs string       Comma-separated CIDR ranges for IP restriction (e.g., '10.0.0.0/8,192.168.0.0/16')
      --format string              Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help                       help for issue
      --metadata string            JSON metadata for the API key
  -q, --quiet                      Be quiet with output printing.
      --rate-limit-quota int       Maximum requests allowed per window (0 = no limit)
      --rate-limit-window string   Rate limit window duration (e.g., 60s, 5m)
      --scopes string              Comma-separated list of scopes
      --ttl duration               Time-to-live duration (e.g., '24h', '168h') (default 24h0m0s)
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

* [talos keys](talos-keys.md) Manage API keys

