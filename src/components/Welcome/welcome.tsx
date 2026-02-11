import React from "react"
import { CardItem } from "../WelcomeCard/welcome-card"
import { OverviewCard } from "../welcomePage/OverviewCard"
import { spacing } from "../welcomePage/tokens"

export interface WelcomePageSectionProps {
  id: string
  title?: string
  description?: string
  cards: Array<CardItem>
}

const WelcomePageSection: React.FC<WelcomePageSectionProps> = ({
  id,
  cards,
}) => {
  return (
    <section id={id}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: spacing.size4,
        }}
      >
        {cards.map((card, index) => (
          <OverviewCard
            key={index}
            title={card.title}
            description={card.description ?? ""}
            to={card.docs || card.repo || "#"}
          />
        ))}
      </div>
    </section>
  )
}

export default WelcomePageSection
