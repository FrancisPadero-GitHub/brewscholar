// Skeleton loader — matches the cinematic detail page layout
export function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero backdrop skeleton */}
      <div className="relative h-[58vh] w-full overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 animate-pulse bg-zinc-800/40" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent" />

        {/* Back button skeleton */}
        <div className="absolute top-6 left-6">
          <div className="h-8 w-20 animate-pulse rounded-full bg-zinc-800/60" />
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-6 pb-24">
        {/* Poster + Title row */}
        <div className="-mt-44 flex flex-col items-start gap-8 md:flex-row md:items-end">
          {/* Poster skeleton */}
          <div className="relative z-10 h-64 w-44 shrink-0 animate-pulse overflow-hidden rounded-xl bg-zinc-800/60 md:h-80 md:w-56" />

          {/* Title block skeleton */}
          <div className="z-10 flex-1 space-y-4 pb-2">
            {/* Genre badges */}
            <div className="flex gap-2">
              <div className="h-6 w-16 animate-pulse rounded-full bg-zinc-800/60" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-zinc-800/60" />
              <div className="h-6 w-14 animate-pulse rounded-full bg-zinc-800/60" />
            </div>

            {/* Title */}
            <div className="h-10 w-3/4 animate-pulse rounded-lg bg-zinc-800/60 md:h-14" />

            {/* Tagline */}
            <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-800/60" />

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="h-5 w-16 animate-pulse rounded bg-zinc-800/60" />
              <div className="h-5 w-20 animate-pulse rounded bg-zinc-800/60" />
              <div className="h-5 w-14 animate-pulse rounded bg-zinc-800/60" />
              <div className="h-5 w-12 animate-pulse rounded bg-zinc-800/60" />
              <div className="h-5 w-18 animate-pulse rounded-full bg-zinc-800/60" />
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-9 w-28 animate-pulse rounded-full bg-zinc-800/60" />
              <div className="h-9 w-32 animate-pulse rounded-full bg-zinc-800/60" />
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="my-10 h-px w-full animate-pulse bg-zinc-800/40" />

        {/* Details grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Overview section */}
            <div className="space-y-3">
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-800/60" />
              <div className="h-4 w-full animate-pulse rounded bg-zinc-800/60" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-800/60" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-zinc-800/60" />
            </div>

            {/* Stats section */}
            <div className="space-y-3">
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-800/60" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 animate-pulse rounded-lg bg-zinc-800/60"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-6">
            <div className="animate-pulse space-y-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5">
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-800/60" />
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-3 w-20 animate-pulse rounded bg-zinc-800/60" />
                    <div className="h-4 w-32 animate-pulse rounded bg-zinc-800/60" />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-10 w-full animate-pulse rounded-lg bg-zinc-800/60" />
          </aside>
        </div>
      </div>
    </div>
  )
}
