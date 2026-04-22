import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { OnTheAirTvSeriesResponse } from "@/types/entertainment/tv-series/on-the-air"

const fetchOnTheAirTvSeries = async (
  page: number
): Promise<OnTheAirTvSeriesResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<OnTheAirTvSeriesResponse>(
    "https://api.themoviedb.org/3/tv/on_the_air",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        language: "en-US",
        region: "US",
        include_adult: "false",
        page: page.toString(),
      },
    }
  )

  return data
}

export function useFetchOnTheAirTvSeries(
  page: number,
  enabled: boolean = true
) {
  return useQuery<OnTheAirTvSeriesResponse>({
    queryKey: ["on-the-air-tv-series", page],
    queryFn: () => fetchOnTheAirTvSeries(page),
    enabled: enabled && !isNaN(page) && page > 0, // page is not null and page must be more than 0
    staleTime: 1000 * 60 * 60 * 24, // movies are unlikely to change frequently
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, // Refetch when the network reconnects
    retry: 2, // retries on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff for retries
  })
}
