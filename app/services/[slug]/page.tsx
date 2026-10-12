import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { DraftBadge } from "@/components/DraftNotice";
import { services, getService } from "@/content/services";
import { useCases } from "@/content/use-cases";
import { solutions } from "@/content/solutions";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { showDrafts } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: s.title, description: s.summary.slice(0, 158), path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const related = useCases.filter((u) => s.useCaseCategories.includes(u.category) && (showDrafts || u.status === "approved"));
  const relatedSolutions = solutions.filter((x) => x.serviceSlug === s.slug && (showDrafts || x.status === "approved"));

  return (
    <>
      <JsonLd data={serviceJsonLd(s.title, s.summary, `/services/${s.slug}`)} />
      <PageHero crumbs={[{ name: "Services", path: "/services" }, { name: s.title, path: `/services/${s.slug}` }]}
        title={s.title} intro={s.summary}>
        <Link href={`/contact?topic=${encodeURIComponent(s.title)}`} className="btn-primary">Discuss {s.title.toLowerCase()}</Link>
      </PageHero>

      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="t-h2">Challenges we help with</h2>
          <ul className="grid gap-4">
            {s.challenges.map((c) => (
              <li key={c} className="flex gap-4 border-b border-ink/10 pb-4 text-lg">
                <span aria-hidden="true" className="mt-3 h-2 w-2 shrink-0 rounded-full bg-pulse" />{c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap">
          <h2 className="t-h2 max-w-2xl">What we do</h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-panel bg-ink/10 md:grid-cols-2">
            {s.capabilities.map((c) => (
              <li key={c.title} className="bg-paper p-8 sm:p-10">
                <h3 className="t-h3">{c.title}</h3>
                <p className="mt-3 text-slate">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="t-h2">What it means for you</h2>
            <ul className="mt-8 space-y-4">
              {s.benefits.map((b) => <li key={b} className="flex gap-4 text-lg"><span aria-hidden="true" className="mt-3 h-2 w-2 shrink-0 rounded-full bg-signal" />{b}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="t-h2">Technology examples</h2>
            <ul className="mt-8 flex flex-wrap gap-2">{s.technologies.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
            <p className="mt-4 text-sm text-slate">Examples of tools we use. We choose technology to suit your existing estate.</p>
          </div>
        </div>
      </section>

      {(related.length > 0 || relatedSolutions.length > 0) && (
        <section className="section bg-mist/60">
          <div className="wrap">
            <h2 className="t-h2">Related solutions and use cases</h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedSolutions.map((x) => (
                <li key={x.slug}><Link href={`/solutions/${x.slug}`} className="block h-full rounded-panel bg-white p-7 ring-1 ring-ink/10 hover:ring-ink/30">
                  <span className="flex items-center gap-2 text-sm font-semibold text-signal">Solution {x.status !== "approved" && <DraftBadge label="Proposed" />}</span>
                  <span className="t-h3 mt-3 block">{x.title}</span>
                </Link></li>
              ))}
              {related.map((u) => (
                <li key={u.slug}><Link href={`/use-cases/${u.slug}`} className="block h-full rounded-panel bg-white p-7 ring-1 ring-ink/10 hover:ring-ink/30">
                  <span className="flex items-center gap-2 text-sm font-semibold text-signal">Use case {u.status !== "approved" && <DraftBadge />}</span>
                  <span className="t-h3 mt-3 block">{u.title}</span>
                </Link></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand title={`Talk to us about ${s.title.toLowerCase()}`} href={`/contact?topic=${encodeURIComponent(s.title)}`} label="Contact the team" />
    </>
  );
}
