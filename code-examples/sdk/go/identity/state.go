// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

package main

import (
	"context"
	"fmt"
	"github.com/ory/client-go"
	"os"
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

func setState(identityId string, state string) (err error) {
	// highlight-start
	_, _, err = ory.IdentityApi.
		PatchIdentity(authed, identityId).
		JsonPatch([]client.JsonPatch{{Op: "replace", Path: "/state", Value: state}}).Execute()
	// highlight-end
	return err
}
