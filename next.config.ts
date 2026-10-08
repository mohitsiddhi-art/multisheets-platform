import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/holidays',
        destination: '/#holidays',
        permanent: true,
      },
      {
        source: '/calculator',
        destination: '/#tools',
        permanent: true,
      },
      {
        source: '/tools/validator',
        destination: '/#tools',
        permanent: true,
      },
      {
        source: '/quiz',
        destination: '/#quiz',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
