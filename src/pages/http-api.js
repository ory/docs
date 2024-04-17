// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React from "react"
import ApiDoc from "@theme/ApiDoc"
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
