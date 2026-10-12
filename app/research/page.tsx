import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Research and Healthcare Innovation",
  description: "Scientific and experimental research, healthcare AI research, neurodivergent research, social and behavioural research and research governance.",
  path: "/research",
});

const areas = [
  { title: "Scientific and experimental research", text: "We design and run experimental development projects with clear hypotheses, documented methods and reproducible analysis. This includes structured R&D that resolves scientific or technological uncertainty." },
  { title: "Healthcare AI research", text: "We explore how AI and data methods can help with healthcare questions, working with partners under ethics review and information governance. Exploratory findings are reported as such, never as validated clinical tools." },
  { title: "Neurodivergent research and innovation", text: "We co-design research and technology with neurodivergent people, adapting formats, communication and environments so participation is genuinely accessible." },
  { title: "Social and behavioural research", text: "Qualitative and quantitative research into how people experience services, technology and change, so that solutions fit real behaviour." },
  { title: "Research governance", text: "Ethics, consent, data protection and information security planned from the outset, with data minimisation and secure research environments where appropriate." },
  { title: "Evidence-based technology development", text: "Technology decisions informed by evidence: prototypes are evaluated against agreed measures before wider adoption." },
];

export default function ResearchPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Research and Innovation", path: "/research" }]} title="Research and healthcare innovation"
        intro="Research is the foundation of Business Technique. It shapes how we ask questions, handle data and judge whether technology genuinely helps." />
      <section className="section">
        <div className="wrap">
          <ol className="divide-y divide-ink/15 border-y border-ink/15">
            {areas.map((a) => (
              <li key={a.title} className="grid gap-4 py-10 lg:grid-cols-[1fr_1.6fr]">
                <h2 className="t-h3">{a.title}</h2>
                <p className="max-w-prose text-lg text-slate">{a.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-2xl text-sm text-slate">
            We do not make claims about medical device approval, clinical performance or diagnostic accuracy. Any such claim would only be made with published evidence and the relevant regulatory approval.
          </p>
          <Link href="/services/healthcare-innovation-and-rd" className="btn-dark mt-10">View the healthcare R&amp;D service</Link>
        </div>
      </section>
      <CtaBand title="Interested in a research partnership?" href="/contact?topic=Research%20partnership" label="Propose a partnership" />
    </>
  );
}
