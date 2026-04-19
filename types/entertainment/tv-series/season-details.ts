export interface SeasonCrewMember {
  department: string
  job: string
  credit_id: string
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
}

export interface SeasonGuestStar {
  character: string
  credit_id: string
  order: number
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
}

export interface SeasonEpisode {
  air_date: string
  episode_number: number
  episode_type: string
  id: number
  name: string
  overview: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string | null
  vote_average: number
  vote_count: number
  crew: SeasonCrewMember[]
  guest_stars: SeasonGuestStar[]
}

export interface SeasonNetwork {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export interface TvSeasonDetailsApiResponse {
  _id: string
  air_date: string
  episodes: SeasonEpisode[]
  name: string
  networks: SeasonNetwork[]
  overview: string
  id: number
  poster_path: string | null
  season_number: number
  vote_average: number
}
