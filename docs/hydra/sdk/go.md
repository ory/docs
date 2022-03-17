---
id: go
title: Go
---

To install the Go SDK, run:

```go
go get -u -d github.com/ory/hydra-client-go
```

:::info

Be aware that endpoints `/oauth2/auth` and `/oauth2/token` **MUST NOT** be consumed
using this SDK. Use [golang.org/x/oauth2](https://godoc.org/golang.org/x/oauth2)
instead.

:::

## Configuration

We use code generation to generate our SDKs. The Go SDK is generated using
[`go-swagger`](http://goswagger.io). The SDK is set up:

```go
package main

import (
  client "github.com/ory/hydra-client-go"
)

func main() {
  // Using Admin APIs
  config := client.NewConfiguration()
  config.Servers = []client.ServerConfiguration{
    {
      URL: "https://hydra.localhost:4445", // Admin API URL
    },
  }

  c := client.NewAPIClient(config)

  // Using Public APIs

  c.AdminApi.ListOAuth2Clients(context.TODO())
  // Using PublicAPIs
  config := client.NewConfiguration()
  config.Servers = []client.ServerConfiguration{
    {
      URL: "https://hydra.localhost:4444", // Public API URL
    },
  }

  c := client.NewAPIClient(config)

  // Using Public APIs

  c.PublicApi.RevokeOAuth2Token(context.TODO())
}

```

## Making requests

Making requests is straight forward:

```go
package main

import (
  "github.com/ory/hydra-client-go"
)

func main() {
  config := client.NewConfiguration()
  config.Servers = []client.ServerConfiguration{
    {
      URL: "https://hydra.localhost:4445", // Admin API
    },
  }

  c := client.NewAPIClient(config)
  oauthClient := client.NewOAuth2ClientWithDefaults()
  oauthClient.SetClientId("scoped")
  req := c.AdminApi.CreateOAuth2Client(context.TODO())
  req = req.OAuth2Client(*oauthClient)
  oauthClient, res, err := req.Execute()
  if err != nil {
      // Handle the error
  }
  if res.StatusCode != http.StatusOK {
    // Check the status code
  }
}
```

## With Authorization

Some endpoints require Basic Authorization:

```go
package main

import (
  "context"

  httptransport "github.com/go-openapi/runtime/client"
  client "github.com/ory/hydra-client-go"
)

func main() {
  config := client.NewConfiguration()
  config.Servers = []client.ServerConfiguration{
    {
      URL: "https://hydra.localhost:4000", // Public API
    },
  }

  config.HTTPClient.Transport = httptransport.BasicAuth("my-client", "foobar")
  c := client.NewAPIClient(config)

  req := c.PublicApi.RevokeOAuth2Token(context.TODO())
  req.Execute()

}
```

For more information on Authorization, check the
[go-swagger documentation](https://goswagger.io/generate/client.html#authentication).

### On every request

You may want to protect Ory Hydra using OAuth2 Access Tokens. In that case, you
can enhance the SDK by using the OAuth2 Client:

```go
package main

import (
	"context"

	client "github.com/ory/hydra-client-go"
	"golang.org/x/oauth2/clientcredentials"
)

func main() {
	config := client.NewConfiguration()
	config.Servers = []client.ServerConfiguration{
		{
			URL: "https://hydra.localhost:4444", // Public API URL
		},
	}

	creds := clientcredentials.Config{
		TokenURL:     "http://hydra.localhost:4444/oauth2/token",
		ClientID:     "my-client",
		ClientSecret: "my-secret",
		Scopes:       []string{"scope-a", "scope-b"},
	}
	config.HTTPClient = creds.Client(context.TODO())
	c := client.NewAPIClient(config)
	req := c.PublicApi.RevokeOAuth2Token(context.TODO())
	req.Execute()

}
```

### TLS Termination

```go
package main

import (
	"net/http"

	client "github.com/ory/hydra-client-go"
)

func main() {

	tlsTermClient := new(http.Client)
	rt := WithHeader(tlsTermClient.Transport)
	rt.Set("X-Forwarded-Proto", "https")
	tlsTermClient.Transport = rt

	config := client.NewConfiguration()
	config.Servers = []client.ServerConfiguration{
		{
			URL: "https://hydra.localhost:4444", // Public API URL
		},
	}
	config.HTTPClient = tlsTermClient
	c := client.NewAPIClient(config)

	// ...
}

type withHeader struct {
	http.Header
	rt http.RoundTripper
}

func WithHeader(rt http.RoundTripper) withHeader {
	if rt == nil {
		rt = http.DefaultTransport
	}

	return withHeader{Header: make(http.Header), rt: rt}
}

func (h withHeader) RoundTrip(req *http.Request) (*http.Response, error) {
	for k, v := range h.Header {
		req.Header[k] = v
	}

	return h.rt.RoundTrip(req)
}
```

### Skip TLS Verification

```go
package main

import (
  "github.com/ory/hydra-client-go/client"
  httptransport "github.com/go-openapi/runtime/client"
  "net/http"
)

func main() {
  skipTlsClient := &http.Client{
    Transport: &http.Transport{
      TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
    },
    Timeout: 10,
  }
	config := client.NewConfiguration()
	config.Servers = []client.ServerConfiguration{
		{
			URL: "https://hydra.localhost:4444", // Public API URL
		},
	}
	config.HTTPClient = tlsTermClient
	c := client.NewAPIClient(config)

  // ...
}
```
