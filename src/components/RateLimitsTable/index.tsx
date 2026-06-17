// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import useBaseUrl from "@docusaurus/useBaseUrl"
import React, { useMemo, useRef, useState, useEffect } from "react"
import type { Env, RateLimitsData, Tier } from "./types"

const TIERS: Tier[] = ["Developer", "Production", "Growth", "Enterprise"]
const ENVS: Env[] = ["Development", "Staging", "Production"]
const SEARCH_DEBOUNCE_MS = 250
const HIDDEN_METHODS = ["OPTIONS", "HEAD"]

function matchParam<T extends string>(
  value: string | null,
  allowed: readonly T[],
): T | undefined {
  if (!value) return undefined
  return allowed.find((a) => a.toLowerCase() === value.toLowerCase())
}

function allowedEnvsForTier(tier: Tier): Env[] {
  // The Developer tier only has Development projects.
  return tier === "Developer" ? ["Development"] : ENVS
}

function coerceEnv(tier: Tier, env: Env): Env {
  const allowed = allowedEnvsForTier(tier)
  return allowed.includes(env) ? env : allowed[0]
}

function writeUrlParams(params: { tier?: Tier; env?: Env }): void {
  if (typeof window === "undefined") return
  const url = new URL(window.location.href)
  if (params.tier) url.searchParams.set("tier", params.tier)
  if (params.env) url.searchParams.set("env", params.env)
  window.history.replaceState(window.history.state, "", url.toString())
}

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
  const [env, setEnv] = useState<Env>(() => coerceEnv(initialTier, initialEnv))
  const [pathSearch, setPathSearch] = useState("")
  const [pathSearchDebounced, setPathSearchDebounced] = useState("")
  // True once the tier/env selection came from the URL or the user; props
  // must not override it anymore.
  const tierPinned = useRef(false)
  const envPinned = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollPending = useRef(false)

  useEffect(() => {
    const t = setTimeout(
      () => setPathSearchDebounced(pathSearch),
      SEARCH_DEBOUNCE_MS,
    )
    return () => clearTimeout(t)
  }, [pathSearch])

  React.useEffect(() => {
    if (!tierPinned.current) setTier(initialTier)
    if (!envPinned.current)
      setEnv(coerceEnv(tierPinned.current ? tier : initialTier, initialEnv))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTier, initialEnv])

  // Apply ?tier= and ?env= after mount; window is unavailable during SSR and
  // the first client render must match the pre-rendered HTML.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tierParam = matchParam(params.get("tier"), TIERS)
    const envParam = matchParam(params.get("env"), ENVS)
    if (tierParam) {
      tierPinned.current = true
      setTier(tierParam)
    }
    const nextEnv = coerceEnv(tierParam ?? initialTier, envParam ?? env)
    if (envParam || nextEnv !== env) {
      envPinned.current = true
      setEnv(nextEnv)
    }
    // Deep links should land on the table; an explicit hash wins.
    if ((tierParam || envParam) && !window.location.hash) {
      scrollPending.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Scroll once the table has rendered, so the target has its final position.
  useEffect(() => {
    if (!loading && scrollPending.current) {
      scrollPending.current = false
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
      containerRef.current?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      })
    }
  }, [loading])

  const filteredThresholds = useMemo(() => {
    if (!data) return []
    return data.thresholds.filter((t) => t.tier === tier && t.env === env)
  }, [data, tier, env])

  const bucketToEndpoints = useMemo(() => {
    if (!data) return new Map<string, Array<{ method: string; path: string }>>()
    const m = new Map<string, Array<{ method: string; path: string }>>()
    for (const e of data.endpoints.filter(
      (e) => !HIDDEN_METHODS.includes(e.method),
    )) {
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
    <div
      ref={containerRef}
      className="rate-limits-table"
      // Keep the sticky navbar and the table heading above visible when
      // deep links scroll to the table.
      style={{ scrollMarginTop: "calc(var(--ifm-navbar-height, 60px) + 4rem)" }}
    >
      <div className="flex flex-wrap gap-4 mb-6">
        <label className="flex items-center gap-2">
          <span>Tier:</span>
          <select
            value={tier}
            onChange={(e) => {
              const next = e.target.value as Tier
              tierPinned.current = true
              setTier(next)
              const nextEnv = coerceEnv(next, env)
              if (nextEnv !== env) {
                envPinned.current = true
                setEnv(nextEnv)
                writeUrlParams({ tier: next, env: nextEnv })
              } else {
                writeUrlParams({ tier: next })
              }
            }}
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
            onChange={(e) => {
              const next = e.target.value as Env
              envPinned.current = true
              setEnv(next)
              writeUrlParams({ env: next })
            }}
            aria-label="Project environment"
            className="rounded border px-2 py-1 bg-[var(--ifm-background-surface-color)] text-[var(--ifm-font-color-base)] border-[var(--ifm-color-emphasis-300)]"
          >
            {allowedEnvsForTier(tier).map((e) => (
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
                const endpointDisplay = endpoints.length
                  ? endpoints.map((e) => {
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
                return (
                  <tr key={`${t.bucket}-${t.tier}-${t.env}`}>
                    <td className="p-2 border-b border-gray-200 dark:border-gray-700 align-top max-w-md">
                      {endpointDisplay}
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
