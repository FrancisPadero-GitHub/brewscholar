import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { TvSeasonDetailsApiResponse } from "@/types/entertainment/tv-series/season-details"

const fetchTvSeasonDetails = async (
  seriesId: string,
  seasonNumber: number
): Promise<TvSeasonDetailsApiResponse | null> => {
  if (!seriesId || seasonNumber < 0) return null

  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  try {
    const { data } = await axios.get<TvSeasonDetailsApiResponse>(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}`,
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
      return null // Season not found
    }
    throw error
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
