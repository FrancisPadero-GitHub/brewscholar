import { create } from "zustand"

export type ActivePlayer =
  | "Server 1"
  | "Server 2"
  | "Server 3"
  | "Server 4"
  | "Server 5"
  | "Server 6"

export const ACTIVE_PLAYER: ActivePlayer[] = [
  "Server 1",
  "Server 2",
  "Server 3",
  "Server 4",
  "Server 5",
  "Server 6",
]

type PlayerStore = {
  activePlayer: ActivePlayer
  setActivePlayer: (player: ActivePlayer) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  activePlayer: "Server 1",
  setActivePlayer: (player: ActivePlayer) => set({ activePlayer: player }),
}))
