// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import * as fs from "fs"
import * as path from "path"
import type {
  EndpointRow,
  Env,
  GetThresholdsOptions,
  RateLimitsProvider,
  ThresholdRow,
  Tier,
} from "./types"
import { ENV_FROM_CSV, TIER_FROM_CSV } from "./types"

const ENDPOINTS_CSV = "bucket-to-endpoints-20260204-1941.csv"
const THRESHOLDS_CSV = "bucket-to-threshold-20260204-1941.csv"

/**
 * Resolve data directory. When running from Docusaurus plugin, pass siteDir so paths resolve correctly.
 */
function getDataDir(siteDir?: string): string {
  if (siteDir) {
    return path.join(siteDir, "src", "lib", "rate-limits", "data")
  }
  return path.join(__dirname, "data")
}

function parseCsv(content: string): string[][] {
  const lines = content.trim().split(/\r?\n/)
  return lines.map((line) => line.split(",").map((cell) => cell.trim()))
}

/**
 * For duplicate (bucket, tier, env) we keep the first row (CSV order).
 */
function dedupeThresholds(rows: ThresholdRow[]): ThresholdRow[] {
  const key = (r: ThresholdRow) => `${r.bucket}|${r.tier}|${r.env}`
  const seen = new Set<string>()
  return rows.filter((r) => {
    const k = key(r)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

export interface CsvProviderOptions {
  /** Site directory (e.g. from Docusaurus plugin context) so CSV paths resolve correctly. */
  siteDir?: string
}

export function createCsvProvider(
  options?: CsvProviderOptions,
): RateLimitsProvider {
  const dataDir = getDataDir(options?.siteDir)
  const endpointsPath = path.join(dataDir, ENDPOINTS_CSV)
  const thresholdsPath = path.join(dataDir, THRESHOLDS_CSV)

  return {
    async getEndpointsByBucket(): Promise<EndpointRow[]> {
      const raw = fs.readFileSync(endpointsPath, "utf-8")
      const rows = parseCsv(raw)
      const [header, ...dataRows] = rows
      if (
        !header ||
        header[0] !== "Method" ||
        header[1] !== "Path" ||
        header[2] !== "Bucket"
      ) {
        throw new Error(`Unexpected endpoints CSV header: ${header?.join(",")}`)
      }
      return dataRows
        .filter((r) => r.length >= 3 && r[0] && r[1] && r[2])
        .map((r) => ({ method: r[0], path: r[1], bucket: r[2] }))
    },

    async getThresholds(
      options?: GetThresholdsOptions,
    ): Promise<ThresholdRow[]> {
      const raw = fs.readFileSync(thresholdsPath, "utf-8")
      const rows = parseCsv(raw)
      const [header, ...dataRows] = rows
      if (
        !header ||
        header[0] !== "bucketname" ||
        header[1] !== "tier" ||
        header[2] !== "env" ||
        header[3] !== "rpm" ||
        header[4] !== "rps"
      ) {
        throw new Error(
          `Unexpected thresholds CSV header: ${header?.join(",")}`,
        )
      }
      let result: ThresholdRow[] = dataRows
        .filter((r) => r.length >= 5 && r[0] && r[1] && r[2])
        .map((r) => {
          const tier = TIER_FROM_CSV[r[1]] ?? (r[1] as Tier)
          const env = ENV_FROM_CSV[r[2]] ?? (r[2] as Env)
          return {
            bucket: r[0],
            tier,
            env,
            rpm: parseInt(r[3], 10) || 0,
            rps: parseInt(r[4], 10) || 0,
          }
        })
      result = dedupeThresholds(result)
      if (options?.tier) result = result.filter((r) => r.tier === options.tier)
      if (options?.env) result = result.filter((r) => r.env === options.env)
      if (options?.bucket)
        result = result.filter((r) => r.bucket === options.bucket)
      return result
    },
  }
}
