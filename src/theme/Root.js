// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React from "react"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import KapaWidget from "./KapaWidget"

const queryClient = new QueryClient()

function Root({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <KapaWidget />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){let k=window.Kapa;if(!k){let i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};window.Kapa=i}})();`,
        }}
      />
    </>
  )
}

export default Root
