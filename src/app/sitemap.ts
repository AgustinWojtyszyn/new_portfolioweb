import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { languages,siteUrl } from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{return languages.flatMap(lang=>[{url:`${siteUrl}/${lang}`,alternates:{languages:{es:`${siteUrl}/es`,en:`${siteUrl}/en`}}},...projects.map(p=>({url:`${siteUrl}/${lang}/work/${p.slug}`,alternates:{languages:{es:`${siteUrl}/es/work/${p.slug}`,en:`${siteUrl}/en/work/${p.slug}`}}}))]);}
