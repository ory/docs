package main

import (
	"context"
	"fmt"
	"net/http"
	
	ory "github.com/ory/client-go"
)

func createLoginHandler(w http.ResponseWriter, r *http.Request) {
	// Initialize the Ory client
	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{
		{
			URL: "https://$PROJECT_SLUG.projects.oryapis.com",
		},
	}
	client := ory.NewAPIClient(configuration)
	
	// Create a login flow
	flow, resp, err := client.FrontendApi.CreateBrowserLoginFlow(context.Background()).
		ReturnTo("/dashboard").
		Refresh(false).Execute()
		
	if err != nil {
		fmt.Fprintf(w, "Error creating login flow: %v\n", err)
		return
	}
	
	// Redirect user to the self-service login UI
	http.Redirect(w, r, flow.Ui.Action, http.StatusFound)
}