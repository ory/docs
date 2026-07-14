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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-ory-4">
        {cards.map((card) => (
          <div key={card.title ?? card.docs} className="min-w-0">
            <OverviewCard
              title={card.title}
              description={card.description}
              to={card.docs}
              linkLabel="Learn more"
              tags={card.tags}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default WelcomePageSection
