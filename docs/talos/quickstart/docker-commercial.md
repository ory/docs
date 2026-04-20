---
title: Docker quickstart (Commercial)
tags: [commercial]
sidebar_custom_props:
  badge: Commercial
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Docker quickstart (Commercial)

Run the Commercial edition with PostgreSQL and Redis using Docker Compose.

<!-- doctest:setup:file tools/doctest/setup-commercial.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

## Start the stack

```bash
docker compose -f docker-compose.commercial.yaml up -d
```

This starts Talos, PostgreSQL, and Redis. Migrations run automatically.

## Issue a key

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
# Note: rate_limit_policy is only available via the HTTP API.
RESPONSE=$(talos keys issue "commercial-test" \
  --actor user_1 \
  --scopes "read,write" \
  --ttl 168h \
  --format json \
  -e "$TALOS_URL" 2>/dev/null)

echo "$RESPONSE" | jq .

API_SECRET=$(echo "$RESPONSE" | jq -r '.secret')
echo "export API_SECRET=$API_SECRET" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
RESPONSE=$(curl -s -X POST "$TALOS_URL/v2/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "commercial-test",
    "actor_id": "user_1",
    "scopes": ["read", "write"],
    "ttl": "168h",
    "rate_limit_policy": {
      "quota": 1000,
      "window": "60s"
    }
  }')

echo "$RESPONSE" | jq .

API_SECRET=$(echo "$RESPONSE" | jq -r '.secret')
echo "export API_SECRET=$API_SECRET" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
</Tabs>

## Verify with caching

The first request hits the database; subsequent requests within the cache TTL are served from Redis:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys verify "$API_SECRET" -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X POST "$TALOS_URL/v2/admin/apiKeys:verify" \
  -H "Content-Type: application/json" \
  -d "{\"credential\":\"$API_SECRET\"}" | jq .
```

</TabItem>
</Tabs>

## Stop the stack

```bash
docker compose -f docker-compose.commercial.yaml down
```

To remove all data volumes:

```bash
docker compose -f docker-compose.commercial.yaml down -v
```

## Prerequisites

You need Docker and Docker Compose installed. See the [OSS quickstart](./index.md) to try the free
edition first.

## Next steps

- [Quickstart (OSS)](./index.md) — simpler setup with SQLite
- [Architecture](../concepts/architecture.md) — admin and data plane design
- [Caching](../concepts/caching.md) — cache behavior and consistency model
