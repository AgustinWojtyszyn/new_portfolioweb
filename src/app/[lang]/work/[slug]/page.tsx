import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';
import { identity,isLanguage,projectName } from '@/lib/site';
import { StudioIcon } from '@/components/studio-icon';
type Params={params:Promise<{lang:string;slug:string}>};
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Params):Promise<Metadata>{
 const {lang,slug}=await params;const p=projects.find(item=>item.slug===slug);
 if(!p||!isLanguage(lang))notFound();
 const name=projectName(p.slug,p.name);
 return {title:name,description:p[lang].summary,alternates:{canonical:'/'+lang+'/work/'+slug,languages:{es:'/es/work/'+slug,en:'/en/work/'+slug}},openGraph:{title:name+' — Agustín Wojtyszyn',description:p[lang].summary,url:'/'+lang+'/work/'+slug,images:[{url:'/opengraph-image',width:1200,height:630}]}};
}
const labels={
 es:{back:'Volver a los trabajos',tag:'UN CASO REAL',what:'De una necesidad a una solución concreta.',intro:'No es una demostración inventada: este proyecto nació para resolver una necesidad de trabajo.',challenge:'El problema',solution:'Lo que desarrollé',impact:'Qué permite hacer',tech:'Ver detalles técnicos',next:'También podés conocer',callLabel:'¿TENÉS UN PROYECTO EN MENTE?',call:'Hagamos algo útil para tu negocio.',callText:'Contame qué necesitás y vemos qué solución tiene sentido para vos.',cta:'Empecemos a hablar',mail:'Escribirme por correo',home:'Volver al inicio',footer:'Páginas web y aplicaciones a medida'},
 en:{back:'Back to projects',tag:'A REAL CASE STUDY',what:'From a real need to a practical solution.',intro:'This is not an invented demo: the project was built to solve a real workflow problem.',challenge:'The problem',solution:'What I built',impact:'What it makes possible',tech:'Show technical details',next:'You might also like',callLabel:'HAVE A PROJECT IN MIND?',call:'Let’s build something useful.',callText:'Tell me what you need and we’ll find a solution that makes sense for your business.',cta:'Let’s talk',mail:'Send me an email',home:'Back home',footer:'Websites and custom applications'}
};
export default async function CaseStudy({params}:Params){
 const {lang,slug}=await params;const p=projects.find(item=>item.slug===slug);
 if(!p||!isLanguage(lang))notFound();
 const t=labels[lang],c=p[lang],name=projectName(p.slug,p.name);
 const business=projects.filter(item=>item.slug!=='rpg-premium');
 const next=business[(Math.max(0,business.indexOf(p))+1)%business.length];
 const sections=[{index:'01',title:t.challenge,body:c.context},{index:'02',title:t.solution,body:c.system},{index:'03',title:t.impact,body:c.impact}];
 return <main id="main" className="studio-page studio-case">
  <div className="studio-container studio-case-hero"><Link href={'/'+lang+'#work'} className="studio-case-back">← {t.back}</Link><div className="studio-case-tag">{t.tag}<span>/</span>{c.category}</div><h1>{name}</h1><p>{c.summary}</p><div className="studio-case-rule"><span>{t.intro}</span><span>AW / WORK</span></div></div>
  <section className="studio-container studio-case-body"><div className="studio-section-intro"><span className="studio-eyebrow">01 / {t.tag}</span><div><h2>{t.what}</h2></div></div>
   <div className="studio-case-chapters">{sections.map(item=><article key={item.index}><div className="studio-case-chapter-index">{item.index}<span>{item.title}</span></div><p>{item.body}</p></article>)}</div>
   <details className="studio-case-tech"><summary>{t.tech}<span aria-hidden="true">+</span></summary><p>{c.engineering}</p><div>{p.stack.join(' / ')}</div></details>
  </section>
  <section className="studio-case-next"><div className="studio-container"><span className="studio-eyebrow">{t.next}</span><Link href={'/'+lang+'/work/'+next.slug}>{projectName(next.slug,next.name)}<StudioIcon name="arrow"/></Link></div></section>
  <section id="contact" className="studio-contact"><div className="studio-container studio-contact-inner"><span className="studio-eyebrow">{t.callLabel}</span><h2>{t.call}</h2><p>{t.callText}</p><div className="studio-contact-actions"><Link href={'/'+lang+'#contact'} className="studio-button studio-button-light">{t.cta}<StudioIcon name="arrow"/></Link><a href={'mailto:'+identity.email} className="studio-contact-email"><StudioIcon name="mail"/>{t.mail}</a></div></div></section>
  <footer className="studio-footer"><div className="studio-container"><div><strong>Agustín Wojtyszyn<span>.</span></strong><p>{t.footer}</p></div><div className="studio-footer-links"><Link href={'/'+lang}>{t.home} ↑</Link><a href={'mailto:'+identity.email}>Email <StudioIcon name="arrow"/></a></div><small>© {new Date().getFullYear()}</small></div></footer>
 </main>;
}
