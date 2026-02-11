"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to help trace unexpected failures in the client boundary.
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2A2A2A] text-[#FFD700]">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="text-gray-300">
          We hit an unexpected error while loading this page. You can retry or
          head back to the landing page.
        </p>
        {error?.digest && (
          <p className="text-xs text-gray-500">Error digest: {error.digest}</p>
        )}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-3 font-semibold text-[#1E1E1E] transition hover:bg-[#E6C200]"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-[#3A3A3A] px-4 py-3 font-semibold text-white transition hover:border-[#FFD700]"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
