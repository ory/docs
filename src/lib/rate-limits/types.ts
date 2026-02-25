// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

/**
 * Subscription tier (doc-friendly; CSV has "Develop" which we normalize to "Developer").
 */
export type Tier =
  | "Developer"
  | "Production"
  | "Growth"
  | "Enterprise"

/**
 * Project environment (doc-friendly; CSV has dev/prod/stage which we normalize).
 */
export type Env = "Development" | "Staging" | "Production"

/**
 * One row from the bucket-to-endpoints CSV: method + path → bucket.
 */
export interface EndpointRow {
  method: string
  path: string
  bucket: string
}

/**
 * One row from the bucket-to-threshold CSV: bucket + tier + env → rpm, rps.
 * Tier and env are normalized to doc-friendly values.
 */
export interface ThresholdRow {
  bucket: string
  tier: Tier
  env: Env
  rpm: number
  rps: number
}

/**
 * Options to filter getThresholds() results.
 */
export interface GetThresholdsOptions {
  tier?: Tier
  env?: Env
  bucket?: string
}

/**
 * Provider interface: same shape for CSV or future API provider.
 */
export interface RateLimitsProvider {
  getEndpointsByBucket(): Promise<EndpointRow[]>
  getThresholds(options?: GetThresholdsOptions): Promise<ThresholdRow[]>
}

/** CSV tier value → doc-friendly Tier */
export const TIER_FROM_CSV: Record<string, Tier> = {
  Develop: "Developer",
  Production: "Production",
  Growth: "Growth",
  Enterprise: "Enterprise",
}

/** CSV env value → doc-friendly Env */
export const ENV_FROM_CSV: Record<string, Env> = {
  dev: "Development",
  prod: "Production",
  stage: "Staging",
}
