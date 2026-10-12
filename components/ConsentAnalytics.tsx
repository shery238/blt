"use client";
import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";

const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
const host = process.env.NEXT_PUBLIC_ANALYTICS_HOST || "https://plausible.io";
const KEY = "btl-analytics-consent";

/** Analytics load only after explicit consent, and only when configured. */
export function ConsentAnalytics() {
  const [consent, setConsent] = useState<"granted" | "denied" | null | "unknown">("unknown");

  useEffect(() => {
    try { setConsent((localStorage.getItem(KEY) as "granted" | "denied" | null) ?? null); } catch { setConsent(null); }
  }, []);

  if (!domain) return null;

  const decide = (value: "granted" | "denied") => {
    try { localStorage.setItem(KEY, value); } catch { /* storage unavailable */ }
    setConsent(value);
  };

  return (
    <>
      {consent === "granted" && <Script defer data-domain={domain} src={`${host}/js/script.js`} strategy="afterInteractive" />}
      {consent === null && (
        <div role="dialog" aria-live="polite" aria-label="Analytics preferences"
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-ink/10 sm:inset-x-auto sm:right-6">
          <p className="text-[0.98rem] text-ink">
            We would like to use privacy-friendly analytics to understand which pages are useful. No advertising cookies are used.{" "}
            <Link href="/privacy" className="underline">Read our privacy notice</Link>.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className="btn-dark !min-h-0 !py-2.5" onClick={() => decide("granted")}>Allow analytics</button>
            <button type="button" className="btn-outline !min-h-0 !py-2.5" onClick={() => decide("denied")}>Decline</button>
          </div>
        </div>
      )}
    </>
  );
}
