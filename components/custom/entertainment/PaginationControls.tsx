"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number
  totalPages?: number // Required for the advanced ellipsis layout
  route?: string
}

export default function PaginationControls({
  currentPage,
  totalPages,
  route = "/entertainment/movies", // Default route if none is provided
}: PaginationProps) {
  // Helper to construct the URL string
  const createPageUrl = (pageNumber: number) => {
    return `${route}?page=${pageNumber}`
  }

  // Disable 'Next' if we hit the total pages, or default to false if totalPages is unknown
  const isNextDisabled = totalPages ? currentPage >= totalPages : false
  const isPrevDisabled = currentPage <= 1

  // Algorithm to determine which page numbers and ellipses to show
  const getVisiblePages = () => {
    // If we don't know the total pages, we can't build the advanced layout
    if (!totalPages) return []

    // If there are 7 or fewer pages, just show all of them (e.g., 1 2 3 4 5 6 7)
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // If we are near the beginning (e.g., 1 2 3 4 5 ... 20)
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages]
    }

    // If we are near the end (e.g., 1 ... 16 17 18 19 20)
    if (currentPage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    // If we are in the middle (e.g., 1 ... 8 9 10 ... 20)
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
  }

  const visiblePages = getVisiblePages()

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={isPrevDisabled ? "#" : createPageUrl(currentPage - 1)}
            aria-disabled={isPrevDisabled}
            className={
              isPrevDisabled
                ? "pointer-events-none opacity-50"
                : "transition-all hover:text-primary"
            }
          />
        </PaginationItem>

        {/* Page Numbers & Ellipses */}
        {totalPages ? (
          visiblePages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={createPageUrl(page as number)}
                  isActive={currentPage === page}
                  className={currentPage === page ? "pointer-events-none" : "transition-all hover:text-primary"}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))
        ) : (
          /* Fallback view if totalPages is not provided */
          <PaginationItem>
            <PaginationLink href="#" isActive className="pointer-events-none">
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={isNextDisabled ? "#" : createPageUrl(currentPage + 1)}
            aria-disabled={isNextDisabled}
            className={
              isNextDisabled
                ? "pointer-events-none opacity-50"
                : "transition-all hover:text-primary"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}