import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { ogImage } from "@/lib/seo";

// Default share image for every page (link previews on social, texts, Slack).
export const alt = ogImage.alt;
export const size = { width: ogImage.width, height: ogImage.height };
export const contentType = "image/png";

const ink = "#0e2a47";
const paper = "#f6f4ee";
const caution = "#ffd60a";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: paper,
        color: ink,
        // Blueprint grid, matching the site's hero.
        backgroundImage: `linear-gradient(to right, rgba(14,42,71,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,42,71,0.08) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, letterSpacing: 4 }}>
        {site.name.toUpperCase()} / {site.location.toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 92,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: -2,
        }}
      >
        <span>Stop losing jobs</span>
        <span>to voicemail.</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            display: "flex",
            background: caution,
            border: `3px solid ${ink}`,
            boxShadow: `8px 8px 0 0 ${ink}`,
            padding: "14px 28px",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          Websites + lead systems for home services
        </div>
      </div>
    </div>,
    size,
  );
}
