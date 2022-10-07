// Copyright © 2022 Ory Corp

import React from "react"
import ApiDoc from "@theme/ApiDoc"
import useBaseUrl from "@docusaurus/useBaseUrl"

function CustomPage() {
  return (
    <ApiDoc
      layoutProps={{
        title: "HTTP API Docs",
        description: `Read the HTTP API reference documentation`,
      }}
      spec={{
        type: "url",
        content: useBaseUrl(`reference/api.json`),
      }}
    />
  )
}

export default CustomPage
