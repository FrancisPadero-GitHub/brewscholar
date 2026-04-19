import { useCallback, useMemo, useSyncExternalStore } from "react"

const STORAGE_KEY = "watchedEpisodes"

/**
 * Stores and retrieves a per-series set of watched episode keys.
 *
 * Each key is a string like "S1E3" (season 1, episode 3).
 * Data shape in localStorage:
 *   { [seriesId]: string[] }
 */
export type WatchedEpisodesMap = Record<string, string[] | undefined>

function buildKey(season: number, episode: number): string {
  return `S${season}E${episode}`
}

function readStorage(): WatchedEpisodesMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeStorage(map: WatchedEpisodesMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

// ── Tiny external-store wiring so React re-renders on writes ────────────
let listeners: Array<() => void> = []

function subscribe(cb: () => void) {
  listeners = [...listeners, cb]
  return () => {
    listeners = listeners.filter((l) => l !== cb)
  }
}

function emitChange() {
  for (const l of listeners) l()
}

function getSnapshot(): string {
  return localStorage.getItem(STORAGE_KEY) ?? "{}"
}

function getServerSnapshot(): string {
  return "{}"
}

export function useWatchedEpisodes(seriesId: string) {
  // Re-renders whenever localStorage[STORAGE_KEY] changes via emitChange()
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const watched: Set<string> = useMemo(() => {
    try {
      const map: WatchedEpisodesMap = JSON.parse(raw)
      return new Set(map[seriesId] ?? [])
    } catch {
      return new Set<string>()
    }
  }, [raw, seriesId])

  /** Mark a single episode as watched */
  const markWatched = useCallback(
    (season: number, episode: number) => {
      if (!seriesId) return
      const key = buildKey(season, episode)
      const map = readStorage()
      const existing = new Set(map[seriesId] ?? [])
      if (existing.has(key)) return // already tracked
      existing.add(key)
      map[seriesId] = Array.from(existing)
      writeStorage(map)
      emitChange()
    },
    [seriesId]
  )

  /** Check if a specific episode has been watched */
  const isWatched = useCallback(
    (season: number, episode: number): boolean => {
      return watched.has(buildKey(season, episode))
    },
    [watched]
  )

  /** Count how many episodes are watched for a given season */
  const watchedCountForSeason = useCallback(
    (season: number, totalEpisodes: number): number => {
      let count = 0
      for (let ep = 1; ep <= totalEpisodes; ep++) {
        if (watched.has(buildKey(season, ep))) count++
      }
      return count
    },
    [watched]
  )

  return { watched, markWatched, isWatched, watchedCountForSeason }
}
