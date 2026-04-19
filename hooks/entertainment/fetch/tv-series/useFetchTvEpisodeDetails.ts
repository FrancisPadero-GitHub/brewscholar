import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { TvEpisodeDetailsApiResponse } from "@/types/entertainment/tv-series/episode-details"

const fetchTvEpisodeDetails = async (
  seriesId: string,
  seasonNumber: number,
  episodeNumber: number
): Promise<TvEpisodeDetailsApiResponse | null> => {
  if (!seriesId || !seasonNumber || !episodeNumber) return null

  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  try {
    const { data } = await axios.get<TvEpisodeDetailsApiResponse>(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`,
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
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null // Episode not found, perfectly valid case
    }
    throw error
  }
}

export function useFetchTvEpisodeDetails(seriesId: string, seasonNumber: number, episodeNumber: number) {
  return useQuery<TvEpisodeDetailsApiResponse | null>({
    queryKey: ["tv-episode-details", seriesId, seasonNumber, episodeNumber],
    queryFn: () => fetchTvEpisodeDetails(seriesId, seasonNumber, episodeNumber),
    enabled: !!seriesId && !!seasonNumber && !!episodeNumber,
    staleTime: 1000 * 60 * 60 * 24, // episode details rarely change daily
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, // Refetch when the network reconnects
    retry: 2, // retries on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff for retries
  })
}
