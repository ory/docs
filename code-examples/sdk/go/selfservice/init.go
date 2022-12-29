package main

import (
  "fmt"
  "github.com/ory/client-go"
  "os"
)

func init() {
  cfg := client.NewConfiguration()
  cfg.Servers = client.ServerConfigurations{
    {URL: fmt.Sprintf("https://%s.projects.oryapis.com", os.Getenv("ORY_PROJECT_SLUG"))},
  }

  ory = client.NewAPIClient(cfg)
}
