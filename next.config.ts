import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires an explicit allow-list of quality values.
    qualities: [70, 82],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
