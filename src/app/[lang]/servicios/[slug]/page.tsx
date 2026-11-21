import '@/app/studio-detail.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { seoServices, serviceSlugs, type ServiceSlug } from '@/content/seo-services';
import { identity, isLanguage, languages, siteUrl } from '@/lib/site';

type Params = { params: Promise<{lang:string;slug:string}> };
export function generateStaticParams() { return languages.flatMap(lang => serviceSlugs.map(slug => ({lang,slug}))); }
export async function generateMetadata({ params }: Params): Promise<Metadata> {
 const {lang,slug} = await params;
 const service = seoServices[slug as ServiceSlug];
 if (!isLanguage(lang) || !service) notFound();
 const info = service[lang],path = '/servicios/' + slug;
 return {
  title:info.metaTitle,description:info.description,
  alternates:{canonical:'/' + lang + path,languages:{es:'/es'+path,en:'/en'+path,'x-default':'/es'+path}},
  openGraph:{title:info.metaTitle+' | Agustín Wojtyszyn',description:info.description,url:'/'+lang+path,images:[{url:'/opengraph-image',width:1200,height:630}]}
 };
}
export default async function ServicePage({params}:Params) {
 const {lang,slug}=await params;
 const service=seoServices[slug as ServiceSlug];
 if(!isLanguage(lang)||!service)notFound();
 const t=service[lang],es=lang==='es';
 const schema={
  '@context':'https://schema.org',
  '@type':'Service',name:t.title,description:t.description,serviceType:t.metaTitle,
  url:siteUrl+'/'+lang+'/servicios/'+slug,provider:{'@id':siteUrl+'/#person'},
  areaServed:{'@type':'Country',name:'Argentina'}
 };
 return <main id="main" className="at-page at-detail">
  <header className="at-detail-hero at-width">
   <Link className="at-detail-back" href={'/'+lang+'#services'}>{es?'Volver a servicios':'Back to services'} <span aria-hidden="true">↗</span></Link>
   <p className="at-context">{es?'Una experiencia diseñada para tu negocio':'An experience built for your business'}</p>
   <h1>{t.title}</h1>
   <p className="at-detail-lead">{t.intro}</p>
   <div className="at-detail-baseline"><span>{t.tag}</span><span>Agustín Wojtyszyn / {es?'San Juan, Argentina':'San Juan, Argentina'}</span></div>
  </header>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
  <section className="at-detail-overview"><div className="at-width">
   <div className="at-detail-section-head"><p>{es?'Qué puedo hacer':'What I can do'}</p><div><h2>{t.sectionTitle}</h2><p>{t.sectionText}</p></div></div>
   <div className="at-detail-benefits">{t.benefits.map((benefit,index)=><article key={benefit.title}><span>{String(index+1).padStart(2,'0')}</span><h3>{benefit.title}</h3><p>{benefit.text}</p></article>)}</div>
  </div></section>
  <section className="at-detail-process at-width">
   <div><p className="at-section-index">{es?'Cómo empezamos':'Where we start'}</p><h2>{t.processTitle}</h2></div>
   <p>{t.process}</p>
  </section>
  <section className="at-detail-faq"><div className="at-width">
   <div className="at-detail-section-head"><p>{es?'Preguntas frecuentes':'Common questions'}</p><div><h2>{t.faqTitle}</h2></div></div>
   <div className="at-detail-faq-list">{t.faq.map(({q,a},index)=><details key={q}><summary><span>{String(index+1).padStart(2,'0')}</span><strong>{q}</strong><i aria-hidden="true">+</i></summary><p>{a}</p></details>)}</div>
  </div></section>
  <aside className="at-detail-related at-width">
   <p>{es?'Explorá otros servicios':'Explore other services'}</p>
   <nav aria-label={es?'Otros servicios':'Related services'}>{serviceSlugs.filter(item=>item!==slug).map(item=><Link key={item} href={'/'+lang+'/servicios/'+item}>{seoServices[item][lang].metaTitle}<span aria-hidden="true">↗</span></Link>)}</nav>
  </aside>
  <section className="at-detail-convert"><div className="at-width">
   <p className="at-section-index">{es?'Demos el primer paso':'Let’s get started'}</p>
   <h2>{es?'Tu idea merece una versión extraordinaria.':'Your idea deserves an extraordinary version.'}</h2>
   <div className="at-detail-convert-actions">
    <Link className="at-action at-action--primary" href={'/'+lang+'#contact'}>{es?'Solicitar presupuesto':'Request a quote'}<span aria-hidden="true">↗</span></Link>
    <a className="at-text-link" href={'mailto:'+identity.email+'?subject='+encodeURIComponent(t.title)}>{identity.email}<span aria-hidden="true">↗</span></a>
   </div>
  </div></section>
  <footer className="at-footer"><div className="at-width">
   <div><strong>Agustín Wojtyszyn</strong><p>{es?'Diseño y desarrollo a medida':'Custom design and development'}</p></div>
   <nav aria-label={es?'Enlaces finales':'Footer links'}><Link href={'/'+lang}>{es?'Inicio':'Home'}</Link><Link href={'/'+lang+'/privacidad'}>{es?'Privacidad':'Privacy'}</Link><a href={identity.github} target="_blank" rel="noreferrer">GitHub</a></nav>
   <small>© {new Date().getFullYear()} / San Juan, Argentina</small>
  </div></footer>
 </main>;
}
