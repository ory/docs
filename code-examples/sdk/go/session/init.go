package session

import (
	"context"
	"fmt"
	"github.com/ory/client-go"
	"os"
)

var ory *client.APIClient

func init() {
	cfg := client.NewConfiguration()
	cfg.Servers = client.ServerConfigurations{
		{URL: fmt.Sprintf("https://%s.projects.oryapis.com", os.Getenv("ORY_PROJECT_SLUG"))},
	}

	ory = client.NewAPIClient(cfg)
}

func ContextWithToken(ctx context.Context) context.Context {
	return context.WithValue(ctx, client.ContextAccessToken, os.Getenv("ORY_API_KEY"))
}
