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

func GetActiveSessions(ctx context.Context, sessionToken string) ([]client.Session, error) {
	// highlight-start
	// Page and Per Page parameters are optional
	activeSessions, _, err := ory.FrontendApi.ListMySessions(ctx).
		XSessionToken(sessionToken).
		Page(1).
		PerPage(10).
		Execute()
	if err != nil {
		// error fetching active sessions, for example due to expired session token
		return nil, err
	}
	// highlight-end

	return activeSessions, nil
}
