export interface MoviePlayerProps {
  id: string;
  type: "movie" | "tv";
  season?: number;
  episode?: number;
  color?: string; // Hex code without the '#'
  autoPlay?: boolean;
}
