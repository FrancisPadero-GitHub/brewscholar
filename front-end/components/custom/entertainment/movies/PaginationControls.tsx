// components/PaginationControls.tsx
"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
}

export default function PaginationControls({ currentPage }: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    // Navigate to the new URL with the page query param
    router.push(`/entertainment/movies?page=${newPage}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <button
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-white font-medium">Page {currentPage}</span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
      >
        Next
      </button>
    </div>
  );
}
