export interface ImageItem {
  aspect_ratio: number
  height: number
  iso_639_1: string | null
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface MovieImagesApiResponse {
  backdrops: ImageItem[]
  id: number
  logos: ImageItem[]
  posters: ImageItem[]
}
