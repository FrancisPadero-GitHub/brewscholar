import { MoviePlayerProps } from "@/types/entertainment/movies";

const VidPlayer = ({
  id,
  type, // "movie" or "tv"
  api, // "vidsrc.to" or "www.vidking.net"
  season = 1,
  episode = 1,
  color = "056b65",
  autoPlay = false,
}: MoviePlayerProps) => {
  let src = "";

  // Construct base embed URL
  if (type === "tv") {
    src = `https://${api}/embed/${type}/${id}/${season}/${episode}`;
  } else {
    src = `https://${api}/embed/${type}/${id}`;
  }

  // Only add query params for VidKing
  if (api === "www.vidking.net") {
    const params = new URLSearchParams({
      color,
      autoPlay: autoPlay ? "true" : "false",
      nextEpisode: "true",
      episodeSelector: "true",
    });
    src += `?${params.toString()}`;
  }

  console.warn("Generated video src:", src);

  return (
    <div className="">
      <iframe
        src={src}
        width="100%"
        height="600"
        allowFullScreen
        title="Video Player"
        referrerPolicy="origin"
      />
    </div>
  );
};

export default VidPlayer;
