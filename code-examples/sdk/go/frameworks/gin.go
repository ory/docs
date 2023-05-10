package main

import (
	"context"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	ory "github.com/ory/client-go"
)

type kratosMiddleware struct {
	ory *ory.APIClient
}

func NewMiddleware() *kratosMiddleware {
	cfg := ory.NewConfiguration()
	cfg.Servers = []ory.ServerConfiguration{
		{
			URL: "https://playground.projects.oryapis.com", // Ory Network Project URL
		},
	}
	return &kratosMiddleware{
		ory: ory.NewAPIClient(cfg),
	}
}
func (k *kratosMiddleware) Session() gin.HandlerFunc {
	return func(c *gin.Context) {
		session, err := k.validateSession(c.Request)
		if err != nil {
			c.Redirect(http.StatusMovedPermanently, "https://playground.projects.oryapis.com/ui/login") // Ory Identities Login URL
			return
		}
		if !*session.Active {
			c.Redirect(http.StatusMovedPermanently, "http://example.com") // Your Application URL
			return
		}
		c.Next()
	}
}
func (k *kratosMiddleware) validateSession(r *http.Request) (*ory.Session, error) {
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
