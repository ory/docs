import { useMemo } from "react"
import * as exampleContent from "@site/src/pages/_assets/examples-content"
import type { QuickstartCategory } from "../types"

export function useExampleFilter(activeCategory: QuickstartCategory) {
  return useMemo(() => {
    const { basic, customui, community } = exampleContent

    const allGroups = [basic, customui, community]

    // Per-product filters – fall back to showing all examples if no filter.
    const filterByCategory: Record<
      string,
      ((title: string, docs?: string) => boolean) | undefined
    > = {
      // Ory Kratos: show all current examples.
      "ory-kratos": undefined,
      "ory-elements": (title, docs) =>
        title.toLowerCase().includes("customize self-service ui") ||
        (docs ?? "").toLowerCase().includes("nextjs"),
      // Hydra: examples whose docs mention hydra.
      "ory-hydra": (_title, docs) =>
        (docs ?? "").toLowerCase().includes("hydra"),
      // Keto: examples whose docs mention keto.
      "ory-keto": (_title, docs) => (docs ?? "").toLowerCase().includes("keto"),
      // Others currently have no dedicated examples.
      "ory-oathkeeper": () => false,
      "ory-polis": () => false,
    }

    const filterFn = filterByCategory[activeCategory.id]

    const byCategory = filterFn
      ? allGroups
          .map((group) => ({
            ...group,
            examples: group.examples.filter((ex) =>
              filterFn(ex.title, ex.docs as string | undefined),
            ),
          }))
          .filter((group) => group.examples.length > 0)
      : allGroups

    // Collect languages used in these examples
    const languageSet = new Set<string>()
    byCategory.forEach((group) =>
      group.examples.forEach((ex) => {
        if (ex.language) {
          languageSet.add(ex.language)
        }
      }),
    )

    return {
      filteredExampleGroups: byCategory,
      availableLanguages: Array.from(languageSet).sort(),
    }
  }, [activeCategory.id])
}
