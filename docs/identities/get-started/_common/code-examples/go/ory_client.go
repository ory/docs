// ory_client.go
package main

import (
	"os"

	ory "github.com/ory/client-go"
)

// ConfigureOryClient sets up the Ory client for local development with tunnel
func ConfigureOryClient() (*ory.APIClient, string) {
	baseUrl := os.Getenv("ORY_SDK_URL")

	// Configure Ory SDK
	configuration := ory.NewConfiguration()
	configuration.Servers = ory.ServerConfigurations{{URL: baseUrl}}

	// Create and return client
	return ory.NewAPIClient(configuration), baseUrl
}
