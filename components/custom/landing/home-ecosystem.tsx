"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { features } from "@/data/landing_page/data"

export function HomeEcosystem() {
  return (
    <section id="ecosystem" className="relative bg-background py-24 md:py-32">
      {/* Top separator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-1/2 h-[40vh] w-[80vw] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px] dark:bg-primary/8" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 md:mb-28"
        >
          <p className="mb-3 text-sm font-semibold tracking-widest text-primary uppercase">
            What we offer
          </p>
          <h2
            className="text-4xl font-black tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            The{" "}
            <span className="bg-linear-to-r from-primary/90 to-primary bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>
          <p className="mt-5 max-w-2xl font-serif text-lg text-balance text-muted-foreground md:text-xl">
            Everything you need to stream, store, and succeed, built on a modern
            stack for speed, reliability, and beautiful experiences.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isFeatured = index === 0

            return (
              <motion.article
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/8 ${
                  isFeatured ? "lg:col-span-2" : "col-span-1"
                }`}
              >
                {/* Gradient hover overlay */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/6 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Top accent bar */}
                <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl bg-linear-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-1 flex-col p-8 md:p-10">
                  {/* Icon */}
                  <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-8 flex-1 text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  {/* CTA link */}
                  <div className="mt-auto">
                    <Link
                      href={feature.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Get started with ${feature.title}`}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Decorative circle for featured card */}
                {isFeatured && (
                  <div
                    className="pointer-events-none absolute right-0 bottom-0 opacity-10 transition-opacity duration-500 group-hover:opacity-25"
                    aria-hidden="true"
                  >
                    <div className="h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full border-24 border-primary" />
                    <div className="absolute inset-8 rounded-full border-12 border-primary/50" />
                  </div>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
