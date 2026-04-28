---
title: IP restrictions
description: Restrict API key usage to specific IP addresses or CIDR ranges
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# IP restrictions

IP restrictions let you limit which client IPs can use an API key. When enabled, verification
rejects requests from IPs outside the allowed CIDR ranges. Keys without IP restrictions are
unrestricted.

## Prerequisites

A running Talos server. See the [quickstart](../quickstart/index.md) to start one locally.

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

## Configure client IP source

By default, Talos uses the TCP remote address (`REMOTE_ADDR`) to determine client IP. If your server
runs behind a reverse proxy or CDN, configure the correct header in your Talos config:

```yaml
serve:
  http:
    client_ip_source: CLIENT_IP_SOURCE_CF_CONNECTING_IP
```

Supported values:

- `CLIENT_IP_SOURCE_UNSPECIFIED` or `CLIENT_IP_SOURCE_REMOTE_ADDR` — TCP remote address (default)
- `CLIENT_IP_SOURCE_CF_CONNECTING_IP` — Cloudflare
- `CLIENT_IP_SOURCE_X_FORWARDED_FOR` — Standard proxy header
- `CLIENT_IP_SOURCE_X_REAL_IP` — Nginx
- `CLIENT_IP_SOURCE_TRUE_CLIENT_IP` — Cloudflare Enterprise

This is a global setting — all IP restriction checks use the same source. Set it once to match your
infrastructure topology.

## Issue a key with IP restrictions

Add the `ip_restriction` field when creating a key. The `allowed_cidrs` array accepts both
individual IPs (with `/32` or `/128` suffix) and CIDR ranges:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
RESPONSE=$(talos keys issue "restricted-key" \
  --actor service_payments \
  --allowed-cidrs "127.0.0.1/32,10.0.0.0/8" \
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
RESPONSE=$(curl -s -X POST "$TALOS_URL/v2alpha1/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "restricted-key",
    "actor_id": "service_payments",
    "ip_restriction": {
      "allowed_cidrs": ["127.0.0.1/32", "10.0.0.0/8"]
    }
  }')

echo "$RESPONSE" | jq .

API_SECRET=$(echo "$RESPONSE" | jq -r '.secret')
KEY_ID=$(echo "$RESPONSE" | jq -r '.issued_api_key.key_id')

echo "export API_SECRET=$API_SECRET" >> "$DOCTEST_ENV_FILE"
echo "export KEY_ID=$KEY_ID" >> "$DOCTEST_ENV_FILE"
```

</TabItem>
</Tabs>

For the complete request field reference, see the
[IssueAPIKey API reference](../reference/api/admin-issue-api-key.api.mdx).

## Verify from an allowed IP

When the client IP is within an allowed CIDR range, verification succeeds:

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
  -d "{\"credential\": \"$API_SECRET\"}")

echo "$VERIFY_RESPONSE" | jq .
```

</TabItem>
</Tabs>

The response includes the key metadata with `is_active: true`.

## Verification from a disallowed IP

When the client IP is outside all allowed CIDR ranges, verification returns
`VERIFICATION_ERROR_IP_NOT_ALLOWED`. The response does not reveal which CIDRs are configured.

For the full list of verification error codes, see the
[error codes reference](../reference/error-codes.md#verification-error-codes).

## Update IP restrictions on an existing key

Use `PATCH` to add, change, or remove IP restrictions on an existing key:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys issued update "$KEY_ID" \
  --allowed-cidrs "10.0.0.0/8,172.16.0.0/12,192.168.0.0/16" \
  -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
UPDATE_RESPONSE=$(curl -s -X PATCH "$TALOS_URL/v2alpha1/admin/issuedApiKeys/$KEY_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "ip_restriction": {
      "allowed_cidrs": ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"]
    }
  }')

echo "$UPDATE_RESPONSE" | jq .
```

</TabItem>
</Tabs>

To remove all IP restrictions (making the key unrestricted), set `allowed_cidrs` to an empty array:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys issued update "$KEY_ID" \
  --allowed-cidrs "" \
  -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
UNRESTRICT_RESPONSE=$(curl -s -X PATCH "$TALOS_URL/v2alpha1/admin/issuedApiKeys/$KEY_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "ip_restriction": {
      "allowed_cidrs": []
    }
  }')

echo "$UNRESTRICT_RESPONSE" | jq .
```

</TabItem>
</Tabs>

For the complete update field reference, see the
[UpdateIssuedAPIKey API reference](../reference/api/admin-update-issued-api-key.api.mdx).

## Import keys with IP restrictions

You can also set IP restrictions when importing external keys:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
talos keys imported import "imported-restricted" \
  --raw-key "sk_live_example_key_for_import_test" \
  --actor "user_restrict" \
  --allowed-cidrs "203.0.113.0/24" \
  -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
IMPORT_RESPONSE=$(curl -s -X POST "$TALOS_URL/v2alpha1/admin/importedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "imported-restricted",
    "raw_key": "sk_live_example_key_for_import_test",
    "actor_id": "user_restrict",
    "ip_restriction": {
      "allowed_cidrs": ["203.0.113.0/24"]
    }
  }')

echo "$IMPORT_RESPONSE" | jq .
```

</TabItem>
</Tabs>

For the complete import field reference, see the
[ImportAPIKey API reference](../reference/api/admin-import-api-key.api.mdx).

## Behavior notes

- **Allowlist model**: Only listed CIDRs are permitted. An empty `allowed_cidrs` array means the key
  is unrestricted (all IPs allowed).
- **Cache TTL**: IP restriction changes take effect after the cache TTL expires. See
  [cache configuration](../operate/cache/index.md) for TTL settings.
- **Fail-closed**: If client IP resolution fails, the request is denied.
- **IPv4 and IPv6**: Both address families are supported. Use `/32` for single IPv4 addresses and
  `/128` for single IPv6 addresses.
- **Derived tokens**: IP restrictions apply to the underlying API key, not to derived tokens
  (JWTs/macaroons). Token verification checks the key's IP restrictions at derivation time.
