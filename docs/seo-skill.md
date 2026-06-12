---
name: seo-best-practices
description: SEO best practices and guidelines for Next.js App Router projects, specifically for the MovieHub subdomain.
---

# SEO Best Practices for Next.js Projects

This document serves as a skill/knowledge-base for maintaining proper SEO hygiene across the BrewScholar ecosystem, especially for subdomains like `moviehub.brewscholar.app`. When developing or reviewing code, ensure these guidelines are strictly followed.

## 1. Global Metadata Configuration (`layout.tsx`)

Always configure global SEO defaults in your root `layout.tsx`, but be careful with `canonical` URLs.

**DO:**
- Define `metadataBase` using your app's base URL (e.g., `https://moviehub.brewscholar.app`).
- Use a `title` template (e.g., `%s | MovieHub`).
- Provide strong default `description` and `keywords`.
- Configure `openGraph` and `twitter` card tags for social sharing.

**DON'T:**
- **Never** hardcode `alternates: { canonical: "/" }` inside your root `layout.tsx`. Doing so will override the canonical URL for all child routes (unless specifically overridden), causing search engines to index only your home page and ignore subpages. Rely on Next.js's default behavior, or set `canonical` explicitly on a per-page basis if needed.

## 2. Use Semantic HTML (`<main>`)

Search engines rely on semantic HTML5 tags to understand page structure.

**DO:**
- The root wrapper of your page content inside `page.tsx` should always be a `<main>` tag, not a generic `<div>`.

```tsx
// Correct
export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Content />
    </main>
  )
}
```

```tsx
// Incorrect
export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Content />
    </div>
  )
}
```

- Continue to use `<nav>`, `<footer>`, and `<section>` in your components.

## 3. Implement Structured Data (JSON-LD)

Help search engines understand your content better by injecting Schema.org JSON-LD scripts into your pages.

**DO:**
- Add a `<script>` tag for `application/ld+json` in your page files. For MovieHub, you can use schemas like `WebSite`, `Movie`, or `CollectionPage`.

```tsx
export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MovieHub by BrewScholar",
    url: "https://moviehub.brewscholar.app",
    description: "Your ultimate destination for limitless entertainment.",
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page Content */}
    </main>
  )
}
```

## 4. Crawlers & Indexing

**DO:**
- Ensure you have a dynamic `sitemap.ts` configured to map all important routes.
- Ensure `robots.ts` allows crawling (`userAgent: "*"`, `allow: "/"`) and provides the URL to your `sitemap.xml`.

## 5. Middleware / Proxy Configuration

If your project uses a middleware or proxy (e.g., `proxy.ts` or `middleware.ts`), ensure that critical SEO files like `sitemap.xml` and `robots.txt` are excluded from the matcher. This prevents them from being intercepted or rewritten.

**DO:**
- Update the matcher in `proxy.ts` to include `sitemap.xml` and `robots.txt`:

```typescript
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
```

## 6. Define Meta Tags on Pages

For individual sub-pages, configure descriptive metadata elements to improve click-through rates on search engine result pages.

**Static Pages**
For fixed views, export a static metadata object directly inside the route's `page.tsx`:

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | App Name',
  description: 'Learn more about our platform features.',
}

export default function AboutPage() {
  return <main>About Content</main>
}
```

**Dynamic Pages**
For parameterized layouts or content loaded via an external API, implement the asynchronous generator function:

```typescript
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  // Fetch details from data layers
  // const item = await getItem(resolvedParams.slug)

  return {
    title: `${resolvedParams.slug.toUpperCase()} | Store`,
    description: `View details for item ${resolvedParams.slug}`,
  }
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params
  return <main>Product: {resolvedParams.slug}</main>
}
```

## Checklist for Agents
When requested to review or fix SEO, an agent should:
1. Verify `layout.tsx` for proper metadata and the absence of a hardcoded canonical `/`.
2. Ensure `app/page.tsx` and all other route `page.tsx` files use `<main>`.
3. Check if JSON-LD script blocks are present and correctly formatted.
4. Ensure header hierarchy (`h1`, `h2`, `h3`) is logical.
5. Verify that `proxy.ts` or `middleware.ts` matchers do not intercept `sitemap.xml` or `robots.txt`.
