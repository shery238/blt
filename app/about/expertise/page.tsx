import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Expertise",
  description: "Expertise across research methods, artificial intelligence, data and analytics, cloud engineering, healthcare innovation and AI governance.",
  path: "/about/expertise",
});

export default function ExpertisePage() {
  return (
    <>
      <PageHero crumbs={[{ name: "About Us", path: "/about" }, { name: "Our Expertise", path: "/about/expertise" }]}
        title="Our expertise" intro="Research methods and engineering skills in one team, so evidence and delivery stay connected." />
      <section className="section">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.slug} className="rounded-panel bg-white p-8 ring-1 ring-ink/10 sm:p-10">
              <h2 className="t-h3">{s.title}</h2>
              <p className="mt-3 text-slate">{s.short}</p>
              <ul className="mt-6 space-y-2">{s.capabilities.map((c) => <li key={c.title} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />{c.title}</li>)}</ul>
              <Link href={`/services/${s.slug}`} className="mt-8 inline-block font-semibold text-signal underline underline-offset-4">View service</Link>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
