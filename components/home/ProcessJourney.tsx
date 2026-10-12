"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stages = [
  { n: "01", title: "Discover", text: "Understand business challenges, stakeholders and existing systems.", detail: ["Stakeholder interviews", "Process and data mapping", "Opportunity and risk assessment"] },
  { n: "02", title: "Design", text: "Define architecture, governance and solution requirements.", detail: ["Target architecture", "Governance and controls", "Success measures"] },
  { n: "03", title: "Develop", text: "Build prototypes, integrations, platforms and applications.", detail: ["Iterative prototypes", "Integration and testing", "Evaluation sets for AI"] },
  { n: "04", title: "Deploy", text: "Introduce production systems with security, monitoring and operational controls.", detail: ["Staged release", "Security review", "Monitoring and runbooks"] },
  { n: "05", title: "Optimise", text: "Evaluate performance, cost, quality, adoption and business outcomes.", detail: ["Outcome review", "Cost and quality tuning", "Roadmap for next stage"] },
];

export function ProcessJourney() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 40%"] });
  const scrollFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref}>
      {/* Desktop: horizontal journey with a scroll-linked track */}
      <div className="relative hidden lg:block">
        <div className="absolute left-0 right-0 top-[1.4rem] h-[2px] bg-white/15" aria-hidden="true" />
        <motion.div className="absolute left-0 top-[1.4rem] h-[2px] bg-signal-bright" style={{ width: scrollFill }} aria-hidden="true" />
        <ol className="relative grid grid-cols-5 gap-6" role="tablist" aria-label="Delivery stages">
          {stages.map((s, i) => (
            <li key={s.n} role="presentation">
              <button type="button" role="tab" id={`stage-tab-${i}`} aria-selected={active === i} aria-controls="stage-panel"
                onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") { const n = (i + 1) % stages.length; setActive(n); document.getElementById(`stage-tab-${n}`)?.focus(); }
                  if (e.key === "ArrowLeft") { const n = (i - 1 + stages.length) % stages.length; setActive(n); document.getElementById(`stage-tab-${n}`)?.focus(); }
                }}
                tabIndex={active === i ? 0 : -1}
                className="group w-full text-left">
                <span className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-sm font-semibold transition-colors ${
                  active === i ? "bg-pulse text-ink-deep" : "bg-ink-deep text-white ring-2 ring-white/25 group-hover:ring-signal-bright"}`}>{s.n}</span>
                <span className={`mt-6 block font-display text-2xl font-semibold ${active === i ? "text-white" : "text-white/70"}`}>{s.title}</span>
                <span className="mt-2 block text-[0.98rem] text-white/65">{s.text}</span>
              </button>
            </li>
          ))}
        </ol>
        <div id="stage-panel" role="tabpanel" aria-labelledby={`stage-tab-${active}`} className="mt-12 rounded-panel bg-white/5 p-8 ring-1 ring-white/10">
          <motion.div key={active} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}
            className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-center">
            <p className="font-display text-3xl font-semibold text-white">{stages[active].title}</p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {stages[active].detail.map((d) => (
                <li key={d} className="flex items-center gap-3 text-white/80">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal-bright" aria-hidden="true" />{d}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Mobile and tablet: vertical timeline, all content visible */}
      <ol className="relative space-y-10 border-l-2 border-white/15 pl-8 lg:hidden">
        {stages.map((s) => (
          <li key={s.n} className="relative">
            <span className="absolute -left-[3.05rem] flex h-10 w-10 items-center justify-center rounded-full bg-ink-deep font-display text-sm font-semibold text-white ring-2 ring-signal-bright">{s.n}</span>
            <h3 className="font-display text-2xl font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-white/70">{s.text}</p>
            <p className="mt-3 text-sm text-white/60">{s.detail.join(", ")}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
