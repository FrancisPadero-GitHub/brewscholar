import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { TopRatedTvSeriesResponse } from "@/types/entertainment/tv-series/top-rated"

const fetchTopRatedTvSeries = async (
  page: number
): Promise<TopRatedTvSeriesResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<TopRatedTvSeriesResponse>(
    "https://api.themoviedb.org/3/tv/top_rated",
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

export function useFetchTopRatedTvSeries(
  page: number,
  enabled: boolean = true
) {
  return useQuery<TopRatedTvSeriesResponse>({
    queryKey: ["top-rated-tv-series", page],
    queryFn: () => fetchTopRatedTvSeries(page),
    enabled: enabled && !isNaN(page) && page > 0, // page is not null and page must be more than 0
    staleTime: 1000 * 60 * 60 * 24, // movies are unlikely to change frequently
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, // Refetch when the network reconnects
    retry: 2, // retries on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff for retries
  })
}
