package session

import (
	"context"
)

type oryMiddleware struct {
	ory *ory.APIClient
}

func init() {
	cfg := client.NewConfiguration()
	cfg.Servers = client.ServerConfigurations{
		{URL: fmt.Sprintf("https://%s.projects.oryapis.com", os.Getenv("ORY_PROJECT_SLUG"))},
	}

	ory = client.NewAPIClient(cfg)
}

func DisableSession(ctx context.Context, sessionId string) (err error) {
	// highlight-start
	_, err = ory.IdentityApi.DisableSession(ContextWithToken(ctx), sessionId).
		Execute()
	// highlight-end
	return err
}
