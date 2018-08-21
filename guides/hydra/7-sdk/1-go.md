## Go SDK

<!-- toc -->

### Installation

To install the Go SDK, run:

```
go get -u -d github.com/ory/hydra/sdk/go/hydra
```

### Configuration

The Go SDK is auto generated from swagger but contains some helpers, such as `NewSDK`:

```go
import "github.com/ory/hydra/sdk/go/hydra"

sdk, err := hydra.NewSDK(&hydra.Configuration{
    AdminURL:  "https://hydra.localhost:4445",
})
```

#### With OAuth 2.0

If you want to send an OAuth 2.0 Access Token while accessing ORY Hydra's Admin API (e.g. because you protect it using
ORY Oathkeeper), you can configure the SDK to do that:

```go
import "github.com/ory/hydra/sdk/go/hydra"

sdk, err := hydra.NewSDK(&hydra.Configuration{
    AdminURL:  "https://hydra.localhost:4445",
    PublicURL:  "https://hydra.localhost:4444",
    ClientID: "...",
    ClientSecret: "...",
    Scopes: []string{"..."},
})
```

### API Usage

APIs usually have three return values. Please check for errors as well as status codes!

```go
client, response, error := sdk.CreateClient(swagger.Client{ /* .... payload .... */})
if err != nil {
    // This usually indicates a network error.
} else if response.StatusCode != http.StatusCreated {
    // If the status code is not 2xx, something went wrong on the application level (e.g. wrong credentials, database offline, ...)
}

fmt.Printf("Client created: %+v", client)
```

In rare cases, methods have only two return values. This happens when the REST API returns `204 No Content`:

```
response, err := sdk.DeleteClient("client-id")
if err != nil {
    // This usually indicates a network error.
} else if response.StatusCode != http.StatusNoContent {
    // If the status code is not 2xx, something went wrong on the application level (e.g. wrong credentials, database offline, ...)
}
```

### API Docs

API docs are available [here](https://github.com/ory/hydra/blob/master/sdk/go/hydra/swagger/README.md).
Please note that those docs are generated and may introduce bugs if code examples are used 1:1.
