"use client"

import React, { useState, useSyncExternalStore } from "react"
import { Share2, Link2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ShareSection() {
  const [copied, setCopied] = useState(false)
  const shareUrl = useSyncExternalStore(
    () => () => {},
    () => (typeof window !== "undefined" ? window.location.href : ""),
    () => ""
  )
  const hasNativeShare = useSyncExternalStore(
    () => () => {},
    () => typeof navigator !== "undefined" && "share" in navigator,
    () => false
  )

  const handleCopy = async () => {
    try {
      const urlToCopy = shareUrl || "https://brewscholar.com/entertainment"
      await navigator.clipboard.writeText(urlToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL to clipboard", err)
    }
  }

  const handleNativeShare = async () => {
    if (hasNativeShare) {
      try {
        await navigator.share({
          title: "BrewScholar Movie Hub",
          text: "Enjoying BrewScholar Movie Hub? Check it out!",
          url: shareUrl || "https://brewscholar.com/entertainment",
        })
      } catch (err) {
        console.warn("Error sharing:", err)
      }
    } else {
      void handleCopy()
    }
  }

  const shareText = encodeURIComponent(
    "Enjoying BrewScholar Movie Hub? Check it out!"
  )
  const encodedUrl = encodeURIComponent(
    shareUrl || "https://brewscholar.com/entertainment"
  )

  const socials = [
    {
      name: "X (Twitter)",
      color:
        "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
      borderColor: "hover:border-zinc-500",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      color: "hover:bg-[#1877F2] hover:text-white",
      borderColor: "hover:border-[#1877F2]/50",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      color: "hover:bg-[#25D366] hover:text-white",
      borderColor: "hover:border-[#25D366]/50",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: `https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}`,
    },
    {
      name: "Reddit",
      color: "hover:bg-[#FF4500] hover:text-white",
      borderColor: "hover:border-[#FF4500]/50",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.75-1.64-5.99-1.72l1.23-3.87 4 1.05c-.02.31.22.58.53.58 1.1 0 2-.9 2-2s-.9-2-2-2c-.93 0-1.7.64-1.92 1.51l-4.52-1.18c-.28-.08-.57.08-.66.36l-1.5 4.73c-2.31.06-4.5.71-6.17 1.73-.56-.76-1.46-1.24-2.42-1.24-1.65 0-3 1.35-3 3 0 1.12.62 2.1 1.56 2.62-.03.26-.06.52-.06.78 0 3.86 4.7 7 10.5 7s10.5-3.14 10.5-7c0-.26-.03-.52-.06-.78.94-.52 1.56-1.5 1.56-2.62zm-18 1c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm11.5 4.5c-1.8 1.8-5.2 1.8-7 0-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0 1.4 1.4 4.2 1.4 5.6 0 .2-.2.5-.2.7 0 .2.2.2.5 0 .7zm-2.5-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      ),
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${shareText}`,
    },
  ]

  return (
    <section className="relative mt-16 overflow-hidden rounded-2xl border border-border/40 bg-linear-to-b from-card/85 to-card/50 p-6 shadow-2xl shadow-black/10 backdrop-blur-md md:p-8">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-primary/5 blur-[80px]" />

      <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-bold tracking-tight text-white md:text-xl">
            Enjoying BrewScholar <span className="text-foreground">Movie</span>
            <span className="text-primary">Hub</span>?
          </h3>
          <p className="max-w-md text-xs text-zinc-400 md:text-sm">
            Share this hub with your friends and explore trending movies and
            series together!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Quick Copy Link Button */}
          <Button
            variant="outline"
            onClick={() => {
              void handleCopy()
            }}
            className={cn(
              "h-10 gap-2 rounded-full border-zinc-800 bg-zinc-900/60 px-5 text-xs font-semibold text-zinc-200 transition-all select-none",
              copied
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
                : "hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
            )}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 animate-in duration-200 zoom-in-50 fade-in" />
                Copied Link!
              </>
            ) : (
              <>
                <Link2 className="h-3.5 w-3.5" />
                Copy Link
              </>
            )}
          </Button>

          {/* Socials buttons */}
          <div className="flex gap-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Share on ${social.name}`}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-all hover:scale-105 active:scale-95",
                  social.color,
                  social.borderColor
                )}
              >
                {social.icon}
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>

          {/* Native Share Trigger if supported */}
          {hasNativeShare && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                void handleNativeShare()
              }}
              title="More share options"
              className="h-10 w-10 rounded-full border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-all hover:scale-105 hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
            >
              <Share2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
