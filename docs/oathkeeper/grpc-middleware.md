---
id: grpc-middleware
title: gRPC middleware
---

In addition to exposing Ory Oathkeeper as a HTTP proxy, you can directly embed it into your Go application as a gRPC middleware.
The gRPC traffic will then be handled by the middleware as if it were a standalone Ory Oathkeeper instance, just without the added
network hop.

:::danger

This feature is experimental and may change. We can give no compatibility guarantees regarding the API.

:::

This option is only available if you are using Go and gRPC.

You can use Ory Oathkeeper as a gRPC middleware thus:

```go
import (
	"github.com/ory/oathkeeper/middleware"
	"google.golang.org/grpc"
)

func setup() {
	oathkeeperMW, err := middleware.New(ctx, middleware.WithConfigFile("path/to/config"))
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create oathkeeper middleware: %w", err)
	}

 	s := grpc.NewServer(
		grpc.UnaryInterceptor(mw.UnaryInterceptor()),
		grpc.StreamInterceptor(mw.StreamInterceptor()),
	)

  // register your service to s, start the server, ...
}
```

The middleware will match only against explicit gRPC matchers, which you can use by specifying `authority` and `full_method` in
the JSON configuration:

```json
{
  "id": "some-id",
  "version": "v0.36.0-beta.4",
  // highlight-start
  "match": {
    "authority": "example.com",
    "full_method": "my.grpc.package/MyService/MyMethod"
  },
  // highlight-end
  "authenticators": [{ "handler": "noop" }],
  "authorizer": { "handler": "allow" },
  "mutators": [{ "handler": "noop" }],
  "errors": [{ "handler": "json" }]
}
```
