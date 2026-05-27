import type { MovieResult } from "@/types/entertainment/movies/popular-movies"

export interface MovieRecommendationsApiResponse {
  page: number
  results: MovieResult[]
  total_pages: number
  total_results: number
}
