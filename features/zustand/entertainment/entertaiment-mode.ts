import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ActiveMode = "Movie" | "TV series"

export const ACTIVE_MODE: ActiveMode[] = ["Movie", "TV series"]

interface EntertainmentModeState {
  mode: ActiveMode
  setMode: (mode: ActiveMode) => void
}

export const useEntertainmentMode = create<EntertainmentModeState>()(
  persist(
    (set) => ({
      mode: "Movie",
      setMode: (mode) => set({ mode }),
    }),
    {
      name: "entertainment-mode",
      partialize: (state) => ({ mode: state.mode }),
    }
  )
)
