package session

import (
	"context"
	"github.com/ory/client-go"
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

func RefreshSession(ctx context.Context, sessionId string) (session *client.Session, err error) {
	// highlight-start
	session, _, err = ory.IdentityApi.ExtendSession(ContextWithToken(ctx), sessionId).
		Execute()
	// highlight-end

	if err != nil {
		return nil, err
	}

	return session, err
}
