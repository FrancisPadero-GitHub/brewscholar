"use client"

interface VidEasyProps {
  id: string
  type: string
  season?: string
  episode?: string
  startTime?: number
}

function VidEasy({ id, type, season, episode, startTime = 0 }: VidEasyProps) {
  const timeParam = startTime > 0 ? `?time=${startTime}&t=${startTime}` : ""

  let src = ""
  if (type === "movie") {
    src = `https://player.videasy.net/movie/${id}${timeParam}`
  } else if (type === "tv" && season && episode) {
    src = `https://player.videasy.net/tv/${id}/${season}/${episode}${timeParam}`
  } else {
    return null
  }

  return (
    <div className="aspect-video w-full">
      <iframe
        src={src}
        width="100%"
        height="100%"
        allowFullScreen
        title="Video Player"
        className="rounded-xl"
      />
    </div>
  )
}

export default VidEasy
