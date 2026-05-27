import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { TvRecommendationsApiResponse } from "@/types/entertainment/tv-series/tv-recommendations"

const fetchTvRecommendations = async (
  seriesId: string,
  page: number
): Promise<TvRecommendationsApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<TvRecommendationsApiResponse>(
    `https://api.themoviedb.org/3/tv/${seriesId}/recommendations`,
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

export function useFetchTvRecommendations(
  seriesId: string,
  page: number = 1,
  enabled: boolean = true
) {
  return useQuery<TvRecommendationsApiResponse>({
    queryKey: ["tv-recommendations", seriesId, page],
    queryFn: () => fetchTvRecommendations(seriesId, page),
    placeholderData: keepPreviousData,
    enabled: enabled && !!seriesId && !isNaN(page) && page > 0,
    staleTime: 1000 * 60 * 60 * 24, // recommendations change infrequently
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  })
}
