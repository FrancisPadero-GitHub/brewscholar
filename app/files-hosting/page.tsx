"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function FilesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <style>{`
        .uc-card{
          position:relative;
          width:100%;
          max-width:880px;
          margin: 0 auto;
          padding:3rem 2.5rem;
          border-radius:1rem;
          text-align:center;
          color:var(--color-foreground);
          background: linear-gradient(270deg, var(--color-card), var(--color-primary), var(--color-accent));
          background-size:600% 600%;
          animation:gradientShift 8s linear infinite;
          box-shadow:var(--shadow-lg);
        }
        @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .uc-title{font-size:clamp(2rem,4vw,3rem);font-weight:700;margin-bottom:0.5rem}
        .uc-sub{opacity:0.92;margin-bottom:1rem}
        .bounce{display:inline-block;animation:bounce 2s infinite}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .uc-back{position:absolute;left:1rem;top:1rem}
      `}</style>
      
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 h-96 bg-linear-to-b from-card to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="mb-12 text-center">
            <div className="relative mx-auto mb-6 h-40 w-40">
              {/* Show the logo with the foreground color in both light and dark modes */}
              <Image
                src="/brewscholar_light_mode.png"
                alt="BrewScholar Logo Light"
                fill
                className="block object-contain text-foreground filter dark:hidden"
                sizes="160"
              />
              <Image
                src="/brewscholar_dark_mode.png"
                alt="BrewScholar Logo Dark"
                fill
                className="hidden object-contain text-foreground filter dark:block"
                sizes="160"
              />
            </div>

            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Pour over opportunities and brew up your brightest future with
              BrewScholar
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-20">
        <div className="uc-card">
          <div className="uc-back">
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="uc-title">Coming Soon</div>
          <div className="uc-sub">This area is being prepared — stay tuned.</div>
          <div className="bounce text-sm text-white/90">
            We&apos;ll be live shortly 🚀
          </div>
        </div>
      </div>
    </div>
  )
}
