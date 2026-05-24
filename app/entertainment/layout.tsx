import { ReactNode } from "react"
import Footer from "@/components/custom/entertainment/footer"

export const metadata = {
  title: "Movie Hub - BrewScholar",
  description:
    "Discover, browse, and watch movies and TV series cataloged from TMDb with alternative player integrations.",
}

interface EntertainmentLayoutProps {
  children: ReactNode
}

export default function EntertainmentLayout({
  children,
}: EntertainmentLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  )
}
