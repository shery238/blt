import Link from "next/link";

export function CtaBand({
  title = "Let's turn complex challenges into intelligent solutions.",
  text = "Tell us what you are working on. We will reply within two working days.",
  href = "/contact",
  label = "Start a conversation",
}: { title?: string; text?: string; href?: string; label?: string }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="grain relative overflow-hidden rounded-panel bg-ink px-8 py-14 text-white sm:px-14 sm:py-20">
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-signal-bright/20 blur-[90px]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end">
            <div>
              <h2 className="t-h2 max-w-2xl">{title}</h2>
              <p className="t-lead mt-5 max-w-xl text-white/75">{text}</p>
            </div>
            <div className="lg:justify-self-end"><Link href={href} className="btn-primary">{label}</Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}
