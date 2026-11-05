import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { AnalyticsConsent } from '@/components/analytics-consent';
import { identity, isLanguage, languages, siteUrl } from '@/lib/site';

export function generateStaticParams() { return languages.map(lang => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const es = lang === 'es';
  const title = es ? 'Desarrollo web en San Juan | Agustín Wojtyszyn' : 'Web Developer in Argentina | Agustín Wojtyszyn';
  const description = es
    ? 'Diseño y desarrollo páginas web profesionales, aplicaciones a medida y automatizaciones para comercios, profesionales y empresas. San Juan, Argentina. Pedí presupuesto.'
    : 'Custom websites, business applications and workflow automation by Agustín Wojtyszyn, an independent web developer based in San Juan, Argentina. Get in touch.';
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: '%s | Agustín Wojtyszyn' },
    description,
    alternates: { canonical: '/' + lang, languages: { es: '/es', en: '/en', 'x-default': '/es' } },
    openGraph: {
      type: 'website', locale: es ? 'es_AR' : 'en_US',
      alternateLocale: es ? 'en_US' : 'es_AR', siteName: 'Agustín Wojtyszyn',
      title, description, url: '/' + lang,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: es ? 'Páginas web y aplicaciones a medida' : 'Custom websites and applications' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
    robots: process.env.NODE_ENV === 'production'
      ? { index: true, follow: true, googleBot: { index: true, follow: true } }
      : { index: false, follow: true },
    verification: googleVerification ? { google: googleVerification } : undefined,
    icons: { icon: '/icon.svg' },
  };
}

export default async function LanguageLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite', '@id': siteUrl + '/#website', name: 'Agustín Wojtyszyn',
        url: siteUrl, inLanguage: ['es-AR', 'en-US'],
        publisher: { '@id': siteUrl + '/#person' },
      },
      {
        '@type': 'Person', '@id': siteUrl + '/#person',
        name: 'Agustín Wojtyszyn',
        url: siteUrl, jobTitle: lang === 'es' ? 'Desarrollador web full-stack' : 'Full-stack web developer',
        description: lang === 'es'
          ? 'Desarrollo de páginas web, aplicaciones a medida y automatización de procesos.'
          : 'Professional websites, custom business applications and workflow automation.',
        email: 'mailto:' + identity.email,
        address: { '@type': 'PostalAddress', addressLocality: 'San Juan', addressRegion: 'San Juan', addressCountry: 'AR' },
        sameAs: [identity.github, identity.linkedin],
      },
    ],
  };
  return <html lang={lang}><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <Navigation lang={lang} />
    {children}
    <AnalyticsConsent lang={lang} measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
  </body></html>;
}
