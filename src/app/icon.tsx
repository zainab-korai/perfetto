import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          background: "#123d2f",
          borderRadius: 14,
          fontFamily: "Georgia, serif",
        }}
      >
        <span style={{ fontSize: 38, color: "#e4c766", fontStyle: "italic" }}>P</span>
      </div>
    ),
    { ...size }
  );
}
