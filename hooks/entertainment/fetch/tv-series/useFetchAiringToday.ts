import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { AiringTodayTvSeriesResponse } from "@/types/entertainment/tv-series/airing-today"

const fetchAiringTodayTvSeries = async (
  page: number
): Promise<AiringTodayTvSeriesResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<AiringTodayTvSeriesResponse>(
    "https://api.themoviedb.org/3/tv/airing_today",
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

export function useFetchAiringTodayTvSeries(
  page: number,
  enabled: boolean = true
) {
  return useQuery<AiringTodayTvSeriesResponse>({
    queryKey: ["airing-today-tv-series", page],
    queryFn: () => fetchAiringTodayTvSeries(page),
    enabled: enabled && !isNaN(page) && page > 0, // page is not null and page must be more than 0
    staleTime: 1000 * 60 * 60 * 24, // movies are unlikely to change frequently
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, // Refetch when the network reconnects
    retry: 2, // retries on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff for retries
  })
}
