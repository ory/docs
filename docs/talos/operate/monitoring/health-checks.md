---
title: Health checks
---

# Health checks

Talos exposes three health endpoints on the main HTTP port.

## Endpoints

| Endpoint        | Purpose         | Use for                                    |
| --------------- | --------------- | ------------------------------------------ |
| `/health/alive` | Liveness probe  | Kubernetes `livenessProbe`                 |
| `/health/ready` | Readiness probe | Kubernetes `readinessProbe`, load balancer |
| `/health`       | Combined health | Quick manual checks                        |

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

Point your load balancer health check at `/health/ready`. This endpoint returns 200 when the server is ready to accept traffic and
503 when it is not (e.g., during startup or shutdown).

## Suppressing health logs

To reduce log noise from frequent health checks:

```yaml
serve:
  http:
    request_log:
      exclude_health_endpoints: true
```
