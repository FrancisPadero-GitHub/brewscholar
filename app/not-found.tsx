import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="mx-auto flex max-w-lg flex-col items-center gap-6 px-6 py-20 text-center">
        <div className="flex items-center gap-3 text-sm uppercase tracking-widest text-primary font-medium">
          <span className="inline-block h-1 w-10 rounded-full bg-primary" />
          Missing Page
          <span className="inline-block h-1 w-10 rounded-full bg-primary" />
        </div>
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Page not found</h2>
          <p className="text-muted-foreground">
            We couldn&apos;t find the page you are looking for. It might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <Button asChild className="mt-4 gap-2" size="lg">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
