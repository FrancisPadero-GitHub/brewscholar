import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { MoviesApiResponse } from "@/types/entertainment/movies/popular-movies"

const fetchPopularMovies = async (
  page: number
): Promise<MoviesApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<MoviesApiResponse>(
    "https://api.themoviedb.org/3/movie/popular",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        language: "en-US",
        page: page.toString(),
      },
    }
  )

  return data
}

export function useFetchPopularMovies(page: number, enabled: boolean = true) {
  return useQuery<MoviesApiResponse>({
    queryKey: ["popular-movies", page],
    queryFn: () => fetchPopularMovies(page),
    enabled: enabled && !isNaN(page) && page > 0, // page is not null and page must be more than 0
    staleTime: 1000 * 60 * 60 * 24, // movies are unlikely to change frequently
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, // Refetch when the network reconnects
    retry: 2, // retries on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff for retries
  })
}
