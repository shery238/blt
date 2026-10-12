"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Service } from "@/content/services";

/**
 * Five interactive capability pillars. On large screens they sit side by side and the active
 * panel widens; on small screens they stack as an accordion. Each panel is a real button
 * with aria-expanded, so it works by keyboard and screen reader.
 */
export function CapabilityPanels({ items }: { items: Service[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
      {items.map((s, i) => {
        const open = active === i;
        return (
          <div key={s.slug}
            onMouseEnter={() => setActive(i)}
            className={`relative overflow-hidden rounded-panel transition-[flex-grow,background-color] duration-500 ease-out lg:min-w-0 ${
              open ? "bg-ink text-white lg:flex-[3.2]" : "bg-white text-ink ring-1 ring-ink/10 lg:flex-1"
            }`}>
            {open && <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-signal-bright/25 blur-[80px]" />}
            <h3 className="relative">
              <button type="button" aria-expanded={open} aria-controls={`cap-${s.slug}`} id={`cap-btn-${s.slug}`}
                onClick={() => setActive(i)} onFocus={() => setActive(i)}
                className="flex w-full items-start gap-4 p-7 text-left lg:h-full lg:flex-col lg:justify-between">
                <span className={`font-display text-sm font-semibold ${open ? "text-pulse" : "text-signal"}`}>{s.capabilityNumber}</span>
                <span className={`t-h3 block ${open ? "lg:max-w-md" : "lg:!text-[1.3rem] lg:![line-height:1.1] lg:[writing-mode:vertical-rl] lg:rotate-180 lg:whitespace-nowrap"}`}>{s.title}</span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div id={`cap-${s.slug}`} role="region" aria-labelledby={`cap-btn-${s.slug}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, delay: 0.15 }}
                  className="relative px-7 pb-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:pb-9">
                  <p className="max-w-md text-white/80">{s.short}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.capabilities.slice(0, 3).map((c) => (
                      <li key={c.title} className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">{c.title}</li>
                    ))}
                  </ul>
                  <Link href={`/services/${s.slug}`} className="btn-primary mt-7 !min-h-0 !py-2.5">
                    View this service
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
