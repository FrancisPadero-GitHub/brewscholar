interface SuperEmbedProps {
  id: string
  type: string
  season?: string
  episode?: string
}

function SuperEmbed({ id, type, season, episode }: SuperEmbedProps) {
  let src = ""
  if (type === "movie") {
    src = `https://multiembed.mov/?video_id=${id}&tmdb=1`
  } else if (type === "tv" && season && episode) {
    src = `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
  } else {
    return null
  }

  return (
    <div className="aspect-video w-full">
      <iframe src={src} width="100%" height="100%" allowFullScreen />
    </div>
  )
}

export default SuperEmbed
