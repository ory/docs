package identity

import (
	"context"
	"fmt"
	"os"

	ory "github.com/ory/client-go"
)

// Use this context to access Ory APIs which require an Ory API Key.
var oryAuthedContext = context.WithValue(context.Background(), ory.ContextAccessToken, os.Getenv("ORY_API_KEY"))

func main() {
	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{
		{
			URL: "https://<your-ory-project-slug>.projects.oryapis.com", // Ory Network Project URL
		},
	}
	apiClient := ory.NewAPIClient(configuration)
	CreateIdentityBody := *ory.NewCreateIdentityBody(
		"preset://basic",
		map[string]interface{}{
			"email": "foo@example.com",
			"name": map[string]string{
				"first": "foo",
				"last":  "bar",
			},
		},
	) // CreateIdentityBody |  (optional)

	createdIdentity, r, err := apiClient.IdentityApi.CreateIdentity(oryAuthedContext).CreateIdentityBody(CreateIdentityBody).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `IdentityApi.CreateIdentity``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `IdentityApi.CreateIdentity`: Identity
	fmt.Fprintf(os.Stdout, "Created identity with ID: %v\n", createdIdentity.Id)
	getIdentity, r, err := apiClient.IdentityApi.GetIdentity(oryAuthedContext, createdIdentity.Id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `IdentityApi.GetIdentity``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	fmt.Fprintf(os.Stdout, "Email for identity with id %v. Traits %v\n", createdIdentity.Id, getIdentity.Traits)

	// Delete the identity that was just created (optional)
	r, err = apiClient.IdentityApi.DeleteIdentity(oryAuthedContext, getIdentity.Id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `IdentityApi.DeleteIdentity``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	fmt.Println("Successfully Removed identity")

}
