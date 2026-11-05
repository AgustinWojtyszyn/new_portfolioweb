import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// The production domain remains crawlable even when SITE_URL is unset.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', ...(process.env.NODE_ENV === 'production' ? { allow: '/' } : { disallow: '/' }) },
    sitemap: siteUrl + '/sitemap.xml',
    host: siteUrl,
  };
}
