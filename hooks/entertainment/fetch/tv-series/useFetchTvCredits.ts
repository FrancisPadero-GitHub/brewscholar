import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { TvCreditsApiResponse } from "@/types/entertainment/tv-series/tv-credits"

const fetchTvCredits = async (
  id: string
): Promise<TvCreditsApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<TvCreditsApiResponse>(
    `https://api.themoviedb.org/3/tv/${id}/credits`,
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

export function useFetchTvCredits(id: string) {
  return useQuery<TvCreditsApiResponse>({
    queryKey: ["tv-credits", id],
    queryFn: () => fetchTvCredits(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // tv series credits rarely change
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, // Refetch when the network reconnects
    retry: 2, // retries on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff for retries
  })
}
