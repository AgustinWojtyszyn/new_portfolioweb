import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { identity, isLanguage, languages } from '@/lib/site';

type Params = { params: Promise<{ lang: string }> };
export function generateStaticParams() { return languages.map(lang => ({ lang })); }
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return {
    title: lang === 'es' ? 'Privacidad y medición de visitas' : 'Privacy and visitor analytics',
    description: lang === 'es'
      ? 'Cómo funciona el contacto y la medición opcional de visitas en el sitio de Agustín Wojtyszyn.'
      : 'How optional website analytics and email contact work on Agustín Wojtyszyn’s website.',
    alternates: { canonical: '/' + lang + '/privacidad',
      languages: { es: '/es/privacidad', en: '/en/privacidad', 'x-default': '/es/privacidad' } },
  };
}

export default async function PrivacyPage({ params }: Params) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const es = lang === 'es';
  return <main id="main" className="studio-page studio-case">
    <header className="studio-container studio-case-hero">
      <Link href={'/' + lang} className="studio-case-back">← {es ? 'Volver al inicio' : 'Back home'}</Link>
      <div className="studio-case-tag">{es ? 'INFORMACIÓN DE PRIVACIDAD' : 'PRIVACY INFORMATION'}</div>
      <h1>{es ? 'Privacidad y medición' : 'Privacy and analytics'}</h1>
      <p>{es ? 'Información clara sobre lo que ocurre al visitar esta página o intentar contactarme.' : 'How visiting this website and contacting me works.'}</p>
    </header>
    <section className="studio-container seo-service-content">
      <h2>{es ? 'Contacto por correo' : 'Email contact'}</h2>
      <p className="seo-service-paragraph">{es
        ? 'El formulario de consulta prepara un mensaje en tu aplicación de correo. La página no almacena ni envía los datos del formulario a una base de datos. El correo se envía únicamente si elegís enviarlo desde tu propia aplicación.'
        : 'The inquiry form prepares a message in your email app. This website does not store or submit form data to a database. An email is sent only if you choose to send it from your own app.'}</p>
      <h2>{es ? 'Estadísticas opcionales' : 'Optional analytics'}</h2>
      <p className="seo-service-paragraph">{es
        ? 'Si la medición está activada, Google Analytics 4 solo se carga cuando elegís «Aceptar medición». Puede utilizar cookies o identificadores para analizar visitas. Si elegís «No, gracias», no se carga el script de Analytics. Tu decisión se guarda en el almacenamiento local de este navegador.'
        : 'If analytics is configured, Google Analytics 4 loads only after you select “Accept analytics”. It may use cookies or identifiers to measure site visits. Selecting “No, thanks” does not load the Analytics script. Your choice is stored locally in this browser.'}</p>
      <h2>{es ? 'Cambiar la decisión' : 'Change your choice'}</h2>
      <p className="seo-service-paragraph">{es
        ? 'Podés borrar los datos del sitio desde la configuración de tu navegador. La próxima vez que visites la página, podrás elegir de nuevo.'
        : 'You can clear site data in your browser settings. On your next visit, you will be able to choose again.'}</p>
      <h2>{es ? 'Consultas sobre privacidad' : 'Privacy inquiries'}</h2>
      <p className="seo-service-paragraph"><a href={'mailto:' + identity.email}>{identity.email}</a></p>
    </section>
  </main>;
}
