import type { MetadataRoute } from 'next';
import { serviceSlugs } from '@/content/seo-services';
import { languages, siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', ...serviceSlugs.map(slug => '/servicios/' + slug)];
  return languages.flatMap(lang => paths.map(path => ({
    url: siteUrl + '/' + lang + path,
    alternates: { languages: {
      es: siteUrl + '/es' + path,
      en: siteUrl + '/en' + path,
      'x-default': siteUrl + '/es' + path,
    } },
  })));
}
