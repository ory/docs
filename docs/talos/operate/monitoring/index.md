---
title: Monitoring
---

Talos exposes Prometheus metrics, OpenTelemetry tracing, and health endpoints.

- [Prometheus metrics](metrics.md) — request counts, latencies, and pool sizes
- [OpenTelemetry tracing](tracing.md) — distributed request traces
- [Health checks](health-checks.md) — liveness and readiness probes

## Edition differences

Both editions record business-logic metrics in-process: counters for keys created, verified,
revoked, and rotated, plus cache hit and miss counters. The editions differ in what they expose and
which signals they collect:

| Feature                                                 | OSS | Commercial |
| ------------------------------------------------------- | --- | ---------- |
| In-process metric collection                            | Yes | Yes        |
| `/metrics` scrape endpoint (port 4422)                  | No  | Yes        |
| `/health/alive` and `/health/ready` (main port 4420)    | Yes | Yes        |
| `/health/alive` and `/health/ready` (metrics port 4422) | Yes | Yes        |
| OpenTelemetry trace export (`otlp` exporter)            | No  | Yes        |

The OSS edition doesn't register a `/metrics` route or export traces. To scrape metrics or ship
traces to a collector, use the commercial edition. Health endpoints work in both editions on both
ports.
