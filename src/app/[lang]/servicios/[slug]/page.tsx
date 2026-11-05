import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { seoServices, serviceSlugs, type ServiceSlug } from '@/content/seo-services';
import { identity, isLanguage, languages, siteUrl } from '@/lib/site';
import { StudioIcon } from '@/components/studio-icon';

type Params = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return languages.flatMap(lang => serviceSlugs.map(slug => ({ lang, slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  const service = seoServices[slug as ServiceSlug];
  if (!isLanguage(lang) || !service) notFound();
  const info = service[lang];
  const path = '/servicios/' + slug;
  return {
    title: info.metaTitle,
    description: info.description,
    alternates: { canonical: '/' + lang + path, languages: {
      es: '/es' + path, en: '/en' + path, 'x-default': '/es' + path,
    } },
    openGraph: { title: info.metaTitle + ' | Agustín Wojtyszyn', description: info.description,
      url: '/' + lang + path, images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
  };
}

export default async function ServicePage({ params }: Params) {
  const { lang, slug } = await params;
  const service = seoServices[slug as ServiceSlug];
  if (!isLanguage(lang) || !service) notFound();
  const t = service[lang];
  const es = lang === 'es';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t.title,
    description: t.description,
    serviceType: t.metaTitle,
    url: siteUrl + '/' + lang + '/servicios/' + slug,
    provider: { '@id': siteUrl + '/#person' },
    areaServed: { '@type': 'Country', name: 'Argentina' },
  };
  return <main id="main" className="studio-page studio-case">
    <header className="studio-container studio-case-hero">
      <Link href={'/' + lang + '#services'} className="studio-case-back">
        ← {es ? 'Volver a los servicios' : 'Back to services'}
      </Link>
      <div className="studio-case-tag">{t.tag}<span>/</span> AGUSTÍN WOJTYSZYN</div>
      <h1>{t.title}</h1>
      <p>{t.intro}</p>
      <div className="studio-case-rule"><span>{es ? 'Desarrollo a medida · San Juan, Argentina' : 'Custom development · San Juan, Argentina'}</span><span>AW / SERVICES</span></div>
    </header>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className="studio-container seo-service-content">
      <div className="studio-section-intro"><span className="studio-eyebrow">01 / {es ? 'EN QUÉ TE AYUDO' : 'HOW I CAN HELP'}</span>
        <div><h2>{t.sectionTitle}</h2><p>{t.sectionText}</p></div></div>
      <div className="seo-benefits">{t.benefits.map((benefit, i) => <article key={benefit.title}>
        <span>0{i + 1}</span><h3>{benefit.title}</h3><p>{benefit.text}</p>
      </article>)}</div>
      <div className="studio-section-intro"><span className="studio-eyebrow">02 / {es ? 'EL PROCESO' : 'THE PROCESS'}</span>
        <div><h2>{t.processTitle}</h2></div></div>
      <p className="seo-service-paragraph">{t.process}</p>
      <div className="studio-faq"><div><span className="studio-eyebrow">03 / FAQ</span><h2>{t.faqTitle}</h2></div>
        <div>{t.faq.map((item, i) => <details key={item.q}>
          <summary><span className="studio-faq-number">0{i + 1}</span><strong>{item.q}</strong><span className="studio-faq-toggle" aria-hidden="true">+</span></summary>
          <p>{item.a}</p>
        </details>)}</div></div>
    </section>
    <section className="studio-case-next"><div className="studio-container">
      <span className="studio-eyebrow">{es ? 'OTROS SERVICIOS' : 'OTHER SERVICES'}</span>
      <nav className="seo-related-links" aria-label={es ? 'Otros servicios' : 'Other services'}>
        {serviceSlugs.filter(item => item !== slug).map(item =>
          <Link key={item} href={'/' + lang + '/servicios/' + item}>{seoServices[item][lang].metaTitle}</Link>)}
      </nav>
    </div></section>
    <section className="studio-contact"><div className="studio-container studio-contact-inner">
      <span className="studio-eyebrow">{es ? 'CONTAME TU IDEA' : 'TELL ME YOUR IDEA'}</span>
      <h2>{es ? '¿Hablamos de tu proyecto?' : 'Have a project in mind?'}</h2>
      <p>{es ? 'Te propongo una solución concreta según lo que necesites, sin compromiso inicial.' : 'Tell me your needs and we can discuss a clear, practical approach.'}</p>
      <div className="studio-contact-actions">
        <Link href={'/' + lang + '#contact'} className="studio-button studio-button-light">
          {es ? 'Solicitar presupuesto' : 'Request a quote'}<StudioIcon name="arrow" />
        </Link>
        <a href={'mailto:' + identity.email + '?subject=' + encodeURIComponent(t.title)} className="studio-contact-email">
          <StudioIcon name="mail" />{identity.email}
        </a>
      </div>
    </div></section>
    <footer className="studio-footer seo-service-footer"><div className="studio-container">
      <div><strong>Agustín Wojtyszyn<span>.</span></strong><p>{es ? 'Páginas web y aplicaciones a medida' : 'Websites and custom applications'}</p></div>
      <div className="studio-footer-links"><Link href={'/' + lang}>{es ? 'Inicio' : 'Home'} ↑</Link>
        <Link href={'/' + lang + '/privacidad'}>{es ? 'Privacidad' : 'Privacy'}</Link></div>
      <small>© {new Date().getFullYear()}</small>
    </div></footer>
  </main>;
}
