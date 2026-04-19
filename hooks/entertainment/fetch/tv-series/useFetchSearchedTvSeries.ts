import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { SearchTvSeriesResponse } from "@/types/entertainment/tv-series/search-tv-series"

const fetchSearchedTvSeries = async (
  query: string
): Promise<SearchTvSeriesResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<SearchTvSeriesResponse>(
    "https://api.themoviedb.org/3/search/tv",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        query: query,
        include_adult: "false",
        language: "en-US",
      },
    }
  )

  return data
}

export function useFetchSearchedTvSeries(query: string) {
  return useQuery<SearchTvSeriesResponse>({
    queryKey: ["tv-series-search", query],
    queryFn: () => fetchSearchedTvSeries(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 60 * 24, // tv series unlikely to change frequently
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  })
}
