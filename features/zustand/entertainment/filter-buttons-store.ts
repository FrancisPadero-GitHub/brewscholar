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
}

export const useFilterStore = create<FilterStore>((set) => ({
  activeFilter: "Now Playing",
  setActiveFilter: (tab: FiltersTab) => set({ activeFilter: tab }),
}))
