// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import type { RateLimitsProvider } from "./types"
import { createCsvProvider } from "./csv-provider"

let defaultProvider: RateLimitsProvider | null = null

/**
 * Returns the active rate limits provider. Default is the CSV provider.
 * When RATE_LIMITS_API_BASE (or equivalent) is set, can be switched to API provider later.
 */
export function getProvider(): RateLimitsProvider {
  if (!defaultProvider) {
    defaultProvider = createCsvProvider()
  }
  return defaultProvider
}

/**
 * For tests or when you want to inject a different provider.
 */
export function setProvider(provider: RateLimitsProvider): void {
  defaultProvider = provider
}
