"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// components
import MoviePlayer from "../../../../features/entertainment/player/player"

const Watch = () => {
  const [api, setAPI] = useState<"www.vidking.net" | "vidsrc.to">("vidsrc.to") // Default API

  const [movieId, setMovieId] = useState("")
  const [inputValue, setInputValue] = useState("")

  const [contentType, setContentType] = useState<"movie" | "tv">("movie")
  const [season, setSeason] = useState(1)
  const [episode, setEpisode] = useState(1)
  const [showPlayer, setShowPlayer] = useState(true)

  const handleLoadMovie = () => {
    setMovieId(inputValue)
    setShowPlayer(true)
  }
  // test
  return (
    <main className="container mx-auto space-y-6 p-4">
      <h1 className="mb-6 text-3xl font-bold">Movie & TV Player</h1>
      <Card>
        {/* <CardHeader>
          <CardTitle>Enter Content Details</CardTitle>
          <CardDescription>
            Enter an IMDB ID (e.g., 8871 for Dr.Seuss How the Grinch Stole
            Christmas) or (e.g 1408 for House MD - TV) to load the content.
            Select the type and for TV series, specify the season and episode.
            Click &lsquo;Load&rsquo; to start watching.
          </CardDescription>
        </CardHeader> */}
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={api === "www.vidking.net" ? "default" : "outline"}
              onClick={() => setAPI("www.vidking.net")}
            >
              Vid King
            </Button>
            <Button
              variant={api === "vidsrc.to" ? "default" : "outline"}
              onClick={() => setAPI("vidsrc.to")}
            >
              Vid SRC
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant={contentType === "movie" ? "default" : "outline"}
              onClick={() => setContentType("movie")}
            >
              Movie
            </Button>
            <Button
              variant={contentType === "tv" ? "default" : "outline"}
              onClick={() => setContentType("tv")}
            >
              TV Series
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {api === "vidsrc.to"
                ? "TMDB ID (numeric only)"
                : "Content ID (IMDB or TMDB)"}
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder={
                  api === "vidsrc.to"
                    ? "e.g., 8871 (TMDB)"
                    : "e.g., tt0111161 or 278"
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleLoadMovie}>Load</Button>
            </div>
          </div>

          {contentType === "tv" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Season</label>
                <Input
                  type="number"
                  min="1"
                  value={season}
                  onChange={(e) => setSeason(parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Episode</label>
                <Input
                  type="number"
                  min="1"
                  value={episode}
                  onChange={(e) => setEpisode(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showPlayer && movieId && (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Now Watching</h2>
          <p className="text-muted-foreground">Content ID: {movieId}</p>
          <MoviePlayer
            id={movieId}
            api={api}
            type={contentType}
            season={contentType === "tv" ? season : undefined}
            episode={contentType === "tv" ? episode : undefined}
            autoPlay={true}
          />
        </div>
      )}
    </main>
  )
}

export default Watch
