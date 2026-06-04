---
title: Health checks
---

Ory Talos exposes two health endpoints on **both** the main HTTP port (default `4420`) and the
metrics port (default `4422`). Probe the main port for Kubernetes and load balancers. See
[Which port to probe](#which-port-to-probe) below.

## Endpoints

| Endpoint        | Port          | Purpose         | Use for                                    |
| --------------- | ------------- | --------------- | ------------------------------------------ |
| `/health/alive` | 4420 and 4422 | Liveness probe  | Kubernetes `livenessProbe`                 |
| `/health/ready` | 4420 and 4422 | Readiness probe | Kubernetes `readinessProbe`, load balancer |

## Which port to probe

Both ports run the same readiness check (a database ping), so they return the same HTTP status. They
differ only in the response body on failure:

- **Probe the main HTTP port (4420)** for liveness and readiness in the typical case. Failures of
  the gateway listener and the application code surface here, and `/health/ready` returns the
  underlying error in the response body when a check fails.
- **The metrics port (4422)** obfuscates the error detail in the `/health/ready` body. In commercial
  builds it also serves the Prometheus `/metrics` scrape endpoint; OSS builds expose only the two
  health endpoints on this port.

For Kubernetes, probe the main port.

## Kubernetes probes

```yaml
livenessProbe:
  httpGet:
    path: /health/alive
    port: 4420
  initialDelaySeconds: 5
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health/ready
    port: 4420
  initialDelaySeconds: 5
  periodSeconds: 10
```

## Load balancer

Point your load balancer health check at `/health/ready`. It returns 200 when the database ping
succeeds and 503 when it fails.

## Suppressing health logs

To keep frequent probes out of the request logs:

```yaml
serve:
  http:
    request_log:
      exclude_health_endpoints: true
```

## Response body

Both handlers return JSON: `{"status":"ok"}` when ready, or an error map when a check fails. The two
ports report the same status, but the metrics port obfuscates the error detail. Don't parse the
body. Treat the HTTP status as the signal: 200 means ready, 503 means not ready.
