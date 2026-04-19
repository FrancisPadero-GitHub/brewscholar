import { useQuery } from "@tanstack/react-query"
import type { TvSeasonDetailsApiResponse } from "@/types/entertainment/tv-series/season-details"

const fetchTvSeasonDetails = async (
  seriesId: string,
  seasonNumber: number
): Promise<TvSeasonDetailsApiResponse | null> => {
  if (!seriesId || seasonNumber < 0) return null

  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN
  const url = `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?language=en-US`
  const options = {
    method: "GET",
    headers: { accept: "application/json", Authorization: `Bearer ${token}` },
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      if (response.status === 404) {
        return null // Season not found
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
    return response.json() as Promise<TvSeasonDetailsApiResponse>
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred"
    throw new Error(message)
  }
}

export function useFetchTvSeasonDetails(seriesId: string, seasonNumber: number) {
  return useQuery<TvSeasonDetailsApiResponse | null>({
    queryKey: ["tv-season-details", seriesId, seasonNumber],
    queryFn: () => fetchTvSeasonDetails(seriesId, seasonNumber),
    enabled: !!seriesId && seasonNumber >= 0,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  })
}
