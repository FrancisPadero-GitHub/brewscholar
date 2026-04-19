import { useQuery } from "@tanstack/react-query"
import type { TvSeriesDetailsApiResponse } from "@/types/entertainment/tv-series/tv-details"

const fetchTvDetails = async (
  id: string
): Promise<TvSeriesDetailsApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN
  const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`
  const options = {
    method: "GET",
    headers: { accept: "application/json", Authorization: `Bearer ${token}` },
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
    return response.json() as Promise<TvSeriesDetailsApiResponse>
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred"
    throw new Error(message)
  }
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
