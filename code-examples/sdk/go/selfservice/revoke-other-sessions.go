package main

import (
	"context"
	"fmt"
	"github.com/ory/client-go"
	"os"
)

func init() {
	cfg := client.NewConfiguration()
	cfg.Servers = client.ServerConfigurations{
		{URL: fmt.Sprintf("https://%s.projects.oryapis.com", os.Getenv("ORY_PROJECT_SLUG"))},
	}

	ory = client.NewAPIClient(cfg)
}

func RevokeOtherSessions(ctx context.Context, sessionToken string) (*client.DeleteMySessionsCount, error) {
	// highlight-start
	revokedSessionsCount, _, err := ory.FrontendApi.DisableMyOtherSessions(ctx).
		XSessionToken(sessionToken).
		Execute()
	if err != nil {
		// error revoking the sessions, for example due to expired token provided
		return nil, err
	}
	// highlight-end

	return revokedSessionsCount, nil
}
