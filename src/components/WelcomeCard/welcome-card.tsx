import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./welcome-card.module.css";

// Using the existing example card structure
export interface CardItem {
    title: string;
    description?: string;
    language?: string;
    languageLogoAlt?: string;
    author?: string;
    tested?: boolean;
    repo?: string;
    docs?: string;
    isLarge?: boolean;
}

// Interface for the section props
export interface WelcomeCardProps {
    id: string;
    title?: string;
    description?: string;
    cards: Array<CardItem>;
}

// Card Component that works with the existing structure
const Card: React.FC<CardItem> = ({
    title,
    description,
    language,
    languageLogoAlt,
    repo,
    docs,
    isLarge,
}) => {
    // Determine which link to use (docs preferred, then repo)
    const link = docs || repo || "";

    // Generate language logo path based on language prop
    const logoPath = language ? `/docs/img/examples/${language}.svg` : null

    const cardContent = (
        <div className={clsx(styles.card, isLarge && styles.cardLarge)}>
            <div className={styles.iconContainer}>
                {logoPath && (
                    <img
                        className={styles.icon}
                        src={logoPath}
                        alt={languageLogoAlt || `${language} logo`}
                    />
                )}
            </div>
            <div className={styles.cardContent}>
                <div>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    {description && <p className={styles.cardDescription}>{description}</p>}
                </div>
                {link && isLarge && <div className={styles.cardArrow}>→</div>}
            </div>
        </div>
    );

    if (link) {
        return (
            <Link to={link} className={styles.cardLink}>
                {cardContent}
            </Link>
        );
    }

    return cardContent;
};

// Card Grid Component
const CardGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className={styles.cardGrid}>{children}</div>;
};

// Main WelcomeCard Component
const WelcomeCard: React.FC<WelcomeCardProps> = ({
    id,
    title,
    description,
    cards,
}) => {
    return (
        <section id={id} className={styles.section}>
            {(title || description) && (
                <div className={styles.sectionHeading}>
                    {title && <h2 className={styles.sectionTitle}>{title}</h2>}
                    {description && <p className={styles.sectionDescription}>{description}</p>}
                </div>
            )}
            <CardGrid>
                {cards.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </CardGrid>
        </section>
    );
};

export default WelcomeCard;
