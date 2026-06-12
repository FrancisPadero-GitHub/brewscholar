"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"
import { motion } from "motion/react"

const galleryImages = [
  { src: "/moviehub-landing-page.png", alt: "MovieHub landing page" },
  { src: "/home.png", alt: "MovieHub home view" },
  { src: "/catalog.png", alt: "MovieHub catalog view" },
  { src: "/movie-details.png", alt: "Movie details page" },
  { src: "/player_features.png", alt: "Player features" },
]

// Duplicate for seamless infinite scroll
const row1 = [...galleryImages, ...galleryImages]
const row2 = [
  ...galleryImages.slice(3),
  ...galleryImages.slice(0, 3),
  ...galleryImages.slice(3),
  ...galleryImages.slice(0, 3),
]

export function HomeHero() {
  return (
    <section
      aria-label="Hero section"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-16"
    >
      {/* ── Scrolling gallery background ── */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col gap-4 opacity-60 select-none dark:opacity-50"
        aria-hidden="true"
      >
        {/* Row 1 — scrolls left */}
        <div className="animate-gallery-left flex shrink-0 gap-4 py-2">
          {row1.map((img, i) => (
            <div
              key={`r1-${i}`}
              className="relative h-44 w-72 shrink-0 overflow-hidden rounded-2xl border border-border/40 shadow-md"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="288px"
                className="object-cover"
                priority={i < 3}
              />
            </div>
          ))}
        </div>

        {/* Row 2 — scrolls right (reverse) */}
        <div className="animate-gallery-right flex shrink-0 gap-4 py-2">
          {row2.map((img, i) => (
            <div
              key={`r2-${i}`}
              className="relative h-44 w-72 shrink-0 overflow-hidden rounded-2xl border border-border/40 shadow-md"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="288px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Row 3 — scrolls left */}
        <div className="animate-gallery-left flex shrink-0 gap-4 py-2 [animation-delay:-8s]">
          {row1.map((img, i) => (
            <div
              key={`r3-${i}`}
              className="relative h-44 w-72 shrink-0 overflow-hidden rounded-2xl border border-border/40 shadow-md"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="288px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Gradient vignette over gallery ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/90 via-background/50 to-background"
        aria-hidden="true"
      />
      {/* Left / right fade edges */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-background/80"
        aria-hidden="true"
      />

      {/* ── Subtle ambient glow ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 h-[50vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[120px] dark:bg-primary/12" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-5 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Welcome to BrewScholar
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mx-auto mb-6 max-w-4xl font-sans text-5xl leading-[1.08] font-black tracking-tight text-balance text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          Pour over{" "}
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-primary/90 via-primary to-primary/70 bg-clip-text text-transparent">
              opportunities.
            </span>
          </span>
          <br className="hidden sm:block" />
          Brew up your{" "}
          <span className="bg-linear-to-r from-primary/70 via-primary to-primary/90 bg-clip-text text-transparent">
            future.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-2xl font-serif text-lg leading-relaxed text-balance text-muted-foreground sm:text-xl"
        >
          Discover the BrewScholar ecosystem, from limitless entertainment to
          secure file hosting and educational opportunities, all in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group cursor-pointer gap-2 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/35"
          >
            <Link href="#ecosystem">
              Explore Ecosystem
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="cursor-pointer rounded-full border-border/70 px-8 text-base font-semibold backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
          >
            <Link
              href="https://moviehub.brewscholar.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit MovieHub
            </Link>
          </Button>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-6 text-xs text-muted-foreground/60"
        >
          {[
            "Free & Open Source",
            "No sign-up required",
            "Built with Next.js",
          ].map((text, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-primary/50" />
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t from-background to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
