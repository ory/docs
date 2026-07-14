---
id: talos-keys-issued-revoke
title: talos keys issued revoke
description: talos keys issued revoke
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos keys issued revoke

Revoke an issued API key

```
talos keys issued revoke [key-id] [flags]
```

### Options

```
      --format string        Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -h, --help                 help for revoke
  -q, --quiet                Be quiet with output printing.
      --reason string        Reason for revocation (key_compromise, affiliation_changed, superseded, privilege_withdrawn)
      --reason-text string   Human-readable reason text
```

### Options inherited from parent commands

```
      --config string     path to a config file (without it, only schema defaults and TALOS_-prefixed env vars apply)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos keys issued](talos-keys-issued.md) Manage issued API keys
