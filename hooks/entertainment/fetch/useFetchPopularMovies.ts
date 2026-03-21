import { useQuery } from "@tanstack/react-query"
import type { MoviesApiResponse } from "@/types/entertainment/movies/popular-movies"

const fectchPopularMovies = async (
  page: number
): Promise<MoviesApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN
  const url = `https://api.themoviedb.org/3/movie/popular?lanuage=en-US&page=${page}`
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    // fetch the api
    const response = await fetch(url, options)
    // catch if theres any errors
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
    // finally return the data in json format if no errors occurs
    return response.json() as Promise<MoviesApiResponse>
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred"
    throw new Error(message)
  }
}

export function useFetchPopularMovies(page: number) {
  return useQuery<MoviesApiResponse>({
    queryKey: ["popular-movies", page],
    queryFn: () => fectchPopularMovies(page),
    staleTime: "static", // movies are unlikely to change frequently, so we can consider them static
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, // Refetch when the network reconnects
    retry: 2, // retries on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff for retries
  })
}
