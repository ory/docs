---
id: go
title: Go
---

To install the Go SDK, run:

```
go get github.com/ory/client-go
```

## Configuration

We use code generation to generate our SDKs. The Go SDK is generated using
[`go-swagger`](http://goswagger.io). Set up the SDK:

```go
import "github.com/ory/client-go/client"
```

To use a proxy, set the environment variable HTTP_PROXY:

```go
os.Setenv("HTTP_PROXY", "http://proxy_name:proxy_port")
```

## Make requests

Making requests is straight forward:

```go
import (
  "github.com/ory/client-go/client"
  "github.com/ory/client-go/client/admin"
  "github.com/ory/client-go/models"
)

func main() {
    KratosPublicEndpoint := url.Parse("https://kratos.localhost:4433")

    flow, _, err := s.KratosPublicEndpoint.V0alpha2Api.GetSelfServiceLoginFlow(r.Context()).Id(flowID).Cookie(cookie).Execute()
    if err != nil {
        writeError(w, http.StatusUnauthorized, err)
        return
    }
}
```

## With Authorization

Some endpoints require authorization:

Code example for deleting an identity using the PAT to interact with Kratos via the admin endpoint:

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

## Create Identity

Code example for deleting an identity using the PAT to interact with Kratos via the admin URL:

```go
package ory

import (
	"context"
	"errors"

	ory "github.com/ory/kratos-client-go"
)

type CreateIdentityParams struct {
	Email    string
	Password string
}

// CreateIdentityFlow create an identity with the provided password
func (c *Client) CreateIdentityFlow(ctx context.Context, params CreateIdentityParams) (string, error) {
	flow, _, err := c.oryhttpc.V0alpha2Api.InitializeSelfServiceRegistrationFlowWithoutBrowser(ctx).Execute()
	if err != nil {
		return "", err
	}

	result, res, err := c.oryhttpc.V0alpha2Api.SubmitSelfServiceRegistrationFlow(ctx).Flow(flow.Id).SubmitSelfServiceRegistrationFlowBody(
		ory.SubmitSelfServiceRegistrationFlowWithPasswordMethodBodyAsSubmitSelfServiceRegistrationFlowBody(&ory.SubmitSelfServiceRegistrationFlowWithPasswordMethodBody{
			Method:   "password",
			Password: params.Password,
			Traits: map[string]interface{}{
				"email": params.Email,
			},
		}),
	).Execute()

	defer res.Body.Close()

	if err != nil {
		c.logger.Error(err, "")
		return "", err
	}

	if result.Session == nil {
		return "", errors.New("Server did not create a session for the new registration.")
	}

	return result.Identity.Id, nil
}

```