import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { DraftBadge } from "@/components/DraftNotice";
import { insights } from "@/content/insights";
import { buildMetadata } from "@/lib/seo";
import { showDrafts } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Insights on AI, Data and Healthcare Innovation",
  description: "Articles on enterprise AI adoption, agentic AI, responsible AI, data governance, healthcare AI and MLOps from Business Technique Limited.",
  path: "/insights",
});

export default function InsightsPage() {
  const items = insights.filter((i) => showDrafts || i.status === "approved");
  const [lead, ...rest] = items;
  return (
    <>
      <PageHero crumbs={[{ name: "Insights", path: "/insights" }]} title="Insights"
        intro="Practical thinking on adopting AI responsibly, building data foundations and turning research into evidence." />
      <section className="section">
        <div className="wrap">
          {!lead ? <p className="text-slate">New articles are on the way.</p> : (
            <>
              <Link href={`/insights/${lead.slug}`} className="group grid gap-8 rounded-panel bg-ink p-8 text-white sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
                <div>
                  <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-signal-bright">{lead.topic}{lead.status !== "approved" && <DraftBadge tone="dark" label="Draft" />}</p>
                  <h2 className="t-h2 mt-5 group-hover:text-signal-bright">{lead.title}</h2>
                </div>
                <p className="text-white/75">{lead.excerpt}</p>
              </Link>
              <ul className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((a) => (
                  <li key={a.slug} className="border-t-2 border-ink pt-6">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-signal">{a.topic}{a.status !== "approved" && <DraftBadge label="Draft" />}</p>
                    <h2 className="t-h3 mt-4"><Link href={`/insights/${a.slug}`} className="link-underline">{a.title}</Link></h2>
                    <p className="mt-3 text-slate">{a.excerpt}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
}
