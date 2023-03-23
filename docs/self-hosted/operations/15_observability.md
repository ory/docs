---
id: observability
title: Observability
---

## Prometheus

Ory technology exposes an endpoint for snapshot Prometheus data. This endpoint is usually found at the administrative port for Ory
Kratos, Ory Hydra under the `/metrics/prometheus` path. If you run the default configuration, it will be exposed at:

- Ory Hydra: `http://<host>:4445/metrics/prometheus`
- Ory Kratos: `http://<host>:4434/metrics/prometheus`
