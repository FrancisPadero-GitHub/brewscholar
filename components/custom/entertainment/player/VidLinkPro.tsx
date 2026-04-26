interface VidLinkProProps {
  id: string
  type: string
  season?: string
  episode?: string
  startTime?: number
}

// Your entire localStorage will hold this: Record<string, WatchProgress>

/** This player is from https://vidlink.pro/ */
function VidLinkPro({
  id,
  type,
  season,
  episode,
  startTime = 0,
}: VidLinkProProps) {
  const timeParam = startTime > 0 ? `&time=${startTime}&t=${startTime}` : ""

  let src = ""
  if (type === "movie") {
    src = `https://vidlink.pro/movie/${id}?primaryColor=f59e0a&secondaryColor=f3f4f6&iconColor=eefdec&icons=default&player=jw&title=true&poster=true&autoplay=true&nextbutton=true${timeParam}`
  } else if (type === "tv" && season && episode) {
    src = `https://vidlink.pro/tv/${id}/${season}/${episode}?primaryColor=f59e0a&secondaryColor=f3f4f6&iconColor=eefdec&icons=default&player=jw&title=true&poster=true&autoplay=true&nextbutton=true${timeParam}`
  } else {
    // Invalid type or missing required props
    return null
  }
  return (
    <div className="aspect-video w-full">
      <iframe src={src} width="100%" height="100%" allowFullScreen />
    </div>
  )
}

export default VidLinkPro
