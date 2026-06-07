"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { features } from "@/data/landing_page/data"

export function HomeFooter() {
  return (
    <footer className="relative border-t border-border/50 bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <Link href="/" className="group mb-6 inline-flex items-center gap-2.5">
                <div className="relative h-8 w-8">
                  <Image
                    src="/brewscholar-yellow.png"
                    alt="BrewScholar Logo"
                    fill
                    className="object-contain"
                    sizes="32px"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">
                  Brew<span className="text-primary">Scholar</span>
                </span>
              </Link>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                An open-source ecosystem providing limitless entertainment,
                secure cloud storage, and educational opportunities. Pour over
                opportunities and brew up your brightest future.
              </p>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="mb-6 text-sm font-semibold tracking-wider text-foreground uppercase">
                Platforms
              </h4>
              <ul className="flex flex-col gap-3">
                {features.map((feature) => (
                  <li key={feature.id}>
                    <Link
                      href={feature.href}
                      className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {feature.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="mb-6 text-sm font-semibold tracking-wider text-foreground uppercase">
                Resources
              </h4>
              <ul className="flex flex-col gap-3">

                <li>
                  <Link
                    href="https://www.themoviedb.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    TMDb API
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} BrewScholar. Made with 🍿 &amp; ☕
            </p>
            <p className="text-xs text-muted-foreground/60 text-center sm:text-right">
              MovieHub uses the TMDb API but is not endorsed or certified by TMDb.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
