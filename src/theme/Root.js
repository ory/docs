// Copyright © 2026 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React from "react"
import KapaWidget from "./KapaWidget"

function Root({ children }) {
  return (
    <>
      {children}
      <KapaWidget />
    </>
  )
}

export default Root
