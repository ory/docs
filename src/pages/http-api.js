import React from "react"
import ApiDoc from "@theme/ApiDoc"
import useBaseUrl from "@docusaurus/useBaseUrl"
import useSpecData from "@theme/useSpecData"

function CustomPage() {
  const specData = useSpecData("ory-network-api")
  return (
    <ApiDoc
      layoutProps={{
        title: "HTTP API Docs",
        description: `Read the HTTP API reference documentation`,
      }}
      specProps={specData}
    />
  )
}

export default CustomPage
