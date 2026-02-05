"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// components
import MoviePlayer from "../../../features/entertainment/player/page";

const Watch = () => {
  const [movieId, setMovieId] = useState("1368166"); // Sample: The Shawshank Redemption
  const [inputValue, setInputValue] = useState("1368166");
  const [contentType, setContentType] = useState<"movie" | "tv">("movie");
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [showPlayer, setShowPlayer] = useState(true);

  const handleLoadMovie = () => {
    setMovieId(inputValue);
    setShowPlayer(true);
  };

  return (
    <main className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Movie & TV Player</h1>

      <Card>
        <CardHeader>
          <CardTitle>Enter Content Details</CardTitle>
          <CardDescription>
            Enter an IMDB ID (e.g., 8871 for Dr.Seuss How the Grinch Stole
            Christmas) or (e.g 1408 for House MD - TV) to load the content.
            Select the type and for TV series, specify the season and episode.
            Click &lsquo;Load&rsquo; to start watching.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
              Content ID (IMDB or TMDB)
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="e.g., tt0111161"
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

          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Sample IDs to try:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>8871 - Dr.Seuss How the Grinch Stole Christmas</li>
              <li>1408 - House MD - TV</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {showPlayer && movieId && (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Now Watching</h2>
          <p className="text-muted-foreground">Content ID: {movieId}</p>
          <MoviePlayer
            id={movieId}
            type={contentType}
            season={contentType === "tv" ? season : undefined}
            episode={contentType === "tv" ? episode : undefined}
            autoPlay={true}
          />
        </div>
      )}
    </main>
  );
};

export default Watch;
