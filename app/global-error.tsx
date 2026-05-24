"use client"

import { useEffect } from "react"
import { AlertTriangle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Keep a console log for global crashes to aid debugging in dev.
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6 px-6 py-20 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              BrewScholar is having trouble
            </h1>
            <p className="text-muted-foreground">
              A fatal error occurred. Try reloading the app or come back in a
              moment.
            </p>
          </div>
          {error.digest && (
            <p className="rounded-md bg-muted px-3 py-2 text-left font-mono text-xs break-all text-muted-foreground">
              Error digest: {error.digest}
            </p>
          )}
          <Button onClick={reset} size="lg" className="mt-6 gap-2">
            <RotateCcw className="h-4 w-4" />
            Reload App
          </Button>
        </div>
      </body>
    </html>
  )
}
