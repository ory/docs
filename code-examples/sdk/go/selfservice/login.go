package main

import (
	"context"
	"fmt"
)

// login example that shows password method login
// we return the session token
func loginExample(ctx context.Context, flowId, username, password string) (string, error) {

	var flow *client.LoginFlow
	var err error

	// highlight-start
	if flowId == "" {
		flow, err = createLogin(ctx)
		if err != nil {
			return "", err
		}
	} else {
		flow, err = getLogin(ctx, flow.Id)
		if err != nil {
			return "", err
		}
	}

	success, err := submitLogin(ctx, flowAgain.Id, client.UpdateLoginFlowBody{
		UpdateLoginFlowWithPasswordMethod: &client.UpdateLoginFlowWithPasswordMethod{
			Identifier: username,
			Password:   password,
			Method:     "password",
		},
	})

	if err != nil {
		return "", err
	}

	fmt.Printf("Login successful\nSession Token: %s", *success.SessionToken)
	return *success.SessionToken
	// highlight-end
}
