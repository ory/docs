---
id: talos-serve
title: talos serve
description: talos serve
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos serve

Start the Ory Talos server (all-in-one mode)

### Synopsis

Starts the HTTP server for the API key service in all-in-one mode.

This mode runs both admin plane (management) and data plane (verification) in a single process.

For production deployments with high-throughput verification workloads, consider using:

- 'serve check' for data plane only (verification with caching)
- 'serve admin' for admin plane only (management operations)

```
talos serve [flags]
```

### Examples

```
  talos serve
```

### Options

```
  -h, --help   help for serve
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos](talos) High-performance multi-network API key service
- [talos serve admin](talos-serve-admin) - Start the admin plane server (management only)
- [talos serve check](talos-serve-check) - Start the data plane server (verification only)
