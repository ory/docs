---
id: go
title: Go
---

This guide shows how you can use Go SDK with Ory Kratos.

## Installation

```mdx-code-block
import CodeBlock from '@theme/CodeBlock'
import { useLatestRelease } from '@site/src/hooks'

<CodeBlock className="language-shell">{`go get  github.com/ory/kratos-client-go@${useLatestRelease('keto')}`}</CodeBlock>
```

## Configuration

The following code example shows how to set up and configure Ory Kratos using the Go SDK:

```go
package main

import (
	"context"

	client "github.com/ory/kratos-client-go"
)

func main() {
	configuration := client.NewConfiguration()
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4443", // Kratos Admin API
		},
	}
	apiClient := client.NewAPIClient(configuration)
	// resp, r, err := apiClient.V0alpha2Api.ToSession(context.Background()).Cookie("ory_Kratos_session").Execute()
}

```

## Making requests

The following code example shows how to use make a toSession call to check the active session using the Kratos Go SDK.

```go
package main

import (
	"context"
	"fmt"
	"os"

	client "github.com/ory/kratos-client-go"
)

func main() {
	configuration := client.NewConfiguration()
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4433", // Kratos Admin API
		},
	}
	apiClient := client.NewAPIClient(configuration)
	cookie := "ory_kratos_session=MTY0ODgyMTExN3xEdi1CQkFFQ180SUFBUkFCRUFBQVJfLUNBQUVHYzNSeWFXNW5EQThBRFhObGMzTnBiMjVmZEc5clpXNEdjM1J5YVc1bkRDSUFJRkZDVFVKbFNIcEJOalZyY0Vad1JEZ3dNMng1V0RsWlpEQlFXa3RoUjNJenzKCLhzCkox1OmvNJlKcqtWuNkSnPLrUgM6Ew2EMYksfg=="
	resp, r, err := apiClient.V0alpha2Api.ToSession(context.Background()).Cookie(cookie).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `V0alpha2Api.ToSession``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ToSession`: Session
	fmt.Fprintf(os.Stdout, "Traits  %v\n", resp.Identity.Traits)
}
```

## Gin-middleware

The following code example shows how to use the Kratos Go SDK with the [Gin Web Framework](https://github.com/gin-gonic/gin):

```go
package main

import (
	"context"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	client "github.com/ory/kratos-client-go"
)

type kratosMiddleware struct {
	client *client.APIClient
}

func NewMiddleware() *kratosMiddleware {
	configuration := client.NewConfiguration()
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4433", // Kratos Admin API
		},
	}
	return &kratosMiddleware{
		client: client.NewAPIClient(configuration),
	}
}
func (k *kratosMiddleware) Session() gin.HandlerFunc {
	return func(c *gin.Context) {
		session, err := k.validateSession(c.Request)
		if err != nil {
			c.Redirect(http.StatusMovedPermanently, "http://127.0.0.1:4455/login")
			return
		}
		if !*session.Active {
			c.Redirect(http.StatusMovedPermanently, "http://your_endpoint")
			return
		}
		c.Next()
	}
}
func (k *kratosMiddleware) validateSession(r *http.Request) (*client.Session, error) {
	cookie, err := r.Cookie("ory_kratos_session")
	if err != nil {
		return nil, err
	}
	if cookie == nil {
		return nil, errors.New("no session found in cookie")
	}
	resp, _, err := k.client.V0alpha2Api.ToSession(context.Background()).Cookie(cookie.String()).Execute()
	if err != nil {
		return nil, err
	}
	return resp, nil
}
func main() {

	r := gin.Default()
	k := NewMiddleware()

	r.Use(k.Session())
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
```

## Echo middleware

The following code example shows how to use Kratos Go SDK with [echo framework](https://echo.labstack.com):

```go
package main

import (
	"context"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"

	client "github.com/ory/kratos-client-go"
)

type kratosMiddleware struct {
	client *client.APIClient
}

func NewMiddleware() *kratosMiddleware {
	configuration := client.NewConfiguration()
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4433", // Kratos Admin API
		},
	}
	return &kratosMiddleware{
		client: client.NewAPIClient(configuration),
	}
}
func (k *kratosMiddleware) Session(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		session, err := k.validateSession(c.Request())
		if err != nil {
			return c.Redirect(http.StatusMovedPermanently, "http://127.0.0.1:4455/login")
		}
		if !*session.Active {
			return c.Redirect(http.StatusMovedPermanently, "http://your_endpoint")
		}
		return next(c)
	}
}
func (k *kratosMiddleware) validateSession(r *http.Request) (*client.Session, error) {
	cookie, err := r.Cookie("ory_kratos_session")
	if err != nil {
		return nil, err
	}
	if cookie == nil {
		return nil, errors.New("no session found in cookie")
	}
	resp, _, err := k.client.V0alpha2Api.ToSession(context.Background()).Cookie(cookie.String()).Execute()
	if err != nil {
		return nil, err
	}
	return resp, nil
}
func main() {

	k := NewMiddleware()
	e := echo.New()
	e.Use(k.Session)
	e.GET("/hello", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":1323"))
}
```

## Using admin API

```go
package main

import (
	"context"
	"fmt"
	"os"

	client "github.com/ory/kratos-client-go"
)

func main() {
	configuration := client.NewConfiguration()
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: "http://127.0.0.1:4434", // Kratos Admin API
		},
	}
	apiClient := client.NewAPIClient(configuration)
	adminCreateIdentityBody := *client.NewAdminCreateIdentityBody(
		"default",
		map[string]interface{}{
			"email": "foo@example.com",
			"name": map[string]string{
				"first": "foo",
				"last":  "bar",
			},
		},
	) // AdminCreateIdentityBody |  (optional)

	createdIdentity, r, err := apiClient.V0alpha2Api.AdminCreateIdentity(context.Background()).AdminCreateIdentityBody(adminCreateIdentityBody).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `V0alpha2Api.AdminCreateIdentity``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AdminCreateIdentity`: Identity
	fmt.Fprintf(os.Stdout, "Created identity with ID: %v\n", createdIdentity.Id)
	getIdentity, r, err := apiClient.V0alpha2Api.AdminGetIdentity(context.Background(), createdIdentity.Id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `V0alpha2Api.AdminGetIdentity``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	fmt.Fprintf(os.Stdout, "Email for identity with id %v. Traits %v\n", createdIdentity.Id, getIdentity.Traits)

	r, err = apiClient.V0alpha2Api.AdminDeleteIdentity(context.Background(), getIdentity.Id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `V0alpha2Api.AdminDeleteIdentity``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	fmt.Println("Successfully Removed identity")

}
```

## More examples

You can find more examples of SDK usage in the autogenerated documentation for Kratos sdk

- [Metadata API](https://github.com/ory/kratos-client-go/blob/master/docs/MetadataApi.md)
- [V0alpha2API](https://github.com/ory/kratos-client-go/blob/master/docs/V0alpha2Api.md)
