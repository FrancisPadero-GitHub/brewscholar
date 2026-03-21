import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-20 text-center">
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-[#FFD700]">
          <span className="inline-block h-1 w-10 rounded-full bg-[#FFD700]" />
          Missing Page
          <span className="inline-block h-1 w-10 rounded-full bg-[#FFD700]" />
        </div>
        <h1 className="text-5xl font-semibold">404</h1>
        <p className="text-lg text-gray-300">
          We could not find the page you are looking for. Check the URL or head
          back to the start.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-3 font-semibold text-[#1E1E1E] transition hover:bg-[#E6C200]"
        >
          <ArrowLeft className="h-4 w-4" />
          Return Home
        </Link>
      </div>
    </main>
  );
}
