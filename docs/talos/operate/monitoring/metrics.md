---
title: Prometheus metrics
---

# Prometheus metrics

Talos exposes Prometheus metrics on a dedicated port (default: 4422).

## Endpoint

```
GET http://localhost:4422/metrics
```

## HTTP metrics

| Metric                          | Type      | Labels                       | Description           |
| ------------------------------- | --------- | ---------------------------- | --------------------- |
| `http_requests_total`           | Counter   | `method`, `code`, `endpoint` | Total HTTP requests   |
| `http_request_duration_seconds` | Histogram | `method`, `code`, `endpoint` | Request latency       |
| `http_request_size_bytes`       | Histogram | `method`, `code`             | Request payload size  |
| `http_response_size_bytes`      | Histogram | `method`, `code`             | Response payload size |
| `http_requests_in_flight`       | Gauge     | --                           | Concurrent requests   |

### Labels

| Label      | Description                                                     | Used by                                                |
| ---------- | --------------------------------------------------------------- | ------------------------------------------------------ |
| `method`   | HTTP method (lowercase)                                         | All except `http_requests_in_flight`                   |
| `code`     | HTTP status code                                                | All except `http_requests_in_flight`                   |
| `endpoint` | Route template (e.g., `/v2alpha1/admin/issuedApiKeys/{key_id}`) | `http_requests_total`, `http_request_duration_seconds` |

## Configuration

```yaml
serve:
  metrics:
    host: "0.0.0.0"
    port: 4422
```

## Proxy metrics (Commercial)

The edge proxy exposes additional metrics under the `talos_proxy_` namespace.

| Metric                                 | Type      | Labels   | Description                    |
| -------------------------------------- | --------- | -------- | ------------------------------ |
| `talos_proxy_cache_hits_total`         | Counter   | --       | Total number of cache hits     |
| `talos_proxy_cache_misses_total`       | Counter   | --       | Total number of cache misses   |
| `talos_proxy_upstream_requests_total`  | Counter   | `status` | Requests forwarded to upstream |
| `talos_proxy_upstream_latency_seconds` | Histogram | --       | Upstream request latency       |
| `talos_proxy_request_duration_seconds` | Histogram | `cached` | Total request duration         |

### Labels

| Label    | Description                                                 | Used by                                |
| -------- | ----------------------------------------------------------- | -------------------------------------- |
| `status` | HTTP status code of upstream response                       | `talos_proxy_upstream_requests_total`  |
| `cached` | Whether the response was served from cache (`true`/`false`) | `talos_proxy_request_duration_seconds` |

## Grafana

Scrape the metrics endpoint with Prometheus and visualize with Grafana. Key panels:

- Request rate: `rate(http_requests_total[5m])`
- P99 latency: `histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))`
- Error rate: `rate(http_requests_total{code=~"5.."}[5m])`
