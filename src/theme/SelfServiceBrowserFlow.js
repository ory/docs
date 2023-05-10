// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React from "react"
import Mermaid from "./Mermaid"

const chart = ({
  flows = ["login", "registration", "settings", "..."],
  interactions = ['"Log in"', '"Sign Up"', '"Update Email"', "..."],
  success = "Perform flow-specific action (e.g. create user, set session cookie, ...)",
}) => {
  const components =
    flows.length > 1 ? `<${flows.join("|")}>` : `${flows.join("|")}`
  return `
sequenceDiagram
  participant B as Browser App
  participant A as Authentication UI
  participant K as Ory
  B->>K: Follow link to /self-service/${components}/browser
  K-->>K: Create and store new ${flows.join(", ")} flow
  K->>A: HTTP 302 Found <selfservice.flows.${components}.ui_url>?flow=<flow-id>
  A-->>K: Fetches data to render forms using /selfservice/${components}/flows?id=<flow-id>
  A->>K: Submits User data
  K-->>K: Validates and processes form payloads
  alt Form payload is valid
    K->>B: ${success}
  else Form payload invalid
    K-->>K: Update and store flow (e.g. add form validation errors)
    K-->>A: HTTP 302 Found <selfservice.flows.${components}.ui_url>?flow=<flow-id>
    A-->>K: Fetches data to render form fields and errors
    A->>K: Repeat flow with input data, submit, validate, ...
  end
`
}

const SelfServiceBrowserFlow = (props) => (
  <>
    <Mermaid chart={chart(props)} />
    <p>
      The <em>Authentication UI</em> (<strong>your application!</strong>) is
      responsible for rendering the actual Login and Registration HTML Forms.
      You can of course implement one app for rendering all the Login,
      Registration, ... screens, and another app (think "Service Oriented
      Architecture", "Micro-Services" or "Service Mesh") is responsible for
      rendering your Dashboards, Management Screens, and so on.
    </p>
  </>
)

export default SelfServiceBrowserFlow
