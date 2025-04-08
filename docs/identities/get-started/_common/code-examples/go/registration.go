package main

import (
	"context"
	"fmt"
	"net/http"
	
	ory "github.com/ory/client-go"
)

func createRegistrationHandler(w http.ResponseWriter, r *http.Request) {
	// Initialize the Ory client
	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{
		{
			URL: "https://$PROJECT_SLUG.projects.oryapis.com",
		},
	}
	client := ory.NewAPIClient(configuration)
	
	// Create a registration flow
	flow, resp, err := client.FrontendApi.CreateBrowserRegistrationFlow(context.Background()).
		ReturnTo("/welcome").Execute()
		
	if err != nil {
		fmt.Fprintf(w, "Error creating registration flow: %v\n", err)
		return
	}
	
	// Redirect user to the self-service registration UI
	http.Redirect(w, r, flow.Ui.Action, http.StatusFound)
}