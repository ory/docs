package frontend

import (
	"context"
	"fmt"
	"os"

	"github.com/ory/client-go"
)

func init() {
	cfg := client.NewConfiguration()
	cfg.Servers = client.ServerConfigurations{
		{URL: fmt.Sprintf("https://%s.projects.oryapis.com", os.Getenv("ORY_PROJECT_SLUG"))},
	}

	ory = client.NewAPIClient(cfg)
}

func RevokeSession(ctx context.Context, sessionToken string, sessionToRevokeId string) error {
	// highlight-start
	_, err := ory.FrontendApi.DisableMySession(ctx, sessionToRevokeId).
		XSessionToken(sessionToken).
		Execute()
	if err != nil {
		// error revoking the session, for example due to expired token provided
		return err
	}
	// highlight-end

	return nil
}
