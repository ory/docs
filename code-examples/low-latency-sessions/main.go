package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"

	client "github.com/ory/kratos-client-go"
)

const (
	// For local development, it's requires to use
	// ory proxy to make cookies work fine.
	// Replace it with http://projectId.projects.oryapis.com
	// for production usage.
	sdkURL = "http://localhost:4000/.ory"
	// For local development, it's requires to use
	// ory proxy to make cookies work fine.
	// Replace it with http://projectId.projects.oryapis.com/ui/login
	// for production usage.
	loginURL = "http://localhost:4000/.ory/ui/login"
)

type kratosMiddleware struct {
	client *client.APIClient
	redis  *redis.Client
}

func NewMiddleware() *kratosMiddleware {
	configuration := client.NewConfiguration()
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: sdkURL,
		},
	}
	return &kratosMiddleware{
		client: client.NewAPIClient(configuration),
		redis: redis.NewClient(&redis.Options{
			Addr:     "localhost:6379",
			Password: "", // no password set
			DB:       0,  // use default DB
		}),
	}
}
func (k *kratosMiddleware) Session() gin.HandlerFunc {
	return func(c *gin.Context) {
		session, err := k.validateSession(c.Request)
		if err != nil {
			c.Redirect(http.StatusFound, loginURL)
			return
		}
		if !*session.Active {
			c.Redirect(http.StatusFound, "http://your_endpoint")
			return
		}
		c.Next()
	}
}
func (k *kratosMiddleware) cacheSession(key string, sess *client.Session) error {
	// Calculate TTL. Do not cache sessions without TTL.
	//
	// Cached session should evict on sess.ExpiresAt
	exp := (*sess.ExpiresAt).Sub(time.Now())
	data, err := json.Marshal(sess)
	if err != nil {
		return err
	}
	return k.redis.Set(context.Background(), fmt.Sprintf("session:%s", key), data, exp).Err()
}

func (k *kratosMiddleware) getSession(key string) (*client.Session, error) {
	var sess client.Session
	data, err := k.redis.Get(context.Background(), fmt.Sprintf("session:%s", key)).Bytes()
	if err != nil {
		if err == redis.Nil {
			return nil, nil
		}
		return nil, err
	}
	if err := json.Unmarshal(data, &sess); err != nil {
		return nil, err
	}
	return &sess, nil
}

func (k *kratosMiddleware) validateSession(r *http.Request) (*client.Session, error) {
	// Use a cookie name for your Ory Cloud project
	// It looks like ory_session_projectid
	cookie, err := r.Cookie("ory_session_playground")
	if err != nil {
		return nil, err
	}
	if cookie == nil {
		return nil, errors.New("no session found in cookie")
	}
	// Try to return a cached session
	sess, err := k.getSession(cookie.Value)
	if err != nil {
		return nil, err
	}
	if sess != nil {
		return sess, nil
	}
	// validate a session
	resp, _, err := k.client.V0alpha2Api.ToSession(context.Background()).Cookie(cookie.String()).Execute()
	if err != nil {
		return nil, err
	}
	// cache the session
	if err := k.cacheSession(cookie.Value, resp); err != nil {
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
