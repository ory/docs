package main

import (
	"context"
	"fmt"
	"os"

	"github.com/ory/client-go"
)

var ory *client.APIClient
var authed = context.WithValue(context.Background(), client.ContextAccessToken, os.Getenv("ORY_API_KEY"))

func init() {
	cfg := client.NewConfiguration()
	cfg.Servers = client.ServerConfigurations{
		{URL: fmt.Sprintf("https://%s.projects.oryapis.com", os.Getenv("ORY_PROJECT_SLUG"))},
	}

	ory = client.NewAPIClient(cfg)
}

func logout(token string) error {
	// highlight-start
	_, err := ory.FrontendApi.UpdateLogoutFlow(authed).Token(token).Execute()
	if err != nil {
		return err
	}
	// highlight-end
	// Logout was successful

	return nil
}
