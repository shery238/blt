"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { UseCase } from "@/content/use-cases";
import { useCaseCategories } from "@/content/use-cases";
import { DraftBadge } from "./DraftNotice";

type FilterKey = "industry" | "businessFunction" | "technology" | "outcome" | "complexity";
const filterLabels: Record<FilterKey, string> = {
  industry: "Industry", businessFunction: "Business function", technology: "Technology", outcome: "Business outcome", complexity: "Complexity",
};

const valuesFor = (u: UseCase, key: FilterKey): string[] =>
  key === "technology" ? u.technologies : [u[key as Exclude<FilterKey, "technology">]];

export function UseCaseCatalogue({ items }: { items: UseCase[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const category = params.get("category") ?? "all";
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    industry: "", businessFunction: "", technology: "", outcome: "", complexity: "",
  });

  const options = useMemo(() => {
    const o = {} as Record<FilterKey, string[]>;
    (Object.keys(filterLabels) as FilterKey[]).forEach((k) => {
      o[k] = Array.from(new Set(items.flatMap((u) => valuesFor(u, k)))).sort();
    });
    return o;
  }, [items]);

  const results = items.filter((u) => {
    if (category !== "all" && u.category !== category) return false;
    for (const k of Object.keys(filters) as FilterKey[]) {
      if (filters[k] && !valuesFor(u, k).includes(filters[k])) return false;
    }
    if (query.trim()) {
      const hay = [u.title, u.summary, u.industry, u.businessFunction, ...u.technologies].join(" ").toLowerCase();
      if (!query.toLowerCase().split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    return true;
  });

  const setCategory = (id: string) => {
    const url = id === "all" ? "/use-cases" : `/use-cases?category=${id}`;
    router.replace(url, { scroll: false });
  };
  const activeCount = Object.values(filters).filter(Boolean).length + (query ? 1 : 0) + (category !== "all" ? 1 : 0);
  const clear = () => { setFilters({ industry: "", businessFunction: "", technology: "", outcome: "", complexity: "" }); setQuery(""); setCategory("all"); };

  return (
    <div>
      <div role="group" aria-label="Use-case category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {[{ id: "all", label: "All Use Cases" }, ...useCaseCategories].map((c) => (
          <button key={c.id} type="button" aria-pressed={category === c.id} onClick={() => setCategory(c.id)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-[0.95rem] font-medium transition-colors ${
              category === c.id ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-ink/15 hover:ring-ink"}`}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 rounded-panel bg-white p-5 ring-1 ring-ink/10 sm:p-6 md:grid-cols-3 lg:grid-cols-6">
        <label className="md:col-span-3 lg:col-span-6">
          <span className="text-sm font-semibold">Search use cases</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try ‘forecasting’ or ‘Teams’"
            className="mt-2 w-full rounded-xl border border-ink/20 bg-paper px-4 py-3 text-ink placeholder:text-slate/70 focus:border-signal focus:outline-none" />
        </label>
        {(Object.keys(filterLabels) as FilterKey[]).map((k) => (
          <label key={k} className={k === "technology" ? "lg:col-span-2" : ""}>
            <span className="text-sm font-semibold">{filterLabels[k]}</span>
            <select value={filters[k]} onChange={(e) => setFilters((f) => ({ ...f, [k]: e.target.value }))}
              className="mt-2 w-full rounded-xl border border-ink/20 bg-paper px-3 py-3 text-ink focus:border-signal focus:outline-none">
              <option value="">Any</option>
              {options[k].map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-slate">{results.length} {results.length === 1 ? "use case" : "use cases"} shown</p>
        {activeCount > 0 && <button type="button" onClick={clear} className="text-sm font-semibold text-signal underline underline-offset-4">Clear all filters</button>}
      </div>

      {results.length === 0 ? (
        <div className="mt-6 rounded-panel border border-dashed border-ink/25 p-10 text-center">
          <p className="font-display text-2xl">No use cases match these filters.</p>
          <p className="mt-2 text-slate">Remove a filter or search term, or tell us about your challenge directly.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button type="button" onClick={clear} className="btn-outline">Clear all filters</button>
            <Link href="/contact" className="btn-dark">Describe your challenge</Link>
          </div>
        </div>
      ) : (
        <motion.ul layout className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((u) => (
              <motion.li key={u.slug} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }}>
                <Link href={`/use-cases/${u.slug}`}
                  className="group flex h-full flex-col rounded-panel bg-white p-7 ring-1 ring-ink/10 transition-shadow hover:shadow-[0_30px_60px_-30px_rgb(19_35_58/0.45)] hover:ring-ink/25">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-signal">{u.industry}</span>
                    {u.status !== "approved" && <DraftBadge />}
                  </div>
                  <h3 className="t-h3 mt-4 group-hover:text-signal">{u.title}</h3>
                  <p className="mt-3 flex-1 text-slate">{u.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                    {u.technologies.slice(0, 3).map((t) => <li key={t} className="chip !text-[0.8rem]">{t}</li>)}
                  </ul>
                  <p className="mt-5 text-sm text-slate">{u.complexity} complexity</p>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
