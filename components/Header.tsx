"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/content/navigation";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpenMenu(null); setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpenMenu(null); setMobileOpen(false); } };
    const onClick = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("click", onClick); };
  }, []);

  useEffect(() => { document.body.style.overflow = mobileOpen ? "hidden" : ""; }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const hoverOpen = (label: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpenMenu(label); };
  const hoverClose = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 140); };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || mobileOpen ? "bg-ink-deep/90 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <Logo />

        <nav ref={navRef} aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navigation.filter((n) => n.label !== "Contact Us" && n.label !== "Home").map((item) => (
              <li key={item.label} className="relative"
                onMouseEnter={() => item.children && hoverOpen(item.label)}
                onMouseLeave={() => item.children && hoverClose()}>
                {item.children ? (
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    aria-controls={`menu-${item.label}`}
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.95rem] font-medium text-white/85 hover:text-white ${isActive(item.href) ? "text-white" : ""}`}
                  >
                    {item.label}
                    <svg aria-hidden="true" viewBox="0 0 12 12" className={`h-3 w-3 transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
                  </button>
                ) : (
                  <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined}
                    className="block rounded-full px-4 py-2 text-[0.95rem] font-medium text-white/85 hover:text-white">
                    {item.label}
                  </Link>
                )}
                {item.children && (
                  <div id={`menu-${item.label}`} hidden={openMenu !== item.label}
                    className="absolute left-0 top-full w-[22rem] pt-3">
                    <ul className="rounded-2xl bg-white p-3 shadow-[0_24px_60px_-20px_rgb(10_22_38/0.45)] ring-1 ring-ink/5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="block rounded-xl px-4 py-3 text-[0.98rem] text-ink hover:bg-mist/70">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
            <li><Link href="/contact" className="block rounded-full px-4 py-2 text-[0.95rem] font-medium text-white/85 hover:text-white">Contact Us</Link></li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact?topic=expert" className="btn-primary hidden !min-h-0 !py-2.5 sm:inline-flex">Talk to an Expert</Link>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white ring-1 ring-white/25 xl:hidden"
            aria-expanded={mobileOpen} aria-controls="mobile-nav" onClick={() => setMobileOpen((v) => !v)}>
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {mobileOpen
                ? <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" />
                : <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" />}
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!mobileOpen} className="h-[calc(100dvh-76px)] overflow-y-auto bg-ink-deep pb-10 xl:hidden">
        <nav aria-label="Mobile" className="wrap">
          <ul className="divide-y divide-white/10">
            {navigation.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <details className="group py-1">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-2xl text-white">
                      {item.label}
                      <svg aria-hidden="true" viewBox="0 0 12 12" className="h-4 w-4 transition-transform group-open:rotate-180"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
                    </summary>
                    <ul className="pb-4 pl-1">
                      {item.children.map((c) => (
                        <li key={c.href}><Link href={c.href} className="block py-2.5 text-white/75 hover:text-white">{c.label}</Link></li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={item.href} className="block py-5 font-display text-2xl text-white">{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact?topic=expert" className="btn-primary mt-8 w-full">Talk to an Expert</Link>
        </nav>
      </div>
    </header>
  );
}
