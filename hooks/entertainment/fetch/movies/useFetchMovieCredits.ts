import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { MovieCreditsApiResponse } from "@/types/entertainment/movies/movie-credits"

const fetchMovieCredits = async (
  id: string
): Promise<MovieCreditsApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<MovieCreditsApiResponse>(
    `https://api.themoviedb.org/3/movie/${id}/credits`,
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

export function useFetchMovieCredits(id: string) {
  return useQuery<MovieCreditsApiResponse>({
    queryKey: ["movie-credits", id],
    queryFn: () => fetchMovieCredits(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // credits are unlikely to change frequently,
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, // Refetch when the network reconnects
    retry: 2, // retries on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff for retries
  })
}
