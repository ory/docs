---
title: curl cheat sheet
description: Every Ory Talos API endpoint as a copy-paste curl command
---

Replace `$TALOS_URL` with your Ory Talos server address (for example, `http://127.0.0.1:4420`).

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

## Admin: issued keys

### Issue a key

<!-- doctest:exec -->

```shell
RESPONSE=$(curl -s -X POST "$TALOS_URL/v2alpha1/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-service",
    "actor_id": "user_123",
    "scopes": ["read", "write"],
    "ttl": "720h",
    "metadata": {"team": "backend"}
  }')

echo "$RESPONSE" | jq .

export API_SECRET=$(echo "$RESPONSE" | jq -er '.secret')
export KEY_ID=$(echo "$RESPONSE" | jq -er '.issued_api_key.key_id')
```

### Get a key

<!-- doctest:exec -->

```shell
curl -s "$TALOS_URL/v2alpha1/admin/issuedApiKeys/$KEY_ID" | jq .
```

### List keys

<!-- doctest:exec -->

```shell
curl -s "$TALOS_URL/v2alpha1/admin/issuedApiKeys?page_size=50&filter=actor_id%3D%22user_123%22%20AND%20status%3DKEY_STATUS_ACTIVE" | jq .
```

### Update a key

<!-- doctest:exec -->

```shell
curl -s -X PATCH "$TALOS_URL/v2alpha1/admin/issuedApiKeys/$KEY_ID?update_mask=name,scopes" \
  -H "Content-Type: application/json" \
  -d "{
    \"issued_api_key\": {
      \"key_id\": \"$KEY_ID\",
      \"name\": \"updated-name\",
      \"scopes\": [\"read\"]
    }
  }" | jq .
```

### Rotate a key

<!-- doctest:exec -->

```shell
RESPONSE=$(curl -s -X POST "$TALOS_URL/v2alpha1/admin/issuedApiKeys/${KEY_ID}:rotate" \
  -H "Content-Type: application/json" \
  -d '{}')

echo "$RESPONSE" | jq .

export API_SECRET=$(echo "$RESPONSE" | jq -er '.secret')
```

## Admin: imported keys

### Import a key

<!-- doctest:exec -->

```shell
RESPONSE=$(curl -s -X POST "$TALOS_URL/v2alpha1/admin/importedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{
    "raw_key": "sk_live_abc123",
    "name": "External key",
    "actor_id": "user_123",
    "scopes": ["read"]
  }')

echo "$RESPONSE" | jq .

export IMPORTED_KEY_ID=$(echo "$RESPONSE" | jq -er '.key_id')
```

### Batch import

<!-- doctest:exec -->

```shell
curl -s -X POST "$TALOS_URL/v2alpha1/admin/importedApiKeys:batchCreate" \
  -H "Content-Type: application/json" \
  -d '{
    "requests": [
      {"raw_key": "key_1", "name": "Key 1", "actor_id": "user_1"},
      {"raw_key": "key_2", "name": "Key 2", "actor_id": "user_2"}
    ]
  }' | jq .
```

### Get an imported key

<!-- doctest:exec -->

```shell
curl -s "$TALOS_URL/v2alpha1/admin/importedApiKeys/$IMPORTED_KEY_ID" | jq .
```

### List imported keys

<!-- doctest:exec -->

```shell
curl -s "$TALOS_URL/v2alpha1/admin/importedApiKeys?page_size=50&filter=actor_id%3D%22user_123%22" | jq .
```

### Delete an imported key

<!-- doctest:exec -->

```shell
curl -s -X DELETE "$TALOS_URL/v2alpha1/admin/importedApiKeys/$IMPORTED_KEY_ID" | jq .
```

## Admin: token derivation

### Derive a JWT token

<!-- doctest:exec -->

```shell
RESPONSE=$(curl -s -X POST "$TALOS_URL/v2alpha1/admin/apiKeys:derive" \
  -H "Content-Type: application/json" \
  -d "{
    \"credential\": \"$API_SECRET\",
    \"algorithm\": \"TOKEN_ALGORITHM_JWT\",
    \"ttl\": \"1h\",
    \"scopes\": [\"read\"],
    \"custom_claims\": {\"role\": \"viewer\"}
  }")

echo "$RESPONSE" | jq .

export JWT_TOKEN=$(echo "$RESPONSE" | jq -er '.token.token')
```

### Derive a macaroon token

<!-- doctest:exec -->

```shell
curl -s -X POST "$TALOS_URL/v2alpha1/admin/apiKeys:derive" \
  -H "Content-Type: application/json" \
  -d "{
    \"credential\": \"$API_SECRET\",
    \"algorithm\": \"TOKEN_ALGORITHM_MACAROON\",
    \"ttl\": \"30m\"
  }" | jq .
```

## Public: JWKS

### Get JWKS (public keys)

<!-- doctest:exec -->

```shell
curl -s "$TALOS_URL/v2alpha1/derivedKeys/jwks.json" | jq .
```

## Admin: verification

### Verify a credential

<!-- doctest:exec -->

```shell
curl -s -X POST "$TALOS_URL/v2alpha1/admin/apiKeys:verify" \
  -H "Content-Type: application/json" \
  -d "{\"credential\":\"$API_SECRET\"}" | jq .
```

### Verify with cache bypass

<!-- doctest:exec -->

```shell
curl -s -X POST "$TALOS_URL/v2alpha1/admin/apiKeys:verify" \
  -H "Content-Type: application/json" \
  -H "Cache-Control: no-cache" \
  -d "{\"credential\":\"$API_SECRET\"}" | jq .
```

### Batch verify

<!-- doctest:exec -->

```shell
curl -s -X POST "$TALOS_URL/v2alpha1/admin/apiKeys:batchVerify" \
  -H "Content-Type: application/json" \
  -d "{
    \"requests\": [
      {\"credential\": \"$API_SECRET\"},
      {\"credential\": \"$JWT_TOKEN\"}
    ]
  }" | jq .
```

## Revocation

### Revoke a key (admin)

Revoke by `key_id`. Revoking an already-revoked key returns HTTP 409, so this example issues a fresh
key first.

<!-- doctest:exec -->

```shell
REVOKE_RESP=$(curl -s -X POST "$TALOS_URL/v2alpha1/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{"name":"revoke-demo","actor_id":"user_123"}')

REVOKE_KEY_ID=$(echo "$REVOKE_RESP" | jq -er '.issued_api_key.key_id')

curl -s -X POST "$TALOS_URL/v2alpha1/admin/apiKeys/${REVOKE_KEY_ID}:revoke" \
  -H "Content-Type: application/json" \
  -d '{"reason": "REVOCATION_REASON_KEY_COMPROMISE"}' | jq .
```

### Self-revoke a key

<!-- doctest:exec -->

```shell
# Issue a fresh key for the self-revocation demo
SELF_REVOKE_RESP=$(curl -s -X POST "$TALOS_URL/v2alpha1/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{"name":"self-revoke-demo","actor_id":"user_123"}')

SELF_REVOKE_SECRET=$(echo "$SELF_REVOKE_RESP" | jq -er '.secret')

curl -s -X POST "$TALOS_URL/v2alpha1/apiKeys:selfRevoke" \
  -H "Content-Type: application/json" \
  -d "{
    \"credential\": \"$SELF_REVOKE_SECRET\",
    \"reason\": \"REVOCATION_REASON_KEY_COMPROMISE\"
  }" | jq .
```

## Health checks

<!-- doctest:exec -->

```shell
# Liveness
curl -s "$TALOS_URL/health/alive" | jq .

# Readiness
curl -s "$TALOS_URL/health/ready" | jq .
```
