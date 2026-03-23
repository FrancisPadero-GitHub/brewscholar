interface VidLinkProProps {
  id: string
}

/** This player is from https://vidlink.pro/ */
function VidLinkPro({ id }: VidLinkProProps) {
  const src = `https://vidlink.pro/movie/${id}?primaryColor=f59e0a&secondaryColor=f3f4f6&iconColor=eefdec&icons=vid&player=jw&title=true&poster=true&autoplay=false&nextbutton=true`
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
