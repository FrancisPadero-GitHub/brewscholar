import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { MovieRecommendationsApiResponse } from "@/types/entertainment/movies/movie-recommendations"

const fetchMovieRecommendations = async (
  movieId: string,
  page: number
): Promise<MovieRecommendationsApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<MovieRecommendationsApiResponse>(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
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

export function useFetchMovieRecommendations(
  movieId: string,
  page: number = 1,
  enabled: boolean = true
) {
  return useQuery<MovieRecommendationsApiResponse>({
    queryKey: ["movie-recommendations", movieId, page],
    queryFn: () => fetchMovieRecommendations(movieId, page),
    placeholderData: keepPreviousData,
    enabled: enabled && !!movieId && !isNaN(page) && page > 0,
    staleTime: 1000 * 60 * 60 * 24, // recommendations change infrequently
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  })
}
