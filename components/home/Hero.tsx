"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroNetwork } from "../HeroNetwork";

const lines = ["Engineering", "intelligent solutions", "for a better tomorrow."];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink-deep text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_75%_30%,rgb(24_112_99/0.55),transparent_70%),radial-gradient(50%_50%_at_10%_90%,rgb(227_179_65/0.12),transparent_70%)]" />
      <HeroNetwork />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-deep via-ink-deep/70 to-transparent" />

      <div className="wrap relative pb-16 pt-40 sm:pb-24">
        <h1 id="hero-title" className="t-display max-w-5xl">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block"
                initial={{ y: "105%" }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.2, 0.7, 0.1, 1] }}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="t-lead max-w-xl text-white/80">
            Combining research, artificial intelligence, data intelligence and cloud engineering to solve complex business and healthcare challenges.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="#capabilities" className="btn-primary">Explore Our Expertise</Link>
            <Link href="/contact?topic=expert" className="btn-ghost">Talk to an Expert</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
