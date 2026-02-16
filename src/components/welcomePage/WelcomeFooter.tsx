import React from "react"

const PRIVACY_URL = "https://www.ory.com/privacy"
const TERMS_URL = "https://www.ory.com/tos"
const STATUS_URL = "https://status.ory.com"

export function WelcomeFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ory-border-primary pt-ory-6 pb-ory-6 bg-[#f6f7f9]">
      <div className="max-w-[1024px] mx-auto px-6 w-full">
        <div className="flex flex-wrap items-center justify-between gap-ory-4">
          <div className="flex flex-wrap items-center gap-ory-2 ory-body-xs text-ory-text-tertiary">
            <span>© {year} Ory Corp</span>
            <span className="text-ory-border-primary" aria-hidden>
              ·
            </span>
            <a
              href={PRIVACY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ory-text-tertiary no-underline"
            >
              Privacy
            </a>
            <span className="text-ory-border-primary" aria-hidden>
              ·
            </span>
            <a
              href={TERMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ory-text-tertiary no-underline"
            >
              Terms of service
            </a>
          </div>

          <a
            href={STATUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline inline-flex items-center gap-ory-2 bg-ory-bg-primary py-ory-2 px-ory-3 rounded-ory ory-body-xs text-ory-text-secondary shadow-sm"
          >
            <span>All systems operational</span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
