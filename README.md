# BrewScholar

BrewScholar is a Next.js app with multiple feature modules in one UI:

- Entertainment hub for movies and TV series (TMDB-powered)
- Scholarship section (work in progress)
- File hosting section (work in progress)

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Zustand (client state)
- TanStack React Query (data fetching + caching)
- Axios
- Vercel Analytics

## Main Routes

- `/` landing page
- `/entertainment` movie + TV discovery
- `/entertainment/movie-details/[id]`
- `/entertainment/tv-series-details/[id]`
- `/entertainment/watch-movie/[id]`
- `/entertainment/watch-tv/[id]`
- `/scholarship` under construction
- `/files-hosting` coming soon

## Project Structure (high-level)

```txt
app/                           # App Router pages
components/                    # Shared/custom UI components
constants/                     # Static constants (image sizes, etc.)
data/                          # UI config/static data
features/zustand/              # Zustand stores
helpers/                       # Pure helper utilities
hooks/                         # Data + feature hooks
types/                         # API and domain types
```

## Prerequisites

- Node.js 20+
- pnpm 9+ (recommended; lockfile is pnpm)

## Environment Variables

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN=your_tmdb_v4_read_access_token
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

Notes:

- TMDB API key is requied for fetching almost all of the catalog inside
- Entertainment data fetching relies on TMDB token above.
- Since variable is `NEXT_PUBLIC_*`, value is exposed to browser bundle.

## Local Development

Install dependencies:

```bash
pnpm install
```

Run dev server:

```bash
pnpm dev
```

Open:

```txt
http://localhost:3000
```

## Scripts

```bash
pnpm dev      # start development server
pnpm build    # production build
pnpm start    # run built app
pnpm lint     # run eslint
```

## Current Status

- Entertainment module: active
- Scholarship module: under construction
- File hosting module: under construction

## Notes

- Remote TMDB images are allowed through `next.config.ts`.
- React Query Devtools are shown only in development.
- Entertainment mode now persists via Zustand middleware.
