interface VidKingPlayerProps {
  id: string
}

/** This player is from vidking.net */
function VidKingPlayer({ id }: VidKingPlayerProps) {
  const src = `https://www.vidking.net/embed/movie/${id}`
  return (
    <div className="aspect-video w-full">
      <iframe
        src={src}
        color="ffa500"
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
