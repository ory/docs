---
title: Error handling
description: Error response format, error codes, and retry logic
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Error handling

All Talos API errors follow the [google.rpc.Status](https://cloud.google.com/apis/design/errors#error_model)
shape. This guide covers the error response structure, common error codes, and retry strategies.

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

## Error response format

Every non-2xx response uses the `google.rpc.Status` envelope:

```json
{
  "code": 5,
  "message": "API key not found",
  "details": [
    {
      "@type": "type.googleapis.com/google.rpc.ErrorInfo",
      "reason": "API_KEY_NOT_FOUND",
      "domain": "talos.ory.sh",
      "metadata": {
        "key_id": "01J9X7…"
      }
    }
  ]
}
```

| Field     | Description                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------ |
| `code`    | Canonical [gRPC status code](https://grpc.github.io/grpc/core/md_doc_statuscodes.html) (integer 0-16). |
| `message` | Human-readable summary. Suitable for logging, not for end-user display.                                |
| `details` | Optional list of typed error details. `ErrorInfo` carries the machine-readable `reason`.               |

The HTTP status code is set from the canonical
[gRPC-to-HTTP mapping](https://cloud.google.com/apis/design/errors#http_mapping). For example, code
`5` (`NOT_FOUND`) returns HTTP 404; code `7` (`PERMISSION_DENIED`) returns HTTP 403.

### Reading the reason

The stable, machine-readable identifier is `details[*].reason` on the `ErrorInfo` detail. Match on
`reason` — never on `message`, which can change between releases.

```bash
REASON=$(echo "$RESPONSE" | jq -r '.details[]? | select(."@type" | endswith("ErrorInfo")).reason')
```

## Verification errors

The verify endpoint (`POST /v2alpha1/admin/apiKeys:verify`) is the one exception. A verification
failure is part of the normal verification result, not a transport-level error, so it returns
`200 OK` with `is_active: false` and a structured error code:

```json
{
  "is_active": false,
  "error_code": "VERIFICATION_ERROR_REVOKED",
  "error_message": "The API key has been revoked."
}
```

Treat the response as successful; act on `is_active` and `error_code`. Only fall back to the
`google.rpc.Status` handling above when the HTTP status is not 2xx (for example, the verify request
itself was malformed).

For the complete list of verification error codes (`VERIFICATION_ERROR_*`), see the
[error codes reference](../reference/error-codes.md#verification-error-codes).

## HTTP status codes

For the complete list of HTTP status codes and reasons, see the
[error codes reference](../reference/error-codes.md).

Key categories:

- **4xx errors**: Client errors (bad request, not found, conflict). Fix the request before retrying.
- **5xx errors**: Server errors. Retry with exponential backoff.

## Retry strategy

### Safe to retry

- **`UNAVAILABLE` (HTTP 503)** — the server is temporarily overloaded. Retry with exponential
  backoff.
- **`DEADLINE_EXCEEDED` (HTTP 504)** — the request timed out. Retry with backoff.
- **Network errors** — connection refused, DNS failure, etc. Retry with backoff.

### Not safe to retry without an idempotency key

- **`ALREADY_EXISTS` (HTTP 409)** — the resource already exists. Read the existing resource and
  reconcile.
- **`INVALID_ARGUMENT` (HTTP 400)** / **`FAILED_PRECONDITION` (HTTP 400)** — fix the request before
  retrying.

### Idempotency key

When issuing API keys, include `request_id` in the request body. This field is stored on the key
for client-side deduplication:

<!-- doctest:exec -->

<Tabs groupId="sdk" defaultValue="cli">
<TabItem value="cli" label="CLI">

```bash
# Note: request_id is only available via the HTTP API.
talos keys issue "my-service" --actor user_1 -e "$TALOS_URL"
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -s -X POST "$TALOS_URL/v2alpha1/admin/issuedApiKeys" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-service",
    "actor_id": "user_1",
    "request_id": "unique-request-id-123"
  }' | jq .
```

</TabItem>
</Tabs>

The `request_id` is recorded in the key's metadata. The server does not enforce server-side
idempotent replay — sending the same `request_id` twice creates two keys.

## Recommended backoff

```
attempt 1: wait 100ms
attempt 2: wait 200ms
attempt 3: wait 400ms
attempt 4: wait 800ms
attempt 5: wait 1600ms (give up after this)
```

Add jitter (random 0-50% of the wait time) to avoid thundering-herd effects.

## Next steps

- [Issue and verify](issue-and-verify.md) — verification response format
- [Batch operations](batch-operations.md) — partial failure handling
