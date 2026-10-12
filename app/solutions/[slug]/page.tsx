import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { DraftBadge, DraftNotice } from "@/components/DraftNotice";
import { JsonLd } from "@/components/JsonLd";
import { solutions, getSolution, solutionCategories } from "@/content/solutions";
import { getService } from "@/content/services";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { showDrafts } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return solutions.filter((s) => showDrafts || s.status === "approved").map((s) => ({ slug: s.slug }));
}
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const s = getSolution((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: s.title, description: s.summary, path: `/solutions/${s.slug}`, noindex: s.status !== "approved" });
}

export default async function SolutionPage({ params }: Props) {
  const s = getSolution((await params).slug);
  if (!s || (!showDrafts && s.status !== "approved")) notFound();
  const service = getService(s.serviceSlug);
  const category = solutionCategories.find((c) => c.id === s.category)!;

  return (
    <>
      {s.status === "approved" && <JsonLd data={serviceJsonLd(s.title, s.summary, `/solutions/${s.slug}`)} />}
      <PageHero crumbs={[{ name: "Solutions", path: "/solutions" }, { name: s.title, path: `/solutions/${s.slug}` }]}
        title={s.title} intro={s.summary}
        kicker={<span className="flex flex-wrap items-center gap-3 text-white/70"><Link className="link-underline" href={`/solutions#${category.id}`}>{category.label}</Link>{s.status !== "approved" && <DraftBadge tone="dark" label="Proposed offering" />}</span>}>
        <Link href={`/contact?topic=${encodeURIComponent(service?.title ?? "")}`} className="btn-primary">Discuss this solution</Link>
      </PageHero>

      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="t-h2">The problem</h2>
            <p className="t-lead mt-6 text-slate">{s.problem}</p>
            {s.status !== "approved" && <div className="mt-8"><DraftNotice>This is a proposed offering. Details will be confirmed before it is published.</DraftNotice></div>}
          </div>
          <ul className="grid gap-px overflow-hidden rounded-panel bg-ink/10">
            {s.components.map((c) => (
              <li key={c.title} className="bg-white p-8"><h3 className="t-h3">{c.title}</h3><p className="mt-2 text-slate">{c.text}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-mist/60">
        <div className="wrap">
          <h2 className="t-h2">Indicative architecture</h2>
          <p className="mt-4 max-w-2xl text-slate">A typical shape for this solution. The real design depends on your existing platforms, data and controls.</p>
          <div className="mt-10"><ArchitectureDiagram title={s.title} layers={s.architecture} /></div>
          {service && <p className="mt-8 text-slate">Delivered through our <Link href={`/services/${service.slug}`} className="font-semibold text-ink underline underline-offset-4">{service.title}</Link> service.</p>}
        </div>
      </section>
      <CtaBand title="Explore whether this fits your organisation" href={`/contact?topic=${encodeURIComponent(service?.title ?? "")}`} label="Discuss this solution" />
    </>
  );
}
