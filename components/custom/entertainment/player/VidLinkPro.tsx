interface VidLinkProProps {
  id: string
  startTime?: number
}

// Your entire localStorage will hold this: Record<string, WatchProgress>

/** This player is from https://vidlink.pro/ */
function VidLinkPro({ id, startTime = 0 }: VidLinkProProps) {
  const timeParam = startTime > 0 ? `&time=${startTime}&t=${startTime}` : ""
  const src = `https://vidlink.pro/movie/${id}?primaryColor=f59e0a&secondaryColor=f3f4f6&iconColor=eefdec&icons=vid&player=jw&title=true&poster=true&autoplay=false&nextbutton=true${timeParam}`
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

export default VidLinkPro
