import React from "react"
import Link from "@docusaurus/Link"
import clsx from "clsx"
import styles from "./welcome-card.module.css"

// Using the existing card structure to maintain system design
export interface CardItem {
  title: string
  description?: string
  language?: string
  languageLogoAlt?: string
  logoUrl?: string
  author?: string
  tested?: boolean
  repo?: string
  docs?: string
  isLarge?: boolean
}

// Card Component that works with the existing structure
export const Card: React.FC<CardItem> = ({
  title,
  description,
  language,
  languageLogoAlt,
  logoUrl,
  author,
  tested,
  repo,
  docs,
  isLarge,
}) => {
  // Determine which link to use based on the order of priority
  const link = docs || repo || ""

  // Generate language logo path based on language prop
  const logoPath = language ? `/docs/img/examples/${language}.svg` : logoUrl

  const cardContent = (
    <div className={clsx(styles.card, isLarge && styles.cardLarge)}>
      <div className={styles.iconContainer}>
        {logoPath && (
          <img
            className={styles.icon}
            src={logoPath}
            alt={languageLogoAlt || `${language} icon`}
          />
        )}
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {description && <p className={styles.cardDescription}>{description}</p>}
      </div>
    </div>
  )

  // Every card should be a link
  if (link) {
    return (
      <Link to={link} className={styles.cardLink}>
        {cardContent}
      </Link>
    )
  }

  // Fallback for cases where no link is provided (should be rare)
  return cardContent
}

// Card Grid Component
export const CardGrid: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className={styles.cardGrid}>{children}</div>
}

export default { Card, CardGrid }
