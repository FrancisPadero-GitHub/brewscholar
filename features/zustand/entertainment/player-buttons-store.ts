import { create } from "zustand"

export type ActivePlayer = "Player 1" | "Player 2" | "Player 3" | "Player 4" | "Player 5"

export const ACTIVE_PLAYER: ActivePlayer[] = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"]

type PlayerStore = {
  activePlayer: ActivePlayer
  setActivePlayer: (player: ActivePlayer) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  activePlayer: "Player 1",
  setActivePlayer: (player: ActivePlayer) => set({ activePlayer: player }),
}))
