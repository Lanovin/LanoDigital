import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: černý čtverec s oranžovým L a červenou tečkou, jako název webu. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a120c",
          color: "#e6a66c",
          fontSize: 46,
          fontWeight: 800,
          position: "relative",
        }}
      >
        L
        <span
          style={{ position: "absolute", right: 9, bottom: 12, width: 11, height: 11, borderRadius: 6, background: "#b8391a" }}
        />
      </div>
    ),
    { ...size },
  );
}
