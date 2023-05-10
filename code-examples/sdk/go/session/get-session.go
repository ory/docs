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

func GetSession(ctx context.Context, sessionId string, expandOptions []string) (session *client.Session, err error) {
	// highlight-start
	session, _, err = ory.IdentityApi.GetSession(ContextWithToken(ctx), sessionId).
		Expand(expandOptions).
		Execute()
	// highlight-end

	if err != nil {
		return nil, err
	}

	return session, err
}
