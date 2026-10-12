"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Restrained section reveal. Content is fully visible in the server-rendered HTML
 * (good for search engines and no-JS visitors); only elements below the fold are
 * hidden after hydration and then faded in once as they enter the viewport.
 */
export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "pending" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setState("pending");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setState("shown"); io.disconnect(); }
    }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}
      style={state === "static" ? undefined : {
        opacity: state === "shown" ? 1 : 0,
        transform: state === "shown" ? "none" : "translateY(18px)",
        transition: `opacity .7s cubic-bezier(.2,.7,.1,1) ${delay}s, transform .7s cubic-bezier(.2,.7,.1,1) ${delay}s`,
      }}>
      {children}
    </div>
  );
}
