import { useMemo, useRef, useState } from "react"
import { useQuickstartsDeployment } from "@site/src/contexts/QuickstartsDeploymentContext"
import ExampleList from "../Examples/example-list"
import { CategoryFilter } from "./CategoryFilter"
import { CATEGORIES } from "./constants"
import { DeploymentModeSelector } from "./DeploymentModeSelector"
import { useExampleFilter } from "./hooks/useExampleFilter"
import { LanguageFilter, type LanguageFilterRef } from "./LanguageFilter"
import { QuickstartGrid } from "./QuickstartGrid"
import type { DeploymentMode } from "./types"

function getInitialLanguageFromUrl(): string {
  if (typeof window === "undefined") return "all"
  const params = new URLSearchParams(window.location.search)
  const lang = params.get("language")
  return lang ?? "all"
}

export const QuickstartFilter = () => {
  const quickstartsDeployment = useQuickstartsDeployment()
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    CATEGORIES[0]?.id ?? "",
  )
  const [localDeploymentMode, setLocalDeploymentMode] =
    useState<DeploymentMode>("network")
  const [activeLanguage, setActiveLanguage] = useState<string>(
    getInitialLanguageFromUrl,
  )
  const languageFilterRef = useRef<LanguageFilterRef>(null)

  const deploymentMode: DeploymentMode =
    quickstartsDeployment?.deployment ?? localDeploymentMode
  const setDeploymentMode = (mode: DeploymentMode) => {
    if (quickstartsDeployment) {
      quickstartsDeployment.setDeployment(mode)
    } else {
      setLocalDeploymentMode(mode)
    }
  }

  const activeCategory =
    CATEGORIES.find((cat) => cat.id === activeCategoryId) ?? CATEGORIES[0]

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

  return (
    <>
      <section className="my-8 mb-12 relative pt-10">
        <DeploymentModeSelector
          value={deploymentMode}
          onChange={setDeploymentMode}
        />

        <h2 className="ory-heading-2 mt-8 mb-12">
          Quickstart guides
        </h2>

        <div className="flex flex-wrap justify-between gap-4 items-start">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={(categoryId) => {
              setActiveCategoryId(categoryId)
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
          onLanguageChange={setActiveLanguage}
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
