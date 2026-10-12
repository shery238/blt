import { Reveal } from "./Reveal";

export function SectionHead({ title, intro, tone = "light", id, action }: {
  title: string; intro?: string; tone?: "light" | "dark"; id?: string; action?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[1.4fr_1fr] lg:items-end">
      <h2 id={id} className={`t-h2 max-w-3xl ${tone === "dark" ? "text-white" : "text-ink"}`}>{title}</h2>
      <div className="lg:justify-self-end">
        {intro && <p className={`max-w-md ${tone === "dark" ? "text-white/70" : "text-slate"}`}>{intro}</p>}
        {action && <div className="mt-5">{action}</div>}
      </div>
    </Reveal>
  );
}
