// ory_client.go
package main

import (
	"fmt"
	"os"

	ory "github.com/ory/client-go"
)

// ConfigureOryClient sets up the Ory client for either production or development
func ConfigureOryClient() (*ory.APIClient, string) {
	// Get project slug from environment
	projectSlug := os.Getenv("PROJECT_SLUG")

	// Get the Ory SDK URL from environment variables or build from project slug
	baseUrl := os.Getenv("ORY_SDK_URL")
	if baseUrl == "" {
		if projectSlug != "" {
			// Use production Ory Network URL with project slug
			baseUrl = fmt.Sprintf("https://%s.projects.oryapis.com", projectSlug)
		} else {
			// Fallback to local development
			baseUrl = "http://localhost:4000"
		}
	}

	// Configure Ory SDK
	configuration := ory.NewConfiguration()
	configuration.Servers = ory.ServerConfigurations{{URL: baseUrl}}

	// Create and return client
	return ory.NewAPIClient(configuration), baseUrl
}
