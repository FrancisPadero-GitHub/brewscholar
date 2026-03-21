export interface Movie {
  imdb_id: string
  tmdb_id: string
  title: string
  embed_url: string
  quality: string
}

export interface ApiResponse {
  result: Movie[]
}
