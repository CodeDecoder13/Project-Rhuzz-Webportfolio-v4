import { ImageResponse } from "next/og";

export const alt = "Rhuzzel Paramio — Full-stack Engineer / QA Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Flexbox only (ImageResponse has no grid); system font keeps the bundle small.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "linear-gradient(180deg,#F2F6FB 0%,#B7D0F0 100%)",
          color: "#0B1B33",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, color: "#1F5FBF", display: "flex" }}>PORTFOLIO</div>
        <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 1, display: "flex" }}>RHUZZEL PARAMIO</div>
        <div style={{ fontSize: 40, marginTop: 16, display: "flex" }}>Full-stack Engineer / QA Specialist</div>
      </div>
    ),
    size,
  );
}
