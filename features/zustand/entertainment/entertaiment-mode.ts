import { create } from "zustand"

export type ActiveMode = "Movie" | "TV series"

export const ACTIVE_MODE: ActiveMode[] = ["Movie", "TV series"]

interface EntertainmentModeState {
  mode: ActiveMode
  setMode: (mode: ActiveMode) => void
}

export const useEntertainmentMode = create<EntertainmentModeState>((set) => ({
  mode: "Movie",
  setMode: (mode) => set({ mode }),
}))
