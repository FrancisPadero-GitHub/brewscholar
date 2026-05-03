import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugifySegment(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function buildMovieDetailsPath(
  id: number | string,
  title?: string | null
) {
  const base = `/entertainment/movie-details/${id}`
  const slug = title ? slugifySegment(title) : ""
  return slug ? `${base}-${slug}` : base
}

export function buildTvDetailsPath(id: number | string, name?: string | null) {
  const base = `/entertainment/tv-series-details/${id}`
  const slug = name ? slugifySegment(name) : ""
  return slug ? `${base}-${slug}` : base
}

export function buildWatchMoviePath(
  id: number | string,
  title?: string | null
) {
  const base = `/entertainment/watch-movie/${id}`
  const slug = title ? slugifySegment(title) : ""
  return slug ? `${base}-${slug}` : base
}

export function buildWatchTvPath(id: number | string, name?: string | null) {
  const base = `/entertainment/watch-tv/${id}`
  const slug = name ? slugifySegment(name) : ""
  return slug ? `${base}-${slug}` : base
}
