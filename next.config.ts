import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    position: "bottom-left",
  },
  images: {
    unoptimized: true, // Disable Next.js's built-in image optimization to avoid hitting the 5k limit prop
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/**", // This allows all image paths from TMDB
      },
    ],
  },
}

export default nextConfig
