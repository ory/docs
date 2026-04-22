---
id: talos-serve-check
title: talos serve check
description: talos serve check
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->

## talos serve check

Start the data plane server (verification only)

### Synopsis

Starts the data plane server for API key and token verification.

This mode runs only the verification endpoints with caching for optimal read performance. It's designed for edge deployments and
high-throughput verification workloads.

Cache configuration is read from the config file (cache.type, cache.ttl, etc.)

```
talos serve check [flags]
```

### Examples

```
  talos serve check
```

### Options

```
  -h, --help   help for check
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

- [talos serve](talos-serve) Start the Ory Talos server (all-in-one mode)
