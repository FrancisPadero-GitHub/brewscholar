"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Film, FolderOpen, GraduationCap, ArrowDown } from "lucide-react"
import { motion } from "motion/react"

export function HomeHero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background pt-20">
      {/* Abstract background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[20%] -left-[10%] h-[70vh] w-[70vw] rounded-[100%] bg-primary/5 blur-[120px] dark:bg-primary/10" />
        <div className="absolute top-[40%] -right-[10%] h-[60vh] w-[60vw] rounded-[100%] bg-primary/5 blur-[100px] dark:bg-primary/5" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-8 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-border/50 bg-card/50 px-7 py-2 backdrop-blur-md"
        >
          <span className="text-sm font-semibold tracking-wide text-foreground">
            Welcome to <span className="text-primary">BrewScholar</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mx-auto mb-6 max-w-4xl text-balance font-sans text-5xl font-black leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Pour over opportunities. <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
            Brew up your future.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-2xl text-balance font-serif text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Discover the BrewScholar ecosystem. From limitless entertainment to
          secure file hosting and educational opportunities—all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group cursor-pointer gap-2 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
          >
            <Link href="#ecosystem">
              Explore Ecosystem
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Link>
          </Button>
        </motion.div>

        {/* Floating Icons Representation */}
        <div className="mt-20 flex justify-center gap-6 sm:gap-12 md:mt-24">
          {[
            { icon: Film, delay: 0.4 },
            { icon: FolderOpen, delay: 0.5 },
            { icon: GraduationCap, delay: 0.6 },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: item.delay,
                  ease: "backOut",
                }}
                className="relative"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-card/80 shadow-lg backdrop-blur-sm sm:h-20 sm:w-20"
                >
                  <Icon className="h-8 w-8 text-muted-foreground transition-colors hover:text-primary sm:h-10 sm:w-10" />
                </motion.div>
                {/* Subtle shadow underneath */}
                <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-foreground/5 blur-sm dark:bg-foreground/10" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
