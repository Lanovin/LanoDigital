import { ImageResponse } from "next/og";
import { getContent } from "@/content/store";

export const alt = "LanoDigital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Náhled při sdílení odkazu. Ploché barvy webu, žádné efekty:
 * oranžový papír, černý inkoust, cihlově červená tečka u názvu.
 */
export default async function Image() {
  const { site } = await getContent();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#e6a66c",
          color: "#1a120c",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 56, fontWeight: 800 }}>
          <span>{site.name}</span>
          <span style={{ width: 22, height: 22, borderRadius: 11, background: "#b8391a", marginLeft: 12 }} />
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 1.02, maxWidth: 1000 }}>
          {site.tagline}
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#4a3628" }}>
          Webové stránky, e-shopy a aplikace pro malé firmy
        </div>
      </div>
    ),
    { ...size },
  );
}
