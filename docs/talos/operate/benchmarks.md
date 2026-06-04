---
title: Benchmarks
description: Performance benchmarks and load testing for Ory Talos
---

Talos ships a k6 load test suite that measures throughput, latency, and correctness under concurrent
load. Use it to validate a deployment and catch performance regressions.

:::note

These benchmarks require the Commercial edition with PostgreSQL. The bundled `test/load/run.sh`
runner provisions only PostgreSQL. The commercial binary also supports CockroachDB and MySQL, but
the runner doesn't configure them. The OSS edition's SQLite driver serializes writes and can't
sustain the parallel load that the multi-VU profiles generate.

:::

## Reference results

These results come from a single-process commercial binary on Apple M4 Max with PostgreSQL 16,
running the stress profile (ramping 0 to 437 VUs over 5 minutes):

| Metric              | Value        |
| ------------------- | ------------ |
| Total requests      | ~5,000,000   |
| Peak throughput     | 16,766 req/s |
| Overall p99 latency | 123ms        |
| Verify p95 latency  | 48ms         |
| Verify p99 latency  | 95ms         |
| Error rate          | 0.00%        |
| Peak VUs            | 437          |
| Key creations       | 493/s        |
| Verifications       | 3,797/s      |
| Token derivations   | 3,797/s      |

## Profiles

Select a profile with the `TEST_PROFILE` environment variable:

| Profile  | VUs per scenario                                          | Duration | Executor     | Purpose                                        |
| -------- | --------------------------------------------------------- | -------- | ------------ | ---------------------------------------------- |
| `smoke`  | 1 read + 1 write                                          | 15s      | constant-vus | Quick validation after changes                 |
| `load`   | 15 read + 5 write                                         | 2min     | constant-vus | Sustained load for regression detection        |
| `stress` | ramping (read 0 to 105, write 0 to 45, functional 0 to 1) | 5min     | ramping-vus  | Find breaking points and measure peak capacity |

The stress profile defines three independent stage lists. Each scenario uses one of them:

- **Read stages** (`read_operations`, `macaroon_derivation`): 0 to 18 over 30s, 18 to 53 over 60s,
  53 to 105 over 60s, hold 105 for 120s, 105 to 0 over 30s.
- **Write stages** (`key_lifecycle`, `import_lifecycle`, `self_revoke_lifecycle`,
  `batch_import_lifecycle`, `nid_isolation`): 0 to 7 over 30s, 7 to 22 over 60s, 22 to 45 over 60s,
  hold 45 for 120s, 45 to 0 over 30s.
- **Functional stages** (`pagination_cursor`, `batch_boundary`): 0 to 1 over 30s, hold 1 for 240s, 1
  to 0 over 30s.

During the hold, the aggregate VU count peaks at 437: 2 read scenarios × 105, 5 write scenarios ×
45, and 2 functional scenarios × 1.

## Run benchmarks

### Prerequisites

- [k6](https://k6.io/docs/get-started/installation/) load testing tool
- Docker (for local PostgreSQL) or an existing PostgreSQL instance
- The `psql` client (the runner uses it to wait for PostgreSQL and seed tenant networks)
- Go toolchain (to build the binary)

### Quick start

```shell
# Smoke test (quick validation)
TEST_PROFILE=smoke bash test/load/run.sh

# Load test (sustained)
TEST_PROFILE=load bash test/load/run.sh

# Stress test (peak capacity)
TEST_PROFILE=stress bash test/load/run.sh
```

The `run.sh` script builds the commercial binary, starts PostgreSQL in Docker, runs migrations,
seeds tenant data, starts the server, and runs k6. It tears down the container and server on exit.

### Use an existing database

```shell
SKIP_DOCKER=true DB_DSN="postgres://user:pass@host:5432/db?sslmode=disable" \
  TEST_PROFILE=load bash test/load/run.sh
```

### Environment variables

| Variable       | Default                                                            | Description                                    |
| -------------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| `TEST_PROFILE` | `smoke`                                                            | Test profile: `smoke`, `load`, or `stress`     |
| `BASE_URL`     | `http://localhost:4420`                                            | Server base URL                                |
| `AUTH_TOKEN`   | `test-token`                                                       | Bearer token for admin endpoints               |
| `DB_DSN`       | `postgres://talos:talos@localhost:5432/talos_test?sslmode=disable` | PostgreSQL connection string                   |
| `SKIP_DOCKER`  | `false`                                                            | Skip Docker PostgreSQL setup (use existing DB) |

## Thresholds

Each profile enforces regression thresholds. A run fails if it breaches any of them.

### Smoke and load profiles

| Metric      | Threshold | Rationale                               |
| ----------- | --------- | --------------------------------------- |
| All checks  | 100% pass | Zero tolerance for correctness failures |
| HTTP errors | 0%        | No errors allowed at low concurrency    |
| Overall p99 | < 500ms   | Wide headroom for CI runners            |
| Verify p95  | < 50ms    | ~25ms measured in CI (postgres)         |
| Verify p99  | < 100ms   | ~42ms measured in CI (postgres)         |

### Stress profile

| Metric      | Threshold | Rationale                             |
| ----------- | --------- | ------------------------------------- |
| All checks  | 100% pass | Correctness under load                |
| HTTP errors | < 1%      | Small tolerance for stress conditions |
| Overall p99 | < 400ms   | ~3x headroom over measured 123ms      |
| Verify p95  | < 100ms   | ~2x headroom over measured 48ms       |
| Verify p99  | < 200ms   | ~2x headroom over measured 95ms       |

## Interpret results

After a k6 run, check these metrics:

- **`checks` rate**: Must be 100%. Any failure indicates a correctness bug.
- **`http_req_duration` percentiles**: Compare against the thresholds above. A large increase
  suggests a regression.
- **`http_req_failed` rate**: 0% for smoke and load, under 1% for stress.
- **Custom counters** (`key_creations`, `verifications`, `token_derivations`): Compare rates against
  the reference results to catch throughput regressions.
- **`iteration_duration`**: End-to-end time for each VU iteration, across all operations.

The runner writes results to `.test/k6-output.txt` (human-readable), `.test/k6-results.json`
(per-data-point JSON), and `.test/k6-summary.json` (k6 summary export).
