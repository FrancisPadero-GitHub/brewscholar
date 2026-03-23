interface VidSrcMeProps {
  id: string
  startTime?: number
}

/** This player is from https://vsembed.ru/ */
function VidSrcMe({ id, startTime = 0 }: VidSrcMeProps) {
  const timeParam = startTime > 0 ? `?t=${startTime}` : ""
  const src = `https://vidsrc-embed.ru/embed/movie/${id}${timeParam}`
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

export default VidSrcMe
