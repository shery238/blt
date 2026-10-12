import { PageHero } from "@/components/PageHero";
import { DraftNotice } from "@/components/DraftNotice";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({ title: "Privacy Notice", description: `How ${site.name} collects and uses personal data.`, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy notice", path: "/privacy" }]} title="Privacy notice" />
      <section className="section"><div className="wrap"><div className="prose-btl text-ink/90">
        <DraftNotice>This notice is a starting template. It must be reviewed against your actual processing, ICO registration and retention policy before launch.</DraftNotice>
        <h2 className="t-h3 mt-10 text-ink">Who we are</h2>
        <p className="mt-3">{site.name} is the data controller for personal data collected through this website.</p>
        <h2 className="t-h3 mt-10 text-ink">What we collect</h2>
        <p className="mt-3">When you use our contact form we collect your name, organisation, work email, optional phone number, area of interest and the message you send.</p>
        <h2 className="t-h3 mt-10 text-ink">Why we use it</h2>
        <p className="mt-3">We use these details only to respond to your enquiry. Our lawful basis is legitimate interests in responding to business enquiries. We do not add you to marketing lists.</p>
        <h2 className="t-h3 mt-10 text-ink">Analytics and cookies</h2>
        <p className="mt-3">If enabled, we use privacy-friendly analytics only after you give consent. We do not use advertising cookies.</p>
        <h2 className="t-h3 mt-10 text-ink">Your rights</h2>
        <p className="mt-3">You can ask to access, correct or delete your personal data, or object to its use. You can also complain to the Information Commissioner's Office at ico.org.uk.</p>
      </div></div></section>
    </>
  );
}
