export interface MoviePlayerProps {
  id: string;
  type: "movie" | "tv";
  api: string;
  season?: number;
  episode?: number;
  color?: string; // Hex code without the '#'
  autoPlay?: boolean;
}
