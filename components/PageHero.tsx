import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

export function PageHero({
  title, intro, crumbs, children, kicker,
}: { title: string; intro?: string; crumbs: Crumb[]; children?: React.ReactNode; kicker?: React.ReactNode }) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="grain relative overflow-hidden bg-ink-deep pb-20 pt-36 text-white sm:pb-24 sm:pt-44">
      <JsonLd data={breadcrumbJsonLd(all)} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-signal/25 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-pulse/10 blur-[100px]" />
      <div className="wrap relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === all.length - 1
                  ? <span aria-current="page" className="text-white/90">{c.name}</span>
                  : <Link className="link-underline hover:text-white" href={c.path}>{c.name}</Link>}
              </li>
            ))}
          </ol>
        </nav>
        {kicker && <div className="mt-8">{kicker}</div>}
        <h1 className="t-h1 mt-6 max-w-4xl">{title}</h1>
        {intro && <p className="t-lead mt-6 max-w-2xl text-white/75">{intro}</p>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
