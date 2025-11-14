// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import KapaWidget from "./KapaWidget"

const queryClient = new QueryClient()

function Root({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <script src={"//consent.ory.com/cmp/init.js"} async></script>
      <script src={"//consent.ory.com/index.js"} async></script>
      <KapaWidget />
    </>
  )
}

export default Root
