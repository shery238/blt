"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { areasOfInterest } from "@/lib/contact-schema";

type Errors = Partial<Record<string, string[]>>;
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const startedAt = useRef(Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);

  const preset = (() => {
    const t = params.get("topic");
    const uc = params.get("usecase");
    if (uc) return { interest: "", message: `I'd like to discuss a solution similar to the "${uc.replace(/-/g, " ")}" use case.` };
    if (t && (areasOfInterest as readonly string[]).includes(t)) return { interest: t, message: "" };
    return { interest: "", message: "" };
  })();

  useEffect(() => { if (status === "error") summaryRef.current?.focus(); }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending"); setErrors({}); setFormError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"), company: fd.get("company"), email: fd.get("email"), phone: fd.get("phone"),
      interest: fd.get("interest"), message: fd.get("message"), consent: fd.get("consent") === "on",
      website: fd.get("website"), startedAt: startedAt.current,
      turnstileToken: (fd.get("cf-turnstile-response") as string) || undefined,
    };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) { setErrors(data.fields ?? {}); setFormError(data.error ?? "Your message was not sent."); setStatus("error"); return; }
      setStatus("sent");
    } catch {
      setFormError("Your message was not sent because the connection failed. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-panel bg-white p-10 ring-1 ring-ink/10">
        <h2 className="t-h3">Message sent</h2>
        <p className="mt-3 text-slate">Thank you. A member of the team will reply within two working days.</p>
        <Link href="/use-cases" className="btn-outline mt-8">Browse use cases while you wait</Link>
      </div>
    );
  }

  const field = "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-ink focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/30";
  const err = (name: string) => errors[name]?.[0];
  const describedBy = (name: string) => (err(name) ? `${name}-error` : undefined);
  const Err = ({ name }: { name: string }) => err(name) ? <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-[#B42318]">{err(name)}</p> : null;

  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-panel bg-white p-6 ring-1 ring-ink/10 sm:p-10">
      {siteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}
      {status === "error" && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-8 rounded-xl border border-[#B42318]/40 bg-[#FEF3F2] p-4 text-[#7A271A]">
          {formError}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block"><span className="font-semibold">Name</span>
          <input name="name" autoComplete="name" required aria-invalid={!!err("name")} aria-describedby={describedBy("name")} className={`${field} ${err("name") ? "border-[#B42318]" : "border-ink/20"}`} />
          <Err name="name" />
        </label>
        <label className="block"><span className="font-semibold">Company or organisation</span>
          <input name="company" autoComplete="organization" required aria-invalid={!!err("company")} aria-describedby={describedBy("company")} className={`${field} ${err("company") ? "border-[#B42318]" : "border-ink/20"}`} />
          <Err name="company" />
        </label>
        <label className="block"><span className="font-semibold">Work email</span>
          <input name="email" type="email" autoComplete="email" required aria-invalid={!!err("email")} aria-describedby={describedBy("email")} className={`${field} ${err("email") ? "border-[#B42318]" : "border-ink/20"}`} />
          <Err name="email" />
        </label>
        <label className="block"><span className="font-semibold">Phone <span className="font-normal text-slate">(optional)</span></span>
          <input name="phone" type="tel" autoComplete="tel" aria-invalid={!!err("phone")} aria-describedby={describedBy("phone")} className={`${field} ${err("phone") ? "border-[#B42318]" : "border-ink/20"}`} />
          <Err name="phone" />
        </label>
        <label className="block sm:col-span-2"><span className="font-semibold">Area of interest</span>
          <select name="interest" required defaultValue={preset.interest} aria-invalid={!!err("interest")} aria-describedby={describedBy("interest")} className={`${field} ${err("interest") ? "border-[#B42318]" : "border-ink/20"}`}>
            <option value="" disabled>Choose one</option>
            {areasOfInterest.map((a) => <option key={a}>{a}</option>)}
          </select>
          <Err name="interest" />
        </label>
        <label className="block sm:col-span-2"><span className="font-semibold">Project description</span>
          <span className="mt-1 block text-sm text-slate">What are you trying to achieve, and what is getting in the way?</span>
          <textarea name="message" rows={6} required defaultValue={preset.message} aria-invalid={!!err("message")} aria-describedby={describedBy("message")} className={`${field} ${err("message") ? "border-[#B42318]" : "border-ink/20"}`} />
          <Err name="message" />
        </label>
      </div>

      {/* Honeypot: hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <label className="mt-8 flex items-start gap-3">
        <input type="checkbox" name="consent" required aria-invalid={!!err("consent")} aria-describedby={describedBy("consent")} className="mt-1 h-5 w-5 rounded border-ink/30 accent-[rgb(var(--signal))]" />
        <span className="text-[0.98rem] text-slate">
          I agree that Business Technique Limited may use these details to respond to my enquiry, as described in the{" "}
          <Link href="/privacy" className="font-semibold text-ink underline underline-offset-4">privacy notice</Link>. We will not add you to a mailing list.
        </span>
      </label>
      <Err name="consent" />

      {siteKey && <div className="cf-turnstile mt-6" data-sitekey={siteKey} data-theme="light" />}

      <button type="submit" disabled={status === "sending"} className="btn-dark mt-8 w-full sm:w-auto disabled:opacity-60">
        {status === "sending" ? "Sending message…" : "Send message"}
      </button>
    </form>
  );
}
