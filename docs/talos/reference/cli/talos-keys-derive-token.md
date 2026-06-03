---
id: talos-keys-derive-token
title: talos keys derive-token
description: talos keys derive-token
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos keys derive-token

Derive a short-lived JWT or macaroon from an existing API key

### Synopsis

Derives a short-lived JWT or macaroon token from an existing opaque API key.

```
talos keys derive-token [api-key-token] [flags]
```

### Options

```
      --algorithm string   Algorithm for derived token (jwt or macaroon) (default "jwt")
      --claims string      Custom claims as JSON (e.g., '{"user_ip":"192.168.1.1","request_id":"abc123"}'). Reserved claims like iss, sub, exp cannot be overridden.
      --format string      Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help               help for derive-token
  -q, --quiet              Be quiet with output printing.
      --ttl string         Token time-to-live duration (default "1h")
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos keys](talos-keys.md) Manage API keys
