---
name: seo-best-practices
description: SEO best practices and guidelines for Next.js App Router projects, specifically for the MovieHub subdomain.
---

# SEO Best Practices for Next.js Projects

This document serves as a skill/knowledge-base for maintaining proper SEO hygiene across the BrewScholar ecosystem, especially for subdomains like `moviehub.brewscholar.app`. When developing or reviewing code, ensure these guidelines are strictly followed.

## 1. Configure Global Metadata (`layout.tsx`)

You must configure global SEO defaults in your root `layout.tsx`, but exercise caution with `canonical` URLs.

**DO:**
- Define `metadataBase` using the app's base URL (e.g., `https://moviehub.brewscholar.app`).
- Use a `title` template (e.g., `%s | MovieHub`).
- Provide strong default `description` and `keywords`.
- Configure `openGraph` and `twitter` card tags for social sharing.

**DON'T:**
- **Never** hardcode `alternates: { canonical: "/" }` inside your root `layout.tsx`. Doing so overrides the canonical URL for all child routes, causing search engines to index only the home page. Rely on Next.js's default behavior, or set `canonical` explicitly on a per-page basis if needed.

## 2. Enforce Semantic HTML (`<main>`)

You must use semantic HTML5 tags so search engines can understand page structure.

**DO:**
- Ensure the root wrapper of page content inside `page.tsx` is always a `<main>` tag, never a generic `<div>`.

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

You must inject Schema.org JSON-LD scripts into pages to help search engines understand the content better.

**DO:**
- Add a `<script>` tag for `application/ld+json` in your page files. For MovieHub, use schemas like `WebSite`, `Movie`, or `CollectionPage`.

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

## 4. Enable Crawlers & Indexing

You must ensure that the site is fully crawlable and indexable.

**DO:**
- Ensure a dynamic `sitemap.ts` is configured to map all important routes.
- Ensure `robots.ts` allows crawling (`userAgent: "*"`, `allow: "/"`) and provides the URL to the `sitemap.xml`.

## 5. Exclude SEO Files in Middleware / Proxy

If the project uses a middleware or proxy (e.g., `proxy.ts` or `middleware.ts`), you must ensure that critical SEO files like `sitemap.xml` and `robots.txt` are excluded from the matcher. This prevents them from being intercepted or rewritten.

**DO:**
- Update the matcher in `proxy.ts` or `middleware.ts` to include `sitemap.xml` and `robots.txt`:

```typescript
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
```

## 6. Define Meta Tags on Sub-Pages

For individual sub-pages, you must configure descriptive metadata elements to improve click-through rates on search engine result pages.

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

## 7. Configure Dynamic Canonical URLs

When generating metadata for movie pages and dynamic content, you must explicitly set canonical URLs to prevent duplicate URLs from query parameters.

**DO:**
```ts
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const movie = await getMovie(params.id)

  return {
    title: movie.title,
    description: movie.overview,
    alternates: {
      canonical: `https://moviehub.brewscholar.app/movie/${movie.id}`,
    },
  }
}
```

## 8. Include Open Graph Images

When configuring Open Graph metadata, you must always include images. For MovieHub, this is especially critical because movie pages are highly shareable.

**DO:**
```ts
openGraph: {
  title: movie.title,
  description: movie.overview,
  images: [
    {
      url: movie.poster,
      width: 1200,
      height: 630,
    },
  ],
}
```

## 9. Prioritize Server Components for SEO

For any SEO-critical pages, you must prioritize server-side rendering.

**DO:**
* Fetch content within Server Components.
* Render movie information and critical data on the server.

**DON'T:**
* Never fetch core page content exclusively in client-side `useEffect`.

**Bad:**
```tsx
"use client"

useEffect(() => {
  fetchMovie()
}, [])
```
While search engines can render JavaScript, server-rendered content is strictly required for reliability and crawl efficiency.

## 10. Support Pagination for Infinite Scroll

Movie catalogs often use infinite scrolling, which can hide content from search engines. You must implement pagination fallbacks.

**DO:**
* Ensure paginated URLs exist so search engines can reach all content without scrolling.
* Ensure category pages expose crawlable links.

**Example:**
```
/movies?page=2
/movies?page=3
```

## 11. Optimize Image SEO

Since MovieHub is image-heavy, you must optimize all images for search engines.

**DO:**
```tsx
<Image
  src={poster}
  alt={`${movie.title} movie poster`}
  width={500}
  height={750}
/>
```

**Rules for Agents:**
* Never leave the `alt` text empty for movie posters. Always provide a descriptive alternative text.
* Ensure descriptive filenames are used when possible.
* Always use the Next.js `Image` component.

## 12. Enforce Logical Heading Structure

You must enforce a strict and logical HTML heading hierarchy on all pages.

**DO:**
Ensure headings follow a sequential order without skipping levels.
```html
<h1>Movie Title</h1>
<h2>Cast</h2>
<h2>Reviews</h2>
<h3>User Reviews</h3>
```

**DON'T:**
Never skip heading levels (e.g., jumping from `<h1>` to `<h4>`).
```html
<h1>Movie Title</h1>
<h4>Cast</h4>
<h2>Reviews</h2>
```

## 13. Maximize Internal Linking

Internal linking is crucial for distributing authority across the movie database. You must include related links whenever possible.

**DO:**
Add internal links to related content:
```tsx
<Link href={`/movie/${movie.id}`}>
  {movie.title}
</Link>
```

Always attempt to link to related movies, such as:
* Similar Movies
* Trending Movies
* Movies by Genre
* Movies by Actor

## 14. Implement Context-Aware Schema

When working on MovieHub, you must implement appropriate structured data that expands beyond a basic `Movie` schema. Do not blindly add JSON-LD where it provides no value.

**DO:**
Evaluate the page type and use appropriate schemas such as:
* `Movie`
* `ItemList`
* `BreadcrumbList`
* `WebSite`
* `SearchAction`

**Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList"
}
```
Using schemas like `BreadcrumbList` is required to produce rich search results.

## Checklist for Agents
When requested to review or fix SEO, an agent should:
1. Verify `layout.tsx` for proper metadata and the absence of a hardcoded canonical `/`.
2. Ensure `app/page.tsx` and all other route `page.tsx` files use `<main>`.
3. Check whether appropriate structured data exists for the page type (Movie, ItemList, BreadcrumbList, WebSite, SearchAction). Do not blindly add JSON-LD where it provides no value.
4. Ensure header hierarchy (`h1`, `h2`, `h3`) is logical.
5. Verify that `proxy.ts` or `middleware.ts` matchers do not intercept `sitemap.xml` or `robots.txt`.
