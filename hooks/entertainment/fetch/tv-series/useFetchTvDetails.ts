import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { TvSeriesDetailsApiResponse } from "@/types/entertainment/tv-series/tv-details"

const fetchTvDetails = async (
  id: string
): Promise<TvSeriesDetailsApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<TvSeriesDetailsApiResponse>(
    `https://api.themoviedb.org/3/tv/${id}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        language: "en-US",
      },
    }
  )

  return data
}

export function useFetchTvDetails(id: string) {
  return useQuery<TvSeriesDetailsApiResponse>({
    queryKey: ["tv-details", id],
    queryFn: () => fetchTvDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // tv series rarely change daily
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, // Refetch when the network reconnects
    retry: 2, // retries on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff for retries
  })
}
