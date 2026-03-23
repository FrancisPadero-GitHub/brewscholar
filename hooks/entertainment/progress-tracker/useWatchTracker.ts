import { useEffect } from "react"
// types/progress.ts
export interface WatchProgress {
  mediaId: string // The TMDB ID of the movie/show
  title?: string // Optional: helpful for displaying without an API call
  currentTime: number
  duration: number
  percentage: number
  updatedAt: number // Epoch timestamp for sorting
}

export function useWatchTracker(currentMediaId: string, title?: string) {
  useEffect(() => {
    if (!currentMediaId) return

    // 1. Initialize history entry on mount if it doesn't exist
    const existingData = localStorage.getItem("watchHistory")
    const history: Record<string, WatchProgress | undefined> = existingData
      ? JSON.parse(existingData)
      : {}

    if (!history[currentMediaId]) {
      history[currentMediaId] = {
        mediaId: currentMediaId,
        title: title,
        currentTime: 0,
        duration: 0,
        percentage: 0,
        updatedAt: Date.now(),
      }
      localStorage.setItem("watchHistory", JSON.stringify(history))
    }

    const handleMessage = (event: MessageEvent) => {
      // Allow only known origins
      const allowedOrigins = ["https://vidlink.pro", "https://www.vidking.net"]
      if (!allowedOrigins.includes(event.origin)) return

      let payload = event.data
      // VidKing Net sends stringified JSON
      if (typeof payload === "string") {
        try {
          payload = JSON.parse(payload)
        } catch {
          // ignore parsing errors
        }
      }

      const isPlayerEvent = payload?.type === "PLAYER_EVENT" || payload?.type === "MEDIA_DATA"

      if (isPlayerEvent) {
        // 1. Get the raw data
        const currentTime = payload?.data?.currentTime
        const duration = payload?.data?.duration
        
        // Skip invalid updates
        if (typeof currentTime !== "number" || typeof duration !== "number") return

        // 2. Fetch existing history from Local Storage
        const existingData = localStorage.getItem("watchHistory")
        const history: Record<string, WatchProgress | undefined> = existingData
          ? JSON.parse(existingData)
          : {}

        // 3. Calculate percentage (prevent division by zero)
        const percentage = duration > 0 ? (currentTime / duration) * 100 : 0

        // 4. Update the dictionary with the current media
        history[currentMediaId] = {
          mediaId: currentMediaId,
          title: title,
          currentTime,
          duration,
          percentage,
          updatedAt: Date.now(),
        }

        // 5. Save the updated dictionary back to Local Storage
        localStorage.setItem("watchHistory", JSON.stringify(history))
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [currentMediaId, title])
}
