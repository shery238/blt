export function DraftBadge({ label = "Draft concept", tone = "light" }: { label?: string; tone?: "light" | "dark" }) {
  return (
    <span className={tone === "dark" ? "draft-badge !bg-pulse/10 !text-pulse" : "draft-badge"}>
      <svg viewBox="0 0 8 8" className="h-2 w-2" aria-hidden="true"><circle cx="4" cy="4" r="4" className="fill-pulse" /></svg>
      {label}
    </span>
  );
}

export function DraftNotice({ children }: { children: React.ReactNode }) {
  return (
    <div role="note" className="rounded-2xl border border-pulse/50 bg-pulse/10 p-5 text-[0.98rem] text-ink">
      {children}
    </div>
  );
}
