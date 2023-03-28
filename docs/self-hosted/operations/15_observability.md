---
id: observability
title: Observability
---

## Prometheus

All Ory services expose an endpoint for snapshots of data collected by Prometheus. This endpoint is found at the administrative
port for Ory Kratos, at the `/metrics/prometheus` path for Ory Hydra and Ory Keto. If you run the default configuration, it will
be exposed at:

- Ory Kratos: `http://{host}:4434/metrics/prometheus`
- Ory Hydra: `http://{host}:4445/metrics/prometheus`
- Ory Keto: `http://{host}:4468/metrics/prometheus`
