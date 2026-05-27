import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { MovieImagesApiResponse } from "@/types/entertainment/movies/movie-images"

const fetchMovieImages = async (
  id: string
): Promise<MovieImagesApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<MovieImagesApiResponse>(
    `https://api.themoviedb.org/3/movie/${id}/images`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return data
}

export function useFetchMovieImages(id: string) {
  return useQuery<MovieImagesApiResponse>({
    queryKey: ["movie-images", id],
    queryFn: () => fetchMovieImages(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // Images rarely change
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  })
}
