import React from "react"
import { colors, spacing, typography } from "./tokens"
import styles from "@site/src/pages/welcome.module.css"

const PRIVACY_URL = "https://www.ory.com/privacy"
const TERMS_URL = "https://www.ory.com/tos"
const STATUS_URL = "https://status.ory.com"

export function WelcomeFooter() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: "#f6f7f9",
        borderTop: `1px solid ${colors.borderPrimary}`,
        paddingTop: spacing.size6,
        paddingBottom: spacing.size6,
      }}
    >
      <div className={styles.container1024}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: spacing.size4,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: spacing.size2,
              fontFamily: typography.fontFamily,
              fontSize: typography.fontSizeXs,
              fontWeight: typography.fontWeightNormal,
              lineHeight: typography.lineHeightNormal,
              color: colors.textTertiary,
            }}
          >
            <span>© {year} Ory Corp</span>
            <span style={{ color: colors.borderPrimary }} aria-hidden>
              ·
            </span>
            <a
              href={PRIVACY_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: colors.textTertiary,
                textDecoration: "none",
              }}
            >
              Privacy
            </a>
            <span style={{ color: colors.borderPrimary }} aria-hidden>
              ·
            </span>
            <a
              href={TERMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: colors.textTertiary,
                textDecoration: "none",
              }}
            >
              Terms of service
            </a>
          </div>

          <a
            href={STATUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: spacing.size2,
              background: colors.backgroundPrimary,
              padding: `${spacing.size2} ${spacing.size3}`,
              borderRadius: "6px",
              fontFamily: typography.fontFamily,
              fontSize: typography.fontSizeXs,
              fontWeight: typography.fontWeightNormal,
              lineHeight: typography.lineHeightNormal,
              color: colors.textSecondary,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <span>All systems operational</span>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#22c55e",
                flexShrink: 0,
              }}
              aria-hidden
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
