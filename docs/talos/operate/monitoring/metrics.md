---
title: Prometheus metrics
description: Scrape Ory Talos Prometheus metrics from the commercial edition's /metrics endpoint.
---

Ory Talos exposes Prometheus metrics in commercial builds only. The `commercial` build tag gates
both the HTTP request middleware (below) and the `/metrics` scrape endpoint. The OSS build ships a
no-op metrics implementation and doesn't register `/metrics`.

## Endpoint (commercial)

Scrape metrics from `/metrics` on the metrics server:

```text
GET http://localhost:4422/metrics
```

The metrics server listens on the metrics port (default `4422`), separate from the main HTTP port
(default `4420`). It also serves `/health/alive` and `/health/ready`.

## HTTP metrics

| Metric                          | Type      | Labels                       | Description           |
| ------------------------------- | --------- | ---------------------------- | --------------------- |
| `http_requests_total`           | Counter   | `method`, `code`, `endpoint` | Total HTTP requests   |
| `http_request_duration_seconds` | Histogram | `method`, `code`, `endpoint` | Request latency       |
| `http_request_size_bytes`       | Histogram | `method`, `code`             | Request payload size  |
| `http_response_size_bytes`      | Histogram | `method`, `code`             | Response payload size |
| `http_requests_in_flight`       | Gauge     | --                           | Concurrent requests   |

### Labels

| Label      | Description                                                          | Used by                                                |
| ---------- | -------------------------------------------------------------------- | ------------------------------------------------------ |
| `method`   | HTTP method (lowercase)                                              | All except `http_requests_in_flight`                   |
| `code`     | HTTP status code                                                     | All except `http_requests_in_flight`                   |
| `endpoint` | Route template, for example `/v2alpha1/admin/issuedApiKeys/{key_id}` | `http_requests_total`, `http_request_duration_seconds` |

## Configuration

Only the commercial edition honors the `serve.metrics` block. Both fields are immutable: changing
them requires a server restart.

```yaml
serve:
  metrics: # Requires a commercial license.
    host: "0.0.0.0"
    port: 4422
```

## Proxy metrics (commercial)

The edge proxy exposes additional metrics under the `talos_proxy_` namespace. See
[Edge proxy — Metrics](../deploy/edge-proxy.mdx#metrics) for the table.

## Example queries

The commercial edition ships starter Grafana dashboards under
`commercial/observability/grafana/dashboards/boards/`: `platform-overview.json`, `http-api.json`,
`api-lifecycle.json`, `database-health.json`, and `verification-slo.json`. Start from these queries:

- Request rate: `rate(http_requests_total[5m])`
- P99 latency: `histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))`
- Error rate: `rate(http_requests_total{code=~"5.."}[5m])`
