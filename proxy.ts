import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true"

  // If maintenance mode is not enabled, do nothing and proceed
  if (!maintenanceMode) {
    // If they had a bypass cookie, clean it up
    if (request.cookies.has("maintenance_bypass")) {
      const response = NextResponse.next()
      response.cookies.delete("maintenance_bypass")
      return response
    }
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  // Allow developer to manually test or clear the bypass cookie
  const previewParam = request.nextUrl.searchParams.get("preview")

  if (previewParam === "true") {
    const response = NextResponse.next()
    // Set a cookie that expires in 1 hour so the user can preview multiple pages
    response.cookies.set("maintenance_bypass", "true", {
      maxAge: 60 * 60,
      path: "/",
      sameSite: "lax",
    })
    return response
  }

  if (previewParam === "false") {
    const response = NextResponse.next()
    response.cookies.delete("maintenance_bypass")
    // Redirect back to the requested path without the query param to check if they get maintenance page
    const cleanUrl = new URL(request.url)
    cleanUrl.searchParams.delete("preview")
    return NextResponse.redirect(cleanUrl)
  }

  // Check if they already have the bypass cookie active
  const hasBypassCookie =
    request.cookies.get("maintenance_bypass")?.value === "true"
  if (hasBypassCookie) {
    return NextResponse.next()
  }

  // Bypass logic for:
  // - The maintenance page itself (/maintenance)
  // - API routes (/api/*)
  // - Next.js internal / static assets (_next/*)
  // - Static files (files with extensions, e.g. favicon.ico, logo.png, robots.txt, etc.)
  if (
    pathname === "/maintenance" ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Rewrite standard page requests to the maintenance page
  return NextResponse.rewrite(new URL("/maintenance", request.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
