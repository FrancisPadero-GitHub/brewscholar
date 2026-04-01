"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <body className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6 px-6 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
            <AlertTriangle className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              BrewScholar is having trouble
            </h1>
            <p className="text-muted-foreground">
              A fatal error occurred. Try reloading the app or come back in a moment.
            </p>
          </div>
          {error.digest && (
            <p className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-md font-mono break-all text-left">
              Error digest: {error.digest}
            </p>
          )}
          <Button
            onClick={reset}
            size="lg"
            className="mt-6 gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reload App
          </Button>
        </div>
      </body>
    </html>
  );
}
