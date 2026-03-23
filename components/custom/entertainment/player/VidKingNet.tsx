interface VidKingPlayerProps {
  id: string
}

/** This player is from https://www.vidking.net/ */
function VidKingPlayer({ id }: VidKingPlayerProps) {
  const color = "ffa500"
  const src = `https://www.vidking.net/embed/movie/${id}?color=${color}`
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
