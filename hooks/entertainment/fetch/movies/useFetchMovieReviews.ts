import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { MovieReviewsApiResponse } from "@/types/entertainment/movies/movie-reviews"

const fetchMovieReviews = async (
  movieId: string,
  page: number
): Promise<MovieReviewsApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<MovieReviewsApiResponse>(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
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

export function useFetchMovieReviews(
  movieId: string,
  page: number = 1,
  enabled: boolean = true
) {
  return useQuery<MovieReviewsApiResponse>({
    queryKey: ["movie-reviews", movieId, page],
    queryFn: () => fetchMovieReviews(movieId, page),
    placeholderData: keepPreviousData,
    enabled: enabled && !!movieId && !isNaN(page) && page > 0,
    staleTime: 1000 * 60 * 60 * 24, // reviews change infrequently
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  })
}
