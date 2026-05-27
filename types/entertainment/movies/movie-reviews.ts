export interface AuthorDetails {
  name: string
  username: string
  avatar_path: string | null
  rating: number | null
}

export interface MovieReview {
  author: string
  author_details: AuthorDetails
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

export interface MovieReviewsApiResponse {
  id: number
  page: number
  results: MovieReview[]
  total_pages: number
  total_results: number
}
