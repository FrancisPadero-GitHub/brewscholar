import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { MovieVideosApiResponse } from "@/types/entertainment/movies/movie-videos"

const fetchMovieVideos = async (
  id: string
): Promise<MovieVideosApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<MovieVideosApiResponse>(
    `https://api.themoviedb.org/3/movie/${id}/videos`,
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

export function useFetchMovieVideos(id: string) {
  return useQuery<MovieVideosApiResponse>({
    queryKey: ["movie-videos", id],
    queryFn: () => fetchMovieVideos(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // videos are unlikely to change frequently,
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnReconnect: true, // Refetch when the network reconnects
    retry: 2, // retries on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff for retries
  })
}
