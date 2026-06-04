---
title: Go SDK
description: Using the generated Go HTTP client
---

Talos generates a Go HTTP client from its OpenAPI spec with
[OpenAPI Generator](https://openapi-generator.tech/) and ships it in the `internal/client/generated`
package.

:::note

The client lives in an `internal/` package, so external Go modules can't import it. Talos uses it
for its own integration tests. To use a Go client in your own application, generate one from the
OpenAPI spec at `api/talos.openapi-v3.json`.

:::

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

## Generate your own client

```shell
openapi-generator generate \
  -i api/talos.openapi-v3.json \
  -g go \
  -o generated/go-client
```

The examples below use the internal client's types. A client you generate from the spec has the same
API shape.

:::tip

For a complete, runnable program that exercises every operation shown below, see
[`tools/doctest/examples/go_sdk/main.go`](https://github.com/ory/talos/blob/dev/tools/doctest/examples/go_sdk/main.go).

:::

<!-- doctest:exec -->

```shell
go build -o .bin/doctest-go-sdk ./tools/doctest/examples/go_sdk
./.bin/doctest-go-sdk
```

## Initialize the client

<!-- doctest:source tools/doctest/examples/go_sdk/main.go#init-client -->

```go
cfg := client.NewConfiguration()
cfg.Servers = client.ServerConfigurations{
	{URL: talosURL},
}
c := client.NewAPIClient(cfg)
```

## Issue an API key

<!-- doctest:source tools/doctest/examples/go_sdk/main.go#issue-key -->

```go
issueResp, _, err := c.ApiKeysAPI.
	AdminIssueApiKey(ctx).
	IssueApiKeyRequest(client.IssueApiKeyRequest{
		Name:    new("my-service"),
		ActorId: new("user_123"),
		Scopes:  []string{"read", "write"},
		Ttl:     new("720h"),
	}).
	Execute()
if err != nil {
	return fmt.Errorf("issue key: %w", err)
}

// Secret is only available at creation time
issuedKey := issueResp.GetIssuedApiKey()
fmt.Println("Key ID:", issuedKey.GetKeyId())
fmt.Println("Secret:", issueResp.GetSecret())
```

## Verify a credential

<!-- doctest:source tools/doctest/examples/go_sdk/main.go#verify-key -->

```go
verifyResp, _, err := c.ApiKeysAPI.
	AdminVerifyApiKey(ctx).
	VerifyApiKeyRequest(client.VerifyApiKeyRequest{
		Credential: new(secret),
	}).
	Execute()
if err != nil {
	return fmt.Errorf("verify key: %w", err)
}

if verifyResp.GetIsValid() {
	fmt.Println("Key is valid, owner:", verifyResp.GetActorId())
} else {
	fmt.Println("Key is invalid:", verifyResp.GetErrorMessage())
}
```

## Batch verify

<!-- doctest:source tools/doctest/examples/go_sdk/main.go#batch-verify -->

```go
batchResp, _, err := c.ApiKeysAPI.
	AdminBatchVerifyApiKeys(ctx).
	BatchVerifyApiKeysRequest(client.BatchVerifyApiKeysRequest{
		Requests: []client.VerifyApiKeyRequest{
			{Credential: new(secret)},
			{Credential: new("invalid-key-for-testing")},
		},
	}).
	Execute()
if err != nil {
	return fmt.Errorf("batch verify: %w", err)
}

for i, result := range batchResp.GetResults() {
	fmt.Printf("Key %d: is_valid=%v\n", i, result.GetIsValid())
}
```

## Revoke a key

Enum fields use typed constants, not raw strings:

<!-- doctest:source tools/doctest/examples/go_sdk/main.go#revoke-key -->

```go
reason := client.REVOCATIONREASON_REVOCATION_REASON_KEY_COMPROMISE
_, _, err = c.ApiKeysAPI.
	AdminRevokeIssuedApiKey(ctx, keyID).
	AdminRevokeIssuedApiKeyBody(client.AdminRevokeIssuedApiKeyBody{
		Reason: &reason,
	}).
	Execute()
if err != nil {
	return fmt.Errorf("revoke key: %w", err)
}
fmt.Println("Key revoked successfully")
```

## Derive a JWT token

<!-- doctest:source tools/doctest/examples/go_sdk/main.go#derive-jwt -->

```go
algorithm := client.TOKENALGORITHM_TOKEN_ALGORITHM_JWT
deriveResp, _, err := c.ApiKeysAPI.
	AdminDeriveToken(ctx).
	DeriveTokenRequest(client.DeriveTokenRequest{
		Credential: new(secret),
		Algorithm:  &algorithm,
		Ttl:        new("1h"),
		Scopes:     []string{"read"},
	}).
	Execute()
if err != nil {
	return fmt.Errorf("derive token: %w", err)
}

derivedToken := deriveResp.GetToken()
fmt.Println("JWT:", derivedToken.GetToken())
```

## Error handling

The SDK returns an error for every non-2xx response. The error wraps a
[`google.rpc.Status`](https://cloud.google.com/apis/design/errors#error_model) body. Read it through
the typed `GenericOpenAPIError` to get the canonical gRPC code, the message, and any `ErrorInfo`
details.

<!-- doctest:source tools/doctest/examples/go_sdk/main.go#error-handling -->

```go
_, httpResp, err := c.ApiKeysAPI.
	AdminGetIssuedApiKey(ctx, "nonexistent-id").
	Execute()
if err != nil {
	var apiErr *client.GenericOpenAPIError
	if errors.As(err, &apiErr) {
		var status struct {
			Code    int32  `json:"code"`
			Message string `json:"message"`
			Details []struct {
				Type     string            `json:"@type"`
				Reason   string            `json:"reason"`
				Domain   string            `json:"domain"`
				Metadata map[string]string `json:"metadata"`
			} `json:"details"`
		}
		if jsonErr := json.Unmarshal(apiErr.Body(), &status); jsonErr == nil {
			fmt.Println("gRPC code:", status.Code)           // 5 = NOT_FOUND
			fmt.Println("HTTP status:", httpResp.StatusCode) // 404
			fmt.Println("Message:", status.Message)
			for _, d := range status.Details {
				if strings.HasSuffix(d.Type, "ErrorInfo") {
					fmt.Println("Reason:", d.Reason) // Stable; switch on this
				}
			}
		}
	}
}
```

Match on `details[*].reason` from the `ErrorInfo` detail. It's the stable, machine-readable
identifier. The `message` field is for logs and can change between releases.

A failed verification is not an SDK error: the verify endpoint returns `200 OK` with
`is_valid: false`. Branch on `verifyResp.GetIsValid()` and inspect `verifyResp.GetErrorCode()`
instead.

## Regenerating the client

To regenerate the bundled Go client, run:

```shell
make generate-sdk
```

This reads the OpenAPI spec from `api/talos.openapi-v3.json` and writes to
`internal/client/generated/`.
