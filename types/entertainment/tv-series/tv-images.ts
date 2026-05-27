import type { ImageItem } from "../movies/movie-images"

export interface TvImagesApiResponse {
  backdrops: ImageItem[]
  id: number
  logos: ImageItem[]
  posters: ImageItem[]
}
