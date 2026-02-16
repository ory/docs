import { useMemo, useRef, useState } from "react"
import ExampleList from "../Examples/example-list"
import { CategoryFilter } from "./CategoryFilter"
import { CATEGORIES } from "./constants"
import { DeploymentModeSelector } from "./DeploymentModeSelector"
import { useExampleFilter } from "./hooks/useExampleFilter"
import { LanguageFilter, type LanguageFilterRef } from "./LanguageFilter"
import styles from "./quickstart-filter.module.css"
import { QuickstartGrid } from "./QuickstartGrid"
import type { DeploymentMode } from "./types"

function getInitialLanguageFromUrl(): string {
  if (typeof window === "undefined") return "all"
  const params = new URLSearchParams(window.location.search)
  const lang = params.get("language")
  return lang ?? "all"
}

export const QuickstartFilter = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    CATEGORIES[0]?.id ?? "",
  )
  const [deploymentMode, setDeploymentMode] =
    useState<DeploymentMode>("network")
  const [activeLanguage, setActiveLanguage] = useState<string>(
    getInitialLanguageFromUrl,
  )
  const languageFilterRef = useRef<LanguageFilterRef>(null)

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
      <section className={styles.container}>
        <DeploymentModeSelector
          value={deploymentMode}
          onChange={setDeploymentMode}
        />

        <h2 className={`ory-heading-2 ${styles.sectionHeading}`}>
          Quickstart guides
        </h2>

        <div className={styles.headerRow}>
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

      <section className={styles.examplesSection}>
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
          <p className={`ory-body-sm ${styles.noExamplesText}`}>
            No code examples are available for this product yet.
          </p>
        )}
      </section>
    </>
  )
}
