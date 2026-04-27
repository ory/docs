---
title: Early-access quickstart
---

```mdx-code-block
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';
```

# Early-access quickstart

Ory Talos is Ory's API key management service. This guide shows how to pull the public early-access
commercial image, start a local Postgres-backed Ory Talos instance, and run the headline flows for
issued and imported API keys. You only need Docker for the bring-up steps below; the `curl`
examples are the preview baseline, and the Talos CLI is shown as an optional alternative.

## Pull the image

```bash
docker pull europe-docker.pkg.dev/ory-artifacts/ory-enterprise-talos/talos-oel:26.2.6
```

## Start Postgres

```bash
docker network create talos-preview
docker run -d --name talos-postgres --network talos-preview \
  -e POSTGRES_USER=talos -e POSTGRES_PASSWORD=talos -e POSTGRES_DB=talos \
  -p 5432:5432 postgres:16-alpine
```

## Configure Talos

Create `config.yaml` in your working directory:

```yaml
serve:
  http: { host: "0.0.0.0", port: 8080 }
  metrics: { host: "0.0.0.0", port: 4422 }

credentials:
  issuer: "http://localhost:8080"
  api_keys:
    default_ttl: "720h"
    prefix: { current: "talos" }
  derived_tokens:
    default_ttl: "1h"
    jwt:
      algorithm: "EdDSA"
      signing_keys:
        urls:
          - "base64://eyAgImtleXMiOiBbICAgIHsgICAgICAiYWxnIjogIkVkRFNBIiwgICAgICAiY3J2IjogIkVkMjU1MTkiLCAgICAgICJkIjogIjl3VTNfV3p0dmx3TXg0SGlfN2dsSVduY09XNlVIR2I5amxDdDZEZkVGa2MiLCAgICAgICJraWQiOiAiZG9ja2VyLWRldi0wMDEiLCAgICAgICJrdHkiOiAiT0tQIiwgICAgICAidXNlIjogInNpZyIsICAgICAgIngiOiAiNGtTQTdtNU5jYnFDUC1mZk9fNGhQM2tsNHB0NGctLTNRQ21zQmwzb05lVSIgICAgfSAgXX0="
    macaroon:
      prefix: { current: "mc" }

db:
  dsn: "postgres://talos:talos@talos-postgres:5432/talos?sslmode=disable"

secrets:
  default:    { current: "preview-default-secret-minimum-32-chars-long" }
  hmac:       { current: "preview-hmac-secret-minimum-32-chars-long" }
  pagination: { current: "preview-pagination-secret-32-chars-min" }

cache: { type: "memory", ttl: "5m" }
multitenancy: { enabled: false }
log: { level: "info", format: "json" }
```

:::caution

This config embeds the development EdDSA JWK from `deployments/docker/config/config.yaml`. Replace
it before any non-preview use because the private key is published in the source tree.

:::

## Run database migrations

Initialize the Postgres schema before the first server start:

```bash
docker run --rm --network talos-preview \
  europe-docker.pkg.dev/ory-artifacts/ory-enterprise-talos/talos-oel:26.2.6 \
  migrate up --database "postgres://talos:talos@talos-postgres:5432/talos?sslmode=disable"
```

## Start Talos

```bash
docker run -d --name talos --network talos-preview \
  -p 8080:8080 -p 4422:4422 \
  -v "$PWD/config.yaml:/etc/talos/config.yaml:ro" \
  europe-docker.pkg.dev/ory-artifacts/ory-enterprise-talos/talos-oel:26.2.6 \
  serve --config /etc/talos/config.yaml
```

This starts a single-tenant Talos commercial server with in-memory cache.

## Wait for the server to become ready

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

The bring-up commands above are for local preview users. The executable API examples below are
tested in CI against the commercial docs harness.

<!-- doctest:setup:file tools/doctest/setup-commercial.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

Set the base URL for the local server:

```bash
export TALOS_URL="${TALOS_URL:-http://localhost:8080}"
```

## Issue an API key

Create an issued key on the admin plane and save its secret for later steps. For the complete field
reference, see the [IssueAPIKey API reference](../reference/api/admin-issue-api-key.api.mdx).

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="curl">
<TabItem value="cli" label="CLI">

```bash
RESPONSE=$(talos keys issue "preview-issued-key" \
  --actor preview-user \
  --scopes "read:profile,write:profile" \
  --ttl 720h \
  --format json \
  -e "$TALOS_URL" 2>/dev/null)

echo "$RESPONSE" | jq .

API_SECRET=$(echo "$RESPONSE" | jq -r '.secret')
KEY_ID=$(echo "$RESPONSE" | jq -r '.issued_api_key.key_id')

export API_SECRET=$API_SECRET
export KEY_ID=$KEY_ID
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
RESPONSE=$(curl -s -X POST "$TALOS_URL/v2/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "preview-issued-key",
    "actor_id": "preview-user",
    "scopes": ["read:profile", "write:profile"],
    "ttl": "720h"
  }')

echo "$RESPONSE" | jq .

API_SECRET=$(echo "$RESPONSE" | jq -r '.secret')
KEY_ID=$(echo "$RESPONSE" | jq -r '.issued_api_key.key_id')

export API_SECRET=$API_SECRET
export KEY_ID=$KEY_ID
```

</TabItem>
</Tabs>

The response returns `issued_api_key` metadata plus `secret`, which is shown only once. Store the
secret securely.

## Verify the issued key

Send the issued key secret to the unified verify endpoint. For the full response fields and error
codes, see the [VerifyAPIKey API reference](../reference/api/admin-verify-api-key.api.mdx).

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="curl">
<TabItem value="cli" label="CLI">

```bash
talos keys verify "$API_SECRET" -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
VERIFY_RESPONSE=$(curl -s -X POST "$TALOS_URL/v2/admin/apiKeys:verify" \
  -H "Content-Type: application/json" \
  -d "{\"credential\":\"$API_SECRET\"}")

echo "$VERIFY_RESPONSE" | jq .
```

</TabItem>
</Tabs>

An active result includes `is_active: true` plus the key's actor, scopes, issuer, and expiration.

## Derive a JWT from the issued key

Mint a short-lived JWT from the issued key with a custom claim. For the full request and response
schema, see the [DeriveToken API reference](../reference/api/admin-derive-token.api.mdx).

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="curl">
<TabItem value="cli" label="CLI">

```bash
RESPONSE=$(talos keys derive-token "$API_SECRET" \
  --algorithm jwt \
  --ttl 1h \
  --claims '{"role":"preview-user","environment":"demo"}' \
  --format json \
  -e "$TALOS_URL" 2>/dev/null)

echo "$RESPONSE" | jq .

JWT_TOKEN=$(echo "$RESPONSE" | jq -r '.token.token')
export JWT_TOKEN=$JWT_TOKEN
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
RESPONSE=$(curl -s -X POST "$TALOS_URL/v2/admin/apiKeys:derive" \
  -H "Content-Type: application/json" \
  -d "{
    \"credential\": \"$API_SECRET\",
    \"algorithm\": \"TOKEN_ALGORITHM_JWT\",
    \"ttl\": \"1h\",
    \"custom_claims\": {\"role\": \"preview-user\", \"environment\": \"demo\"}
  }")

echo "$RESPONSE" | jq .

JWT_TOKEN=$(echo "$RESPONSE" | jq -r '.token.token')
export JWT_TOKEN=$JWT_TOKEN
```

</TabItem>
</Tabs>

The derived token inherits the parent key's permissions and returns as `token.token` with its own
expiry metadata.

## Import an existing API key

Import a raw key string into Talos without rotating the credential. For the complete field
reference, see the [ImportAPIKey API reference](../reference/api/admin-import-api-key.api.mdx).

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="curl">
<TabItem value="cli" label="CLI">

```bash
IMPORTED_RAW_KEY=sk_preview_demo_001

RESPONSE=$(talos keys imported import "preview-imported-key" \
  --raw-key "$IMPORTED_RAW_KEY" \
  --actor preview-import-user \
  --scopes "payments:read,payments:write" \
  --ttl 720h \
  --format json \
  -e "$TALOS_URL" 2>/dev/null)

echo "$RESPONSE" | jq .

IMPORTED_KEY_ID=$(echo "$RESPONSE" | jq -r '.imported_api_key.key_id')

export IMPORTED_RAW_KEY=$IMPORTED_RAW_KEY
export IMPORTED_KEY_ID=$IMPORTED_KEY_ID
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
IMPORTED_RAW_KEY=sk_preview_demo_001

RESPONSE=$(curl -s -X POST "$TALOS_URL/v2/admin/importedApiKeys" \
  -H "Content-Type: application/json" \
  -d "{
    \"raw_key\": \"$IMPORTED_RAW_KEY\",
    \"name\": \"preview-imported-key\",
    \"actor_id\": \"preview-import-user\",
    \"scopes\": [\"payments:read\", \"payments:write\"],
    \"ttl\": \"720h\"
  }")

echo "$RESPONSE" | jq .

IMPORTED_KEY_ID=$(echo "$RESPONSE" | jq -r '.imported_api_key.key_id')

export IMPORTED_RAW_KEY=$IMPORTED_RAW_KEY
export IMPORTED_KEY_ID=$IMPORTED_KEY_ID
```

</TabItem>
</Tabs>

Talos stores a cryptographic representation of the imported credential. The raw key is never
returned after import.

## Verify the imported key

Imported keys use the same verify endpoint as issued keys. Talos detects the credential type
automatically.

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="curl">
<TabItem value="cli" label="CLI">

```bash
talos keys verify "$IMPORTED_RAW_KEY" -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
VERIFY_RESPONSE=$(curl -s -X POST "$TALOS_URL/v2/admin/apiKeys:verify" \
  -H "Content-Type: application/json" \
  -d "{\"credential\":\"$IMPORTED_RAW_KEY\"}")

echo "$VERIFY_RESPONSE" | jq .
```

</TabItem>
</Tabs>

## Stop the preview

```bash
docker rm -f talos talos-postgres
docker network rm talos-preview
```

## Next steps

- [Issue and verify API keys](../integrate/issue-and-verify.md) — issued-key lifecycle in depth
- [Import existing keys](../integrate/import-keys.md) — batch import and hashing behavior
- [Derive tokens](../integrate/derive-tokens.md) — JWT vs macaroon and JWKS usage
- [Key lifecycle](../integrate/key-lifecycle.md) — rotate, update, and revoke credentials
- [Architecture](../concepts/architecture.md) — admin and data plane separation
- [Cache configuration](../operate/cache/index.md) — switch from memory cache to Redis
- [Docker quickstart (Commercial)](./docker-commercial.md) — full repo-based compose stack
