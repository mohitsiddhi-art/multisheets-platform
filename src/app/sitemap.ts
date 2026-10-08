import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://multisheets.com';

  const routes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/pincode`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/ifsc`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ];

  const dynamicRoutes = [
    '/pincode/700007', '/pincode/110001', '/pincode/400001',
    '/ifsc/SBIN0000001', '/ifsc/PUNB0000100', '/ifsc/HDFC0000001',
  ];

  const dynamicRouteEntries = dynamicRoutes.map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...dynamicRouteEntries];
}
