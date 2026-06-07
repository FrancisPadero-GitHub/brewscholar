"use client"

import { techStack } from "@/data/landing_page/data"
import { motion } from "motion/react"

export function HomeTechStack() {
  return (
    <section id="tech-stack" className="relative overflow-hidden bg-background py-24">
      {/* Top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Powered by <span className="text-primary">Modern Tech</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built on a robust, scalable foundation designed for the future.
            </p>
          </motion.div>
        </div>

        {/* Tech badges grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: "easeOut",
              }}
              className="group flex cursor-pointer items-center justify-center rounded-2xl border border-border/50 bg-card px-6 py-4 shadow-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-md"
            >
              <span
                className={`font-mono text-sm font-semibold tracking-wide transition-colors duration-200 group-hover:text-primary ${tech.color}`}
              >
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
