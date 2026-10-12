import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { DraftBadge, DraftNotice } from "@/components/DraftNotice";
import { solutions, solutionCategories } from "@/content/solutions";
import { buildMetadata } from "@/lib/seo";
import { showDrafts } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Solutions: Enterprise AI, Agents, Data Platforms and MLOps",
  description: "Enterprise AI assistants, agentic AI, retrieval-augmented generation, data platforms, AI governance, healthcare AI research and MLOps solution patterns.",
  path: "/solutions",
});

export default function SolutionsPage() {
  const visible = solutions.filter((s) => showDrafts || s.status === "approved");
  return (
    <>
      <PageHero crumbs={[{ name: "Solutions", path: "/solutions" }]} title="Solutions"
        intro="Repeatable solution patterns, each with an indicative architecture. We adapt every one to your systems, data and governance." />
      <section className="section">
        <div className="wrap">
          {showDrafts && visible.some((s) => s.status !== "approved") && (
            <div className="mb-14"><DraftNotice>Solutions marked <strong>Proposed</strong> are offerings awaiting approval by Business Technique Limited. They are hidden automatically when draft content is switched off.</DraftNotice></div>
          )}
          <div className="space-y-20">
            {solutionCategories.map((c) => {
              const items = visible.filter((s) => s.category === c.id);
              if (!items.length) return null;
              return (
                <section key={c.id} id={c.id} aria-labelledby={`${c.id}-h`} className="scroll-mt-28">
                  <h2 id={`${c.id}-h`} className="t-h2">{c.label}</h2>
                  <ul className="mt-8 grid gap-5 md:grid-cols-2">
                    {items.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/solutions/${s.slug}`} className="group flex h-full flex-col rounded-panel bg-white p-8 ring-1 ring-ink/10 hover:ring-ink/30">
                          {s.status !== "approved" && <span className="mb-4"><DraftBadge label="Proposed" /></span>}
                          <span className="t-h3 group-hover:text-signal">{s.title}</span>
                          <span className="mt-3 flex-1 text-slate">{s.summary}</span>
                          <span className="mt-6 text-sm font-semibold text-signal">See how it works</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
