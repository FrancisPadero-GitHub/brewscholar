import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { TvReviewsApiResponse } from "@/types/entertainment/tv-series/tv-reviews"

const fetchTvReviews = async (
  seriesId: string,
  page: number
): Promise<TvReviewsApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<TvReviewsApiResponse>(
    `https://api.themoviedb.org/3/tv/${seriesId}/reviews`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        language: "en-US",
        page: page.toString(),
      },
    }
  )

  return data
}

export function useFetchTvReviews(
  seriesId: string,
  page: number = 1,
  enabled: boolean = true
) {
  return useQuery<TvReviewsApiResponse>({
    queryKey: ["tv-reviews", seriesId, page],
    queryFn: () => fetchTvReviews(seriesId, page),
    placeholderData: keepPreviousData,
    enabled: enabled && !!seriesId && !isNaN(page) && page > 0,
    staleTime: 1000 * 60 * 60 * 24, // reviews change infrequently
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  })
}
