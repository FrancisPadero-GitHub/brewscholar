import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Star,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react"

// hooks
import { useFetchTvReviews } from "@/hooks/entertainment/fetch/tv-series/useFetchTvReviews"

// components
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// helper
import { getRatingColor } from "@/helpers/entertainment/movie-details/movie-details"
import type { TvReview } from "@/types/entertainment/tv-series/tv-reviews"

// Helper for Initials
const getInitials = (name: string) => {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return parts[0].slice(0, 2).toUpperCase()
}

// Helper for initials fallback bg
const getAvatarBg = (name: string) => {
  const colors = [
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/35",
    "bg-amber-500/15 text-amber-400 border-amber-500/35",
    "bg-rose-500/15 text-rose-400 border-rose-500/35",
    "bg-sky-500/15 text-sky-400 border-sky-500/35",
    "bg-indigo-500/15 text-indigo-400 border-indigo-500/35",
    "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/35",
    "bg-orange-500/15 text-orange-400 border-orange-500/35",
    "bg-teal-500/15 text-teal-400 border-teal-500/35",
  ]
  const charCodeSum = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[charCodeSum % colors.length]
}

// Helper for Date Formatting
const formatDate = (dateStr: string) => {
  if (!dateStr) return ""
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch (e) {
    console.warn("Error date formatting in tv-reviews", e)
    return dateStr
  }
}

interface ReviewContentProps {
  content: string
  author: string
  displayName: string
  avatarUrl: string
  initials: string
  fallbackBg: string
  username: string
  createdAt: string
  rating: number | null
  ratingColor: string
}

// Sub-component for individual review text body expansion with shadcn Dialog
function ReviewContent({
  content,
  // author,
  displayName,
  avatarUrl,
  initials,
  fallbackBg,
  username,
  createdAt,
  rating,
  ratingColor,
}: ReviewContentProps) {
  const isLong = content.length > 180
  const displayedContent = isLong ? `${content.substring(0, 180)}...` : content

  return (
    <div className="relative mt-3">
      <div className="line-clamp-3 text-sm/relaxed text-muted-foreground">
        <p className="whitespace-pre-line">{displayedContent}</p>
      </div>

      {isLong && (
        <div className="mt-3 flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1 px-2.5 text-xs text-primary/95 hover:bg-primary/10 hover:text-primary"
              >
                Read More <ChevronDown className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xl sm:max-w-xl md:max-w-2xl">
              <DialogHeader className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-xs font-bold select-none ${
                        avatarUrl ? "border-border/60 bg-muted" : fallbackBg
                      }`}
                    >
                      {avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={avatarUrl}
                          alt={displayName}
                          className="h-full w-full rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none"
                            e.currentTarget.parentElement?.classList.add(
                              ...fallbackBg.split(" ")
                            )
                            const span = document.createElement("span")
                            span.innerText = initials
                            e.currentTarget.parentElement?.appendChild(span)
                          }}
                        />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>

                    <div className="space-y-0.5 text-left">
                      <DialogTitle className="text-base font-bold text-foreground">
                        {displayName}
                      </DialogTitle>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>@{username}</span>
                        <span>•</span>
                        <span>{formatDate(createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  {rating !== null && (
                    <Badge
                      variant="outline"
                      className={`self-start border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-bold ${ratingColor} sm:self-center`}
                    >
                      <Star className="mr-1 h-3.5 w-3.5 fill-current" />
                      {rating}
                      <span className="ml-0.5 text-[10px] font-normal text-muted-foreground">
                        / 10
                      </span>
                    </Badge>
                  )}
                </div>
              </DialogHeader>

              {/* Scrollable full content */}
              <div className="scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent mt-2 max-h-[50vh] overflow-y-auto pr-2 text-left text-sm/relaxed whitespace-pre-line text-muted-foreground">
                <DialogDescription className="sr-only">
                  Full review by {displayName}
                </DialogDescription>
                {content}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}

// Individual Review Card Component
function ReviewCard({ review }: { review: TvReview }) {
  const { author, author_details, created_at, content } = review
  const rating = author_details.rating
  const displayName = author_details.name || author
  const initials = getInitials(displayName)
  const fallbackBg = getAvatarBg(displayName)

  // Resolve avatar URL safely
  let avatarUrl = ""
  if (author_details.avatar_path) {
    const path = author_details.avatar_path
    if (path.startsWith("/http")) {
      avatarUrl = path.substring(1)
    } else if (path.startsWith("http")) {
      avatarUrl = path
    } else {
      avatarUrl = `https://image.tmdb.org/t/p/w150_and_h150_face${path}`
    }
  }

  const ratingColor = rating ? getRatingColor(rating) : "text-muted-foreground"

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0 },
      }}
      className="group hover:bg-primary/0.01 relative overflow-hidden rounded-xl border border-border/50 bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Author details */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-bold select-none ${
              avatarUrl ? "border-border/60 bg-muted" : fallbackBg
            }`}
          >
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-full w-full rounded-full object-cover"
                onError={(e) => {
                  // If image fails to load, clear it so fallback initials render
                  e.currentTarget.style.display = "none"
                  e.currentTarget.parentElement?.classList.add(
                    ...fallbackBg.split(" ")
                  )
                  const span = document.createElement("span")
                  span.innerText = initials
                  e.currentTarget.parentElement?.appendChild(span)
                }}
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
              {displayName}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>@{author_details.username}</span>
              <span>•</span>
              <span>{formatDate(created_at)}</span>
            </div>
          </div>
        </div>

        {/* Rating badge */}
        {rating !== null && (
          <Badge
            variant="outline"
            className={`self-start border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-bold ${ratingColor} sm:self-center`}
          >
            <Star className="mr-1 h-3.5 w-3.5 fill-current" />
            {rating}
            <span className="ml-0.5 text-[10px] font-normal text-muted-foreground">
              / 10
            </span>
          </Badge>
        )}
      </div>

      {/* Review content */}
      <ReviewContent
        content={content}
        author={author}
        displayName={displayName}
        avatarUrl={avatarUrl}
        initials={initials}
        fallbackBg={fallbackBg}
        username={author_details.username}
        createdAt={created_at}
        rating={rating}
        ratingColor={ratingColor}
      />
    </motion.div>
  )
}

// Main Reviews Component
export default function TvReviewsSection({ seriesId }: { seriesId: string }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const globalStartIndex = (currentPage - 1) * itemsPerPage
  const tmdbPage = Math.floor(globalStartIndex / 20) + 1

  const { data, isFetching, isError } = useFetchTvReviews(seriesId, tmdbPage)

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-5 text-center text-sm text-destructive">
        Failed to load reviews. Please reload and try again.
      </div>
    )
  }

  const reviews = data?.results ?? []
  const totalResults = data?.total_results ?? 0
  const totalDisplayPages = Math.ceil(totalResults / itemsPerPage)

  // Extract the reviews for the current sub-page
  const localStartIndex = globalStartIndex - (tmdbPage - 1) * 20
  const localEndIndex = localStartIndex + itemsPerPage
  const displayedReviews = reviews.slice(localStartIndex, localEndIndex)

  // If loading and displayedReviews is empty, show full skeleton loader
  const showSkeleton = isFetching && displayedReviews.length === 0

  if (!showSkeleton && displayedReviews.length === 0 && reviews.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
          <MessageSquare className="h-4 w-4" />
          Reviews
        </h2>
        <div className="rounded-2xl border border-dashed border-border/80 bg-zinc-950/20 p-8 text-center text-muted-foreground md:p-12">
          <MessageSquare className="mx-auto mb-3 h-8 w-8 text-muted-foreground/60" />
          <p className="text-sm font-medium">
            No reviews found for this series.
          </p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Be the first to share your thoughts on this content!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      {/* Header and pagination controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase sm:text-sm">
          <MessageSquare className="h-4 w-4" />
          Reviews
          {totalResults > 0 && (
            <Badge className="ml-1 border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
              {totalResults.toLocaleString()}
            </Badge>
          )}
        </h2>

        {totalDisplayPages > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground tabular-nums">
              Page {currentPage} / {totalDisplayPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 border-border/60 hover:border-primary hover:text-primary disabled:opacity-50"
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1))
                // Smooth scroll to top of section
                document
                  .getElementById("tv-reviews-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }}
              disabled={currentPage <= 1 || isFetching}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 border-border/60 hover:border-primary hover:text-primary disabled:opacity-50"
              onClick={() => {
                setCurrentPage((p) => Math.min(totalDisplayPages, p + 1))
                // Smooth scroll to top of section
                document
                  .getElementById("tv-reviews-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }}
              disabled={currentPage >= totalDisplayPages || isFetching}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div id="tv-reviews-section" className="relative scroll-mt-24">
        {showSkeleton ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-border/50 bg-card p-4">
                <CardContent className="space-y-3 p-0">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28 rounded" />
                      <Skeleton className="h-3 w-40 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <Skeleton className="h-3 w-full rounded" />
                    <Skeleton className="h-3 w-4/5 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {displayedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Bottom pagination controls */}
      {!showSkeleton && totalDisplayPages > 1 && (
        <div className="flex items-center justify-end gap-2 pt-2">
          <span className="text-xs text-muted-foreground tabular-nums">
            Page {currentPage} / {totalDisplayPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 border-border/60 hover:border-primary hover:text-primary disabled:opacity-50"
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1))
              // Smooth scroll to top of section
              document
                .getElementById("tv-reviews-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }}
            disabled={currentPage <= 1 || isFetching}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 border-border/60 hover:border-primary hover:text-primary disabled:opacity-50"
            onClick={() => {
              setCurrentPage((p) => Math.min(totalDisplayPages, p + 1))
              // Smooth scroll to top of section
              document
                .getElementById("tv-reviews-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }}
            disabled={currentPage >= totalDisplayPages || isFetching}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  )
}
