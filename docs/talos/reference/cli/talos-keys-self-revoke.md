---
id: talos-keys-self-revoke
title: talos keys self-revoke
description: talos keys self-revoke
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## talos keys self-revoke

Revoke an API key using the credential itself as proof

### Synopsis

Self-revokes an API key by presenting the full credential as proof of ownership. Does not require admin access.

```
talos keys self-revoke [credential] [flags]
```

### Options

```
  -h, --help            help for self-revoke
      --reason string   Reason for revocation
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
      --format string     Set the output format. One of table, json, yaml, json-pretty, jsonpath and jsonpointer. (default "table")
  -q, --quiet             Be quiet with output printing.
```

### See also

* [talos keys](talos-keys.md) Manage API keys

