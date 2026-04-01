"use client"

import React, { useEffect, useState } from "react"
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
  route?: string // Default route if none is provided
  onPageChange?: (page: number) => void
}

export default function PaginationControls({
  currentPage,
  totalPages,
  route = "/entertainment/movies", // Default route if none is provided
  onPageChange,
}: PaginationProps) {
  // Helper to construct the URL string
  const createPageUrl = (pageNumber: number) => {
    return `${route}?page=${pageNumber}`
  }

  const handlePageChange = (e: React.MouseEvent, pageNumber: number) => {
    if (onPageChange) {
      e.preventDefault()
      onPageChange(pageNumber)
    }
  }

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 425)
    updateIsMobile()
    window.addEventListener("resize", updateIsMobile)
    return () => window.removeEventListener("resize", updateIsMobile)
  }, [])

  // Disable 'Next' if we hit the total pages, or default to false if totalPages is unknown
  const isNextDisabled = totalPages ? currentPage >= totalPages : false
  const isPrevDisabled = currentPage <= 1

  // Algorithm to determine which page numbers and ellipses to show
  const getVisiblePages = () => {
    if (!totalPages) return []

    // Use compact pagination on mobile
    if (isMobile && totalPages > 5) {
      if (currentPage <= 3) {
        return [1, 2, 3, 4, "...", totalPages]
      }
      if (currentPage >= totalPages - 2) {
        return [1, "...", totalPages - 1, totalPages]
      }
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        ,
        "...",
        totalPages,
      ]
    }

    // If there are 7 or fewer pages, just show all of them
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Regular pagination for larger screens
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages]
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ]
  }

  const visiblePages = getVisiblePages()

  return (
    <Pagination className="mt-10 text-xs sm:text-sm">
      <PaginationContent className="flex-wrap justify-center gap-1 sm:gap-1">
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            size="default"
            href={isPrevDisabled ? "#" : createPageUrl(currentPage - 1)}
            onClick={(e) => {
              if (isPrevDisabled) e.preventDefault()
              else handlePageChange(e, currentPage - 1)
            }}
            aria-disabled={isPrevDisabled}
            className={
              isPrevDisabled
                ? "pointer-events-none opacity-50"
                : "cursor-pointer transition-all hover:text-primary"
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
                  onClick={(e) => handlePageChange(e, page as number)}
                  isActive={currentPage === page}
                  size={isMobile ? "icon-xs" : "sm"}
                  className={
                    currentPage === page
                      ? "pointer-events-none"
                      : "cursor-pointer transition-all hover:text-primary"
                  }
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
            size="default"
            href={isNextDisabled ? "#" : createPageUrl(currentPage + 1)}
            onClick={(e) => {
              if (isNextDisabled) e.preventDefault()
              else handlePageChange(e, currentPage + 1)
            }}
            aria-disabled={isNextDisabled}
            className={
              isNextDisabled
                ? "pointer-events-none opacity-50"
                : "cursor-pointer transition-all hover:text-primary"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
