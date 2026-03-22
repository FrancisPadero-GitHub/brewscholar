import { create } from "zustand"

export type FiltersTab = "Now Playing" | "Popular" | "Top Rated" | "Upcoming"

export const CATEGORY_TABS: FiltersTab[] = [
  "Now Playing",
  "Popular",
  "Top Rated",
  "Upcoming",
]

type FilterStore = {
  activeFilter: FiltersTab
  setActiveFilter: (tab: FiltersTab) => void
  pages: Record<FiltersTab, number>
  setPage: (tab: FiltersTab, page: number) => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  activeFilter: "Now Playing",
  setActiveFilter: (tab: FiltersTab) => set({ activeFilter: tab }),
  pages: {
    "Now Playing": 1,
    "Popular": 1,
    "Top Rated": 1,
    "Upcoming": 1,
  },
  setPage: (tab: FiltersTab, page: number) =>
    set((state) => ({
      pages: {
        ...state.pages,
        [tab]: page,
      },
    })),
}))
