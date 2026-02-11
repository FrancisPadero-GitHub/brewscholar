// components/PaginationControls.tsx
"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  route?: string;
}

export default function PaginationControls({
  currentPage,
  route = "/entertainment/movies",
}: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    // Navigate to the new URL with the page query param
    router.push(`${route}?page=${newPage}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <button
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded hover:border-[#FFD700] disabled:opacity-50 disabled:hover:border-[#3A3A3A] text-white font-medium transition-all duration-300"
      >
        Previous
      </button>

      <span className="text-white font-medium">Page {currentPage}</span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 bg-[#FFD700] text-[#1E1E1E] rounded hover:bg-[#E6C200] font-semibold transition-all duration-300"
      >
        Next
      </button>
    </div>
  );
}
