import React, { useRef, useState, useImperativeHandle, forwardRef } from "react"
import clsx from "clsx"
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
    <div className="absolute top-0 right-0" ref={menuRef}>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full border border-ory-border-primary bg-ory-bg-primary ory-body-sm cursor-pointer"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="font-medium text-ory-text-primary">
          Language/framework
        </span>
        <span className="text-ory-text-secondary">
          {activeLanguage === "all"
            ? "All languages"
            : LANGUAGE_META[activeLanguage]?.label ?? activeLanguage}
        </span>
        <span className="text-[0.7rem]">▾</span>
      </button>

      {menuOpen && (
        <div
          className="absolute z-[5] right-0 mt-2 py-4 px-5 rounded-[var(--ory-radius)] border border-ory-border-primary bg-ory-bg-primary grid gap-4 min-w-[min(100%,680px)] shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))" }}
        >
          {["Web", "Mobile", "Backend", "Other"].map((group) => {
            const langs = groupedLanguages[group]
            if (!langs || langs.length === 0) {
              return null
            }

            return (
              <div key={group} className="flex flex-col gap-1.5">
                <div className="ory-body-sm font-semibold mb-1.5 text-ory-text-primary">
                  {group}
                </div>
                {langs.map((meta) => (
                  <button
                    key={meta.id}
                    type="button"
                    className={clsx(
                      "border-0 bg-transparent py-1.5 px-1.5 text-left cursor-pointer rounded-xl",
                      activeLanguage === meta.id && "bg-ory-bg-tertiary",
                      activeLanguage !== meta.id && "hover:bg-ory-bg-secondary",
                    )}
                    onClick={() => {
                      onLanguageChange(meta.id)
                      setMenuOpen(false)
                    }}
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <img
                        src={meta.icon}
                        alt={`${meta.label} logo`}
                        className="w-[22px] h-[22px]"
                      />
                      <span className="ory-body-sm text-ory-text-primary">
                        {meta.label}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )
          })}
          <div className="col-span-full flex justify-end mt-2">
            <button
              type="button"
              className="border-0 bg-transparent text-ory-brand-primary ory-body-sm cursor-pointer"
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
