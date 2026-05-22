"use client"

import Link from "next/link"
import { ExternalLink, ShieldCheck, Cpu } from "lucide-react"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const apis = [
    {
      name: "TMDb API",
      type: "Metadata Catalog",
      url: "https://www.themoviedb.org",
      description:
        "Provides full metadata catalog, posters, ratings, and details for movies & TV series.",
    },
    {
      name: "VidLink Pro (Player 1)",
      type: "Streaming Player API",
      url: "https://vidlink.pro",
      description:
        "Primary high-performance HTML5 embed player with automatic playback state restoration.",
    },
    {
      name: "VidSrc Me (Player 2)",
      type: "Streaming Player API",
      url: "https://vidsrc.me",
      description:
        "Legacy stable streaming resource serving extensive high-definition content streams.",
    },
    {
      name: "VidKing Net (Player 3)",
      type: "Streaming Player API",
      url: "https://vidking.net",
      description:
        "Backup streaming API provider optimized for rapid loading of video content.",
    },
    {
      name: "SuperEmbed (Player 4)",
      type: "Streaming Player API",
      url: "https://superembed.cc",
      description:
        "Multi-server player embed offering adaptive bitrate streaming buffers.",
    },
    {
      name: "2Embed (Player 5)",
      type: "Streaming Player API",
      url: "https://2embed.cc",
      description:
        "Popular cloud-based alternative player offering cross-origin video sources.",
    },
  ]

  return (
    <footer className="relative z-20 border-t border-border/40 bg-zinc-950 py-10 text-zinc-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo & Description */}
          <div className="space-y-2 text-center md:text-left">
            <Link
              href="/entertainment"
              className="flex items-center justify-center gap-2 md:justify-start"
            >
              <span className="text-xl font-black tracking-tight text-white">
                Movie<span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="max-w-md text-xs leading-relaxed text-zinc-500">
              Discover and browse millions of movies and shows. The metadata
              catalog is fully powered by{" "}
              <span className="font-semibold text-zinc-300">TMDb</span>.
              MovieHub does not host or upload any media content; video playback
              is facilitated via public third-party player APIs.
            </p>
          </div>

          {/* Interactive Hover API Section */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">
                Metadata & Video Playback:
              </span>

              <HoverCard openDelay={200} closeDelay={200}>
                <HoverCardTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1.5 rounded-full border-zinc-800 bg-zinc-900/60 px-4 text-xs font-semibold text-zinc-200 transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
                  >
                    <Cpu className="h-3.5 w-3.5" />
                    Supported APIs
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                  </Button>
                </HoverCardTrigger>

                <HoverCardContent
                  className="w-80 border-zinc-800/80 bg-zinc-950 p-4 shadow-xl shadow-black/40"
                  align="end"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                      <Cpu className="h-4 w-4 text-primary" />
                      <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                        Integrations & Player APIs
                      </h4>
                    </div>

                    <div className="scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent max-h-[300px] space-y-2.5 overflow-y-auto pr-1">
                      {apis.map((api) => (
                        <div
                          key={api.name}
                          className="group flex flex-col gap-0.5 rounded-md p-1.5 transition-colors hover:bg-zinc-900/40"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-200 transition-colors group-hover:text-primary">
                              {api.name}
                            </span>
                            <span className="rounded-full bg-zinc-800/80 px-2 py-0.5 text-[9px] font-medium text-zinc-400">
                              {api.type}
                            </span>
                          </div>
                          <p className="text-[10px] leading-normal text-zinc-500">
                            {api.description}
                          </p>
                          <a
                            href={api.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-0.5 flex items-center gap-0.5 self-start text-[9px] font-semibold text-zinc-400 transition-colors hover:text-white"
                          >
                            {api.url.replace("https://", "")}
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-zinc-600">
              <ShieldCheck className="h-3 w-3 text-emerald-500/70" />
              <span>Compliant with open streaming interface specs</span>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/20 pt-6 text-[11px] text-zinc-600 sm:flex-row">
          <p>© {currentYear} MovieHub. Powered by Next.js and Tailwind CSS.</p>
          <div className="flex gap-4">
            <Link href="/" className="transition-colors hover:text-zinc-400">
              Home
            </Link>
            <Link
              href="/entertainment"
              className="transition-colors hover:text-zinc-400"
            >
              Movie Hub
            </Link>
            <span className="text-zinc-800">|</span>
            <span className="cursor-default select-none">
              API Status: Online (most of the time)
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
