import React from "react"
import useBaseUrl from "@docusaurus/useBaseUrl"
import OryHeroDemo from "@site/src/components/OryHeroDemo"
import { colors, spacing } from "./tokens"
import styles from "@site/src/pages/welcome.module.css"

export function StartHeading() {
  const backgroundPattern = useBaseUrl("/img/home-bg-grid.svg")

  return (
    <section
      style={{
        paddingTop: spacing.size16,
        paddingBottom: 0,
        backgroundImage: `url(${backgroundPattern})`,
        backgroundSize: "100% auto",
        backgroundPosition: "top left",
        backgroundRepeat: "repeat",
        backgroundColor: colors.backgroundSecondary,
      }}
      className={styles.heroTop}
    >
      <div className={`container ${styles.container1024}`}>
        <div className={styles.heroRow}>
          <div className={styles.heroCopy}>
            <h1 className={styles.h1}>How to use the Ory Developer Portal</h1>
            <p className={styles.pBase}>
              Not sure where to start? Follow our guided paths and structured
              journeys that walk you through Ory's products and solutions so you
              can learn and build faster.
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
