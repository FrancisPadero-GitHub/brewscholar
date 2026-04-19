import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { SearchMoviesResponse } from "@/types/entertainment/movies/search-movies"

const fetchSearchedMovies = async (
  query: string
): Promise<SearchMoviesResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<SearchMoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        query: query,
        include_adult: "false",
        language: "en-US",
        region: "US",
      },
    }
  )

  return data
}

export function useFetchSearchedMovies(query: string) {
  return useQuery<SearchMoviesResponse>({
    queryKey: ["movies", query],
    queryFn: () => fetchSearchedMovies(query),
    enabled: !!query, // page is not null and page must be more than 0
    staleTime: 1000 * 60 * 60 * 24, // movies are unlikely to change frequently
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, // Refetch when the network reconnects
    retry: 2, // retries on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  })
}
