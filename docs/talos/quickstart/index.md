---
title: Quickstart
description: Issue and verify your first API key in 5 minutes
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Quickstart

This guide walks you through issuing, verifying, and revoking an API key with Ory Talos using Docker
Compose. You need Docker. Examples use the Talos CLI (with curl as an alternative).

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

## Start the server

```bash
docker compose -f docker-compose.oss.yaml up --build -d
```

This starts Talos with SQLite, Jaeger for tracing, and the Admin UI (available at
http://localhost:3001). Migrations run automatically.

Wait for the server to become healthy:

```bash
# Wait for the health endpoint
for i in $(seq 1 30); do
  if curl -sf http://localhost:8080/health/alive > /dev/null 2>&1; then
    echo "Server is ready"
    break
  fi
  sleep 1
done
```

The server listens on `http://localhost:8080`. Check it's running:

<!-- doctest:exec -->

```bash
curl -sf "$TALOS_URL/health/alive" | head -c 200
```

## Issue an API key

Create an API key through the admin plane:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
RESPONSE=$(talos keys issue "My first key" \
  --actor quickstart-user \
  --scopes "read:*,write:*" \
  --ttl 168h \
  --format json \
  -e "$TALOS_URL" 2>/dev/null)

echo "$RESPONSE" | jq .

API_SECRET=$(echo "$RESPONSE" | jq -r '.secret')
KEY_ID=$(echo "$RESPONSE" | jq -r '.issued_api_key.key_id')

echo "export API_SECRET=$API_SECRET" >> "$DOCTEST_ENV_FILE"
echo "export KEY_ID=$KEY_ID" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
# Issue a key and capture the response
RESPONSE=$(curl -s -X POST "$TALOS_URL/v2alpha1/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My first key",
    "actor_id": "quickstart-user",
    "scopes": ["read:*", "write:*"],
    "ttl": "168h"
  }')

echo "$RESPONSE" | jq .

# Save the secret and key ID for later steps
API_SECRET=$(echo "$RESPONSE" | jq -r '.secret')
KEY_ID=$(echo "$RESPONSE" | jq -r '.issued_api_key.key_id')

echo "export API_SECRET=$API_SECRET" >> "$DOCTEST_ENV_FILE"
echo "export KEY_ID=$KEY_ID" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
</Tabs>

The response contains two parts:

- `issued_api_key` / `id` — the key metadata (ID, name, actor, scopes, expiration).
- `secret` — the full API key credential. This value is shown once. Store it securely.

## Verify the key

Send the secret to the data plane verify endpoint:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys verify "$API_SECRET" -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
VERIFY_RESPONSE=$(curl -s -X POST "$TALOS_URL/v2alpha1/admin/apiKeys:verify" \
  -H "Content-Type: application/json" \
  -d "{\"credential\":\"$API_SECRET\"}")

echo "$VERIFY_RESPONSE" | jq .
```

</TabItem>
</Tabs>

The response confirms the key is active and returns the associated metadata (actor, scopes,
expiration).

## Revoke the key

Revoke the key through the admin plane using its ID:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys revoke "$KEY_ID" --reason superseded -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X POST "$TALOS_URL/v2alpha1/admin/apiKeys/${KEY_ID}:revoke" \
  -H "Content-Type: application/json" \
  -d '{"reason":"REVOCATION_REASON_SUPERSEDED"}'
echo ""
echo "Key revoked"
```

</TabItem>
</Tabs>

Verify that the revoked key no longer passes verification:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys verify "$API_SECRET" --no-cache -e "$TALOS_URL" || true
echo "Revocation confirmed"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
REVOKE_CHECK=$(curl -s -X POST "$TALOS_URL/v2alpha1/admin/apiKeys:verify" \
  -H "Content-Type: application/json" \
  -H "Cache-Control: no-cache" \
  -d "{\"credential\":\"$API_SECRET\"}")

echo "$REVOKE_CHECK" | jq .

# Verify the key is no longer active
if echo "$REVOKE_CHECK" | jq -e '.is_active == false' > /dev/null 2>&1; then
  echo "Revocation confirmed"
else
  echo "ERROR: Key should have been revoked"
  exit 1
fi
```

</TabItem>
</Tabs>

Revocation is immediate. Even though the key is cryptographically valid, the server checks the
revocation list on every verification request.

## Stop the server

```bash
docker compose -f docker-compose.oss.yaml down
```

To remove all data volumes:

```bash
docker compose -f docker-compose.oss.yaml down -v
```

## Next steps

- **[Integration guide](../integrate/index.md)** — detailed API walkthrough for all credential
  operations
- **[Operations guide](../operate/index.md)** — install, configure, and deploy Talos in production
- **[Architecture](../concepts/architecture.md)** — how the admin and data planes work
