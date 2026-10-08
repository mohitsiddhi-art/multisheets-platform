import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use Turbopack explicitly to satisfy Next.js 16 requirements,
  // but keep an empty config to stop the error.
  turbopack: {},
  // Ensure webpack handles the asset compilation cleanly
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
