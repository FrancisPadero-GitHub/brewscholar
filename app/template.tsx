import type { ReactNode } from "react"

export default function Template({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <div className="animate-in duration-300 fade-in">{children}</div>
}
