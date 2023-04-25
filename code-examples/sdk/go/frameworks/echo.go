package main

import (
	"context"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"

	ory "github.com/ory/client-go"
)

type oryMiddleware struct {
	ory *ory.APIClient
}

func NewMiddleware() *oryMiddleware {
	cfg := ory.NewConfiguration()
	cfg.Servers = []ory.ServerConfiguration{
		{
			URL: "https://playground.projects.oryapis.com", // Ory Network Project URL
		},
	}
	return &oryMiddleware{
		ory: ory.NewAPIClient(cfg),
	}
}
func (k *oryMiddleware) Session(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		session, err := k.validateSession(c.Request())
		if err != nil {
			return c.Redirect(http.StatusMovedPermanently, "https://playground.projects.oryapis.com/ui/login")
		}
		if !*session.Active {
			return c.Redirect(http.StatusMovedPermanently, "https://example.com")
		}
		return next(c)
	}
}
func (k *oryMiddleware) validateSession(r *http.Request) (*ory.Session, error) {
	cookie, err := r.Cookie("ory_session_playground")
	if err != nil {
		return nil, err
	}
	if cookie == nil {
		return nil, errors.New("no session found in cookie")
	}
	resp, _, err := k.ory.FrontendApi.ToSession(context.Background()).Cookie(cookie.String()).Execute()
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
	e.Logger.Fatal(e.Start(":3000"))
}
