interface VidSrcMe {
  id: string
}

/** This player is from https://vsembed.ru/ */
function VidSrcMe({ id }: VidSrcMe) {
  const src = `https://vidsrc-embed.ru/embed/movie/${id}`
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
