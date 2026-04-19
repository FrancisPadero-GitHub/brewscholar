interface VidKingPlayerProps {
  id: string
  type: string
  season?: string
  episode?: string
  startTime?: number
}

/** This player is from https://www.vidking.net/ */
function VidKingPlayer({
  id,
  type,
  season,
  episode,
  startTime = 0,
}: VidKingPlayerProps) {
  const color = "ffa500"
  const timeParam = startTime > 0 ? `&t=${startTime}` : ""

  let src = ""
  if (type === "movie") {
    src = `https://www.vidking.net/embed/movie/${id}?color=${color}${timeParam}`
  } else if (type === "tv" && season && episode) {
    src = `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=${color}${timeParam}`
  } else {
    // Invalid type or missing required props
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

export default VidKingPlayer
