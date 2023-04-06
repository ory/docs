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

func GetIdentitySessions(ctx context.Context, identityId string, pageNumber int64, perPage int64) (sessions []client.Session, err error) {
	// highlight-start
	sessions, _, err = ory.IdentityApi.ListIdentitySessions(ContextWithToken(ctx), identityId).
		Page(pageNumber). // Optional  -  page number
		PerPage(perPage). // Optional - number of sessions per page
		Active(true).     // Optional - used to filter result for active or inactive sessions; not setting this returns all sessions
		Execute()
	// highlight-end

	if err != nil {
		return nil, err
	}

	return sessions, err
}
