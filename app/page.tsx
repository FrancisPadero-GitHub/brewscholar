import { HomeNavbar } from "@/components/custom/landing/home-navbar"
import { HomeHero } from "@/components/custom/landing/home-hero"
import { HomeEcosystem } from "@/components/custom/landing/home-ecosystem"
import { HomeFooter } from "@/components/custom/landing/home-footer"

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BrewScholar",
    url: "https://www.brewscholar.app",
    description: "Pour over opportunities and brew up your brightest future with BrewScholar.",
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeNavbar />
      <HomeHero />
      <HomeEcosystem />
      <HomeFooter />
    </main>
  )
}
