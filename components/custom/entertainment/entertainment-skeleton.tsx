export function EntertainmentSkeleton({ count = 12 }: { count?: number }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="aspect-2/3 w-full animate-pulse rounded-xl bg-zinc-800/60"
        />
      ))}
    </>
  )
}

export function HeroSkeleton() {
  return (
    <div className="absolute inset-0 flex items-end">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-end justify-between px-6 pb-10 sm:flex-row">
        <div className="w-full max-w-2xl space-y-4">
          {/* Mode pill */}
          <div className="h-6 w-24 animate-pulse rounded-full bg-zinc-800/60" />

          {/* Title */}
          <div className="h-12 w-3/4 animate-pulse rounded-lg bg-zinc-800/60 sm:h-16" />
          <div className="h-12 w-1/2 animate-pulse rounded-lg bg-zinc-800/60 sm:h-16" />

          {/* Description */}
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full animate-pulse rounded bg-zinc-800/60" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-800/60" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-zinc-800/60" />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center gap-3 pt-2">
            <div className="h-10 w-32 animate-pulse rounded-full bg-zinc-800/60" />
            <div className="h-10 w-28 animate-pulse rounded-full bg-zinc-800/60" />
          </div>
        </div>

        {/* Pagination arrows */}
        <div className="mt-6 flex flex-col items-end gap-3 sm:mt-0">
          <div className="flex gap-2">
            <div className="h-2 w-8 animate-pulse rounded-full bg-zinc-800/60" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-zinc-800/60" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-zinc-800/60" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-zinc-800/60" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-zinc-800/60" />
          </div>
          <div className="flex gap-3">
            <div className="h-11 w-11 animate-pulse rounded-full bg-zinc-800/60" />
            <div className="h-11 w-11 animate-pulse rounded-full bg-zinc-800/60" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function FilterBarSkeleton() {
  return (
    <div className="sticky top-0 z-30 border-b border-zinc-800/60 bg-background/80 backdrop-blur-xl pointer-events-none">
      <div className="mx-auto max-w-7xl px-6 py-4">
        {/* Row 1: Mode toggle + Search */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Mode toggle skeleton */}
            <div className="h-8 w-[168px] animate-pulse rounded-full bg-zinc-800/60" />
            {/* Search hint skeleton */}
            <div className="hidden h-4 w-48 animate-pulse rounded bg-zinc-800/60 sm:block" />
          </div>

          {/* Search bar skeleton */}
          <div className="h-9 w-full animate-pulse rounded-full bg-zinc-800/60 sm:max-w-xs" />
        </div>

        {/* Row 2: Category tabs */}
        <div className="mt-3 flex items-center gap-1">
          <div className="hidden flex-wrap gap-2 md:flex">
            {["w-24", "w-32", "w-28", "w-24", "w-36", "w-28"].map((w, i) => (
              <div key={i} className={`h-7 ${w} animate-pulse rounded-full bg-zinc-800/60`} />
            ))}
          </div>
          {/* Mobile toggle skeleton */}
          <div className="flex md:hidden">
            <div className="h-6 w-16 animate-pulse rounded bg-zinc-800/60" />
          </div>
        </div>
      </div>
    </div>
  )
}
