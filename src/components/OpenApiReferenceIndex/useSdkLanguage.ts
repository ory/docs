// Keeps the selected SDK language in sync with localStorage, the `?language=`
// query param, and cross-tab storage events, so it matches the code-sample tabs.

import { useEffect, useState } from "react"

const LS_KEY = "docusaurus.tab.code-samples"

// Maps inbound `?language=` values (and common aliases) to the canonical keys
// used by the code-sample tabs and the `x-sdk-docs` metadata.
const LANG_ALIASES: Record<string, string> = {
  typescript: "TypeScript",
  ts: "TypeScript",
  javascript: "TypeScript",
  js: "TypeScript",
  node: "TypeScript",
  nodejs: "TypeScript",
  go: "go",
  golang: "go",
  python: "python",
  py: "python",
  curl: "curl",
  shell: "curl",
}

function normalizeLang(value?: string | null): string | null {
  if (!value) return null
  return LANG_ALIASES[value.trim().toLowerCase()] ?? null
}

export function useSdkLanguage() {
  const [lang, setLang] = useState<string>(() => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(LS_KEY) ?? "TypeScript"
    }
    return "TypeScript"
  })

  useEffect(() => {
    const normalized = normalizeLang(
      new URLSearchParams(window.location.search).get("language"),
    )
    if (normalized) {
      localStorage.setItem(LS_KEY, normalized)
      setLang(normalized)
    }
  }, [])

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === LS_KEY && e.newValue) setLang(e.newValue)
    }
    window.addEventListener("storage", handler)
    return () => window.removeEventListener("storage", handler)
  }, [])

  return lang
}
