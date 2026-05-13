import React, { useRef, useState } from "react"
import clsx from "clsx"
import { DEPLOYMENT_OPTIONS } from "./constants"
import { useClickOutside } from "./hooks/useClickOutside"
import type { DeploymentMode } from "./types"

interface DeploymentModeSelectorProps {
  value: DeploymentMode
  onChange: (mode: DeploymentMode) => void
}

export const DeploymentModeSelector: React.FC<DeploymentModeSelectorProps> = ({
  value,
  onChange,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(menuRef, menuOpen, () => setMenuOpen(false))

  return (
    <div className="absolute top-0 right-0" ref={menuRef}>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full border border-ory-border-primary bg-ory-bg-primary ory-body-sm cursor-pointer"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="font-medium text-ory-text-primary">Deployment</span>
        <span className="text-ory-text-secondary">
          {DEPLOYMENT_OPTIONS.find((opt) => opt.id === value)?.label ??
            "Ory Network"}
        </span>
        <span className="text-[0.7rem]">▾</span>
      </button>

      {menuOpen && (
        <div className="absolute z-[5] right-0 mt-2 p-2 rounded-[var(--ory-radius)] border border-ory-border-primary bg-ory-bg-primary min-w-[220px] shadow-[0_16px_40px_rgba(0,0,0,0.12)] flex flex-col gap-1">
          {DEPLOYMENT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={clsx(
                "border-0 bg-transparent py-2.5 px-3 text-left cursor-pointer rounded-[var(--ory-radius-btn)] ory-body-sm text-ory-text-primary transition-colors duration-150",
                value === opt.id && "bg-ory-bg-tertiary font-semibold",
                value !== opt.id && "hover:bg-ory-bg-secondary",
              )}
              onClick={() => {
                onChange(opt.id)
                setMenuOpen(false)
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
