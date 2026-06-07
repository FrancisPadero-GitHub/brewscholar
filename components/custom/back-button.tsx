"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      aria-label="Go back"
      className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 hover:bg-white/20"
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  )
}
