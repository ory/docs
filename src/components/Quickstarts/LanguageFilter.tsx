import React, { useRef, useState, useImperativeHandle, forwardRef } from "react"
import clsx from "clsx"
import styles from "./quickstart-filter.module.css"
import { LANGUAGE_META } from "./constants"
import { useClickOutside } from "./hooks/useClickOutside"
import { useLanguageGrouping } from "./hooks/useLanguageGrouping"

interface LanguageFilterProps {
  availableLanguages: string[]
  activeLanguage: string
  onLanguageChange: (language: string) => void
}

export interface LanguageFilterRef {
  close: () => void
}

export const LanguageFilter = forwardRef<
  LanguageFilterRef,
  LanguageFilterProps
>(({ availableLanguages, activeLanguage, onLanguageChange }, ref) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const groupedLanguages = useLanguageGrouping(availableLanguages)

  useClickOutside(menuRef, menuOpen, () => setMenuOpen(false))

  useImperativeHandle(ref, () => ({
    close: () => setMenuOpen(false),
  }))

  if (availableLanguages.length <= 1) {
    return null
  }

  return (
    <div className={styles.languageBar} ref={menuRef}>
      <button
        type="button"
        className={styles.languageTrigger}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={styles.languageTriggerLabel}>Language/framework</span>
        <span className={styles.languageTriggerValue}>
          {activeLanguage === "all"
            ? "All languages"
            : LANGUAGE_META[activeLanguage]?.label ?? activeLanguage}
        </span>
        <span className={styles.languageTriggerChevron}>▾</span>
      </button>

      {menuOpen && (
        <div className={styles.languageMenu}>
          {["Web", "Mobile", "Backend", "Other"].map((group) => {
            const langs = groupedLanguages[group]
            if (!langs || langs.length === 0) {
              return null
            }

            return (
              <div key={group} className={styles.languageColumn}>
                <div className={styles.languageGroupLabel}>{group}</div>
                {langs.map((meta) => (
                  <button
                    key={meta.id}
                    type="button"
                    className={clsx(
                      styles.languageOption,
                      activeLanguage === meta.id && styles.languageOptionActive,
                    )}
                    onClick={() => {
                      onLanguageChange(meta.id)
                      setMenuOpen(false)
                    }}
                  >
                    <span className={styles.languageOptionInner}>
                      <img
                        src={meta.icon}
                        alt={`${meta.label} logo`}
                        className={styles.languageIcon}
                      />
                      <span>{meta.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            )
          })}
          <div className={styles.languageFooter}>
            <button
              type="button"
              className={styles.languageAllButton}
              onClick={() => {
                onLanguageChange("all")
                setMenuOpen(false)
              }}
            >
              Show all languages
            </button>
          </div>
        </div>
      )}
    </div>
  )
})

LanguageFilter.displayName = "LanguageFilter"
