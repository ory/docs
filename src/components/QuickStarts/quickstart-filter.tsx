import { useEffect, useMemo, useRef, useState } from "react"
import { useHistory, useLocation } from "@docusaurus/router"
import { useQuickstartsDeployment } from "@site/src/contexts/QuickstartsDeploymentContext"
import ExampleList from "../Examples/example-list"
import { CategoryFilter } from "./CategoryFilter"
import { CATEGORIES } from "./constants"
import { useExampleFilter } from "./hooks/useExampleFilter"
import { LanguageFilter, type LanguageFilterRef } from "./LanguageFilter"
import { QuickstartGrid } from "./QuickstartGrid"
import type { DeploymentMode } from "./types"

function getSearchParams(search: string): URLSearchParams {
  if (!search) return new URLSearchParams()
  return new URLSearchParams(search.startsWith("?") ? search.slice(1) : search)
}

export const QuickstartFilter = () => {
  const history = useHistory()
  const location = useLocation()
  const quickstartsDeployment = useQuickstartsDeployment()

  const deploymentMode: DeploymentMode =
    quickstartsDeployment?.deployment ?? "network"

  const visibleCategories = useMemo(() => {
    return CATEGORIES.filter((cat) =>
      cat.items.some((item) => {
        if (!item.deploymentModes) return true
        return item.deploymentModes.includes(deploymentMode)
      }),
    )
  }, [deploymentMode])

  const [activeCategoryId, setActiveCategoryId] = useState<string>(() => {
    if (typeof window === "undefined")
      return visibleCategories[0]?.id ?? CATEGORIES[0]?.id ?? ""
    const params = getSearchParams(window.location.search)
    const fromUrl = params.get("category")
    const isValid = visibleCategories.some((c) => c.id === fromUrl)
    return (
      (isValid ? fromUrl : visibleCategories[0]?.id) ?? CATEGORIES[0]?.id ?? ""
    )
  })

  const [activeLanguage, setActiveLanguage] = useState<string>(() => {
    if (typeof window === "undefined") return "all"
    const params = getSearchParams(window.location.search)
    return params.get("language") ?? "all"
  })
  const languageFilterRef = useRef<LanguageFilterRef>(null)

  // If the active category is not available for the selected deployment, fall back.
  useEffect(() => {
    if (!visibleCategories.some((c) => c.id === activeCategoryId)) {
      setActiveCategoryId(visibleCategories[0]?.id ?? "")
    }
  }, [activeCategoryId, visibleCategories])

  const activeCategory =
    visibleCategories.find((cat) => cat.id === activeCategoryId) ??
    visibleCategories[0] ??
    CATEGORIES[0]

  const { filteredExampleGroups, availableLanguages } =
    useExampleFilter(activeCategory)

  const filteredByLanguage = useMemo(() => {
    if (activeLanguage === "all") {
      return filteredExampleGroups
    }

    return filteredExampleGroups
      .map((group) => ({
        ...group,
        examples: group.examples.filter((ex) => ex.language === activeLanguage),
      }))
      .filter((group) => group.examples.length > 0)
  }, [filteredExampleGroups, activeLanguage])

  const updateUrlParams = (next: {
    categoryId?: string
    language?: string
  }) => {
    const params = getSearchParams(location.search)
    const firstCategoryId = visibleCategories[0]?.id ?? ""
    const nextCategoryId = next.categoryId ?? activeCategoryId
    const nextLanguage = next.language ?? activeLanguage

    if (nextCategoryId && nextCategoryId !== firstCategoryId) {
      params.set("category", nextCategoryId)
    } else {
      params.delete("category")
    }

    if (nextLanguage && nextLanguage !== "all") {
      params.set("language", nextLanguage)
    } else {
      params.delete("language")
    }

    const qs = params.toString()
    const nextUrl = qs ? `${location.pathname}?${qs}` : location.pathname
    history.replace(nextUrl)
  }

  // Keep state in sync with URL (supports refresh + back/forward).
  useEffect(() => {
    const params = getSearchParams(location.search)
    const urlLanguage = params.get("language") ?? "all"
    if (urlLanguage !== activeLanguage) {
      setActiveLanguage(urlLanguage)
    }

    const urlCategory = params.get("category")
    const firstCategoryId = visibleCategories[0]?.id ?? ""
    const nextCategoryId = visibleCategories.some((c) => c.id === urlCategory)
      ? (urlCategory as string)
      : firstCategoryId

    if (nextCategoryId && nextCategoryId !== activeCategoryId) {
      setActiveCategoryId(nextCategoryId)
      languageFilterRef.current?.close()
    }
  }, [activeCategoryId, activeLanguage, location.search, visibleCategories])

  return (
    <>
      <section className="pt-ory-4 mb-12 relative">
        <div className="mb-ory-8">
          <h2 className="ory-heading-2">Quickstart guides</h2>
        </div>

        <div className="flex flex-wrap justify-between gap-4 items-start">
          <CategoryFilter
            categories={visibleCategories}
            activeCategory={activeCategory}
            onCategoryChange={(categoryId) => {
              setActiveCategoryId(categoryId)
              updateUrlParams({ categoryId })
              languageFilterRef.current?.close()
            }}
          />
        </div>

        <QuickstartGrid
          items={activeCategory.items}
          deploymentMode={deploymentMode}
        />
      </section>

      <section className="mt-10 relative pt-10">
        <LanguageFilter
          ref={languageFilterRef}
          availableLanguages={availableLanguages}
          activeLanguage={activeLanguage}
          onLanguageChange={(lang) => {
            setActiveLanguage(lang)
            updateUrlParams({ language: lang })
          }}
        />

        {filteredByLanguage.length > 0 ? (
          filteredByLanguage.map((group) => (
            <ExampleList
              key={group.id}
              id={group.id}
              title={group.title}
              description={group.description}
              examples={group.examples}
            />
          ))
        ) : (
          <p className="ory-body-sm text-ory-text-tertiary">
            No code examples are available for this product yet.
          </p>
        )}
      </section>
    </>
  )
}
