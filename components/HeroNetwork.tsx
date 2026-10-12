"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; z: number; vx: number; vy: number; r: number };
type Pulse = { a: number; b: number; t: number; speed: number };

const TEAL = "79,193,172";
const AMBER = "227,179,65";
const MIST = "220,230,227";

/**
 * Signature hero visual: a drifting research constellation.
 * Nodes sit at different depths for pointer parallax, nearby nodes connect,
 * and amber signals travel along the connections. Static when reduced motion is preferred,
 * paused off-screen and in background tabs.
 */
export function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, running = true, visible = true;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let links: [number, number][] = [];
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: false };
    let lastSpawn = 0;

    const seed = () => {
      const count = Math.round(Math.min(130, Math.max(38, (w * h) / 11000)));
      nodes = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * w, y: Math.random() * h, z,
          vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
          r: 0.8 + z * 2.2,
        };
      });
      pulses = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw(0);
    };

    const pos = (n: Node) => {
      const px = (pointer.x - 0.5) * 46 * (n.z + 0.2);
      const py = (pointer.y - 0.5) * 30 * (n.z + 0.2);
      return { x: n.x + px, y: n.y + py };
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const maxDist = Math.min(170, Math.max(110, w / 9));
      const lensX = pointer.x * w, lensY = pointer.y * h, lensR = 190;
      const P = nodes.map(pos);
      links = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = P[i].x - P[j].x, dy = P[i].y - P[j].y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist && Math.abs(nodes[i].z - nodes[j].z) < 0.5) {
            links.push([i, j]);
            const mx = (P[i].x + P[j].x) / 2, my = (P[i].y + P[j].y) / 2;
            const lens = pointer.active ? Math.max(0, 1 - Math.hypot(mx - lensX, my - lensY) / lensR) : 0;
            const alpha = (1 - d / maxDist) * (0.1 + 0.18 * (nodes[i].z + nodes[j].z) / 2) + lens * 0.35;
            ctx.strokeStyle = `rgba(${lens > 0.05 ? TEAL : MIST},${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.6 + lens * 0.8;
            ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y); ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i], p = P[i];
        const lens = pointer.active ? Math.max(0, 1 - Math.hypot(p.x - lensX, p.y - lensY) / lensR) : 0;
        const a = 0.35 + n.z * 0.5 + lens * 0.4;
        if (n.z > 0.82 || lens > 0.4) {
          ctx.fillStyle = `rgba(${TEAL},${(0.12 + lens * 0.15).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, n.r * 4, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = `rgba(${lens > 0.2 ? TEAL : MIST},${Math.min(1, a).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, n.r + lens * 1.5, 0, Math.PI * 2); ctx.fill();
      }

      // Signals travelling along connections
      if (!reduced && time - lastSpawn > 420 && links.length && pulses.length < 14) {
        const [a, b] = links[Math.floor(Math.random() * links.length)];
        pulses.push({ a, b, t: 0, speed: 0.006 + Math.random() * 0.008 });
        lastSpawn = time;
      }
      pulses = pulses.filter((s) => s.t <= 1);
      for (const s of pulses) {
        const A = P[s.a], B = P[s.b];
        if (!A || !B) { s.t = 2; continue; }
        const x = A.x + (B.x - A.x) * s.t, y = A.y + (B.y - A.y) * s.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, `rgba(${AMBER},0.95)`); g.addColorStop(1, `rgba(${AMBER},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill();
        s.t += s.speed;
      }
    };

    const step = (time: number) => {
      if (!running) return;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      for (const n of nodes) {
        n.x += n.vx * (0.4 + n.z); n.y += n.vy * (0.4 + n.z);
        if (n.x < -40) n.x = w + 40; else if (n.x > w + 40) n.x = -40;
        if (n.y < -40) n.y = h + 40; else if (n.y > h + 40) n.y = -40;
      }
      draw(time);
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
      pointer.active = e.pointerType === "mouse";
    };
    const onLeave = () => { pointer.active = false; pointer.tx = 0.5; pointer.ty = 0.5; };

    const start = () => { if (!reduced && visible && !document.hidden) { running = true; cancelAnimationFrame(raf); raf = requestAnimationFrame(step); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; visible ? start() : stop(); });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      start();
    } else {
      draw(0);
    }

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
