// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React from "react"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
const queryClient = new QueryClient()

function Root({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  )
}

export default Root
