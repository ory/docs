---
title: Self-revocation
description: Allow API key holders to revoke their own keys
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Self-revocation

The self-revoke endpoint lets an API key holder revoke their own key by proving possession of the secret. This is a data plane
operation — it does not require admin access.

## Prerequisites

A running Talos server. See the [quickstart](../quickstart/index.md) to start one locally.

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

## When to use self-revocation

- **Key compromise** — a user discovers their key was leaked and wants to revoke it immediately.
- **User-initiated cleanup** — a user decommissions an integration and revokes unused keys.
- **Security automation** — an automated system detects anomalous usage and revokes the key.

## Self-revoke a key

First, issue a key to get a secret:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
SELF_REVOKE_SECRET=$(talos keys issue "self-revoke-demo" \
  --actor user_99 \
  --scopes "read:data" \
  --format json \
  -e "$TALOS_URL" 2>/dev/null | jq -r '.secret')
echo "export SELF_REVOKE_SECRET=$SELF_REVOKE_SECRET" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
ISSUE_RESPONSE=$(curl -s -X POST "$TALOS_URL/v2/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "self-revoke-demo",
    "actor_id": "user_99",
    "scopes": ["read:data"]
  }')

SELF_REVOKE_SECRET=$(echo "$ISSUE_RESPONSE" | jq -r '.secret')
echo "export SELF_REVOKE_SECRET=$SELF_REVOKE_SECRET" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
</Tabs>

Send the full key secret as proof of possession:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys self-revoke "$SELF_REVOKE_SECRET" \
  --reason key_compromise \
  -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X POST "$TALOS_URL/v2/apiKeys:selfRevoke" \
  -H "Content-Type: application/json" \
  -d "{
    \"credential\": \"$SELF_REVOKE_SECRET\",
    \"reason\": \"REVOCATION_REASON_KEY_COMPROMISE\"
  }"
echo ""
echo "Key self-revoked"
```

</TabItem>
</Tabs>

Verify the key is no longer active:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys verify "$SELF_REVOKE_SECRET" --no-cache -e "$TALOS_URL" || true
echo "Self-revocation confirmed"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
VERIFY_RESPONSE=$(curl -s -X POST "$TALOS_URL/v2/admin/apiKeys:verify" \
  -H "Content-Type: application/json" \
  -H "Cache-Control: no-cache" \
  -d "{\"credential\":\"$SELF_REVOKE_SECRET\"}")

echo "$VERIFY_RESPONSE" | jq .

if echo "$VERIFY_RESPONSE" | jq -e '.is_active == false' > /dev/null 2>&1; then
  echo "Self-revocation confirmed"
else
  echo "ERROR: Key should have been revoked"
  exit 1
fi
```

</TabItem>
</Tabs>

The request requires `credential` (the full API key secret) and optionally `reason` (revocation reason enum). For the complete
field reference, see the [SelfRevokeAPIKey API reference](../reference/api/revoke-api-key.api.mdx).

Only issued and imported API keys can be self-revoked. Derived tokens (JWTs and macaroons) are stateless and cannot be revoked.
All revocation reasons except `REVOCATION_REASON_PRIVILEGE_WITHDRAWN` are allowed — that reason is reserved for admin-initiated
revocations.

A successful self-revocation returns an empty response with HTTP status `200 OK`. The key is immediately revoked.

## Admin vs self-revocation

|                       | Admin revocation                         | Self-revocation                  |
| --------------------- | ---------------------------------------- | -------------------------------- |
| Endpoint              | `POST /v2/admin/apiKeys/{key_id}:revoke` | `POST /v2/apiKeys:selfRevoke`    |
| Plane                 | Admin                                    | Data                             |
| Authentication        | Requires admin access                    | Proof of possession (key secret) |
| Identifier            | Key ID                                   | Key secret                       |
| `PRIVILEGE_WITHDRAWN` | Allowed                                  | Not allowed                      |

## Next steps

- [Key lifecycle](key-lifecycle.md) — admin-side key management
- [Error handling](error-handling.md) — handle revocation errors
