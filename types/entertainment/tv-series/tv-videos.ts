import { VideoItem } from "../movies/movie-videos"

export interface TvVideosApiResponse {
  id: number
  results: VideoItem[]
}
