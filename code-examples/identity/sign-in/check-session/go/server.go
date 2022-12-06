// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

package main

import (
  "context"
  "encoding/json"
  "fmt"
  "net/http"
  "os"
  "strings"
)

import "github.com/ory/client-go"

var ory *client.APIClient

func init() {
  conf := client.NewConfiguration()
  conf.Servers = client.ServerConfigurations{{URL: "https://" + os.Getenv("ORY_PROJECT_SLUG") + ".projects.oryapis.com"}}
  ory = client.NewAPIClient(conf)
}

func main() {
  fmt.Println("Listening on :3000")

  err := http.ListenAndServe(":3000", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    token := ""
    if h := r.Header.Get("Authorization"); strings.HasPrefix(strings.ToLower(h), "bearer ") {
      token = h[7:]
    }

    cookies := r.Header.Values("Cookie")
    session, _, err := ory.FrontendApi.ToSession(context.Background()).
      XSessionToken(token).
      Cookie(strings.Join(cookies, "; ")).
      Execute()
    if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      return
    }

    _ = json.NewEncoder(w).Encode(session)
  }))
  if err != nil {
    panic(err)
  }
}
