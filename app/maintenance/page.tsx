import { Coffee, Sparkles } from "lucide-react"

export const metadata = {
  title: "Under Maintenance | BrewScholar",
  description:
    "We are currently brewing some updates. BrewScholar will be back online shortly.",
}

export default function MaintenancePage() {
  return (
    <main className="relative mt-12 mb-12 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-foreground">
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-md flex-col items-center text-center">
        {/* Animated Coffee Cup illustration using Lucide Coffee and custom SVG steam lines */}
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 shadow-lg shadow-amber-500/5">
          <Coffee className="h-12 w-12 text-primary" />

          {/* Steam lines */}
          <div className="absolute -top-1.5 flex w-full justify-center gap-1.5">
            <span className="steam-line steam-line-1 block h-3.5 w-1 rounded-full bg-primary/40" />
            <span className="steam-line steam-line-2 block h-4.5 w-1 rounded-full bg-primary/60" />
            <span className="steam-line steam-line-3 block h-3.5 w-1 rounded-full bg-primary/40" />
          </div>
        </div>

        {/* Status indicator */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          Refining the Brew
        </div>

        {/* Content */}
        <h1 className="mb-4 font-serif text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Brewing Something{" "}
          <span className="font-sans font-normal text-primary italic">
            Special
          </span>
        </h1>

        <p className="mb-8 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
          BrewScholar is undergoing scheduled maintenance to load the freshest
          scholarship data and optimize your brewing experience. We will be back
          online shortly.
        </p>

        {/* Interactive card showing status */}
        <div className="mb-8 w-full rounded-xl border border-border/80 bg-card p-6 text-left shadow-md shadow-black/5 backdrop-blur-sm">
          <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-primary" />
            What&apos;s changing?
          </h3>
          <ul className="space-y-2.5 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                Updating scholarship deadline checks and eligibility indexing.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                Speeding up search results and dynamic database filtering.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>Polishing the dashboard user interface.</span>
            </li>
          </ul>
        </div>

        {/* Footer info */}
        <p className="text-xs text-muted-foreground/60">
          Need immediate support? Drop us a line at{" "}
          <a
            href="mailto:support@brewscholar.app"
            className="underline transition-colors duration-200 hover:text-foreground"
          >
            support@brewscholar.app
          </a>
        </p>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes steam {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          30% { opacity: 0.7; }
          100% { transform: translateY(-16px) scale(1.3); opacity: 0; }
        }
        .steam-line {
          animation: steam 2.5s infinite ease-out;
        }
        .steam-line-1 { animation-delay: 0s; }
        .steam-line-2 { animation-delay: 0.8s; }
        .steam-line-3 { animation-delay: 1.6s; }
      `,
        }}
      />
    </main>
  )
}
