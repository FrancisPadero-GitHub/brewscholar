import { create } from "zustand"

export type MovieFiltersTab = "Popular" | "Top Rated" | "Now Playing" | "Upcoming"
export type TvFiltersTab = "Popular" | "Top Rated" | "Airing Today" | "On The Air"

export const MOVIE_CATEGORY_TABS: MovieFiltersTab[] = [
  "Popular",
  "Top Rated",
  "Now Playing",
  "Upcoming",
]

export const TV_CATEGORY_TABS: TvFiltersTab[] = [
  "Popular",
  "Top Rated",
  "Airing Today",
  "On The Air",
]

type FilterStore = {
  activeMovieFilter: MovieFiltersTab
  setActiveMovieFilter: (tab: MovieFiltersTab) => void
  moviePages: Record<MovieFiltersTab, number>
  setMoviePage: (tab: MovieFiltersTab, page: number) => void
  
  activeTvFilter: TvFiltersTab
  setActiveTvFilter: (tab: TvFiltersTab) => void
  tvPages: Record<TvFiltersTab, number>
  setTvPage: (tab: TvFiltersTab, page: number) => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  activeMovieFilter: "Popular",
  setActiveMovieFilter: (tab: MovieFiltersTab) => set({ activeMovieFilter: tab }),
  moviePages: {
    "Now Playing": 1,
    Popular: 1,
    "Top Rated": 1,
    Upcoming: 1,
  },
  setMoviePage: (tab: MovieFiltersTab, page: number) =>
    set((state) => ({
      moviePages: {
        ...state.moviePages,
        [tab]: page,
      },
    })),

  activeTvFilter: "Popular",
  setActiveTvFilter: (tab: TvFiltersTab) => set({ activeTvFilter: tab }),
  tvPages: {
    Popular: 1,
    "Top Rated": 1,
    "Airing Today": 1,
    "On The Air": 1,
  },
  setTvPage: (tab: TvFiltersTab, page: number) =>
    set((state) => ({
      tvPages: {
        ...state.tvPages,
        [tab]: page,
      },
    })),
}))
