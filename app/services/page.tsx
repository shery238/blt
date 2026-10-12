import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services: AI, Data, Cloud, Healthcare R&D and Governance",
  description: "Artificial intelligence, data and analytics, cloud engineering, digital transformation, healthcare innovation and AI governance services from Business Technique Limited.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Services", path: "/services" }]} title="Services"
        intro="Six connected services, grounded in research discipline and designed to move ideas safely into everyday use." />
      <section className="section">
        <div className="wrap">
          <ul className="divide-y divide-ink/15 border-y border-ink/15">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group grid gap-4 py-10 md:grid-cols-[1fr_1.3fr_auto] md:items-center">
                  <h2 className="t-h3 group-hover:text-signal">{s.title}</h2>
                  <p className="text-slate">{s.short}</p>
                  <span className="text-sm font-semibold text-signal">View service</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
