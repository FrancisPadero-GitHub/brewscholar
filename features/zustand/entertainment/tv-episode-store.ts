import { create } from "zustand"

interface TvEpisodeState {
  season: number
  episode: number
  setSeason: (season: number) => void
  setEpisode: (episode: number) => void
  setSeasonAndEpisode: (season: number, episode: number) => void
}

export const useTvEpisodeStore = create<TvEpisodeState>((set) => ({
  season: 1,
  episode: 1,
  setSeason: (season) => set({ season }),
  setEpisode: (episode) => set({ episode }),
  setSeasonAndEpisode: (season, episode) => set({ season, episode }),
}))
