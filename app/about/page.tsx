import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { DraftNotice } from "@/components/DraftNotice";
import { buildMetadata } from "@/lib/seo";
import { showDrafts } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Us: A Research-Led Technology Organisation",
  description: "Business Technique Limited is a UK research-led organisation working across healthcare innovation, scientific research, artificial intelligence and applied technology.",
  path: "/about",
});

const sections = [
  { title: "Our expertise", text: "Research methods, AI, data and cloud engineering brought together by one team.", href: "/about/expertise" },
  { title: "Research and innovation", text: "Scientific, experimental, social and behavioural research, including healthcare AI.", href: "/research" },
  { title: "Responsible AI and governance", text: "How we keep people, data and decisions safe when we use AI.", href: "/about/responsible-ai" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "About Us", path: "/about" }]} title="Research discipline, applied to technology"
        intro="Business Technique Limited is a research-led organisation working across healthcare innovation, scientific research, artificial intelligence and applied technology." />
      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="t-h2">Our company</h2>
          <div className="prose-btl t-lead !text-[1.15rem]">
            <p>We started with research: designing studies, gathering evidence carefully and protecting the people and data involved. That work has spanned healthcare innovation, experimental development and social and behavioural research, including research with neurodivergent communities.</p>
            <p>We are now extending this foundation into AI, data and cloud consulting. The aim is simple: help organisations adopt technology with the same rigour a good research project demands, with clear questions, honest evidence and strong governance.</p>
            {showDrafts && <div className="mt-8 !text-base"><DraftNotice>Editor: add verified company history, leadership profiles and registration details here. Describe consulting work as an expansion until client engagements can be cited with permission.</DraftNotice></div>}
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="wrap">
          <h2 className="t-h2">How we work</h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              ["Evidence before enthusiasm", "We test ideas with real data and agreed measures before recommending investment."],
              ["Governance by design", "Ethics, security and data protection are part of the design, not an afterthought."],
              ["Honest about limits", "We say what technology cannot do as clearly as what it can."],
            ].map(([t, d]) => (
              <li key={t} className="border-t-2 border-signal pt-6"><h3 className="t-h3">{t}</h3><p className="mt-3 text-slate">{d}</p></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <ul className="divide-y divide-ink/15 border-y border-ink/15">
            {sections.map((s) => (
              <li key={s.href}><Link href={s.href} className="group grid gap-3 py-9 md:grid-cols-[1fr_1.4fr] md:items-center">
                <span className="t-h3 group-hover:text-signal">{s.title}</span><span className="text-slate">{s.text}</span>
              </Link></li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
