---
id: go
title: Go
---

To install the Go SDK, run:

```go
go get -u -d github.com/ory/hydra-client-go
```

:::tip

Be aware that endpoints /oauth2/auth and /oauth2/token __MUST NOT__ be consumed using this SDK. Use [golang.org/x/oauth2](https://godoc.org/golang.org/x/oauth2) instead.

:::

## Configuration

We use code generation to generate our SDKs. The Go SDK is generated using
[`go-swagger`](http://goswagger.io). The SDK is set up:

```go
import (
  client "github.com/ory/hydra-client-go"
)

func main() {
  config := client.NewConfiguration()
  config.Servers = []client.ServerConfiguration{
    {
      URL: "https://hydra.localhost:4000",
    },
  }

  c := client.NewAPIClient(config)

  c.AdminApi.CreateOAuth2Client(...

  c.PublicApi.RevokeOAuth2Token(...
}

```

## Making requests

Making requests is straight forward:

```go
import (
  "github.com/ory/hydra-client-go/de"
)

func main() {
  config := client.NewConfiguration()
  config.Servers = []client.ServerConfiguration{
    {
      URL: "https://hydra.localhost:4000",
    },
  }

  c := client.NewAPIClient(config)

  result, err := c.AdminApi.CreateOAuth2Client(client.WithBody(&models.OAuth2Client{
        ClientID: "scoped",
    }))
    if err != nil {
        // err isn't nil when the request failed (usually a 404, 401, 409 error)
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

Some endpoints require Basic Authorization:

```go
import (
  client "github.com/ory/hydra-client-go"
  httptransport "github.com/go-openapi/runtime/client"
)

func main() {
  config := client.NewConfiguration()
  config.Servers = []client.ServerConfiguration{
    {
      URL: "https://hydra.localhost:4000",
    },
  }

  c := client.NewAPIClient(config)

    _, err := c.PublicApi.RevokeOAuth2Token(
        public.NewRevokeOAuth2TokenParams().WithToken(c.token),
        httptransport.BasicAuth("my-client", "foobar"),
    )
}
```

For more information on Authorization, check the
[go-swagger documentation](https://goswagger.io/generate/client.html#authentication).

### On every request

You may want to protect Ory Hydra using OAuth2 Access Tokens. In that case, you
can enhance the SDK by using the OAuth2 Client:

```go
  client "github.com/ory/hydra-client-go"
import httptransport "github.com/go-openapi/runtime/client"
import "golang.org/x/oauth2/clientcredentials"

func main() {
  config := client.NewConfiguration()
  config.Servers = []client.ServerConfiguration{
    {
      URL: "https://hydra.localhost:4000",
    },
  }    

  c := client.NewAPIClient(config)
    
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

    _, err := c.PublicApi.RevokeOAuth2Token(
        public.NewRevokeOAuth2TokenParams().WithToken(c.token),
        httptransport.BasicAuth("my-client", "foobar"),
    )
}
```

### TLS Termination

```go

import "github.com/ory/hydra-client-go/client"
import httptransport "github.com/go-openapi/runtime/client"
import "net/http"

func main() {

  tlsTermClient := new(http.Client)
  rt := WithHeader(tlsTermClient.Transport)
  rt.Set("X-Forwarded-Proto", "https")
  tlsTermClient.Transport = rt

  transport := httptransport.NewWithClient("host:port", "/", []string{"https"}, tlsTermClient)
  hydra := client.New(transport, nil)

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
import "github.com/ory/hydra-client-go/client"
import httptransport "github.com/go-openapi/runtime/client"#
import "net/http"

func main() {
  skipTlsClient := &http.Client{
    Transport: &http.Transport{
      TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
    },
    Timeout: 10,
  }
  transport := httptransport.NewWithClient("host:port", "/", []string{"https"}, skipTlsClient)
  hydra := client.New(transport, nil)

  // ...
}
```
