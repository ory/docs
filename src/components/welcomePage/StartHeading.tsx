import React from "react"
import OryHeroDemo from "@site/src/components/OryHeroDemo"
import backgroundPattern from "@site/src/static/img/background-pattern.png"
import { colors, spacing } from "./tokens"
import styles from "@site/src/pages/welcome.module.css"

export function StartHeading() {
  return (
    <section
      style={{
        paddingTop: spacing.size16,
        paddingBottom: 0,
        backgroundImage: `url(${backgroundPattern}), linear-gradient(90deg, rgba(248, 250, 252, 1) 0%, rgba(248, 250, 252, 1) 100%)`,
        backgroundSize: "208px 112px, auto auto",
        backgroundPosition: "top left",
        backgroundRepeat: "repeat",
        backgroundColor: colors.backgroundSecondary,
      }}
      className={styles.heroTop}
    >
      <div className={`container ${styles.container1024}`}>
        <div className={styles.heroRow}>
          <div className={styles.heroCopy}>
            <h1 className={styles.h1}>Welcome to the Ory Developer Portal</h1>
            <p className={styles.pBase}>
              Ory gives you authentication, authorization, and user management
              APIs designed for modern applications. Start fast, scale to
              millions, and keep security best practices baked in.
            </p>
          </div>
          <div style={{ flex: "1 0 0" }}>
            <OryHeroDemo />
          </div>
        </div>
      </div>
    </section>
  )
}

