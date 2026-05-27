"use client"

import Image from "next/image"
import { PlayCircle, Play, ChevronLeft, ChevronRight } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import type { VideoItem } from "@/types/entertainment/movies/movie-videos"

interface VideosGalleryProps {
  videos: VideoItem[]
  activeTab: string
  setActiveTab: (tab: string) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  onPlayVideo: (key: string) => void
}

export function VideosGallery({
  videos,
  activeTab,
  setActiveTab,
  currentPage,
  setCurrentPage,
  onPlayVideo,
}: VideosGalleryProps) {
  if (videos.length === 0) return null

  const getFilteredVideos = () => {
    switch (activeTab) {
      case "trailers":
        return videos.filter((v) => v.type === "Trailer")
      case "teasers":
        return videos.filter((v) => v.type === "Teaser")
      case "bts":
        return videos.filter((v) => v.type === "Behind the Scenes")
      case "clips":
        return videos.filter((v) => v.type === "Clip" || v.type === "Featurette")
      default:
        return videos
    }
  }

  const filteredVideos = getFilteredVideos()
  const ITEMS_PER_PAGE = 6
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedVideos = filteredVideos.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE)

  const renderVideoGrid = (vlist: VideoItem[]) => {
    if (vlist.length === 0) {
      return (
        <div className="flex h-36 items-center justify-center rounded-xl border border-dashed border-zinc-800 text-muted-foreground">
          No videos available in this category.
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vlist.map((video) => (
          <div
            key={video.id}
            onClick={() => onPlayVideo(video.key)}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-2 transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-900">
              <Image
                src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                alt={video.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 scale-90 group-hover:scale-100">
                  <Play className="h-6 w-6 fill-current ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 rounded-sm bg-black/85 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300">
                {video.type}
              </span>
            </div>
            <div className="mt-3 px-1">
              <h3 className="truncate text-sm font-semibold text-zinc-200 group-hover:text-primary transition-colors">
                {video.name}
              </h3>
              <p className="mt-1 text-[11px] text-zinc-500">
                {video.site} &bull;{" "}
                {new Date(video.published_at).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <Separator className="my-10 border-border" />
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
          <PlayCircle className="h-4 w-4" />
          Videos & Clips
        </h2>

        <Tabs
          value={activeTab}
          onValueChange={(val) => {
            setActiveTab(val)
            setCurrentPage(1)
          }}
          className="w-full"
        >
          <TabsList className="flex flex-wrap h-auto bg-zinc-900/50 p-1 border border-zinc-800 rounded-xl max-w-max gap-1">
            <TabsTrigger
              value="all"
              className="rounded-lg text-xs md:text-sm py-1.5 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
            >
              All ({videos.length})
            </TabsTrigger>
            {videos.some((v) => v.type === "Trailer") && (
              <TabsTrigger
                value="trailers"
                className="rounded-lg text-xs md:text-sm py-1.5 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
              >
                Trailers ({videos.filter((v) => v.type === "Trailer").length})
              </TabsTrigger>
            )}
            {videos.some((v) => v.type === "Teaser") && (
              <TabsTrigger
                value="teasers"
                className="rounded-lg text-xs md:text-sm py-1.5 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
              >
                Teasers ({videos.filter((v) => v.type === "Teaser").length})
              </TabsTrigger>
            )}
            {videos.some((v) => v.type === "Behind the Scenes") && (
              <TabsTrigger
                value="bts"
                className="rounded-lg text-xs md:text-sm py-1.5 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
              >
                Behind the Scenes ({videos.filter((v) => v.type === "Behind the Scenes").length})
              </TabsTrigger>
            )}
            {videos.some((v) => v.type === "Clip" || v.type === "Featurette") && (
              <TabsTrigger
                value="clips"
                className="rounded-lg text-xs md:text-sm py-1.5 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
              >
                Clips & Featurettes ({videos.filter((v) => v.type === "Clip" || v.type === "Featurette").length})
              </TabsTrigger>
            )}
          </TabsList>

          {/* Single paginated content layout */}
          <div className="mt-6 space-y-6">
            {renderVideoGrid(paginatedVideos)}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-end gap-2 pt-2">
                <span className="text-xs text-muted-foreground tabular-nums">
                  Page {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-primary hover:text-primary disabled:opacity-50 cursor-pointer"
                  onClick={() => {
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  disabled={currentPage <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-primary hover:text-primary disabled:opacity-50 cursor-pointer"
                  onClick={() => {
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  disabled={currentPage >= totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </Tabs>
      </section>
    </>
  )
}
