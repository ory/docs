import { useMemo } from "react"
import { LANGUAGE_META } from "../constants"
import type { LanguageMeta } from "../types"

export function useLanguageGrouping(availableLanguages: string[]) {
  return useMemo(() => {
    const groups: Record<string, LanguageMeta[]> = {}

    availableLanguages.forEach((lang) => {
      const meta =
        LANGUAGE_META[lang] ??
        ({
          id: lang,
          label: lang,
          group: "Other",
          icon: `/docs/img/examples/${lang}.svg`,
        } as LanguageMeta)

      if (!groups[meta.group]) {
        groups[meta.group] = []
      }

      groups[meta.group].push(meta)
    })
    ;(Object.keys(groups) as Array<keyof typeof groups>).forEach((group) => {
      groups[group].sort((a, b) => a.label.localeCompare(b.label))
    })

    return groups
  }, [availableLanguages])
}
