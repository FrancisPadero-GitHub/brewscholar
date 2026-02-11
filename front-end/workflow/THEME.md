# BrewScholar Theme Documentation

This document outlines the design system and theme configuration for the BrewScholar project, based on `app/globals.css`.

## Design System Overview

The project uses **Tailwind CSS v4** with an inline theme configuration and **tw-animate-css** for animations.

### Typography

- **Sans Font**: `Geist Sans` (variable: `--font-geist-sans`)
- **Mono Font**: `Geist Mono` (variable: `--font-geist-mono`)
- Both fonts are loaded from Google Fonts via Next.js font optimization

### Color Palette

BrewScholar uses a **dark theme** with **gold accents** to create a premium, scholarly aesthetic.

| Semantic Name  | Hex Code  | Description    | Usage                           |
| :------------- | :-------- | :------------- | :------------------------------ |
| **Background** | `#1E1E1E` | Dark Charcoal  | Main background                 |
| **Foreground** | `#FFFFFF` | White          | Primary text color              |
| **Primary**    | `#FFD700` | Gold           | Brand color, CTAs, highlights   |
| **Secondary**  | `#E6C200` | Darker Gold    | Hover states, secondary actions |
| **Card**       | `#2A2A2A` | Light Charcoal | Card backgrounds                |
| **Border**     | `#3A3A3A` | Medium Gray    | Borders, dividers               |
| **Muted**      | `#808080` | Gray           | Muted text, secondary info      |

#### Theme Variables (OKLCH Color Space)

The project uses OKLCH color space for better color accuracy:

**Light Mode:**

- `--background`: oklch(1 0 0) - White
- `--foreground`: oklch(0.129 0.042 264.695) - Dark Blue-Gray
- `--primary`: oklch(0.208 0.042 265.755) - Deep Blue
- `--accent`: oklch(0.968 0.007 247.896) - Light Gray

**Dark Mode:**

- `--background`: oklch(0.129 0.042 264.695) - Dark Blue-Gray
- `--foreground`: oklch(0.984 0.003 247.858) - Off-White
- `--primary`: oklch(0.929 0.013 255.508) - Light Blue-Gray
- `--accent`: oklch(0.279 0.041 260.031) - Dark Slate

### UI Elements

#### Buttons

- **Primary Button**: Gold background (`bg-[#FFD700]`), dark text (`text-[#1E1E1E]`), hover effect (`hover:bg-[#E6C200]`)
  - Example: Landing page feature cards "Get Started" buttons
- **Secondary Button**: Transparent background with gold border (`border-[#FFD700]`), white text

#### Cards

- **Standard Card**: `bg-[#2A2A2A]` background with `border-[#3A3A3A]` border
- **Hover Effect**: Border changes to gold (`hover:border-[#FFD700]`), scale transform (`hover:scale-105`)
- **Example**: Feature cards on landing page

#### Icons

- Use lucid-react icons as much as possible
- Gold background circles (`bg-[#FFD700]`) with dark icons for feature displays
- Hover animations: scale transforms on parent card hover

### Animations

The project uses **tw-animate-css** which provides utility-first CSS animations. Common patterns:

- `transition-all` + `duration-300`: Smooth transitions (300ms)
- `hover:scale-105`: Subtle lift effect on cards
- `group-hover:` patterns: Coordinated animations within card groups
- `animate-pulse`: Loading states and skeletons

### Layout

- **Max Width Containers**: `max-w-7xl mx-auto` for main content areas
- **Spacing**: `px-6` horizontal padding, `py-16` or `py-20` vertical sections
- **Grid Layouts**:
  - Feature cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
  - Stats: `grid-cols-1 md:grid-cols-3 gap-6`

### Route Files

Next.js automatically detects these special files:

- `layout.tsx` - Shared UI wrapper (includes root HTML and body)
- `page.tsx` - Page content
- `loading.tsx` - Loading skeleton UI
- `error.tsx` - Error boundary for route errors
- `global-error.tsx` - Global error boundary
- `not-found.tsx` - 404 page
- `template.tsx` - Re-rendered layout wrapper
- `default.tsx` - Parallel route fallback
- `route.ts` - API endpoints

### Brand Identity

**Logo**: BrewScholar wordmark with coffee/education theme

**Tagline**: "Pour over opportunities and brew up your brightest future with BrewScholar"

**Voice**: Professional yet approachable, academic meets coffee culture

## Usage Guidelines

- Use `bg-[#1E1E1E]` for main backgrounds
- Use `text-white` for primary text, `text-gray-400` for secondary text
- Use `bg-[#FFD700]` and `text-[#1E1E1E]` for primary CTAs
- Use `border-[#3A3A3A]` for subtle borders, `border-[#FFD700]` for emphasis
- Card backgrounds should be `bg-[#2A2A2A]`
- Add `transition-all duration-300` for smooth hover effects
- Use `group` and `group-hover:` for coordinated animations
- Prefer `next/link` for internal navigation (client-side routing)
- Use semantic HTML and ARIA labels for accessibility
