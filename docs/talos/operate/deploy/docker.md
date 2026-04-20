---
title: Docker
---

# Docker

## Quick start

```bash
docker run -d \
  -p 4420:4420 \
  -e TALOS_SECRETS_DEFAULT_CURRENT="my-secret-must-be-at-least-32-characters-long" \
  -e TALOS_CREDENTIALS_ISSUER="http://localhost:4420" \
  -e TALOS_DB_DSN="sqlite:///data/talos.db" \
  -v talos-data:/data \
  oryd/talos:latest serve
```

## With config file

```bash
docker run -d \
  -p 4420:4420 \
  -v ./config.yaml:/etc/talos/config.yaml \
  -v talos-data:/data \
  oryd/talos:latest serve --config /etc/talos/config.yaml
```

## Run migrations

```bash
docker run --rm \
  -v talos-data:/data \
  oryd/talos:latest migrate up --database "sqlite:///data/talos.db"
```

## Health check

```yaml
healthcheck:
  test: ["CMD", "curl", "-sf", "http://localhost:4420/health/alive"]
  interval: 10s
  timeout: 5s
  retries: 3
```

## Docker Compose

```yaml
services:
  talos:
    image: oryd/talos:latest
    command: serve --config /etc/talos/config.yaml
    ports:
      - "4420:4420"
    volumes:
      - ./config.yaml:/etc/talos/config.yaml
      - talos-data:/data
    healthcheck:
      test: ["CMD", "curl", "-sf", "http://localhost:4420/health/alive"]
      interval: 10s
      timeout: 5s
      retries: 3

volumes:
  talos-data:
```
