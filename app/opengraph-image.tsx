import { ImageResponse } from "next/og";

export const alt = "Business Technique Limited: Engineering intelligent solutions for a better tomorrow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const dots = [[120, 140], [300, 90], [460, 210], [980, 120], [1080, 300], [860, 480], [640, 520], [200, 460]];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 80,
        background: "radial-gradient(80% 80% at 80% 20%, #187063 0%, #0A1626 65%)", color: "white", position: "relative" }}>
        {dots.map(([x, y], i) => (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: i % 3 ? 10 : 16, height: i % 3 ? 10 : 16, borderRadius: 99, background: i % 4 ? "#4FC1AC" : "#E3B341" }} />
        ))}
        <div style={{ fontSize: 30, opacity: 0.8 }}>Business Technique Limited</div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, marginTop: 16, maxWidth: 950 }}>Engineering intelligent solutions for a better tomorrow.</div>
      </div>
    ),
    size,
  );
}
