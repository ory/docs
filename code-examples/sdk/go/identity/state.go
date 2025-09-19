// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

package identity

import (
	"context"
	"fmt"
	"os"

	ory "github.com/ory/client-go"
)

var oryAuthed = context.WithValue(context.Background(), ory.ContextAccessToken, os.Getenv("ORY_API_KEY"))

func setState(identityId string, state string) (err error) {
	cfg := ory.NewConfiguration()
	cfg.Servers = ory.ServerConfigurations{
		{URL: fmt.Sprintf("https://%s.projects.oryapis.com", os.Getenv("ORY_PROJECT_SLUG"))},
	}
	apiClient := ory.NewAPIClient(cfg)

	// highlight-start
	_, _, err = apiClient.IdentityApi.
		PatchIdentity(oryAuthed, identityId).
		JsonPatch([]ory.JsonPatch{{Op: "replace", Path: "/state", Value: state}}).Execute()
	// highlight-end
	return err
}
