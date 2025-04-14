// ory_client.go
package main

import (
	"fmt"
	"os"

	ory "github.com/ory/client-go"
)

// ConfigureOryClient sets up the Ory client for local development with tunnel
func ConfigureOryClient() (*ory.APIClient, string) {
	tunnelPort := os.Getenv("ORY_SDK_URL")
	if tunnelPort == "" {
		tunnelPort = "4000"
	}

	// Configure baseUrl for local development (equivalent to JavaScript example)
	baseUrl := fmt.Sprintf("http://localhost:%s", tunnelPort)

	// Configure Ory SDK
	configuration := ory.NewConfiguration()
	configuration.Servers = ory.ServerConfigurations{{URL: baseUrl}}

	// Create and return client
	return ory.NewAPIClient(configuration), baseUrl
}
