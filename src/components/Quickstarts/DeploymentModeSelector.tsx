import React, { useRef, useState } from "react"
import clsx from "clsx"
import styles from "./quickstart-filter.module.css"
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
    <div className={styles.deploymentBar} ref={menuRef}>
      <button
        type="button"
        className={styles.deploymentTrigger}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={styles.deploymentTriggerLabel}>Deployment</span>
        <span className={styles.deploymentTriggerValue}>
          {DEPLOYMENT_OPTIONS.find((opt) => opt.id === value)?.label ??
            "Ory Network"}
        </span>
        <span className={styles.deploymentTriggerChevron}>▾</span>
      </button>

      {menuOpen && (
        <div className={styles.deploymentMenu}>
          {DEPLOYMENT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={clsx(
                styles.deploymentOption,
                value === opt.id && styles.deploymentOptionActive,
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
