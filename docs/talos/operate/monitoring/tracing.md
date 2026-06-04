---
title: OpenTelemetry tracing
---

Ory Talos emits distributed traces through OpenTelemetry in **commercial builds only**. The
`commercial` build tag gates the tracer; the OSS image treats the `tracing` config block as a no-op
and emits no traces.

## Configuration

The `tracing` block is immutable: Talos builds the tracer at startup, so changes take effect only
after a server restart. Defaults are shown in the comments below.

```yaml
tracing:
  enabled: true # Default: false.
  service_name: "talos" # Default: talos. Reported as `service.name`.
  service_version: "1.0.0" # Default: 0.0.0. Reported as `service.version`.
  environment: "production" # Default: development. Reported as the `environment` attribute.
  exporter: "otlp" # Only `otlp` is supported.
  endpoint: "otel-collector:4317"
  sample_rate: 0.01 # Default: 0.001 (0.1%). Range: 0.0 to 1.0.
```

## Exporter

OTLP is the only supported exporter. Setting `tracing.exporter` to any other value fails startup
with `unsupported exporter type: <value> (only 'otlp' is supported)`.

| Exporter | Description                       |
| -------- | --------------------------------- |
| `otlp`   | OpenTelemetry Protocol over gRPC. |

### Transport security

The OTLP gRPC client connects with `insecure` credentials, so traffic to the collector is
**plaintext**. Don't send traces over an untrusted network. Pick one of these options:

- Run a sidecar OpenTelemetry Collector on `localhost` that terminates TLS toward the central
  collector.
- Front the central collector with a load balancer that terminates mTLS in your service mesh.

Talos has no `tracing.tls` configuration block today. Rely on transport-layer controls instead.

## Environment variables

```shell
export TALOS_TRACING_ENABLED=true
export TALOS_TRACING_EXPORTER=otlp
export TALOS_TRACING_ENDPOINT=otel-collector:4317
export TALOS_TRACING_SAMPLE_RATE=0.01
```

The default `sample_rate` is `0.001` (0.1%). For a new deployment, set `0.1` (10%) or `1.0` (100%)
until you have an SLO baseline, then lower it to control collector cost.

## Traced operations

Talos traces database queries, HMAC operations, cache lookups, key verification paths, and HTTP
request handling. Spans carry relevant key identifiers, and a `nid` attribute holds the Network ID
for multi-tenant deployments. The `nid` attribute is omitted when the Network ID is unset
(single-tenant mode).

Span names follow the `package.FunctionName` convention (for example `persistence.CreateAPIKey`).
Span names never contain dynamic values such as key IDs; those are recorded as attributes instead.

## Trace and log correlation

When a log line carries the request context and that context holds an active span, Talos adds an
`otel` group with `trace_id` and `span_id` fields. HTTP request logs include this group
automatically. Filter by `otel.trace_id` in your log backend to line up the request's logs with the
trace in your APM.
