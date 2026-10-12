import type { ArchitectureLayer } from "@/content/solutions";

/** Layered architecture diagram rendered as accessible SVG with a text equivalent. */
export function ArchitectureDiagram({ layers, title }: { layers: ArchitectureLayer[]; title: string }) {
  const colW = 220, gap = 60, boxH = 44, top = 56;
  const maxItems = Math.max(...layers.map((l) => l.items.length));
  const width = layers.length * colW + (layers.length - 1) * gap;
  const height = top + maxItems * (boxH + 14) + 20;
  const midY = top + ((maxItems - 1) * (boxH + 14)) / 2 + boxH / 2;
  const id = title.replace(/\W+/g, "-").toLowerCase();

  return (
    <figure className="rounded-panel bg-white p-5 ring-1 ring-ink/10 sm:p-8">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[640px]" role="img" aria-labelledby={`${id}-cap`}>
          <defs>
            <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0L10 5L0 10z" className="fill-signal" />
            </marker>
          </defs>
          {layers.map((layer, i) => {
            const x = i * (colW + gap);
            return (
              <g key={layer.label}>
                <text x={x} y={22} className="fill-slate font-sans" fontSize="15" fontWeight="600">{layer.label}</text>
                <line x1={x} x2={x + colW} y1={34} y2={34} className="stroke-mist" strokeWidth="2" />
                {layer.items.map((item, j) => (
                  <g key={item}>
                    <rect x={x} y={top + j * (boxH + 14)} width={colW} height={boxH} rx="12"
                      className={i === layers.length - 1 ? "fill-ink" : "fill-paper stroke-ink/15"} strokeWidth="1" />
                    <text x={x + 16} y={top + j * (boxH + 14) + 28} fontSize="15"
                      className={`font-sans ${i === layers.length - 1 ? "fill-white" : "fill-ink"}`}>{item}</text>
                  </g>
                ))}
                {i < layers.length - 1 && (
                  <line x1={x + colW + 8} x2={x + colW + gap - 8} y1={midY} y2={midY}
                    className="stroke-signal" strokeWidth="2" markerEnd={`url(#${id}-arrow)`} />
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption id={`${id}-cap`} className="mt-5 text-sm text-slate">
        Indicative architecture for {title}:{" "}
        {layers.map((l) => `${l.label} (${l.items.join(", ")})`).join(", then ")}.
      </figcaption>
    </figure>
  );
}
