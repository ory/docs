// Copyright © 2026 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React from "react"
import KapaWidget from "./KapaWidget"
import AnnouncementBanner from "@site/src/components/AnnouncementBanner/AnnouncementBanner"
import { Buffer } from "buffer"

// Inject Buffer globally (works for browser + weird runtimes)
if (typeof globalThis !== "undefined" && !globalThis.Buffer) {
  globalThis.Buffer = Buffer
}

// Flip to true to show the announcement banner; false to hide it.
const SHOW_ANNOUNCEMENT_BANNER = false

function Root({ children }) {
  return (
    <>
      {SHOW_ANNOUNCEMENT_BANNER && <AnnouncementBanner />}
      {children}
      <KapaWidget />
    </>
  )
}

export default Root