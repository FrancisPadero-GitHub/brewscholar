"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      aria-label="Main navigation"
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/85 shadow-lg shadow-black/5 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5" aria-label="BrewScholar home">
          <div className="relative h-8 w-8 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/brewscholar-yellow.png"
              alt="BrewScholar Logo"
              fill
              className="object-contain"
              sizes="32px"
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Brew<span className="text-primary">Scholar</span>
          </span>
        </Link>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            className="cursor-pointer rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-px"
          >
            <Link href="#ecosystem">Explore Ecosystem</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="cursor-pointer rounded-xl p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-3 px-6 py-5">
              <Button
                asChild
                className="w-full cursor-pointer rounded-full bg-primary font-semibold text-primary-foreground"
                onClick={() => setMobileOpen(false)}
              >
                <Link href="#ecosystem">Explore Ecosystem</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full cursor-pointer rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                <Link href="https://moviehub.brewscholar.app" target="_blank" rel="noopener noreferrer">
                  Visit MovieHub
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
