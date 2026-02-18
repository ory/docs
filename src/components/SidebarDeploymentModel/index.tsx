import React, { useState, useRef, useEffect } from "react"
import Link from "@docusaurus/Link"
import useBaseUrl from "@docusaurus/useBaseUrl"
import { useLocation } from "@docusaurus/router"
import clsx from "clsx"
import { useQuickstartsDeployment } from "@site/src/contexts/QuickstartsDeploymentContext"
import type { QuickstartsDeploymentId } from "@site/src/contexts/QuickstartsDeploymentContext"

const DEPLOYMENT_OPTIONS = [
  {
    id: "network" as const,
    label: "Ory Network",
    to: "/docs/network/kratos/intro",
  },
  {
    id: "oel" as const,
    label: "Ory Enterprise License",
    to: "/docs/oel/kratos/intro",
  },
  {
    id: "oss" as const,
    label: "Ory Open Source",
    to: "/docs/oss/kratos/intro",
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

/** True when the current doc is part of quickstarts or OEL self-hosted (sidebar shows deployment switcher). */
function isQuickstartsPath(pathname: string): boolean {
  const p = pathname.replace(/^\/docs\/?/, "")
  return (
    p.startsWith("getting-started") ||
    p.startsWith("network/") ||
    p.startsWith("oel/") ||
    p.startsWith("oss/") ||
    p.startsWith("self-hosted/oel/")
  )
}

/** True when on getting-started/* only (no network/oel/oss in path); switching deployment should filter sidebar only. */
function isGettingStartedOnlyPath(pathname: string): boolean {
  if (!pathname) return false
  const p = pathname.replace(/^\/docs\/?/, "")
  return (
    p.startsWith("getting-started") &&
    !pathname.includes("/network/") &&
    !pathname.includes("/oel/") &&
    !pathname.includes("/oss/")
  )
}

export default function SidebarDeploymentModel(): JSX.Element | null {
  const location = useLocation()
  const quickstartsDeployment = useQuickstartsDeployment()
  if (!isQuickstartsPath(location.pathname)) return null

  const filterOnly = isGettingStartedOnlyPath(location.pathname)
  const currentFromPath = getCurrentDeployment(location.pathname)
  const current =
    filterOnly && quickstartsDeployment
      ? DEPLOYMENT_OPTIONS.find(
          (o) => o.id === quickstartsDeployment.deployment,
        ) ?? currentFromPath
      : currentFromPath
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const networkIconUrl = useBaseUrl("img/ory-network-icon.svg")

  const handleSelect = (opt: (typeof DEPLOYMENT_OPTIONS)[number]) => {
    if (filterOnly && quickstartsDeployment) {
      quickstartsDeployment.setDeployment(opt.id as QuickstartsDeploymentId)
      setOpen(false)
    }
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
              src={networkIconUrl}
              alt=""
              width={20}
              height={20}
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
          <span className="sidebar-deployment-model__chevron" aria-hidden>
            ▾
          </span>
        </button>
        {open && (
          <ul className="sidebar-deployment-model__menu">
            {DEPLOYMENT_OPTIONS.map((opt) =>
              filterOnly ? (
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
                    {opt.label}
                  </button>
                </li>
              ) : (
                <li key={opt.id}>
                  <Link
                    to={opt.to}
                    className={clsx(
                      "sidebar-deployment-model__link",
                      current.id === opt.id &&
                        "sidebar-deployment-model__link--active",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {opt.label}
                  </Link>
                </li>
              ),
            )}
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
