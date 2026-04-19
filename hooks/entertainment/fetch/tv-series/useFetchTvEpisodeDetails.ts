import { useQuery } from "@tanstack/react-query"
import type { TvEpisodeDetailsApiResponse } from "@/types/entertainment/tv-series/episode-details"

const fetchTvEpisodeDetails = async (
  seriesId: string,
  seasonNumber: number,
  episodeNumber: number
): Promise<TvEpisodeDetailsApiResponse | null> => {
  if (!seriesId || !seasonNumber || !episodeNumber) return null

  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN
  const url = `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?language=en-US`
  const options = {
    method: "GET",
    headers: { accept: "application/json", Authorization: `Bearer ${token}` },
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      if (response.status === 404) {
        return null // Episode not found, perfectly valid case
      }
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
    return response.json() as Promise<TvEpisodeDetailsApiResponse>
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred"
    throw new Error(message)
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
