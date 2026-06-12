"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { features } from "@/data/landing_page/data"

export function HomeFooter() {
  return (
    <footer className="relative border-t border-border/50 bg-muted/15">
      {/* Ambient top glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-32 w-2/3 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <Link
                href="/"
                className="group mb-5 inline-flex items-center gap-2.5"
                aria-label="BrewScholar home"
              >
                <div className="relative h-9 w-9 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/brewscholar-yellow.png"
                    alt="BrewScholar Logo"
                    fill
                    className="object-contain"
                    sizes="36px"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">
                  Brew<span className="text-primary">Scholar</span>
                </span>
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                An open-source ecosystem providing limitless entertainment,
                secure cloud storage, and educational opportunities. Pour over
                opportunities and brew up your brightest future.
              </p>

              {/* Tech badge strip */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Next.js", "React", "TypeScript", "Supabase"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="mb-5 text-sm font-semibold tracking-widest text-foreground uppercase">
                Platforms
              </h4>
              <ul className="flex flex-col gap-3" role="list">
                {features.map((feature) => (
                  <li key={feature.id}>
                    <Link
                      href={feature.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:gap-2.5 hover:text-primary"
                    >
                      {feature.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="mb-5 text-sm font-semibold tracking-widest text-foreground uppercase">
                Resources
              </h4>
              <ul className="flex flex-col gap-3" role="list">
                <li>
                  <Link
                    href="https://www.themoviedb.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    TMDb API
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Supabase
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} BrewScholar. Made with 🍿 &amp;
              ☕
            </p>
            <p className="text-xs text-muted-foreground/50 sm:text-right">
              MovieHub uses the TMDb API but is not endorsed or certified by
              TMDb.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
