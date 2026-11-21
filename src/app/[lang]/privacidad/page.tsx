import '@/app/studio-detail.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { identity, isLanguage, languages } from '@/lib/site';

type Params={params:Promise<{lang:string}>};
export function generateStaticParams(){return languages.map(lang=>({lang}));}
export async function generateMetadata({params}:Params):Promise<Metadata>{
 const {lang}=await params;
 if(!isLanguage(lang))notFound();
 return {
  title:lang==='es'?'Privacidad y medición de visitas':'Privacy and visitor analytics',
  description:lang==='es'?'Cómo funciona el contacto y la medición opcional de visitas en el sitio de Agustín Wojtyszyn.':'How optional website analytics and email contact work on Agustín Wojtyszyn’s website.',
  alternates:{canonical:'/'+lang+'/privacidad',languages:{es:'/es/privacidad',en:'/en/privacidad','x-default':'/es/privacidad'}}
 };
}
export default async function PrivacyPage({params}:Params){
 const {lang}=await params;
 if(!isLanguage(lang))notFound();
 const es=lang==='es';
 const blocks=es?[
  ['Contacto por correo','El formulario de consulta prepara un mensaje en tu aplicación de correo. La página no almacena ni envía los datos del formulario a una base de datos. El correo se envía únicamente si elegís enviarlo desde tu propia aplicación.'],
  ['Estadísticas opcionales','Si la medición está activada, Google Analytics 4 solo se carga cuando elegís «Aceptar medición». Puede utilizar cookies o identificadores para analizar visitas. Si elegís «No, gracias», no se carga el script de Analytics. Tu decisión se guarda en el almacenamiento local de este navegador.'],
  ['Cambiar la decisión','Podés borrar los datos del sitio desde la configuración de tu navegador. La próxima vez que visites la página, podrás elegir de nuevo.'],
 ]:[
  ['Email contact','The inquiry form prepares a message in your email app. This website does not store or submit form data to a database. An email is sent only if you choose to send it from your own app.'],
  ['Optional analytics','If analytics is configured, Google Analytics 4 loads only after you select “Accept analytics”. It may use cookies or identifiers to measure site visits. Selecting “No, thanks” does not load the Analytics script. Your choice is stored locally in this browser.'],
  ['Change your choice','You can clear site data in your browser settings. On your next visit, you will be able to choose again.']
 ];
 return <main id="main" className="at-page at-privacy">
  <header className="at-width at-privacy-heading">
   <Link className="at-detail-back" href={'/'+lang}>{es?'Volver al inicio':'Back home'}<span aria-hidden="true">↗</span></Link>
   <p className="at-section-index">{es?'Información clara':'Clear information'}</p>
   <h1>{es?'Privacidad y medición':'Privacy and analytics'}</h1>
   <p>{es?'Qué ocurre al visitar esta web o al contactarme.':'How visiting this website and contacting me works.'}</p>
  </header>
  <div className="at-privacy-content">
   <div className="at-width">{blocks.map(([title,body],index)=><section key={title}><span>{String(index+1).padStart(2,'0')}</span><div><h2>{title}</h2><p>{body}</p></div></section>)}
    <section><span>04</span><div><h2>{es?'Consultas sobre privacidad':'Privacy inquiries'}</h2><p><a href={'mailto:'+identity.email}>{identity.email}</a></p></div></section>
   </div>
  </div>
  <footer className="at-footer"><div className="at-width"><div><strong>Agustín Wojtyszyn</strong><p>{es?'Desarrollo web independiente':'Independent web development'}</p></div><nav aria-label={es?'Enlaces finales':'Footer links'}><Link href={'/'+lang}>{es?'Inicio':'Home'}</Link><a href={identity.github} target="_blank" rel="noreferrer">GitHub</a></nav><small>© {new Date().getFullYear()} / San Juan, Argentina</small></div></footer>
 </main>;
}
