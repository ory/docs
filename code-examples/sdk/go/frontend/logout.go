// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

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

func Logout(ctx context.Context, sessionToken string) error {
	// highlight-start
	_, err := ory.FrontendApi.PerformNativeLogout(ctx).
		PerformNativeLogoutBody(*client.NewPerformNativeLogoutBody(sessionToken)).
		Execute()
	if err != nil {
		return err
	}
	// Logout was successful
	// highlight-end

	return nil
}
