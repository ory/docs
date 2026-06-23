// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

export interface EndpointRow {
  method: string
  path: string
  bucket: string
}

export interface ThresholdRow {
  bucket: string
  tier: string
  env: string
  rpm: number
  rps: number
}

export interface RateLimitsData {
  endpoints: EndpointRow[]
  thresholds: ThresholdRow[]
}

export type Tier = "Developer" | "Production" | "Growth" | "Enterprise"
export type Env = "Development" | "Staging" | "Production"
