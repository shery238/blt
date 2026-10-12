import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80vh] items-center bg-ink-deep pt-24 text-white">
      <div className="wrap">
        <h1 className="t-h1 max-w-3xl">This page doesn&apos;t exist, or has moved.</h1>
        <p className="t-lead mt-6 max-w-xl text-white/75">Check the address, or start again from one of these pages.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">Go to the homepage</Link>
          <Link href="/use-cases" className="btn-ghost">Browse use cases</Link>
        </div>
      </div>
    </section>
  );
}
