import { HomeNavbar } from "@/features/home/home-navbar"
import { HomeHero } from "@/features/home/home-hero"
import { HomeEcosystem } from "@/features/home/home-ecosystem"
import { HomeTechStack } from "@/features/home/home-tech-stack"
import { HomeFooter } from "@/features/home/home-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HomeNavbar />
      <HomeHero />
      <HomeEcosystem />
      <HomeTechStack />
      <HomeFooter />
    </div>
  )
}
