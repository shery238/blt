import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { DraftBadge, DraftNotice } from "@/components/DraftNotice";
import { insights, getInsight } from "@/content/insights";
import { buildMetadata } from "@/lib/seo";
import { site, showDrafts } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return insights.filter((i) => showDrafts || i.status === "approved").map((i) => ({ slug: i.slug }));
}
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const a = getInsight((await params).slug);
  if (!a) return {};
  return buildMetadata({ title: a.title, description: a.excerpt, path: `/insights/${a.slug}`, type: "article", noindex: a.status !== "approved" });
}

export default async function InsightPage({ params }: Props) {
  const a = getInsight((await params).slug);
  if (!a || (!showDrafts && a.status !== "approved")) notFound();
  const date = a.publishedAt ? new Date(a.publishedAt) : null;

  return (
    <>
      {a.status === "approved" && a.author && date && (
        <JsonLd data={{
          "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.excerpt,
          datePublished: a.publishedAt, author: { "@type": "Person", name: a.author },
          publisher: { "@id": `${site.url}/#organization` }, mainEntityOfPage: `${site.url}/insights/${a.slug}`, inLanguage: "en-GB",
        }} />
      )}
      <PageHero crumbs={[{ name: "Insights", path: "/insights" }, { name: a.title, path: `/insights/${a.slug}` }]} title={a.title} intro={a.excerpt}
        kicker={<span className="flex flex-wrap items-center gap-3 text-sm font-semibold text-signal-bright">{a.topic}{a.status !== "approved" && <DraftBadge tone="dark" label="Draft" />}</span>}>
        <p className="text-white/70">
          {a.author ?? "Author to be confirmed"}
          {date ? <>, <time dateTime={a.publishedAt!}>{date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time></> : ", not yet published"}
        </p>
      </PageHero>
      <article className="section">
        <div className="wrap">
          <div className="mx-auto max-w-prose">
            {a.status !== "approved" && <div className="mb-10"><DraftNotice>Draft article. Author, publication date and final copy are set at editorial approval. Not indexed by search engines.</DraftNotice></div>}
            <div className="space-y-6 text-[1.15rem] leading-[1.75] text-ink/90">{a.body.map((p, i) => <p key={i}>{p}</p>)}</div>
            <Link href="/insights" className="mt-12 inline-block font-semibold text-signal underline underline-offset-4">Back to all insights</Link>
          </div>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
