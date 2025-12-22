import React from "react"
import { Card, CardGrid, CardItem } from "../WelcomeCard/welcome-card"
import styles from "./welcome.module.css"

// Interface for the section props
export interface WelcomePageSectionProps {
  id: string
  title?: string
  description?: string
  cards: Array<CardItem>
}

// Section Component
const WelcomePageSection: React.FC<WelcomePageSectionProps> = ({
  id,
  title,
  description,
  cards,
}) => {
  return (
    <CardGrid>
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </CardGrid>
  )
}

export default WelcomePageSection
