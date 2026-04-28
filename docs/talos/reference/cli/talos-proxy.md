---
id: talos-proxy
title: talos proxy
description: talos proxy
---

<!--
This file is auto-generated.

To improve this file please make your change against the appropriate "./cmd/*.go" file.
-->
## talos proxy

Start the edge proxy for caching verification requests

### Synopsis

Start an edge proxy that caches verification responses from an upstream Talos server.

The proxy caches successful verification responses to reduce latency and load on the upstream server.
Only active (valid) verification responses are cached.

Cache bypass: Clients can bypass the cache by sending Cache-Control: no-cache header.

The proxy exposes health endpoints:
  /health/alive - Always returns 200 OK
  /health/ready - Returns 200 OK if upstream is reachable

```
talos proxy [flags]
```

### Examples

```
  talos proxy --upstream http://talos:8080
  talos proxy --upstream http://talos:8080 --listen :9090 --cache-ttl 5m
  talos proxy --upstream http://talos:8080 --trust-x-forwarded-host
```

### Options

```
      --allowed-hosts strings    Allowlist of valid Host/X-Forwarded-Host values (if set, requests with other hosts are rejected with 403)
      --cache-max-size int       Maximum cache size in bytes (default 104857600)
      --cache-num-counters int   Number of frequency counters for cache admission (default 10000)
      --cache-ttl duration       Cache entry TTL (default 1m0s)
  -h, --help                     help for proxy
      --listen string            Listen address for the proxy (default ":8080")
      --trust-x-forwarded-host   Trust X-Forwarded-Host header for multi-tenant cache isolation (use when behind a trusted load balancer)
      --upstream string          Upstream Talos server URL (required)
```

### Options inherited from parent commands

```
      --config string     config file (default is $HOME/.talos.yaml or ./config.yaml)
  -e, --endpoint string   HTTP server base URL including scheme, e.g. http://host:port (for client commands) (default "http://localhost:4420")
```

### See also

* [talos](talos.md) Multi-tenant API key management service

