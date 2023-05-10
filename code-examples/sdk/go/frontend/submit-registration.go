package frontend

import (
	"context"
	"fmt"
	"os"

	"github.com/ory/client-go"
)

type oryMiddleware struct {
	ory *ory.APIClient
}

func init() {
	cfg := client.NewConfiguration()
	cfg.Servers = client.ServerConfigurations{
		{URL: fmt.Sprintf("https://%s.projects.oryapis.com", os.Getenv("ORY_PROJECT_SLUG"))},
	}

	ory = client.NewAPIClient(cfg)
}

func SubmitRegistration(ctx context.Context, flowId string, body client.UpdateRegistrationFlowBody) (*client.SuccessfulNativeRegistration, error) {
	// highlight-start
	flow, _, err := ory.FrontendApi.UpdateRegistrationFlow(ctx).Flow(flowId).UpdateRegistrationFlowBody(body).Execute()
	if err != nil {
		return nil, err
	}

	return flow, nil
	// highlight-end
}
