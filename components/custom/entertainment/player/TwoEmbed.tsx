import type { JSX } from "react"

interface TwoEmbedProps {
  id: string
  type: string
  season?: string
  episode?: string
}

function TwoEmbed({ id, type, season, episode }: TwoEmbedProps): JSX.Element | null {
  let src = ""
  if (type === "movie") {
    src = `https://www.2embed.cc/embed/${id}`
  } else if (type === "tv" && season && episode) {
    src = `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`
  } else {
    return null
  }

  return (
    <div className="aspect-video w-full">
      <iframe src={src} width="100%" height="100%" allowFullScreen />
    </div>
  )
}

export default TwoEmbed
