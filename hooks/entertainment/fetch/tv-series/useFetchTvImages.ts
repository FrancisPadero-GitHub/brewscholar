import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { TvImagesApiResponse } from "@/types/entertainment/tv-series/tv-images"

const fetchTvImages = async (
  id: string
): Promise<TvImagesApiResponse> => {
  const token = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN

  const { data } = await axios.get<TvImagesApiResponse>(
    `https://api.themoviedb.org/3/tv/${id}/images`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return data
}

export function useFetchTvImages(id: string) {
  return useQuery<TvImagesApiResponse>({
    queryKey: ["tv-images", id],
    queryFn: () => fetchTvImages(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // Images rarely change
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  })
}
