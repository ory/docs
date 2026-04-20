---
id: talos-keys-imported-revoke
title: talos keys imported revoke
description: talos keys imported revoke
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos keys imported revoke

Revoke an imported API key

```
talos keys imported revoke [key-id] [flags]
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
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos keys imported](talos-keys-imported) Manage imported API keys
