import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { compliance, complianceLabels } from "@/content/ecosystem";
import { buildMetadata } from "@/lib/seo";
import { showDrafts } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Responsible AI and Governance",
  description: "How Business Technique Limited approaches responsible AI, data protection, information security and research governance.",
  path: "/about/responsible-ai",
});

const principles = [
  ["Accountability", "Every AI system has a named owner, a documented purpose and a review date."],
  ["Transparency", "People know when AI is involved and can see the sources behind its outputs."],
  ["Fairness", "We test for bias and involve the people affected, including under-represented groups."],
  ["Safety and security", "We threat-model AI systems and keep humans in control of consequential decisions."],
  ["Privacy", "We minimise data, follow UK GDPR and complete impact assessments before processing."],
  ["Honest evidence", "We report limitations and never present exploratory results as validated outcomes."],
];

export default function ResponsibleAIPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "About Us", path: "/about" }, { name: "Responsible AI and Governance", path: "/about/responsible-ai" }]}
        title="Responsible AI and governance" intro="Principles are only useful when they shape everyday decisions. These are the ones we work to." />
      <section className="section">
        <div className="wrap">
          <ul className="grid gap-px overflow-hidden rounded-panel bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
            {principles.map(([t, d]) => <li key={t} className="bg-white p-8 sm:p-10"><h2 className="t-h3">{t}</h2><p className="mt-3 text-slate">{d}</p></li>)}
          </ul>
        </div>
      </section>
      <section className="section bg-mist/60">
        <div className="wrap">
          <h2 className="t-h2">Standards and frameworks</h2>
          <p className="mt-4 max-w-2xl text-slate">We distinguish clearly between certified, registered, aligned and working towards. Status is only shown once it has been verified.</p>
          <div className="mt-10 overflow-x-auto rounded-panel bg-white ring-1 ring-ink/10">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">Compliance standards and current status</caption>
              <thead><tr className="border-b border-ink/10 text-sm text-slate"><th scope="col" className="p-5 font-semibold">Standard</th><th scope="col" className="p-5 font-semibold">Scope</th><th scope="col" className="p-5 font-semibold">Status</th></tr></thead>
              <tbody>
                {compliance.map((c) => (
                  <tr key={c.name} className="border-b border-ink/10 last:border-0">
                    <th scope="row" className="p-5 font-display text-lg font-semibold">{c.name}</th>
                    <td className="p-5 text-slate">{c.description}</td>
                    <td className="p-5 text-sm font-semibold">{c.status === "unconfirmed" && !showDrafts ? "Not stated" : complianceLabels[c.status]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <CtaBand title="Need help governing AI in your organisation?" href="/services/cybersecurity-and-ai-governance" label="View our governance service" />
    </>
  );
}
