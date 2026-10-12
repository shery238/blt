import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { DraftBadge, DraftNotice } from "@/components/DraftNotice";
import { useCases, getUseCase, useCaseCategories } from "@/content/use-cases";
import { buildMetadata } from "@/lib/seo";
import { showDrafts } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return useCases.filter((u) => showDrafts || u.status === "approved").map((u) => ({ slug: u.slug }));
}
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const u = getUseCase((await params).slug);
  if (!u) return {};
  return buildMetadata({ title: u.title, description: u.summary, path: `/use-cases/${u.slug}`, noindex: u.status !== "approved" });
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-ink/15 py-12 lg:grid-cols-[1fr_2fr]">
      <h2 className="t-h3">{title}</h2>
      <div className="text-lg text-slate">{children}</div>
    </section>
  );
}
const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">{items.map((i) => <li key={i} className="flex gap-4"><span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />{i}</li>)}</ul>
);

export default async function UseCasePage({ params }: Props) {
  const u = getUseCase((await params).slug);
  if (!u || (!showDrafts && u.status !== "approved")) notFound();
  const category = useCaseCategories.find((c) => c.id === u.category)!;
  const related = u.related.map(getUseCase).filter((r): r is NonNullable<typeof r> => !!r && (showDrafts || r.status === "approved"));

  return (
    <>
      <PageHero crumbs={[{ name: "Use Cases", path: "/use-cases" }, { name: u.title, path: `/use-cases/${u.slug}` }]}
        title={u.title} intro={u.summary}
        kicker={u.status !== "approved" ? <DraftBadge tone="dark" /> : undefined}>
        <dl className="grid max-w-4xl grid-cols-2 gap-6 border-t border-white/15 pt-8 text-white sm:grid-cols-4">
          <div><dt className="text-sm text-white/60">Category</dt><dd className="mt-1"><Link className="link-underline" href={`/use-cases?category=${category.id}`}>{category.label}</Link></dd></div>
          <div><dt className="text-sm text-white/60">Industry</dt><dd className="mt-1">{u.industry}</dd></div>
          <div><dt className="text-sm text-white/60">Function</dt><dd className="mt-1">{u.businessFunction}</dd></div>
          <div><dt className="text-sm text-white/60">Complexity</dt><dd className="mt-1">{u.complexity}</dd></div>
        </dl>
      </PageHero>

      <div className="wrap section pb-0">
        <DraftNotice>
          This is a solution concept, not a completed Business Technique Limited client project.
          {u.status !== "approved" && " It is a draft awaiting source validation and editorial approval."}
          {" "}Benefits are described qualitatively; measurable outcomes will only be shown where substantiated.
        </DraftNotice>
        <div className="mt-12">
          <Block title="Business problem"><p>{u.problem}</p></Block>
          <Block title="Current state"><List items={u.currentState} /></Block>
          <Block title="Proposed future state"><List items={u.futureState} /></Block>
          <Block title="Solution overview"><p>{u.solutionOverview}</p></Block>
        </div>
      </div>

      <section className="section bg-mist/60">
        <div className="wrap">
          <h2 className="t-h2">Architecture</h2>
          <div className="mt-10"><ArchitectureDiagram title={u.title} layers={u.architecture} /></div>
        </div>
      </section>

      <div className="wrap section">
        <Block title="Technology stack"><ul className="flex flex-wrap gap-2">{u.technologies.map((t) => <li key={t} className="chip">{t}</li>)}</ul></Block>
        <Block title="Data requirements"><List items={u.dataRequirements} /></Block>
        <Block title="Security and responsible AI controls"><List items={u.controls} /></Block>
        <Block title="Potential benefits"><List items={u.benefits} /></Block>
        <Block title="Implementation considerations"><List items={u.implementation} /></Block>
        {related.length > 0 && (
          <Block title="Related use cases">
            <ul className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}><Link href={`/use-cases/${r.slug}`} className="block rounded-2xl bg-white p-6 text-ink ring-1 ring-ink/10 hover:ring-ink/30">
                  <span className="font-display text-lg font-semibold">{r.title}</span>
                </Link></li>
              ))}
            </ul>
          </Block>
        )}
      </div>
      <CtaBand title="Discuss this use case" text="Tell us how this compares with your situation and we will outline what a first step could look like."
        href={`/contact?usecase=${u.slug}`} label="Discuss a similar solution" />
    </>
  );
}
