import Link from "next/link";
import { site } from "@/lib/site";
import { navigation } from "@/content/navigation";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const groups = navigation.filter((n) => n.children);
  return (
    <footer className="relative overflow-hidden bg-ink-deep text-white/75">
      <div className="wrap grid gap-14 py-20 lg:grid-cols-[1.2fr_2fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-6 text-[0.98rem] leading-relaxed">{site.description}</p>
          <address className="mt-6 not-italic text-[0.98rem] leading-relaxed">
            {site.email && <a className="link-underline block text-white" href={`mailto:${site.email}`}>{site.email}</a>}
            {site.phone && <a className="link-underline block text-white" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>}
            {site.address && <span className="mt-2 block">{site.address.street}, {site.address.locality} {site.address.postcode}</span>}
          </address>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {groups.map((g) => (
            <div key={g.label}>
              <h2 className="font-display text-base font-semibold text-white">{g.label}</h2>
              <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                {g.children!.map((c) => (
                  <li key={c.href}><Link className="link-underline hover:text-white" href={c.href}>{c.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-4 py-7 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}.{site.companyNumber && ` Registered in England and Wales, company no. ${site.companyNumber}.`}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link className="link-underline hover:text-white" href="/privacy">Privacy notice</Link></li>
            <li><Link className="link-underline hover:text-white" href="/accessibility">Accessibility</Link></li>
            <li><Link className="link-underline hover:text-white" href="/insights">Insights</Link></li>
            <li><Link className="link-underline hover:text-white" href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
