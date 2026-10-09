import { ImageResponse } from "next/og";
import { themeColors, themeSwatches } from "@/lib/theme";

const [, gold] = themeSwatches.ember;

/**
 * Home-screen icon: the nav monogram (gold "B" in a hairline ring) on the
 * default theme's background. Maskable icons keep the mark inside the central
 * safe zone so Android's circle/squircle crop never clips it; iOS rounds the
 * corners itself, so the square is filled edge to edge.
 */
export function appIcon(size: number, { maskable = false } = {}) {
  const ring = Math.round(size * (maskable ? 0.5 : 0.66));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: themeColors.ember,
        }}
      >
        <div
          style={{
            width: ring,
            height: ring,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: `${Math.max(2, Math.round(size / 90))}px solid ${gold}`,
            background: "rgba(197, 160, 89, 0.12)",
            color: gold,
            fontSize: Math.round(ring * 0.56),
            fontStyle: "italic",
            lineHeight: 1,
          }}
        >
          B
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
