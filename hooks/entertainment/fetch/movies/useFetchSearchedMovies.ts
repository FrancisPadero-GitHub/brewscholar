import { useQuery } from "@tanstack/react-query"
import type { SearchMoviesResponse } from "@/types/entertainment/movies/search-movies"

const fetchSearchedMovies = async (
  query: string
): Promise<SearchMoviesResponse> => {
  // for more Query Params refer to the API documentation
  const params = new URLSearchParams({
    query: query,
    include_adult: "true",
  })

  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN
  const url = `https://api.themoviedb.org/3/search/movie?${params.toString()}include_adult=false&language=en-US&region=US`
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
    return response.json() as Promise<SearchMoviesResponse>
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred"
    throw new Error(message)
  }
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
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), //
  })
}
