"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { features } from "@/data/landing_page/data"

export function HomeEcosystem() {
  return (
    <section id="ecosystem" className="relative bg-muted/30 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl font-black tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl">
            The <span className="text-primary">Ecosystem</span>
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-lg text-balance text-muted-foreground md:text-xl">
            Everything you need to stream, store, and succeed. Built on a modern
            stack for speed, reliability, and beautiful user experiences.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            // Make the first item (Movie Hub) span 2 columns on large screens
            const isFeatured = index === 0

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className={`group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 ${
                  isFeatured ? "lg:col-span-2" : "col-span-1"
                }`}
              >
                {/* Background glow effect on hover */}
                <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mb-8 max-w-md flex-1 text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <Link
                      href={feature.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
                    >
                      Get Started
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>

                {/* Optional: Add abstract visual decorations for the featured card */}
                {isFeatured && (
                  <div className="pointer-events-none absolute right-0 bottom-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40">
                    <div className="h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full border-[20px] border-primary/20" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
