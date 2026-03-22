// ─── Stat pill ────────────────────────────────────────────────────────────────
export function StatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string | number
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
      <Icon className="h-4 w-4 text-primary" />
      <div>
        <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          {label}
        </p>
        <p className="font-semibold text-foreground">{value}</p>
      </div>
    </div>
  )
}
