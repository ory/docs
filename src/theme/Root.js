// Copyright © 2026 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React from "react"
import KapaWidget from "./KapaWidget"
import { Buffer } from "buffer"

// Inject Buffer globally (works for browser + weird runtimes)
if (typeof globalThis !== "undefined" && !globalThis.Buffer) {
  globalThis.Buffer = Buffer
}

function Root({ children }) {
  return (
    <>
      {children}
      <KapaWidget />
    </>
  )
}

export default Root
