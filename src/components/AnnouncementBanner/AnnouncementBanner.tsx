import React from "react"

import AnnouncementContent from "@site/src/content/announcement-banner.mdx"
import * as announcementModule from "@site/src/content/announcement-banner.mdx"
import styles from "./AnnouncementBanner.module.css"

type AnnouncementLevel = "info" | "warning" | "error" | "success"

function getLevelClasses(level: AnnouncementLevel) {
  switch (level) {
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-950"
    case "error":
      return "border-red-200 bg-red-50 text-red-950"
    case "success":
      return "border-emerald-200 bg-emerald-50 text-emerald-950"
    case "info":
    default:
      return "border-purple-200 bg-purple-50 text-purple-950"
  }
}

function getDismissStorageKey(id: string) {
  return `ory_docs_announcement_dismissed:${id}`
}

export default function AnnouncementBanner() {
  const announcement = (announcementModule as any).announcement as
    | {
        enabled?: boolean
        id?: string
        level?: string
      }
    | undefined

  const enabled = Boolean(announcement?.enabled)
  const id = announcement?.id
  const level = (announcement?.level ?? "info") as AnnouncementLevel

  const [ready, setReady] = React.useState(false)
  const [dismissed, setDismissed] = React.useState(false)

  React.useEffect(() => {
    if (!enabled || !id) {
      setReady(true)
      return
    }
    try {
      const isDismissed = window.localStorage.getItem(getDismissStorageKey(id))
      setDismissed(Boolean(isDismissed))
    } catch {
      // ignore (private browsing / blocked storage)
    } finally {
      setReady(true)
    }
  }, [enabled, id])

  if (!enabled || !id) return null
  if (!ready) return null
  if (dismissed) return null

  return (
    <div
      role="region"
      aria-label="Announcement"
      className={[
        "border-b",
        getLevelClasses(level),
        // keep it readable across layouts
        "text-base",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-screen-xl items-start gap-3 px-4 py-3">
        <div
          className={`min-w-0 flex-1 leading-5 pt-3 text-center ${styles.announcementContent}`}
        >
          <AnnouncementContent />
        </div>
        <button
          type="button"
          className={[
            "shrink-0 rounded-md p-1.5 mt-3",
            "border-none bg-transparent cursor-pointer",
            "text-current opacity-60 hover:opacity-100 hover:bg-black/5",
            "transition-all duration-200",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            "focus-visible:ring-purple-600",
          ].join(" ")}
          aria-label="Dismiss announcement"
          onClick={() => {
            setDismissed(true)
            try {
              window.localStorage.setItem(getDismissStorageKey(id), "1")
            } catch {
              // ignore
            }
          }}
        >
          <span aria-hidden="true" className="text-lg font-light leading-none">
            ✕
          </span>
        </button>
      </div>
    </div>
  )
}
