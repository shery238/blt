import Link from "next/link";
import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { CapabilityPanels } from "@/components/home/CapabilityPanels";
import { ProcessJourney } from "@/components/home/ProcessJourney";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { DraftBadge } from "@/components/DraftNotice";
import { capabilityServices } from "@/content/services";
import { solutions } from "@/content/solutions";
import { useCases } from "@/content/use-cases";
import { insights } from "@/content/insights";
import { technologies, compliance, complianceLabels } from "@/content/ecosystem";
import { buildMetadata } from "@/lib/seo";
import { site, showDrafts } from "@/lib/site";

export const metadata = buildMetadata({
  title: `${site.name} | AI, Data, Cloud and Healthcare Research Consultancy`,
  description:
    "UK research-led consultancy combining artificial intelligence, data intelligence, cloud engineering and healthcare innovation to solve complex business and healthcare challenges.",
  path: "/",
});

const researchAreas = [
  { title: "Scientific and experimental research", text: "Structured experimental development with clear hypotheses, methods and documentation." },
  { title: "Healthcare AI research", text: "Exploratory AI methods applied to healthcare questions under appropriate governance." },
  { title: "Neurodivergent research and innovation", text: "Inclusive, co-designed research with neurodivergent participants." },
  { title: "Social and behavioural research", text: "Understanding how people experience services, technology and change." },
  { title: "Research governance", text: "Ethics, data protection and information governance planned from the start." },
  { title: "Evidence-based technology development", text: "Technology decisions grounded in evidence rather than assumption." },
];

export default function HomePage() {
  const visibleUseCases = useCases.filter((u) => showDrafts || u.status === "approved").slice(0, 3);
  const visibleInsights = insights.filter((i) => showDrafts || i.status === "approved").slice(0, 3);
  const visibleSolutions = solutions.filter((s) => showDrafts || s.status === "approved");
  const techGroups = Array.from(new Set(technologies.map((t) => t.group)));

  return (
    <>
      <Hero />

      {/* 2. Who we are */}
      <section aria-labelledby="who" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal><h2 id="who" className="t-h2 max-w-3xl">Research-led innovation. Intelligent technology. Measurable outcomes.</h2></Reveal>
          <Reveal delay={0.1} className="prose-btl t-lead !text-[1.15rem]">
            <p>Business Technique Limited is a research-led organisation working across healthcare innovation, scientific research, artificial intelligence and applied technology.</p>
            <p>Our foundation is rigorous research: asking the right question, gathering evidence carefully and protecting the people and data involved. We are now extending that foundation into AI, data and cloud consulting, bringing the same discipline to organisations that want technology they can trust.</p>
            <Link href="/about" className="btn-outline mt-8">About Business Technique</Link>
          </Reveal>
        </div>
      </section>

      {/* 3. Core capabilities */}
      <section id="capabilities" aria-labelledby="cap-title" className="section scroll-mt-20 pt-0">
        <div className="wrap">
          <SectionHead id="cap-title" title="Five capabilities, one research discipline"
            intro="Select a capability to see what it covers. Each links to a full service page with challenges, methods and related use cases." />
          <CapabilityPanels items={capabilityServices} />
        </div>
      </section>

      {/* 4. Solutions */}
      <section aria-labelledby="sol-title" className="section bg-mist/60">
        <div className="wrap">
          <SectionHead id="sol-title" title="AI and technology solutions"
            intro="Solution patterns we design and deliver. Scope, architecture and controls are agreed with each organisation."
            action={<Link href="/solutions" className="btn-outline">View all solutions</Link>} />
          <ul className="grid border-t border-ink/15 md:grid-cols-2">
            {visibleSolutions.map((s) => (
              <li key={s.slug} className="border-b border-ink/15 md:odd:border-r md:odd:pr-10 md:even:pl-10">
                <Link href={`/solutions/${s.slug}`} className="group flex items-start justify-between gap-6 py-7">
                  <span>
                    <span className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-xl font-semibold group-hover:text-signal sm:text-2xl">{s.title}</span>
                      {s.status !== "approved" && <DraftBadge label="Proposed" />}
                    </span>
                    <span className="mt-2 block max-w-md text-slate">{s.summary}</span>
                  </span>
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-2 h-6 w-6 shrink-0 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-signal"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Use cases */}
      <section aria-labelledby="uc-title" className="section">
        <div className="wrap">
          <SectionHead id="uc-title" title="Use cases across industries"
            intro="Solution concepts that show how AI, data and cloud can address real operational problems. These are illustrations, not client case studies."
            action={<Link href="/use-cases" className="btn-outline">Browse the catalogue</Link>} />
          {visibleUseCases.length === 0 ? (
            <p className="text-slate">The use-case library is being prepared. <Link className="underline" href="/contact">Tell us about your challenge</Link> in the meantime.</p>
          ) : (
            <ul className="grid gap-5 md:grid-cols-3">
              {visibleUseCases.map((u, i) => (
                <li key={u.slug}>
                  <Reveal delay={i * 0.08} className="h-full">
                    <Link href={`/use-cases/${u.slug}`} className="group flex h-full flex-col justify-between rounded-panel bg-ink p-8 text-white transition-colors hover:bg-signal">
                      <span>
                        <span className="flex flex-wrap items-center gap-2 text-sm text-white/70">{u.industry}{u.status !== "approved" && <DraftBadge tone="dark" />}</span>
                        <span className="t-h3 mt-5 block">{u.title}</span>
                      </span>
                      <span className="mt-10 block text-white/75">{u.summary}</span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 6. Research and healthcare innovation */}
      <section aria-labelledby="res-title" className="section bg-white">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <h2 id="res-title" className="t-h2">Research and healthcare innovation</h2>
              <p className="mt-6 max-w-md text-slate">Research is where we began, and it shapes everything we build. We describe findings honestly: exploratory research is never presented as a validated clinical tool.</p>
              <Link href="/research" className="btn-dark mt-8">Explore our research</Link>
            </Reveal>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-panel bg-ink/10 sm:grid-cols-2">
            {researchAreas.map((r) => (
              <li key={r.title} className="bg-paper p-8">
                <h3 className="font-display text-xl font-semibold">{r.title}</h3>
                <p className="mt-3 text-slate">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Delivery approach */}
      <section aria-labelledby="proc-title" className="grain relative section overflow-hidden bg-ink-deep">
        <div aria-hidden="true" className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-signal/30 blur-[120px]" />
        <div className="wrap relative">
          <SectionHead tone="dark" id="proc-title" title="How we deliver"
            intro="Five stages, each with a clear output, so you can see progress and decide what happens next." />
          <ProcessJourney />
        </div>
      </section>

      {/* 8. Technology ecosystem */}
      <section aria-labelledby="tech-title" className="section">
        <div className="wrap">
          <SectionHead id="tech-title" title="Technology ecosystem"
            intro="Platforms our team works with. This reflects technical expertise, not official vendor partnerships unless a partnership is stated." />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {techGroups.map((g) => (
              <div key={g}>
                <h3 className="border-b border-ink/15 pb-3 text-sm font-semibold text-signal">{g}</h3>
                <ul className="mt-4 space-y-3">
                  {technologies.filter((t) => t.group === g).map((t) => (
                    <li key={t.name} className="font-display text-2xl font-medium tracking-tight">
                      {t.name}
                      {t.partnership && <a href={t.partnership.evidenceUrl} className="ml-2 align-middle text-xs font-semibold text-signal underline">{t.partnership.tier}</a>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Trust and governance */}
      <section aria-labelledby="trust-title" className="section bg-mist/60">
        <div className="wrap">
          <SectionHead id="trust-title" title="Trust, security and responsible innovation"
            intro="The standards and frameworks that shape how we handle data, build systems and use AI. Certification is only claimed where independently verified."
            action={<Link href="/about/responsible-ai" className="btn-outline">Our approach to responsible AI</Link>} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {compliance.map((c) => (
              <li key={c.name} className="flex flex-col justify-between rounded-2xl bg-white p-6 ring-1 ring-ink/10">
                <div>
                  <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                  <p className="mt-1 text-sm text-slate">{c.description}</p>
                </div>
                {(showDrafts || c.status !== "unconfirmed") && (
                  <p className={`mt-6 text-sm font-semibold ${c.status === "unconfirmed" ? "text-slate" : "text-signal"}`}>{complianceLabels[c.status]}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. Insights */}
      <section aria-labelledby="ins-title" className="section">
        <div className="wrap">
          <SectionHead id="ins-title" title="Insights" intro="Practical thinking on AI adoption, governance, data and healthcare research."
            action={<Link href="/insights" className="btn-outline">Read all insights</Link>} />
          <ul className="grid gap-10 md:grid-cols-3">
            {visibleInsights.map((a) => (
              <li key={a.slug} className="border-t-2 border-ink pt-6">
                <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-signal">{a.topic}{a.status !== "approved" && <DraftBadge label="Draft" />}</p>
                <h3 className="t-h3 mt-4"><Link href={`/insights/${a.slug}`} className="link-underline">{a.title}</Link></h3>
                <p className="mt-3 text-slate">{a.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11. Contact */}
      <section aria-labelledby="contact-title" className="grain relative section overflow-hidden bg-ink-deep">
        <div aria-hidden="true" className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-signal/30 blur-[120px]" />
        <div className="wrap relative grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 id="contact-title" className="t-h2 text-white">Let&apos;s turn complex challenges into intelligent solutions.</h2>
            <p className="t-lead mt-6 max-w-md text-white/75">Tell us about your organisation and what you want to achieve. We reply to every enquiry within two working days.</p>
            {(site.email || site.phone) && (
              <dl className="mt-10 space-y-4 text-white">
                {site.email && <div><dt className="text-sm text-white/60">Email</dt><dd><a className="link-underline text-lg" href={`mailto:${site.email}`}>{site.email}</a></dd></div>}
                {site.phone && <div><dt className="text-sm text-white/60">Phone</dt><dd><a className="link-underline text-lg" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></dd></div>}
              </dl>
            )}
          </div>
          <Suspense fallback={<div className="h-[40rem] rounded-panel bg-white/5" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
