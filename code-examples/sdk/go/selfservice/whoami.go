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

func CheckSession(ctx context.Context, sessionToken string) (session *client.Session, err error) {
	// highlight-start
	session, _, err = ory.FrontendApi.ToSession(ctx).
		XSessionToken(sessionToken).
		Execute()
	// highlight-end
	if err != nil {
		// error revoking the session, for example due to expired token provided
		return nil, err
	}

	return session, nil
}
