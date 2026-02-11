"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep a console log for global crashes to aid debugging in dev.
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#1E1E1E] text-white">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2A2A2A] text-[#FFD700]">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-semibold">
            BrewScholar is having trouble
          </h1>
          <p className="text-gray-300">
            A fatal error occurred. Try reloading the app or come back in a
            moment.
          </p>
          {error?.digest && (
            <p className="text-xs text-gray-500">
              Error digest: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-3 font-semibold text-[#1E1E1E] transition hover:bg-[#E6C200]"
          >
            <RotateCcw className="h-4 w-4" />
            Reload App
          </button>
        </div>
      </body>
    </html>
  );
}
