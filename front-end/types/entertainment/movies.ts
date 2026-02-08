export interface MoviePlayerProps {
  id: string;
  type: "movie" | "tv";
  api: string;
  season?: number;
  episode?: number;
  color?: string; // Hex code without the '#'
  autoPlay?: boolean;
}

export interface Movies {
  embed_url: string;
  embed_url_tmdb: string;
  imdb_id: string;
  quality: string;
  title: string;
  tmdb_id: string;
}
