import React from "react"
import { CardItem } from "../WelcomeCard/welcome-card"
import { OverviewCard } from "../welcomePage/OverviewCard"

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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-ory-4">
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
