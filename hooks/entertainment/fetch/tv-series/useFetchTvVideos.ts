import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { TvVideosApiResponse } from "@/types/entertainment/tv-series/tv-videos"

const fetchTvVideos = async (
  id: string
): Promise<TvVideosApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<TvVideosApiResponse>(
    `https://api.themoviedb.org/3/tv/${id}/videos`,
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

export function useFetchTvVideos(id: string) {
  return useQuery<TvVideosApiResponse>({
    queryKey: ["tv-videos", id],
    queryFn: () => fetchTvVideos(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // videos are unlikely to change frequently,
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, // Refetch when the network reconnects
    retry: 2, // retries on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff for retries
  })
}
