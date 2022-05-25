import { NodeAnchorProps } from "@/types"
import { MouseEvent } from "react"

export const NodeAnchor = ({ attributes }: NodeAnchorProps) => {
  const handleOnClick = (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    window.location.href = attributes.href
  }
  return (
    <button
      data-testid={`node/anchor/${attributes.id}`}
      onClick={(event: MouseEvent) => handleOnClick(event)}
    >
      {attributes.title.text}
    </button>
  )
}
