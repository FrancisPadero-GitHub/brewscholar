import { Skeleton } from "@/components/ui/skeleton"
// Skeleton loader
export function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Backdrop skeleton */}
      <Skeleton className="h-[55vh] w-full" />

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="-mt-40 flex flex-col gap-8 md:flex-row md:items-end">
          <Skeleton className="h-72 w-48 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-4 pb-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
