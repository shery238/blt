import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Accessibility Statement", description: "Our commitment to an accessible website meeting WCAG 2.2 AA.", path: "/accessibility" });

export default function AccessibilityPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Accessibility", path: "/accessibility" }]} title="Accessibility statement" />
      <section className="section"><div className="wrap"><div className="prose-btl text-ink/90">
        <p>We aim for this website to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.</p>
        <p>You should be able to navigate using a keyboard, use a screen reader, zoom to 400% without losing content and turn off animation through your device&apos;s reduced-motion setting.</p>
        <p>If you find something that does not work for you, contact us and we will respond within five working days.</p>
      </div></div></section>
    </>
  );
}
