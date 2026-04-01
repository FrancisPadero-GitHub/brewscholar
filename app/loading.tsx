import { Skeleton } from "@/components/ui/skeleton";

const skeletonCard = Array.from({ length: 4 });

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-10">
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skeletonCard.map((_, index) => (
              <div
                key={index}
                className="rounded-xl border bg-card p-6 space-y-4"
              >
                <Skeleton className="mx-auto h-12 w-12 rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border bg-card p-6"
              >
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="mt-4 h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
