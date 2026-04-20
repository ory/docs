---
title: OpenTelemetry tracing
---

# OpenTelemetry tracing

Talos supports distributed tracing via OpenTelemetry.

## Configuration

```yaml
tracing:
  enabled: true
  service_name: "talos"
  exporter: "otlp"
  endpoint: "otel-collector:4317"
  sample_rate: 0.01
```

## Exporters

| Exporter | Description                          |
| -------- | ------------------------------------ |
| `otlp`   | OpenTelemetry Protocol (recommended) |
| `jaeger` | Jaeger native format                 |
| `stdout` | Print traces to stderr (debugging)   |

## Environment variables

```bash
export TALOS_TRACING_ENABLED=true
export TALOS_TRACING_EXPORTER=otlp
export TALOS_TRACING_ENDPOINT=otel-collector:4317
export TALOS_TRACING_SAMPLE_RATE=0.01
```

## Traced operations

Talos traces database queries, HMAC operations, cache lookups, key verification paths, and HTTP
request handling. Each trace includes the Network ID (for multi-tenant deployments) and relevant key
identifiers.
