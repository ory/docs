---
title: Docker
---

:::warning

Don't use the `latest` tag in production. Pin to a specific Talos version (for example,
`oryd/talos:v1.2.3`) so a new release can't silently change behavior, break your configuration, or
run migrations on the next pull. Find the version you want on the
[GitHub releases](https://github.com/ory/talos/releases) page and update the tag deliberately. The
examples below use `<version-you-want>` as a placeholder — replace it with the exact version you
tested.

:::

## Quick start

```shell
docker run -d \
  -p 4420:4420 \
  -p 4422:4422 \
  -e TALOS_SECRETS_HMAC_CURRENT="my-secret-must-be-at-least-32-characters-long" \
  -e TALOS_CREDENTIALS_ISSUER="http://localhost:4420" \
  -e TALOS_DB_DSN="sqlite:///var/lib/talos/talos.db" \
  -v talos-data:/var/lib/talos \
  oryd/talos:<version-you-want> serve
```

Port 4420 serves the HTTP API. Port 4422 serves the `/health/alive` and `/health/ready` endpoints
used for health checks. In the commercial edition, port 4422 also serves the Prometheus `/metrics`
endpoint; the open source edition exposes only the health endpoints.

`serve` does not create the database schema. Run [migrations](#run-migrations) against the volume
before the first start, or the server starts but API requests fail against the empty database.

## With config file

```shell
docker run -d \
  -p 4420:4420 \
  -p 4422:4422 \
  -v ./config.yaml:/etc/talos/config.yaml \
  -v talos-data:/var/lib/talos \
  oryd/talos:<version-you-want> serve --config /etc/talos/config.yaml
```

## Run migrations

```shell
docker run --rm \
  -v talos-data:/var/lib/talos \
  oryd/talos:<version-you-want> migrate up --database "sqlite:///var/lib/talos/talos.db"
```

## Health check

```yaml
healthcheck:
  test: ["CMD", "wget", "-q", "--spider", "http://localhost:4422/health/alive"]
  interval: 10s
  timeout: 5s
  retries: 3
```

## Docker Compose

```yaml
services:
  # Run migrations once, then exit. The server waits for this to finish.
  talos-migrate:
    image: oryd/talos:<version-you-want>
    command: migrate up --database "sqlite:///var/lib/talos/talos.db"
    volumes:
      - talos-data:/var/lib/talos
    restart: "no"

  talos:
    image: oryd/talos:<version-you-want>
    command: serve --config /etc/talos/config.yaml
    depends_on:
      talos-migrate:
        condition: service_completed_successfully
    ports:
      - "4420:4420" # HTTP API
      - "4422:4422" # Health endpoints (and Prometheus metrics in the commercial edition)
    volumes:
      - ./config.yaml:/etc/talos/config.yaml
      - talos-data:/var/lib/talos
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:4422/health/alive"]
      interval: 10s
      timeout: 5s
      retries: 3

volumes:
  talos-data:
```
