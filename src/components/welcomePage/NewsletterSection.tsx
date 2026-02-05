import React, { useState } from "react"
import { colors, radius, spacing, typography } from "./tokens"

const PRIVACY_POLICY_URL = "https://ory.com/privacy"

/**
 * Newsletter / security updates signup section (from Figma node 6132-43373).
 * Logo left, email form + disclaimer right.
 */
export function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: integration with newsletter backend can be added later
  }

  return (
    <section
      style={{
        paddingTop: spacing.size16,
        paddingBottom: spacing.size16,
        background: colors.backgroundSecondary,
      }}
    >
      <div className="container" style={{ maxWidth: "1024px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: spacing.size8,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <a
              href="https://www.ory.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block" }}
            >
              <img
                src="/docs/img/logos/ory-logo.svg"
                alt="Ory"
                width={120}
                height={32}
                style={{ display: "block" }}
              />
            </a>
          </div>

          <div
            style={{
              flex: "1 1 320px",
              minWidth: 0,
              maxWidth: "480px",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: spacing.size3,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: spacing.size2,
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-label="Email for security updates"
                  style={{
                    flex: "1 1 200px",
                    minWidth: "200px",
                    padding: `${spacing.size2} ${spacing.size3}`,
                    fontFamily: typography.fontFamily,
                    fontSize: typography.fontSizeBase,
                    lineHeight: typography.lineHeightNormal,
                    color: colors.textPrimary,
                    background: colors.backgroundPrimary,
                    border: `1px solid ${colors.borderPrimary}`,
                    borderRadius: radius.buttons,
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: `${spacing.size2} ${spacing.size4}`,
                    fontFamily: typography.fontFamily,
                    fontSize: typography.fontSizeBase,
                    fontWeight: typography.fontWeightMedium,
                    lineHeight: typography.lineHeightNormal,
                    color: colors.brandOnPrimary,
                    background: colors.backgroundDark,
                    border: "none",
                    borderRadius: radius.buttons,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Submit
                </button>
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSizeXs,
                  fontWeight: typography.fontWeightNormal,
                  lineHeight: typography.lineHeightNormal,
                  color: colors.textSecondary,
                }}
              >
                By submitting your email address, you agree to receive security
                updates from Ory. For more information, please read our{" "}
                <a
                  href={PRIVACY_POLICY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: colors.textSecondary,
                    textDecoration: "underline",
                  }}
                >
                  Privacy Policy
                </a>
                . You can always withdraw your consent.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
