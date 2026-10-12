import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { DraftNotice } from "@/components/DraftNotice";
import { UseCaseCatalogue } from "@/components/UseCaseCatalogue";
import { useCases } from "@/content/use-cases";
import { buildMetadata } from "@/lib/seo";
import { showDrafts } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Use Cases: AI, Data, Cloud, Healthcare and Governance",
  description: "Searchable library of AI, data, cloud, healthcare research and governance use cases, filterable by industry, function, technology, outcome and complexity.",
  path: "/use-cases",
});

export default function UseCasesPage() {
  const items = useCases.filter((u) => showDrafts || u.status === "approved");
  return (
    <>
      <PageHero crumbs={[{ name: "Use Cases", path: "/use-cases" }]} title="Use-case library"
        intro="Solution concepts showing how AI, data and cloud can address real problems. They illustrate what is possible and are not Business Technique Limited client projects." />
      <section className="section">
        <div className="wrap">
          {showDrafts && items.some((u) => u.status !== "approved") && (
            <div className="mb-10"><DraftNotice><strong>Editorial preview.</strong> Use cases marked Draft concept are awaiting validation against the source catalogue and editorial approval. They are not indexed by search engines and are hidden when draft content is switched off.</DraftNotice></div>
          )}
          <Suspense fallback={<p className="text-slate">Loading use cases…</p>}>
            <UseCaseCatalogue items={items} />
          </Suspense>
        </div>
      </section>
      <CtaBand title="Have a challenge that isn't listed?" text="Describe it and we will tell you honestly whether AI, data or cloud can help." />
    </>
  );
}
