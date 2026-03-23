interface VidKingPlayerProps {
  id: string
  startTime?: number
}

/** This player is from https://www.vidking.net/ */
function VidKingPlayer({ id, startTime = 0 }: VidKingPlayerProps) {
  const color = "ffa500"
  const timeParam = startTime > 0 ? `&t=${startTime}` : ""
  const src = `https://www.vidking.net/embed/movie/${id}?color=${color}${timeParam}`
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
