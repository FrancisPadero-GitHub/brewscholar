"use client"

import { useEffect, useState, type MouseEvent } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  Star,
  Clock,
  Calendar,
  Globe,
  ArrowLeft,
  ExternalLink,
  Play,
  Users,
  Award,
  Tv,
  ListVideo,
  CalendarClock,
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  PlayCircle,
  Film,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// helpers
import {
  getRatingColor,
  formatRuntime,
} from "@/helpers/entertainment/movie-details/movie-details"
import { IMAGE_BASE_URL, BACKDROP_BASE_URL } from "@/constants/image-size"
import { buildWatchTvPath } from "@/lib/utils"

// hooks
import { useFetchTvDetails } from "@/hooks/entertainment/fetch/tv-series/useFetchTvDetails"
import { useFetchTvCredits } from "@/hooks/entertainment/fetch/tv-series/useFetchTvCredits"
import { useFetchTvImages } from "@/hooks/entertainment/fetch/tv-series/useFetchTvImages"
import { useFetchTvVideos } from "@/hooks/entertainment/fetch/tv-series/useFetchTvVideos"

// types
import type { TvSeriesDetailsApiResponse } from "@/types/entertainment/tv-series/tv-details"
import type { TvCreditsApiResponse } from "@/types/entertainment/tv-series/tv-credits"
import type { TvImagesApiResponse } from "@/types/entertainment/tv-series/tv-images"

// components (reuse movie skeleton and pill since structure is identical)
import { MovieDetailsSkeleton } from "@/components/custom/entertainment/movie-details/skeleton"
import { StatPill } from "@/components/custom/entertainment/movie-details/stat-pill"
import TvRecommendationsSection from "@/components/custom/entertainment/watch-tv/tv-recommendations"
import TvReviewsSection from "@/components/custom/entertainment/tv-series-details/tv-reviews"

// ─── Main page
export default function TvSeriesDetails() {
  const params = useParams()
  const rawTvParam = params.id as string
  const tvId = rawTvParam.split("-")[0]

  const [activeImgIndex, setActiveImgIndex] = useState<number | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const [activeVideoKey, setActiveVideoKey] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  // Image navigation helpers for the lightbox
  const goPrevImage = (e: MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => {
      if (prev === null) return 0
      const max = Math.min(tvImages?.backdrops.length ?? 0, 6)
      return (prev - 1 + max) % max
    })
  }

  const goNextImage = (e: MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => {
      if (prev === null) return 0
      const max = Math.min(tvImages?.backdrops.length ?? 0, 6)
      return (prev + 1) % max
    })
  }

  const { data, isFetching, isError, error } = useFetchTvDetails(tvId)
  const tv = data as TvSeriesDetailsApiResponse | undefined

  const { data: creditsData } = useFetchTvCredits(tvId)
  const credits = creditsData as TvCreditsApiResponse | undefined

  const { data: imagesData } = useFetchTvImages(tvId)
  const tvImages = imagesData as TvImagesApiResponse | undefined

  const { data: videosData } = useFetchTvVideos(tvId)
  const tvVideos = videosData?.results || []

  const getFilteredVideos = () => {
    switch (activeTab) {
      case "trailers":
        return tvVideos.filter((v) => v.type === "Trailer")
      case "teasers":
        return tvVideos.filter((v) => v.type === "Teaser")
      case "bts":
        return tvVideos.filter((v) => v.type === "Behind the Scenes")
      case "clips":
        return tvVideos.filter(
          (v) => v.type === "Clip" || v.type === "Featurette"
        )
      default:
        return tvVideos
    }
  }

  const filteredVideos = getFilteredVideos()
  const ITEMS_PER_PAGE = 6
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedVideos = filteredVideos.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE)

  const bgVideo =
    tvVideos.find(
      (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
    ) ||
    tvVideos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    tvVideos.find((v) => v.site === "YouTube" && v.type === "Teaser") ||
    tvVideos.find((v) => v.site === "YouTube")

  const logo =
    tvImages?.logos.find((l) => l.iso_639_1 === "en") || tvImages?.logos[0]

  // Escape & Arrow keys listener for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImgIndex(null)
      } else if (e.key === "ArrowLeft") {
        setActiveImgIndex((prev) => {
          if (prev === null) return null
          const max = Math.min(tvImages?.backdrops.length ?? 0, 6)
          return (prev - 1 + max) % max
        })
      } else if (e.key === "ArrowRight") {
        setActiveImgIndex((prev) => {
          if (prev === null) return null
          const max = Math.min(tvImages?.backdrops.length ?? 0, 6)
          return (prev + 1) % max
        })
      }
    }

    if (activeImgIndex !== null) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeImgIndex, tvImages])

  useEffect(() => {
    const iframe = document.getElementById("hero-bg-video") as HTMLIFrameElement
    if (iframe.contentWindow) {
      const command = isMuted ? "mute" : "unmute"
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: command, args: "" }),
        "*"
      )
    }
  }, [isMuted, videoLoaded])

  const creators = tv?.created_by || []
  const directors = credits?.crew.filter((member) => member.job === "Director")

  // Dynamic Browser Tab Title
  useEffect(() => {
    if (tv?.name) {
      const releaseYear = tv.first_air_date
        ? tv.first_air_date.split("-")[0]
        : "TBA"
      document.title = `${tv.name} (${releaseYear}) - Movie Hub | BrewScholar`
    } else {
      document.title = "Loading Series... - Movie Hub | BrewScholar"
    }
  }, [tv])

  // ── Loading state
  if (isFetching) return <MovieDetailsSkeleton />

  // ── Error state
  if (isError || !tv) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
        <Tv className="h-14 w-14 text-muted-foreground" />
        <h1 className="text-2xl font-bold">TV Series Not Found</h1>
        <p className="text-muted-foreground">
          {error?.message ?? "Something went wrong. Please try again."}
        </p>
        <Link href="/entertainment">
          <Button variant="outline" className="mt-2 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to catalog
          </Button>
        </Link>
      </div>
    )
  }

  const releaseYear = tv.first_air_date.split("-")[0] || "TBA"
  const ratingColor = getRatingColor(tv.vote_average)
  const runtime = tv.episode_run_time.length > 0 ? tv.episode_run_time[0] : 0

  const isNewOrUpcoming = (() => {
    if (!tv.first_air_date) return true
    const releaseDate = new Date(tv.first_air_date)
    const today = new Date()
    const diffTime = today.getTime() - releaseDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    // Dynamic notice if aired in last 120 days or scheduled in the future
    return diffDays < 120 || releaseDate > today
  })()

  const renderVideoGrid = (vlist: typeof tvVideos) => {
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
            onClick={() => {
              setActiveVideoKey(video.key)
              setIsTrailerOpen(true)
            }}
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
                <div className="flex h-12 w-12 scale-90 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-100">
                  <Play className="ml-0.5 h-6 w-6 fill-current" />
                </div>
              </div>
              <span className="absolute right-2 bottom-2 rounded-sm bg-black/85 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300">
                {video.type}
              </span>
            </div>
            <div className="mt-3 px-1">
              <h3 className="truncate text-sm font-semibold text-zinc-200 transition-colors group-hover:text-primary">
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
    <div className="min-h-screen bg-background text-foreground">
      {/* ── HERO BACKDROP  */}
      <div className="relative h-[58vh] w-full overflow-hidden bg-zinc-950">
        {bgVideo ? (
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              videoLoaded ? "opacity-35" : "opacity-0"
            }`}
          >
            <iframe
              id="hero-bg-video"
              src={`https://www.youtube.com/embed/${bgVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${bgVideo.key}&playsinline=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&enablejsapi=1`}
              className="pointer-events-none absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.77%] -translate-x-1/2 -translate-y-1/2 object-cover"
              allow="autoplay; encrypted-media"
              onLoad={() => setVideoLoaded(true)}
            />
          </div>
        ) : null}

        {/* Static image backdrop - shown if video is loading or not available */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            bgVideo && videoLoaded ? "opacity-0" : "opacity-50"
          }`}
        >
          {tv.backdrop_path ? (
            <Image
              src={`${BACKDROP_BASE_URL}${tv.backdrop_path}`}
              alt={tv.name}
              fill
              sizes="100vw"
              className="object-cover object-top"
              priority
            />
          ) : (
            <div className="h-full w-full bg-muted" />
          )}
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent" />

        {/* Back button and ambient audio toggle floating in hero */}
        <div className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 pt-7">
          <Link href="/entertainment">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-zinc-700 bg-black/40 text-white backdrop-blur-md hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>

          {bgVideo && videoLoaded && (
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                setIsMuted(!isMuted)
              }}
              className="h-9 w-9 cursor-pointer rounded-full border-zinc-700 bg-black/40 text-white shadow-lg backdrop-blur-md hover:bg-white hover:text-black"
              title={
                isMuted ? "Unmute background video" : "Mute background video"
              }
            >
              {isMuted ? (
                <VolumeX className="h-4.5 w-4.5 animate-pulse" />
              ) : (
                <Volume2 className="h-4.5 w-4.5 text-primary" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT  */}
      <div className="mx-auto max-w-6xl px-6 pb-24">
        {/* ── Poster + Title Row  */}
        <div className="-mt-44 flex flex-col items-start gap-8 md:flex-row md:items-end">
          {/* Poster */}
          <div className="relative z-10 h-64 w-44 shrink-0 overflow-hidden rounded-xl border-2 border-zinc-700 shadow-2xl shadow-black/40 md:h-80 md:w-56">
            {tv.poster_path ? (
              <Image
                src={`${IMAGE_BASE_URL}${tv.poster_path}`}
                alt={tv.name}
                fill
                sizes="(max-width: 768px) 176px, 224px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <Tv className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Title block */}
          <div className="z-10 flex-1 space-y-3 pb-2">
            {/* Genre badges */}
            <div className="flex flex-wrap gap-2">
              {tv.genres.map((g) => (
                <Badge
                  key={g.id}
                  variant="outline"
                  className="border-primary/40 bg-primary/10 text-primary"
                >
                  {g.name}
                </Badge>
              ))}
            </div>

            {logo ? (
              <div className="relative h-16 w-64 overflow-hidden md:h-24 md:w-80">
                <Image
                  src={`${IMAGE_BASE_URL}${logo.file_path}`}
                  alt={tv.name}
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-contain object-left drop-shadow-lg"
                  priority
                />
              </div>
            ) : (
              <h1 className="text-3xl font-black tracking-tight text-foreground md:text-5xl">
                {tv.name}
              </h1>
            )}

            {tv.original_name !== tv.name && (
              <p className="text-sm text-muted-foreground italic">
                {tv.original_name}
              </p>
            )}

            {tv.tagline && (
              <p className="text-base font-medium text-accent-foreground italic">
                &ldquo;{tv.tagline}&rdquo;
              </p>
            )}

            {/* Quick stats row */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-sm text-muted-foreground">
              {/* Rating */}
              <span
                className={`flex items-center gap-1 text-base font-bold ${ratingColor}`}
              >
                <Star className="h-4 w-4 fill-current" />
                {tv.vote_average.toFixed(1)}
                <span className="text-xs font-normal text-muted-foreground">
                  / 10
                </span>
              </span>

              <span className="text-border">|</span>

              {runtime > 0 && (
                <>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    {formatRuntime(runtime)}
                  </span>
                  <span className="text-border">|</span>
                </>
              )}

              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {releaseYear}
              </span>

              <span className="text-border">|</span>

              <span className="flex items-center gap-1 uppercase">
                <Globe className="h-3.5 w-3.5 text-primary" />
                {tv.original_language}
              </span>

              {/* Status */}
              <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {tv.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Official Site */}
              {tv.homepage && (
                <Link
                  href={tv.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="sm"
                    className="mt-1 cursor-pointer gap-2 rounded-full bg-accent font-semibold text-accent-foreground shadow-md shadow-accent/20 hover:bg-primary hover:text-primary-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Official Site
                  </Button>
                </Link>
              )}

              {/* Watch Trailer */}
              {bgVideo && (
                <Button
                  size="sm"
                  onClick={() => {
                    setActiveVideoKey(bgVideo.key)
                    setIsTrailerOpen(true)
                  }}
                  className="mt-1 animate-pulse cursor-pointer gap-2 rounded-full border border-zinc-700 bg-black/40 font-semibold text-white shadow-md backdrop-blur-md transition-all hover:bg-white hover:text-black"
                >
                  <Film className="h-3.5 w-3.5 text-primary" />
                  Watch Trailer
                </Button>
              )}

              {/* Play now */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Link href={buildWatchTvPath(tv.id, tv.name)}>
                  <Button
                    size="sm"
                    className="mt-1 cursor-pointer gap-2 rounded-full border border-primary/50 bg-primary font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    Play Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <Separator className="my-10 border-border" />

        {/* ── Details Grid  */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left: Overview + Stats  */}
          <div className="space-y-8 lg:col-span-2">
            {/* Friendly Availability Alert */}
            <div
              className={`relative overflow-hidden rounded-2xl border p-4.5 transition-all duration-300 ${
                isNewOrUpcoming
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
                  : "border-border/60 bg-muted/30 text-zinc-300"
              }`}
            >
              <div className="flex gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    isNewOrUpcoming
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  <CalendarClock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3
                    className={`text-sm font-bold tracking-tight ${isNewOrUpcoming ? "text-amber-300" : "text-zinc-200"}`}
                  >
                    {isNewOrUpcoming
                      ? "⚡ Release Notice & Playback Info"
                      : "💡 Series Availability Notice"}
                  </h3>
                  <p className="text-xs/relaxed text-zinc-400">
                    {isNewOrUpcoming
                      ? `Since this TV series is brand new or recently aired (first air date: ${tv.first_air_date ? new Date(tv.first_air_date).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "TBA"}), player servers may still be compiling and indexing the episodes. Some episodes might take time to become available.`
                      : "Playback sources are provided by public third-party player APIs. If a source experiences playback latency or is unavailable, please try switching between the alternative players inside the watch room."}
                  </p>
                </div>
              </div>
            </div>

            {/* Overview */}
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
                <Tv className="h-4 w-4" />
                Overview
              </h2>
              <p className="leading-relaxed text-muted-foreground md:text-base">
                {tv.overview || "No overview available."}
              </p>
            </section>

            {/* Top Cast */}
            {credits && credits.cast.length > 0 && (
              <section className="space-y-4">
                <h2 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
                  <Users className="h-4 w-4" />
                  Top Cast
                </h2>
                <div className="scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent flex gap-4 overflow-x-auto pb-4">
                  {credits.cast.slice(0, 5).map((actor) => (
                    <div
                      key={actor.id}
                      className="group border-zinc-850 relative flex w-40 shrink-0 flex-col overflow-hidden rounded-xl border bg-zinc-900/30 p-2 transition-all duration-300 hover:scale-[1.03] hover:border-primary/30 hover:bg-zinc-900/60"
                    >
                      <div className="bg-zinc-850 relative h-36 w-full overflow-hidden rounded-lg">
                        {actor.profile_path ? (
                          <Image
                            src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                            alt={actor.name}
                            fill
                            sizes="128px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-500">
                            <Users className="h-8 w-8" />
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex flex-col px-0.5">
                        <span className="truncate text-sm font-bold text-zinc-100 transition-colors duration-200 group-hover:text-primary">
                          {actor.name}
                        </span>
                        <span className="mt-0.5 truncate text-[11px] font-medium text-zinc-400">
                          {actor.character}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TV Stats */}
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
                <Award className="h-4 w-4" />
                Series Statistics
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {tv.number_of_seasons > 0 && (
                  <StatPill
                    icon={Tv}
                    label="Seasons"
                    value={tv.number_of_seasons.toString()}
                  />
                )}
                {tv.number_of_episodes > 0 && (
                  <StatPill
                    icon={ListVideo}
                    label="Episodes"
                    value={tv.number_of_episodes.toString()}
                  />
                )}
                {tv.vote_count > 0 && (
                  <StatPill
                    icon={Users}
                    label="Vote Count"
                    value={tv.vote_count.toLocaleString()}
                  />
                )}
                {tv.popularity > 0 && (
                  <StatPill
                    icon={Award}
                    label="Popularity"
                    value={tv.popularity.toFixed(1)}
                  />
                )}
              </div>
            </section>
          </div>

          {/* Right: Meta sidebar  */}
          <aside className="space-y-6">
            {/* TV facts card */}
            <Card className="border-border bg-card shadow-sm">
              <CardContent className="space-y-4 p-5">
                <h2 className="text-xs font-semibold tracking-widest text-primary uppercase">
                  Series Facts
                </h2>

                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      First Air Date
                    </dt>
                    <dd className="mt-0.5 font-medium text-foreground">
                      {tv.first_air_date
                        ? new Date(tv.first_air_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "TBA"}
                    </dd>
                  </div>

                  {creators.length > 0 && (
                    <div>
                      <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Creator{creators.length > 1 ? "s" : ""}
                      </dt>
                      <dd className="mt-0.5 font-medium text-foreground">
                        {creators.map((c) => c.name).join(", ")}
                      </dd>
                    </div>
                  )}

                  {directors && directors.length > 0 && (
                    <div>
                      <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Director{directors.length > 1 ? "s" : ""}
                      </dt>
                      <dd className="mt-0.5 font-medium text-foreground">
                        {directors.map((d) => d.name).join(", ")}
                      </dd>
                    </div>
                  )}

                  {tv.last_air_date && (
                    <div>
                      <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Last Air Date
                      </dt>
                      <dd className="mt-0.5 font-medium text-foreground">
                        {new Date(tv.last_air_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </dd>
                    </div>
                  )}

                  {runtime > 0 && (
                    <div>
                      <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Episode Runtime
                      </dt>
                      <dd className="mt-0.5 font-medium text-foreground">
                        {formatRuntime(runtime)}
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Original Language
                    </dt>
                    <dd className="mt-0.5 font-medium text-foreground uppercase">
                      {tv.original_language}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Status
                    </dt>
                    <dd className="mt-0.5">
                      <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {tv.status}
                      </span>
                    </dd>
                  </div>

                  {tv.adult && (
                    <div>
                      <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Rating
                      </dt>
                      <dd className="mt-0.5">
                        <span className="rounded-full bg-destructive/15 px-2.5 py-0.5 text-xs font-semibold text-destructive">
                          Adult
                        </span>
                      </dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            {/* TMDB link */}
            <Link
              href={`https://www.themoviedb.org/tv/${tv.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full gap-2 border-border hover:border-primary hover:text-primary"
              >
                <ExternalLink className="h-4 w-4" />
                View on TMDB
              </Button>
            </Link>
          </aside>
        </div>

        {/* Media Gallery in Bento Layout */}
        {tvImages && tvImages.backdrops.length > 0 && (
          <>
            <Separator className="my-10 border-border" />
            <section className="space-y-4">
              <h2 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
                <Tv className="h-4 w-4" />
                Media Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {tvImages.backdrops.slice(0, 6).map((img, i) => {
                  let gridClasses =
                    "group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:scale-[1.02] hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 aspect-video"
                  if (i === 0) {
                    gridClasses +=
                      " col-span-2 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2 !aspect-auto min-h-[200px] md:min-h-[280px]"
                  } else if (i === 3) {
                    gridClasses += " col-span-2 md:col-span-1 lg:col-span-2"
                  }

                  return (
                    <div
                      key={i}
                      className={gridClasses + " cursor-pointer"}
                      onClick={() => setActiveImgIndex(i)}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w780${img.file_path}`}
                        alt={`${tv.name} Backdrop ${i + 1}`}
                        fill
                        sizes={
                          i === 0 ? "(max-width: 768px) 100vw, 50vw" : "33vw"
                        }
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100">
                        <span className="scale-90 rounded-full bg-black/60 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-xs transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                          🔍 View Image
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </>
        )}

        {/* Videos and Clips Section */}
        {tvVideos.length > 0 && (
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
                <TabsList className="flex h-auto max-w-max flex-wrap gap-1 rounded-xl border border-zinc-800 bg-zinc-900/50 p-1">
                  <TabsTrigger
                    value="all"
                    className="cursor-pointer rounded-lg px-3 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground md:text-sm"
                  >
                    All ({tvVideos.length})
                  </TabsTrigger>
                  {tvVideos.some((v) => v.type === "Trailer") && (
                    <TabsTrigger
                      value="trailers"
                      className="cursor-pointer rounded-lg px-3 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground md:text-sm"
                    >
                      Trailers (
                      {tvVideos.filter((v) => v.type === "Trailer").length})
                    </TabsTrigger>
                  )}
                  {tvVideos.some((v) => v.type === "Teaser") && (
                    <TabsTrigger
                      value="teasers"
                      className="cursor-pointer rounded-lg px-3 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground md:text-sm"
                    >
                      Teasers (
                      {tvVideos.filter((v) => v.type === "Teaser").length})
                    </TabsTrigger>
                  )}
                  {tvVideos.some((v) => v.type === "Behind the Scenes") && (
                    <TabsTrigger
                      value="bts"
                      className="cursor-pointer rounded-lg px-3 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground md:text-sm"
                    >
                      Behind the Scenes (
                      {
                        tvVideos.filter((v) => v.type === "Behind the Scenes")
                          .length
                      }
                      )
                    </TabsTrigger>
                  )}
                  {tvVideos.some(
                    (v) => v.type === "Clip" || v.type === "Featurette"
                  ) && (
                    <TabsTrigger
                      value="clips"
                      className="cursor-pointer rounded-lg px-3 py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground md:text-sm"
                    >
                      Clips & Featurettes (
                      {
                        tvVideos.filter(
                          (v) => v.type === "Clip" || v.type === "Featurette"
                        ).length
                      }
                      )
                    </TabsTrigger>
                  )}
                </TabsList>

                {/* Single paginated content layout */}
                <div className="mt-6 space-y-6">
                  {renderVideoGrid(paginatedVideos)}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <Pagination className="pt-2">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (currentPage > 1)
                                setCurrentPage(currentPage - 1)
                            }}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => {
                          const pageNum = i + 1
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                href="#"
                                isActive={currentPage === pageNum}
                                onClick={(e) => {
                                  e.preventDefault()
                                  setCurrentPage(pageNum)
                                }}
                                className="cursor-pointer"
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        })}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (currentPage < totalPages)
                                setCurrentPage(currentPage + 1)
                            }}
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              </Tabs>
            </section>
          </>
        )}

        <Separator className="my-10 border-border" />
        <TvReviewsSection seriesId={tvId} />

        <Separator className="my-10 border-border" />
        <TvRecommendationsSection seriesId={tvId} />

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImgIndex !== null && tvImages?.backdrops && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-xl md:p-10"
              onClick={() => setActiveImgIndex(null)}
            >
              {/* Close backdrop click but don't close when clicking inside container */}
              <div
                className="relative flex w-full max-w-5xl flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex w-full items-center justify-between pb-4 text-white">
                  <div>
                    <h3 className="max-w-[200px] truncate text-lg font-bold md:max-w-md md:text-xl">
                      {tv.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Backdrop {activeImgIndex + 1} of{" "}
                      {Math.min(tvImages.backdrops.length, 6)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 rounded-full border-zinc-700 bg-zinc-900/60 text-white hover:bg-zinc-800"
                      onClick={() => {
                        const img = tvImages.backdrops[activeImgIndex]
                        const url = `https://image.tmdb.org/t/p/original${img.file_path}`
                        const filename = `${tv.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-backdrop-${activeImgIndex + 1}.jpg`
                        fetch(url)
                          .then((response) => response.blob())
                          .then((blob) => {
                            const blobUrl = URL.createObjectURL(blob)
                            const link = document.createElement("a")
                            link.href = blobUrl
                            link.download = filename
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                            URL.revokeObjectURL(blobUrl)
                          })
                          .catch(() => {
                            window.open(url, "_blank")
                          })
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 rounded-full border-zinc-700 bg-zinc-900/60 text-white hover:bg-zinc-800"
                      onClick={() => setActiveImgIndex(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Focal Image */}
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="border-zinc-850 relative aspect-video w-full overflow-hidden rounded-2xl border bg-zinc-950 shadow-2xl"
                >
                  {/* Left / Right navigation buttons */}
                  <div className="absolute top-1/2 left-4 z-20 -translate-y-1/2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10 rounded-full bg-black/40 text-white hover:bg-black/50"
                      onClick={goPrevImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="absolute top-1/2 right-4 z-20 -translate-y-1/2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10 rounded-full bg-black/40 text-white hover:bg-black/50"
                      onClick={goNextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                  <Image
                    src={`https://image.tmdb.org/t/p/original${tvImages.backdrops[activeImgIndex].file_path}`}
                    alt={`${tv.name} Backdrop ${activeImgIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </motion.div>

                {/* Image Navigator */}
                <div className="flex gap-2 pt-6">
                  {tvImages.backdrops.slice(0, 6).map((_, idx) => (
                    <button
                      key={idx}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        activeImgIndex === idx
                          ? "w-5 bg-primary"
                          : "bg-zinc-700 hover:bg-zinc-500"
                      }`}
                      onClick={() => setActiveImgIndex(idx)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Video Modal using Shadcn Dialog */}
        <Dialog
          open={isTrailerOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsTrailerOpen(false)
              setActiveVideoKey(null)
            }
          }}
        >
          <DialogContent className="max-w-4xl overflow-hidden rounded-2xl border-zinc-800 bg-zinc-950 p-0 text-white sm:max-w-4xl">
            <DialogHeader className="border-zinc-850 flex flex-row items-center justify-between border-b bg-zinc-900/60 px-5 py-4">
              <DialogTitle className="truncate pr-8 text-sm font-bold md:text-base">
                {tvVideos.find((v) => v.key === activeVideoKey)?.name ||
                  tv.name}
              </DialogTitle>
            </DialogHeader>
            <div className="relative aspect-video w-full">
              {activeVideoKey && (
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoKey}?autoplay=1&controls=1&rel=0`}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
