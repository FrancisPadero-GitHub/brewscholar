import { GraduationCap, FolderOpen, Film } from "lucide-react"

export const features = [
  {
    id: 1,
    title: "Movie Hub",
    description: "Browse and discover your favorite movies and shows",
    icon: Film,
    href: "https://moviehub.brewscholar.app", // actual subdomain
  },
  {
    id: 2,
    title: "File Hosting",
    description: "Securely store and manage your files",
    icon: FolderOpen,
    href: "https://brewscholar.app/files-hosting",
  },
  {
    id: 3,
    title: "Scholarship",
    description: "Find and apply for educational opportunities",
    icon: GraduationCap,
    href: "https://brewscholar.app/scholarship",
  },
]

export interface TechStackItem {
  name: string
  color: string // tailwind text color class
}

export const techStack: TechStackItem[] = [
  { name: "Next.js 16", color: "text-foreground" },
  { name: "React 19", color: "text-[#61DAFB]" },
  { name: "TypeScript", color: "text-[#3178C6]" },
  { name: "TailwindCSS 4", color: "text-[#38BDF8]" },
  { name: "shadcn/ui", color: "text-foreground" },
  { name: "TanStack Query", color: "text-[#FF4154]" },
  { name: "Zustand", color: "text-foreground" },
  { name: "Framer Motion", color: "text-[#FF0055]" },
  { name: "TMDb API", color: "text-[#01D277]" },
  { name: "Supabase", color: "text-[#3ECF8E]" },
]
