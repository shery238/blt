import Link from "next/link";
import { site } from "@/lib/site";

/** Placeholder wordmark. Replace with the verified logo SVG from the existing website. */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const text = tone === "light" ? "text-white" : "text-ink";
  return (
    <Link href="/" className={`group flex items-center gap-3 ${text}`} aria-label={`${site.name}, home`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
        <circle cx="12" cy="14" r="4" className="fill-signal-bright" />
        <circle cx="28" cy="11" r="3" className="fill-pulse" />
        <circle cx="25" cy="28" r="5" className="fill-signal-bright" />
        <path d="M12 14 28 11M12 14l13 14M28 11l-3 17" stroke="currentColor" strokeWidth="1.6" opacity=".6" fill="none" />
      </svg>
      <span className="font-display text-[1.15rem] font-semibold leading-none tracking-tight">
        Business Technique
        <span className="block text-[0.7rem] font-normal tracking-[0.02em] opacity-70">Limited</span>
      </span>
    </Link>
  );
}
