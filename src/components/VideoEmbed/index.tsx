import React from 'react'

export default function VideoEmbed({
  webm,
  mp4
}: {
  mp4: string
  webm: string
}) {
  return (
    <video controls width="100%">
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
      Sorry, your browser doesn't support embedded videos.
    </video>
  )
}
