---
id: talos-keys
title: talos keys
description: talos keys
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos keys

Manage API keys

### Synopsis

Create, list, get, revoke, and rotate API keys.

### Options

```
      --format string   Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help            help for keys
  -q, --quiet           Be quiet with output printing.
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos](talos) High-performance multi-network API key service
- [talos keys batch-verify](talos-keys-batch-verify) - Verify multiple credentials in a single request
- [talos keys derive-token](talos-keys-derive-token) - Derive a new derived token from an existing API key
- [talos keys imported](talos-keys-imported) - Manage imported API keys
- [talos keys issue](talos-keys-issue) - Issue a new API key
- [talos keys issued](talos-keys-issued) - Manage issued API keys
- [talos keys revoke](talos-keys-revoke) - Revoke an API key
- [talos keys self-revoke](talos-keys-self-revoke) - Revoke an API key using the credential itself as proof
- [talos keys verify](talos-keys-verify) - Verify a credential (API key or token)
