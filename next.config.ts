import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Docker build sets NEXT_OUTPUT=standalone; Netlify builds keep the default output.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  // Let the dev server answer HMR and dev-asset requests through the Cloudflare tunnel.
  allowedDevOrigins: ["sstechservice.online", "*.sstechservice.online"],
  images: {
    // Next 16 requires an explicit allow-list of quality values.
    qualities: [70, 82],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
