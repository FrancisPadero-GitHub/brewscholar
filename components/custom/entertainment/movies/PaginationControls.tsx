// components/PaginationControls.tsx
"use client"

import { useRouter } from "next/navigation"

interface PaginationProps {
  currentPage: number
  route?: string
}

export default function PaginationControls({
  currentPage,
  route = "/entertainment/movies",
}: PaginationProps) {
  const router = useRouter()

  const handlePageChange = (newPage: number) => {
    // Navigate to the new URL with the page query param
    router.push(`${route}?page=${newPage}`)
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="rounded border border-border bg-card px-4 py-2 font-medium text-foreground transition-all duration-300 hover:border-primary disabled:opacity-50 disabled:hover:border-border"
      >
        Previous
      </button>

      <span className="font-medium text-foreground">Page {currentPage}</span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="rounded bg-primary px-4 py-2 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90"
      >
        Next
      </button>
    </div>
  )
}
