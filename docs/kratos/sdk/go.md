---
id: go
title: Go
---

To install the Go SDK, run:

```
go get github.com/ory/kratos-client-go
```

## Configuration

We use code generation to generate our SDKs. The Go SDK is generated using
[`go-swagger`](http://goswagger.io). Set up the SDK:

```go
import "github.com/ory/kratos-client-go/client"
```

## Make requests

Making requests is straight forward:

```go
import (
  "github.com/ory/kratos-client-go/client"
  "github.com/ory/kratos-client-go/client/admin"
  "github.com/ory/kratos-client-go/models"
)

func main() {
    adminURL := url.Parse("https://kratos.localhost:4434")
    kratosAdmin := client.NewHTTPClientWithConfig(nil, &client.TransportConfig{Schemes: []string{adminURL.Scheme}, Host: adminURL.Host, BasePath: adminURL.Path})

    // this needs to be changed to a kratos request.
    // It is important to create the parameters using `New...`, otherwise requests will fail!
    result, err := kratosAdmin.Admin.CreateOAuth2Client(
        admin.NewCreateOAuth2ClientParams().WithBody(&models.OAuth2Client{
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

Code example for deleting an identity using the PAT to interact with Kratos via the admin URL:

```go
ctx := context.Background()

res, err := client.V0alpha2Api.AdminDeleteIdentity(  
    context.WithValue(context.Background(), ory.ContextAccessToken,
    "<access-token>"), "<foobar>").Execute()

// DeleteIdentity remove an identity
func (c *Client) DeleteIdentity(ctx context.Context, identityID string) error {
	res, err := c.oryhttpc.V0alpha2Api.AdminDeleteIdentity(c.contextWithSecret(ctx), identityID).Execute()
	if err != nil {
		return err
	}
	defer res.Body.Close()

	return nil
}
```
For more information on Authorization, check the
[go-swagger documentation](https://goswagger.io/generate/client.html#authentication).
