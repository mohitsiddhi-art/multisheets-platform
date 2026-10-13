import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/pincodes',
        destination: '/pincode',
        permanent: true,
      },
      {
        source: '/ifscs',
        destination: '/ifsc',
        permanent: true,
      },
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
