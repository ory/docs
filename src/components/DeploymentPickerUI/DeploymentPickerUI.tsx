import React, { useEffect, useRef, useState } from "react"
import clsx from "clsx"

import networkImg from "@site/src/static/img/quickstarts/deployment-model-picker/network.png"
import oelImg from "@site/src/static/img/quickstarts/deployment-model-picker/oel.png"
import ossImg from "@site/src/static/img/quickstarts/deployment-model-picker/oss.png"

const toImgSrc = (m: string | { default?: string }): string =>
  typeof m === "string" ? m : (m as { default?: string }).default ?? ""

export const DEPLOYMENT_OPTIONS = [
  { id: "network" as const, label: "Ory Network" },
  { id: "oel" as const, label: "Ory Enterprise License" },
  { id: "oss" as const, label: "Ory Open Source" },
] as const

export type DeploymentOption = (typeof DEPLOYMENT_OPTIONS)[number]

export const DEPLOYMENT_IMAGES: Record<DeploymentOption["id"], string> = {
  network: toImgSrc(networkImg),
  oel: toImgSrc(oelImg),
  oss: toImgSrc(ossImg),
}

export const DEPLOYMENT_LABELS: ReadonlySet<string> = new Set(
  DEPLOYMENT_OPTIONS.map((o) => o.label),
)

export const QUICKSTARTS_SIDEBAR_NAMES = new Set([
  "quickstartsSidebar",
  "quickstartsNetworkSidebar",
  "quickstartsNetworkOnlySidebar",
  "quickstartsOelSidebar",
  "quickstartsOssSidebar",
])

interface DeploymentPickerUIProps {
  current: DeploymentOption
  onSelect: (opt: DeploymentOption) => void
}

export default function DeploymentPickerUI({
  current,
  onSelect,
}: DeploymentPickerUIProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent | TouchEvent | FocusEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    document.addEventListener("touchstart", close)
    document.addEventListener("focusin", close)
    return () => {
      document.removeEventListener("mousedown", close)
      document.removeEventListener("touchstart", close)
      document.removeEventListener("focusin", close)
    }
  }, [])

  const handleSelect = (opt: DeploymentOption) => {
    setOpen(false)
    onSelect(opt)
  }

  return (
    <div className="sidebar-deployment-model" ref={ref}>
      <div className="sidebar-deployment-model__block">
        <button
          type="button"
          className={clsx(
            "sidebar-deployment-model__trigger",
            open && "sidebar-deployment-model__trigger--open",
          )}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setOpen((v) => !v)
            }
          }}
        >
          <span className="sidebar-deployment-model__icon">
            <img
              src={DEPLOYMENT_IMAGES[current.id]}
              alt=""
              width={48}
              height={48}
              aria-hidden="true"
            />
          </span>
          <span className="sidebar-deployment-model__text">
            <span className="sidebar-deployment-model__label">
              {current.label}
            </span>
            <span className="sidebar-deployment-model__sublabel">
              Deployment Model
            </span>
          </span>
          <span
            className="sidebar-deployment-model__chevron"
            aria-hidden="true"
          />
        </button>
        {open && (
          <ul className="sidebar-deployment-model__menu">
            {DEPLOYMENT_OPTIONS.map((opt) => (
              <li key={opt.id}>
                <button
                  type="button"
                  className={clsx(
                    "sidebar-deployment-model__link",
                    current.id === opt.id &&
                      "sidebar-deployment-model__link--active",
                  )}
                  onClick={() => handleSelect(opt)}
                >
                  <img
                    src={DEPLOYMENT_IMAGES[opt.id]}
                    alt=""
                    width={48}
                    height={48}
                    className="sidebar-deployment-model__menu-icon"
                    aria-hidden="true"
                  />
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        className="sidebar-deployment-model__separator"
        role="presentation"
      />
    </div>
  )
}
