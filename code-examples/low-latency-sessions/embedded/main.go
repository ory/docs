package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/dgraph-io/ristretto"
	"github.com/gin-gonic/gin"

	client "github.com/ory/kratos-client-go"
)

const (
	cacheSize = 1000
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
	cachingEnabled bool
	client         *client.APIClient
	cache          *ristretto.Cache
}

func NewMiddleware(cachingEnabled bool) (*kratosMiddleware, error) {
	configuration := client.NewConfiguration()
	configuration.Servers = []client.ServerConfiguration{
		{
			URL: sdkURL,
		},
	}

	cache, err := ristretto.NewCache(&ristretto.Config{
		NumCounters: 1e7,     // number of keys to track frequency of (10M).
		MaxCost:     1 << 30, // maximum cost of cache (1GB).
		BufferItems: 64,      // number of keys per Get buffer.
	})
	if err != nil {
		return nil, err
	}

	return &kratosMiddleware{
		cachingEnabled: cachingEnabled,
		client:         client.NewAPIClient(configuration),
		cache:          cache,
	}, nil
}
func (k *kratosMiddleware) Session() gin.HandlerFunc {
	return func(c *gin.Context) {
		session, err := k.validateSession(c.Request)
		if err != nil {
			c.Redirect(http.StatusFound, loginURL)
			return
		}
		if !*session.Active {
			c.Redirect(http.StatusFound, loginURL)
			return
		}
		c.Next()
	}
}
func (k *kratosMiddleware) cacheSession(key string, sess *client.Session) error {
	// Calculate TTL. Do not cache sessions without TTL.
	//
	// Cached session should evict on sess.ExpiresAt
	if !k.cachingEnabled {
		return nil
	}
	exp := (*sess.ExpiresAt).Sub(time.Now())
	if ok := k.cache.SetWithTTL(fmt.Sprintf("session:%s", key), sess, 1, exp); !ok {
		return errors.New("cannot set session")
	}
	k.cache.Wait()
	return nil
}

func (k *kratosMiddleware) getSession(key string) (*client.Session, error) {
	if !k.cachingEnabled {
		return nil, nil
	}
	data, ok := k.cache.Get(fmt.Sprintf("session:%s", key))
	if !ok {
		return nil, nil
	}
	return data.(*client.Session), nil
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
	cachedMiddleware, err := NewMiddleware(true)
	if err != nil {
		log.Fatal(err)
	}
	unCachedMiddleware, err := NewMiddleware(false)
	if err != nil {
		log.Fatal(err)
	}

	cached := r.Group("/cached")
	cached.Use(cachedMiddleware.Session())
	cached.GET("", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	uncached := r.Group("/uncached")
	uncached.Use(unCachedMiddleware.Session())
	uncached.GET("", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
