"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="mx-auto flex max-w-lg flex-col items-center gap-6 px-6 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Something went wrong</h1>
          <p className="text-muted-foreground">
            We hit an unexpected error while loading this page. You can retry or head back to the landing page.
          </p>
        </div>
        
        {error.digest && (
          <p className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-md font-mono break-all text-left">
            Error digest: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-6">
          <Button
            onClick={reset}
            size="lg"
            className="w-full sm:w-auto gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto gap-2"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Back Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
