---
id: go
title: Go
---

To install the Go SDK, run:

```go
go get -u -d github.com/ory/hydra-client-go
```

:::warning

Don't consume the `/oauth2/auth` and `/oauth2/token` endpoints using this SDK.
Use [golang.org/x/oauth2](https://godoc.org/golang.org/x/oauth2). For more
information visit the [Using OAuth2](../guides/using-oauth2.mdx) guide.

:::

## Configuration

We use code generation to generate our SDKs. The Go SDK is generated using
[`go-swagger`](http://goswagger.io). The SDK is set up:

```go
package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	client "github.com/ory/hydra-client-go"
)

func main() {
	consentChallenge := "consentChallenge_example" // string |

	configuration := client.NewConfiguration()
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://localhost:4445", // Admin API
		},
	}
	apiClient := client.NewAPIClient(configuration)
	resp, r, err := apiClient.AdminApi.GetConsentRequest(context.Background()).ConsentChallenge(consentChallenge).Execute()
	if err != nil {
		switch r.StatusCode {
		case http.StatusNotFound:
			// Accessing to response details
			// cast err to *client.GenericOpenAPIError object first and then
			// to your desired type
			notFound, ok := err.(*client.GenericOpenAPIError).Model().(client.JsonError)
			fmt.Println(ok)
			fmt.Println(*notFound.ErrorDescription)
		case http.StatusGone:

			r, ok := err.(*client.GenericOpenAPIError).Model().(client.RequestWasHandledResponse)
			fmt.Println(r, ok)
			fmt.Println("It's gone")
		default:
			fmt.Fprintf(os.Stderr, "Error when calling `AdminApi.GetConsentRequest``: %v\n", err)
			fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
		}
	}
	// response from `GetConsentRequest`: ConsentRequest
	fmt.Fprintf(os.Stdout, "Response from `AdminApi.GetConsentRequest`: %v\n", resp)
}
```

## With Authorization

Some endpoints require Basic Authorization:

```go
package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"net/http"

	client "github.com/ory/hydra-client-go"
)

type BasicAuthTransport struct {
	Username string
	Password string
}

func (t BasicAuthTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	req.Header.Set("Authorization", fmt.Sprintf("Basic %s",
		base64.StdEncoding.EncodeToString([]byte(fmt.Sprintf("%s:%s",
			t.Username, t.Password)))))
	return http.DefaultTransport.RoundTrip(req)
}

func main() {
	config := client.NewConfiguration()
	config.Servers = []client.ServerConfiguration{
		{
			URL: "https://hydra.localhost:4445", // Admin API
		},
	}

	c := client.NewAPIClient(config)
	config.HTTPClient.Transport = BasicAuthTransport{Username: "foo", Password: "bar"}

	req := c.AdminApi.GetConsentRequest(context.Background()).ConsentChallenge("consentChallenge_example")
	fmt.Println(req.Execute())

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

## More examples

You can find more examples of SDK usage in the autogenerated documentation for hydra sdk

- [Admin API](https://github.com/ory/hydra-client-go/blob/master/docs/AdminApi.md)
- [Metadata API](https://github.com/ory/hydra-client-go/blob/master/docs/MetadataApi.md)
- [Public API](https://github.com/ory/hydra-client-go/blob/master/docs/PublicApi.md)
