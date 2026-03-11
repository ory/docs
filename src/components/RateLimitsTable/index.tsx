// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import useBaseUrl from "@docusaurus/useBaseUrl"
import React, { useMemo, useState, useEffect } from "react"
import type { Env, RateLimitsData, Tier } from "./types"

const TIERS: Tier[] = ["Developer", "Production", "Growth", "Enterprise"]
const ENVS: Env[] = ["Development", "Staging", "Production"]
const SEARCH_DEBOUNCE_MS = 250

function useRateLimitsData(): {
  data: RateLimitsData | null
  loading: boolean
  error: string | null
} {
  const baseUrl = useBaseUrl("rate-limits.json")
  const [data, setData] = useState<RateLimitsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  React.useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(baseUrl)
      .then((res) => {
        if (!res.ok)
          throw new Error(`Failed to load rate limits: ${res.status}`)
        return res.json()
      })
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false))
  }, [baseUrl])

  return { data, loading, error }
}

export interface RateLimitsTableProps {
  /** Pre-select subscription tier (e.g. on tier subpages). */
  initialTier?: Tier
  /** Pre-select project environment. */
  initialEnv?: Env
}

export default function RateLimitsTable({
  initialTier = "Growth",
  initialEnv = "Production",
}: RateLimitsTableProps): React.ReactElement {
  const { data, loading, error } = useRateLimitsData()
  const [tier, setTier] = useState<Tier>(initialTier)
  const [env, setEnv] = useState<Env>(initialEnv)
  const [pathSearch, setPathSearch] = useState("")
  const [pathSearchDebounced, setPathSearchDebounced] = useState("")

  useEffect(() => {
    const t = setTimeout(
      () => setPathSearchDebounced(pathSearch),
      SEARCH_DEBOUNCE_MS,
    )
    return () => clearTimeout(t)
  }, [pathSearch])

  React.useEffect(() => {
    setTier(initialTier)
    setEnv(initialEnv)
  }, [initialTier, initialEnv])

  const filteredThresholds = useMemo(() => {
    if (!data) return []
    return data.thresholds.filter((t) => t.tier === tier && t.env === env)
  }, [data, tier, env])

  const bucketToEndpoints = useMemo(() => {
    if (!data) return new Map<string, Array<{ method: string; path: string }>>()
    const m = new Map<string, Array<{ method: string; path: string }>>()
    for (const e of data.endpoints) {
      const list = m.get(e.bucket) ?? []
      list.push({ method: e.method, path: e.path })
      m.set(e.bucket, list)
    }
    return m
  }, [data])

  const searchQuery = pathSearchDebounced.trim().toLowerCase()

  const endpointMatchesSearch = useMemo(() => {
    if (!searchQuery) return () => false
    return (e: { method: string; path: string }) =>
      e.path.toLowerCase().includes(searchQuery) ||
      e.method.toLowerCase().includes(searchQuery) ||
      `${e.method} ${e.path}`.toLowerCase().includes(searchQuery)
  }, [searchQuery])

  const bucketsWithSearchMatch = useMemo(() => {
    if (!searchQuery || !data) return null
    const set = new Set<string>()
    for (const e of data.endpoints) {
      if (endpointMatchesSearch(e)) set.add(e.bucket)
    }
    return set
  }, [data, searchQuery, endpointMatchesSearch])

  const displayedThresholds = useMemo(() => {
    if (!bucketsWithSearchMatch) return filteredThresholds
    return filteredThresholds.filter((t) =>
      bucketsWithSearchMatch.has(t.bucket),
    )
  }, [filteredThresholds, bucketsWithSearchMatch])

  if (loading) {
    return (
      <p className="text-gray-600 dark:text-gray-400">
        Loading rate limits data…
      </p>
    )
  }
  if (error) {
    return (
      <p className="text-red-600 dark:text-red-400">
        <strong>Error loading rate limits:</strong> {error}
      </p>
    )
  }
  if (!data) {
    return (
      <p className="text-gray-600 dark:text-gray-400">
        No rate limits data available.
      </p>
    )
  }

  return (
    <div className="rate-limits-table">
      <div className="flex flex-wrap gap-4 mb-6">
        <label className="flex items-center gap-2">
          <span>Tier:</span>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value as Tier)}
            aria-label="Subscription tier"
            className="rounded border px-2 py-1 bg-[var(--ifm-background-surface-color)] text-[var(--ifm-font-color-base)] border-[var(--ifm-color-emphasis-300)]"
          >
            {TIERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span>Environment:</span>
          <select
            value={env}
            onChange={(e) => setEnv(e.target.value as Env)}
            aria-label="Project environment"
            className="rounded border px-2 py-1 bg-[var(--ifm-background-surface-color)] text-[var(--ifm-font-color-base)] border-[var(--ifm-color-emphasis-300)]"
          >
            {ENVS.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span>Search API path:</span>
          <input
            type="search"
            value={pathSearch}
            onChange={(e) => setPathSearch(e.target.value)}
            placeholder="e.g. /sessions/whoami"
            aria-label="Search by API path or method"
            className="min-w-[200px] rounded border px-2 py-1 bg-[var(--ifm-background-surface-color)] text-[var(--ifm-font-color-base)] border-[var(--ifm-color-emphasis-300)]"
          />
        </label>
      </div>

      <section>
        <h4 className="text-lg font-semibold mb-2">
          Thresholds per bucket ({tier} / {env})
          {searchQuery && (
            <span className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-400">
              (filtered by search)
            </span>
          )}
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 border-b border-gray-300 dark:border-gray-600">
                  Endpoint(s)
                </th>
                <th className="text-left p-2 border-b border-gray-300 dark:border-gray-600">
                  Bucket
                </th>
                <th className="text-right p-2 border-b border-gray-300 dark:border-gray-600">
                  Sustained (rpm)
                </th>
                <th className="text-right p-2 border-b border-gray-300 dark:border-gray-600">
                  Burst (rps)
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedThresholds.map((t) => {
                const endpoints = bucketToEndpoints.get(t.bucket) ?? []
                const maxEndpoints = searchQuery ? endpoints.length : 20
                const endpointsToShow = endpoints.slice(0, maxEndpoints)
                const endpointDisplay = endpointsToShow.length
                  ? endpointsToShow.map((e) => {
                      const isMatch = endpointMatchesSearch(e)
                      return (
                        <div
                          key={`${e.method}-${e.path}`}
                          className={`mb-1 rounded px-1 -mx-1 ${
                            isMatch
                              ? "bg-amber-200 dark:bg-amber-900/50 ring-1 ring-amber-400 dark:ring-amber-600"
                              : ""
                          }`}
                        >
                          <code>{e.path}</code>{" "}
                          <span className="text-gray-500 dark:text-gray-400">
                            ({e.method})
                          </span>
                        </div>
                      )
                    })
                  : null
                const overflow =
                  endpoints.length > maxEndpoints
                    ? endpoints.length - maxEndpoints
                    : 0
                return (
                  <tr key={`${t.bucket}-${t.tier}-${t.env}`}>
                    <td className="p-2 border-b border-gray-200 dark:border-gray-700 align-top max-w-md">
                      {endpointDisplay}
                      {overflow > 0 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          +{overflow} more
                        </div>
                      )}
                    </td>
                    <td className="p-2 border-b border-gray-200 dark:border-gray-700">
                      <code>{t.bucket}</code>
                    </td>
                    <td className="p-2 border-b border-gray-200 dark:border-gray-700 text-right">
                      {t.rpm}
                    </td>
                    <td className="p-2 border-b border-gray-200 dark:border-gray-700 text-right">
                      {t.rps}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {searchQuery && displayedThresholds.length === 0 && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            No buckets match the search &quot;{pathSearchDebounced.trim()}
            &quot;.
          </p>
        )}
      </section>
    </div>
  )
}
