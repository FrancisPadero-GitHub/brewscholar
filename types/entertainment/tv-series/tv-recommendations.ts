import type { TvSeriesResult } from "@/types/entertainment/tv-series/popular-tv-series"

export interface TvRecommendationsApiResponse {
  page: number
  results: TvSeriesResult[]
  total_pages: number
  total_results: number
}
