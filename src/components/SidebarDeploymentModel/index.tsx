import React, { useState, useRef, useEffect } from "react"
import { useHistory, useLocation } from "@docusaurus/router"
import clsx from "clsx"
import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client"
import { useQuickstartsDeployment } from "@site/src/contexts/QuickstartsDeploymentContext"
import type { QuickstartsDeploymentId } from "@site/src/contexts/QuickstartsDeploymentContext"

import networkImg from "@site/src/static/img/quickstarts/deployment-model-picker/network.png"
import oelImg from "@site/src/static/img/quickstarts/deployment-model-picker/oel.png"
import ossImg from "@site/src/static/img/quickstarts/deployment-model-picker/oss.png"

const toImgSrc = (m: string | { default?: string }): string =>
  typeof m === "string" ? m : (m as { default?: string }).default ?? ""

const DEPLOYMENT_IMAGES = {
  network: toImgSrc(networkImg),
  oel: toImgSrc(oelImg),
  oss: toImgSrc(ossImg),
} as const

/** Sidebar names that show the deployment model picker (quickstarts only). */
const QUICKSTARTS_SIDEBAR_NAMES = new Set([
  "quickstartsSidebar",
  "quickstartsNetworkSidebar",
  "quickstartsNetworkOnlySidebar",
  "quickstartsOelSidebar",
  "quickstartsOssSidebar",
])

const DEPLOYMENT_OPTIONS = [
  {
    id: "network" as const,
    label: "Ory Network",
  },
  {
    id: "oel" as const,
    label: "Ory Enterprise License",
  },
  {
    id: "oss" as const,
    label: "Ory Open Source",
  },
]

function getCurrentDeployment(
  pathname: string,
): (typeof DEPLOYMENT_OPTIONS)[number] {
  if (pathname.includes("/oel/") || pathname.includes("/self-hosted/oel/"))
    return DEPLOYMENT_OPTIONS[1]
  if (pathname.includes("/oss/")) return DEPLOYMENT_OPTIONS[2]
  return DEPLOYMENT_OPTIONS[0]
}

export default function SidebarDeploymentModel(): JSX.Element | null {
  const history = useHistory()
  const location = useLocation()
  const sidebar = useDocsSidebar()
  const quickstartsDeployment = useQuickstartsDeployment()
  if (!sidebar?.name || !QUICKSTARTS_SIDEBAR_NAMES.has(sidebar.name))
    return null

  const currentFromPath = getCurrentDeployment(location.pathname)
  const current = quickstartsDeployment
    ? DEPLOYMENT_OPTIONS.find(
        (o) => o.id === quickstartsDeployment.deployment,
      ) ?? currentFromPath
    : currentFromPath
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const triggerImageUrl = DEPLOYMENT_IMAGES[current.id]

  const handleSelect = (opt: (typeof DEPLOYMENT_OPTIONS)[number]) => {
    if (quickstartsDeployment) {
      quickstartsDeployment.setDeployment(opt.id as QuickstartsDeploymentId)
    }
    setOpen(false)
    history.push("/docs/getting-started/overview")
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent | FocusEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    document.addEventListener("focusin", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
      document.removeEventListener("focusin", handleClickOutside)
    }
  }, [])

  return (
    <div className="sidebar-deployment-model" ref={ref}>
      <p className="sidebar-deployment-model__heading">Configuration</p>
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
              src={triggerImageUrl}
              alt=""
              width={48}
              height={48}
              aria-hidden
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
            aria-hidden
          ></span>
        </button>
        {open && (
          <ul className="sidebar-deployment-model__menu">
            {DEPLOYMENT_OPTIONS.map((opt) => {
              const optImageUrl = DEPLOYMENT_IMAGES[opt.id]
              const content = (
                <>
                  <img
                    src={optImageUrl}
                    alt=""
                    width={48}
                    height={48}
                    className="sidebar-deployment-model__menu-icon"
                    aria-hidden
                  />
                  {opt.label}
                </>
              )
              return (
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
                    {content}
                  </button>
                </li>
              )
            })}
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
