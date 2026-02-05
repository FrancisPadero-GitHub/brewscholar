import React from 'react'
import { MoviePlayerProps } from '@/types/entertainment/movies';

const MoviePlayer = ({
  id, 
  type, 
  season = 1, 
  episode = 1, 
  color = 'e50914', 
  autoPlay = false
}: MoviePlayerProps) => {

  // Construct the URL based on type
  const baseUrl = `https://www.vidking.net/embed/${type}/${id}`;
  const tvPath = type === 'tv' ? `/${season}/${episode}` : '';
  const params = `?color=${color}&autoPlay=${autoPlay}&nextEpisode=true&episodeSelector=true`;

  const src = `${baseUrl}${tvPath}${params}`;

  return (
  <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
      <iframe
        src={src}
        width="100%"
        height="100%"
        allowFullScreen
        title="VidKing Movie Player"
        className="border-none"
      />
    </div>
  )
}

export default MoviePlayer;