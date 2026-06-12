// For adding custom fonts with other frameworks, see:
// https://tailwindcss.com/docs/font-family
import type { Metadata } from "next"
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google"
import "./globals.css"

// components
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

// vercel stuff
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://www.brewscholar.app"
  ),
  title: {
    default: "BrewScholar",
    template: "%s | BrewScholar",
  },
  description:
    "Pour over opportunities and brew up your brightest future with BrewScholar",
  keywords: [
    "brew scholar",
    "movie tracker",
    "film reviews",
    "tmdb movie player",
    "imdb movie player",
    "movie watchlist app",
    "cinema database",
    "movie recommendations",
    "best movies app",
    "watch movies online",
    "free movie streaming",
    "hd movie player",
    "online cinema",
    "cinephile app",
    "movie discovery",
    "film database",
    "track movies watched",
    "movie collection",
    "watchlist manager",
    " cinema tracker",
    "stream movies free",
    "hd movie streaming",
    "cinema hub",
  ],
  openGraph: {
    title: "BrewScholar",
    description:
      "Pour over opportunities and brew up your brightest future with BrewScholar",
    url: "/",
    siteName: "BrewScholar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brewscholar-yellow.png",
        width: 1200,
        height: 630,
        alt: "BrewScholar - Pour over opportunities and brew up your brightest future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrewScholar",
    description:
      "Pour over opportunities and brew up your brightest future with BrewScholar",
    images: ["/brewscholar-yellow.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <Analytics />
        <SpeedInsights />
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
