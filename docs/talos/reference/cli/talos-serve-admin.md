---
id: talos-serve-admin
title: talos serve admin
description: talos serve admin
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos serve admin

Start the admin plane server (management only)

### Synopsis

Starts the admin plane server for API key and network management.

This mode runs only the management endpoints for administrative operations. It's designed for internal tools, CI/CD, and
administrative access.

Features:

- Full read/write database access
- API key creation, rotation, revocation
- Network management
- Signing key management
- Typically behind admin firewall

```
talos serve admin [flags]
```

### Examples

```
  talos serve admin
```

### Options

```
  -h, --help   help for admin
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos serve](talos-serve) Start the Ory Talos server (all-in-one mode)
