import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { MovieDetailsApiResponse } from "@/types/entertainment/movies/movie-details"

const fetchMovieDetails = async (
  id: string
): Promise<MovieDetailsApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<MovieDetailsApiResponse>(
    `https://api.themoviedb.org/3/movie/${id}`,
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

export function useFetchMovieDetails(id: string) {
  return useQuery<MovieDetailsApiResponse>({
    queryKey: ["movie-details", id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // movies are unlikely to change frequently,
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, // Refetch when the network reconnects
    retry: 2, // retries on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff for retries
  })
}
