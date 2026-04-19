interface VidSrcMeProps {
  id: string
  type: string
  season?: string
  episode?: string
}

/** This player is from https://vsembed.ru/ */
function VidSrcMe({ id, type, season, episode }: VidSrcMeProps) {
  let src = ""
  if (type === "movie") {
    src = `https://vidsrc-embed.ru/embed/movie/${id}`
  } else if (type === "tv" && season && episode) {
    src = `https://vidsrc-embed.ru/embed/tv/${id}/${season}/${episode}`
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

export default VidSrcMe
