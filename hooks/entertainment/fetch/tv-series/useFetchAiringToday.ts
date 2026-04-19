import { useQuery } from "@tanstack/react-query"
import type { AiringTodayTvSeriesResponse } from "@/types/entertainment/tv-series/airing-today"

const fetchAiringTodayTvSeries = async (
  page: number
): Promise<AiringTodayTvSeriesResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN
  const url = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${page}`
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      let errorMsg = `Error: ${response.status} ${response.statusText}`
      try {
        const errorData = await response.json()
        if (errorData.status_message) {
          errorMsg += ` - ${errorData.status_message}`
        }
      } catch {
        // Ignore JSON parse errors for error responses
      }
      throw new Error(errorMsg)
    }
    return response.json() as Promise<AiringTodayTvSeriesResponse>
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred"
    throw new Error(message)
  }
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
