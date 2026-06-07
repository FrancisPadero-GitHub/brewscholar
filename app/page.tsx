import { HomeNavbar } from "@/components/custom/landing/home-navbar"
import { HomeHero } from "@/components/custom/landing/home-hero"
import { HomeEcosystem } from "@/components/custom/landing/home-ecosystem"
import { HomeFooter } from "@/components/custom/landing/home-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HomeNavbar />
      <HomeHero />
      <HomeEcosystem />
      <HomeFooter />
    </div>
  )
}
