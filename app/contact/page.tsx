import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { DraftNotice } from "@/components/DraftNotice";
import { buildMetadata } from "@/lib/seo";
import { site, showDrafts } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Us: Talk to an Expert",
  description: "Contact Business Technique Limited about AI, data, cloud, healthcare research or responsible AI. We reply within two working days.",
  path: "/contact",
});

export default function ContactPage() {
  const hasDetails = site.email || site.phone || site.address;
  return (
    <>
      <PageHero crumbs={[{ name: "Contact Us", path: "/contact" }]} title="Let's turn complex challenges into intelligent solutions."
        intro="Tell us about your organisation and what you want to achieve. We reply to every enquiry within two working days." />
      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="t-h3">Other ways to reach us</h2>
            {hasDetails ? (
              <dl className="mt-6 space-y-5">
                {site.email && <div><dt className="text-sm text-slate">Email</dt><dd><a className="link-underline text-lg" href={`mailto:${site.email}`}>{site.email}</a></dd></div>}
                {site.phone && <div><dt className="text-sm text-slate">Phone</dt><dd><a className="link-underline text-lg" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></dd></div>}
                {site.address && <div><dt className="text-sm text-slate">Address</dt><dd className="text-lg">{site.address.street}<br />{site.address.locality} {site.address.postcode}</dd></div>}
              </dl>
            ) : showDrafts ? (
              <div className="mt-6"><DraftNotice>Editor: add the verified email, phone and address from the existing website in <code>lib/site.ts</code>. Unverified details are never shown.</DraftNotice></div>
            ) : null}
          </div>
          <Suspense fallback={<div className="h-[40rem] rounded-panel bg-white" />}><ContactForm /></Suspense>
        </div>
      </section>
    </>
  );
}
