import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure webpack handles the asset compilation cleanly
  webpack: (config) => {
    return config;
  },
  // Ensure large JSON data files don't exhaust Node heap
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;
