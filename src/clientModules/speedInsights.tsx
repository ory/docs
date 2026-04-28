// Copyright © 2026 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { injectSpeedInsights } from "@vercel/speed-insights"

if (typeof window !== "undefined") {
  injectSpeedInsights()
}
