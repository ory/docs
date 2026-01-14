package search

import (
	"context"
	"fmt"
	"os"

	ory "github.com/ory/client-go"
	"github.com/typesense/typesense-go/v3/typesense"
	typesenseapi "github.com/typesense/typesense-go/v3/typesense/api"
)

var (
	ORY_PROJECT_URL = os.Getenv("ORY_PROJECT_URL")
	ORY_API_KEY     = os.Getenv("ORY_API_KEY")
)

func main() {
	ctx := context.WithValue(context.Background(), ory.ContextAccessToken, ORY_API_KEY)

	// Initialize Ory client
	cfg := ory.NewConfiguration()
	cfg.Servers = ory.ServerConfigurations{{URL: ORY_PROJECT_URL}}
	oryClient := ory.NewAPIClient(cfg)

	// Initialize search client
	searchClient := typesense.NewClient(
		// highlight-start
		typesense.WithAPIKey(ORY_API_KEY),                                      // Use your Ory API key here
		typesense.WithServer(ORY_PROJECT_URL+"/admin/preview/search/v0beta1/"), // configure the base URL to the Ory Search API endpoint
		// highlight-end
	)

	// highlight-start
	// List identities via Search API
	list, err := searchClient.Collection("identities").Documents().Search(ctx, &typesenseapi.SearchCollectionParams{
		Q: ptr("*"),
	})
	// highlight-end
	if err != nil {
		// handle error
	}

	for _, res := range *list.Hits {
		doc := *res.Document
		fmt.Printf("List result: %+v\n", doc)
	}

	// highlight-start
	// Search identities via Search API
	search, err := searchClient.Collection("identities").Documents().Search(ctx, &typesenseapi.SearchCollectionParams{
		Q:       ptr("foo"),
		QueryBy: ptr("traits"),
	})
	// highlight-end
	if err != nil {
		// handle error
	}

	if search.Hits == nil || len(*search.Hits) == 0 {
		fmt.Println("No search hits")
	}
	fmt.Println()

	for _, res := range *search.Hits {
		doc := *res.Document
		fmt.Printf("Search result: %+v\n", doc)
	}

	// highlight-start
	// retrieve identity details from Identity API
	first := (*search.Hits)[0]
	identity, _, err := oryClient.IdentityAPI.GetIdentity(ctx, (*first.Document)["id"].(string)).Execute()
	// highlight-end
	if err != nil {
		// handle error
	}
	fmt.Printf("Identity: %+v\n", identity)
}

func NewOryClient(ctx context.Context, url string) *ory.APIClient {
	cfg := ory.NewConfiguration()
	cfg.Servers = ory.ServerConfigurations{{URL: url}}
	return ory.NewAPIClient(cfg)
}

func ptr[A any](v A) *A {
	return &v
}
