---
id: version-oryOS.11-go
title: Go
original_id: go
---

To install the Go SDK, run:

```
go get -u -d github.com/ory/hydra/sdk/go/...
```

## Configuration

We use code generation to generate our SDKs. The Go SDK is generated using
[`go-swagger`](http://goswagger.io). The SDK is easily set up:

```go
import "github.com/ory/hydra/sdk/go/hydra/client"

func main() {
    adminURL := url.Parse("https://hydra.localhost:4445")
    admin := hydra.NewHTTPClientWithConfig(nil, &client.TransportConfig{Schemes: []string{adminURL.Scheme}, Host: adminURL.Host, BasePath: adminURL.Path})
    
    // admin.Admin.CreateOAuth2Client(...
    
    publicURL := url.Parse("https://hydra.localhost:4444")
    public := hydra.NewHTTPClientWithConfig(nil, &client.TransportConfig{Schemes: []string{publicURL.Scheme}, Host: publicURL.Host, BasePath: publicURL.Path})
    
    // public.Public.RevokeOAuth2Token(...
}
```

> Be aware that endpoints /oauth2/auth and /oauth2/token MUST NOT be consumed using this SDK. Use [golang.org/x/oauth2](https://godoc.org/golang.org/x/oauth2)
instead.

## Making requests

Making requests is straight forward:

```go
import "github.com/ory/hydra/sdk/go/hydra/client"

func main() {
    adminURL := url.Parse("https://hydra.localhost:4445")
    admin := hydra.NewHTTPClientWithConfig(nil, &client.TransportConfig{Schemes: []string{adminURL.Scheme}, Host: adminURL.Host, BasePath: adminURL.Path})
    
    // It is important to create the parameters using `New...`, otherwise requests will fail!
    result, err := c.Admin.CreateOAuth2Client(
        admin.NewCreateOAuth2ClientParams().WithBody(&models.Client{
        ClientID: "scoped",
    }))
    if err != nil {
        // err is not nil when the request failed (usually a 404, 401, 409 error)
        // You can distinguish the errors by type-asserting err, for example:
        switch e := err.(type) {
        case (*admin.CreateOAuth2ClientConflict):
            // do something...
        }
    }
    
    // if err is nil, then result is set. The result payload/body can be retrieved using result.Payload.
    fmt.Printf("Got client: %+v", result.Payload)
}
```

## With Authorization

Some endpoints require e.g. Basic Authorization:

```go
import "github.com/ory/hydra/sdk/go/hydra/client"
import httptransport "github.com/go-openapi/runtime/client"

func main() {
    publicURL := url.Parse("https://hydra.localhost:4444")
    public := hydra.NewHTTPClientWithConfig(nil, &client.TransportConfig{Schemes: []string{publicURL.Scheme}, Host: publicURL.Host, BasePath: publicURL.Path})
    
    _, err := client.Public.RevokeOAuth2Token(
        public.NewRevokeOAuth2TokenParams().WithToken(c.token),
        httptransport.BasicAuth("my-client", "foobar"),
    )
}
```

For more information on Authorization, check the [go-swagger documentation](https://goswagger.io/generate/client.html#authentication).

### On every request

You may want to protect ORY Hydra using e.g. OAuth2 Access Tokens. In that case, you can enhance the SDK by using
the OAuth2 Client:

```go
import "github.com/ory/hydra/sdk/go/hydra/client"
import httptransport "github.com/go-openapi/runtime/client"
import "golang.org/x/oauth2/clientcredentials"

func main() {
    publicURL := url.Parse("https://hydra.localhost:4444")
 	ht := httptransport.NewWithClient(
 		publicURL.Host,
 		publicURL.Path,
 		[]string{publicURL.Scheme},
 		clientcredentials.Config{
 			TokenURL:"http://hydra.localhost:4444/oauth2/token",
 			ClientID:"my-client",
 			ClientSecret:"my-secret",
 			Scopes:[]string{"scope-a", "scope-b"},
 		}.Client(context.Background()),
 	)

    public := hydra.New(ht, nil)
    
    _, err := client.Public.RevokeOAuth2Token(
        public.NewRevokeOAuth2TokenParams().WithToken(c.token),
        httptransport.BasicAuth("my-client", "foobar"),
    )
}
```