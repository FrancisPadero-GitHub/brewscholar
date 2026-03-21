const skeletonCard = Array.from({ length: 4 });

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="animate-pulse space-y-10">
          <div className="h-10 w-64 rounded bg-[#2A2A2A]" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skeletonCard.map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#2F2F2F] bg-[#242424] p-6 space-y-4"
              >
                <div className="mx-auto h-12 w-12 rounded-xl bg-[#303030]" />
                <div className="h-6 w-3/4 rounded bg-[#303030]" />
                <div className="h-4 w-full rounded bg-[#303030]" />
                <div className="h-10 w-full rounded bg-[#3A3A3A]" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#2F2F2F] bg-[#242424] p-6"
              >
                <div className="h-8 w-1/3 rounded bg-[#303030]" />
                <div className="mt-4 h-4 w-1/2 rounded bg-[#303030]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
