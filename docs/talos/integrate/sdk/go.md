---
title: Go SDK
description: Using the generated Go HTTP client
---

# Go SDK

Talos provides a generated Go HTTP client based on the OpenAPI specification. The client is
generated using `openapi-generator` and lives in the `internal/client/generated` package.

:::note Internal package The Go client is in an `internal/` package and cannot be imported by
external Go modules. It is used for Talos's own integration tests and the admin UI backend. If you
need a Go client for your application, generate one from the OpenAPI spec at
`api/talos.openapi-v2.json` using [OpenAPI Generator](https://openapi-generator.tech/). :::

<!-- doctest:setup:file tools/doctest/setup.sh -->
<!-- doctest:teardown:file tools/doctest/teardown.sh -->

## Generate your own client

```bash
openapi-generator generate \
  -i api/talos.openapi-v2.json \
  -g go \
  -o generated/go-client
```

The examples below use the internal client's types for illustration. A generated external client has
the same API shape.

:::tip Full working example See
[`tools/doctest/examples/go_sdk/main.go`](https://github.com/ory-corp/talos/blob/dev/tools/doctest/examples/go_sdk/main.go)
for a complete, runnable program that exercises all operations shown below. :::

<!-- doctest:exec -->

```bash
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
issueResp, _, err := c.StaticCredentialsAPI.
	AdminIssueAPIKey(ctx).
	V2IssueAPIKeyRequest(client.V2IssueAPIKeyRequest{
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
verifyResp, _, err := c.StaticCredentialsAPI.
	AdminVerifyAPIKey(ctx).
	V2VerifyAPIKeyRequest(client.V2VerifyAPIKeyRequest{
		Credential: new(secret),
	}).
	Execute()
if err != nil {
	return fmt.Errorf("verify key: %w", err)
}

if verifyResp.GetIsActive() {
	fmt.Println("Key is valid, owner:", verifyResp.GetActorId())
} else {
	fmt.Println("Key is invalid:", verifyResp.GetErrorMessage())
}
```

## Batch verify

<!-- doctest:source tools/doctest/examples/go_sdk/main.go#batch-verify -->

```go
batchResp, _, err := c.StaticCredentialsAPI.
	AdminBatchVerifyAPIKeys(ctx).
	V2BatchVerifyAPIKeysRequest(client.V2BatchVerifyAPIKeysRequest{
		Requests: []client.V2VerifyAPIKeyRequest{
			{Credential: new(secret)},
			{Credential: new("invalid-key-for-testing")},
		},
	}).
	Execute()
if err != nil {
	return fmt.Errorf("batch verify: %w", err)
}

for i, result := range batchResp.GetResults() {
	fmt.Printf("Key %d: is_active=%v\n", i, result.GetIsActive())
}
```

## Revoke a key

Enum fields use typed constants, not raw strings:

<!-- doctest:source tools/doctest/examples/go_sdk/main.go#revoke-key -->

```go
reason := client.V2REVOCATIONREASON_REVOCATION_REASON_KEY_COMPROMISE
_, _, err = c.StaticCredentialsAPI.
	AdminRevokeAPIKey(ctx, keyID).
	StaticCredentialsAdminRevokeAPIKeyBody(client.StaticCredentialsAdminRevokeAPIKeyBody{
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
algorithm := client.V2TOKENALGORITHM_TOKEN_ALGORITHM_JWT
deriveResp, _, err := c.StaticCredentialsAPI.
	AdminDeriveToken(ctx).
	V2DeriveTokenRequest(client.V2DeriveTokenRequest{
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

The SDK returns errors for non-2xx responses. Use the HTTP response to inspect error details:

<!-- doctest:source tools/doctest/examples/go_sdk/main.go#error-handling -->

```go
_, httpResp, err := c.StaticCredentialsAPI.
	AdminGetIssuedAPIKey(ctx, "nonexistent-id").
	Execute()
if err != nil {
	if httpResp != nil {
		fmt.Println("HTTP status:", httpResp.StatusCode)
	}
}
```

## Regenerating the client

The Go SDK is regenerated with:

```bash
make generate-sdk
```

This reads the OpenAPI spec from `api/talos.openapi-v2.json` and outputs to
`internal/client/generated/`.
