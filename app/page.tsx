import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { features } from "@/data/landing_page/data"
import Image from "next/image"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 h-96 bg-linear-to-b from-card to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="mb-12 text-center">
            <div className="relative mx-auto mb-6 h-40 w-40">
              {/* Show the logo with the foreground color in both light and dark modes */}
              <Image
                src="/brewscholar_light_mode.png"
                alt="BrewScholar Logo Light"
                fill
                className="block object-contain text-foreground filter dark:hidden"
                sizes="160"
              />
              <Image
                src="/brewscholar_dark_mode.png"
                alt="BrewScholar Logo Dark"
                fill
                className="hidden object-contain text-foreground filter dark:block"
                sizes="160"
              />
            </div>

            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Pour over opportunities and brew up your brightest future with
              BrewScholar
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-foreground">
            Explore Features
          </h2>
          <p className="text-muted-foreground">
            Choose a service to get started
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link href={feature.href} key={feature.id}>
                <Card className="group h-full cursor-pointer border-border bg-card transition-all duration-300 hover:scale-105 hover:border-primary">
                  <CardHeader>
                    <div className="mb-4 flex items-center justify-center">
                      <div className="rounded-xl bg-primary p-4 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-8 w-8 text-card" />
                      </div>
                    </div>
                    <CardTitle className="text-center text-foreground transition-colors group-hover:text-primary">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-center text-sm text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-primary font-semibold text-card transition-all group-hover:gap-2 hover:bg-primary/90">
                      Get Started
                      <ArrowRight className="-ml-4 h-4 w-4 opacity-0 transition-opacity group-hover:ml-0 group-hover:opacity-100" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LandingPage
