import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';
import { identity,isLanguage,projectName } from '@/lib/site';
type Params={params:Promise<{lang:string;slug:string}>};
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Params):Promise<Metadata>{
 const {lang,slug}=await params;const p=projects.find(p=>p.slug===slug);
 if(!p||!isLanguage(lang))notFound();
 return {title:projectName(p.slug,p.name),description:p[lang].summary,alternates:{canonical:'/'+lang+'/work/'+slug,languages:{es:'/es/work/'+slug,en:'/en/work/'+slug}},openGraph:{title:projectName(p.slug,p.name)+' — Agustín Wojtyszyn',description:p[lang].summary,url:'/'+lang+'/work/'+slug,images:[{url:'/opengraph-image',width:1200,height:630}]}};
}
const labels={
 es:{back:'Volver a los trabajos',eyebrow:'UN PROYECTO REAL',challenge:'La necesidad',solution:'La solución',result:'Qué permite mejorar',tech:'Para quien quiera saber cómo está hecho',techNote:'Esta información es opcional: lo importante es cómo ayuda a las personas.',next:'Conocer otro trabajo',closingTitle:'¿Necesitás algo parecido para tu negocio?',closingText:'Podemos pensar una solución a medida, con las funciones que realmente necesitás.',cta:'Contame tu idea',email:'O escribime por correo',home:'Volver al inicio',footer:'Páginas web y aplicaciones a medida'},
 en:{back:'Back to projects',eyebrow:'A REAL PROJECT',challenge:'The challenge',solution:'The solution',result:'How it helps',tech:'Technical details, if you’re curious',techNote:'Optional information: what matters most is how it helps real people.',next:'See another project',closingTitle:'Need something like this for your business?',closingText:'We can plan a custom solution around what you actually need.',cta:'Tell me about your project',email:'Or send me an email',home:'Back to the homepage',footer:'Websites and custom applications'}
};
export default async function CaseStudy({params}:Params){
 const {lang,slug}=await params;const p=projects.find(item=>item.slug===slug);
 if(!p||!isLanguage(lang))notFound();
 const t=labels[lang],c=p[lang],name=projectName(p.slug,p.name);
 const business=projects.filter(item=>item.slug!=='rpg-premium');
 const next=business[(business.indexOf(p)+1)%business.length];
 return <main id="main" className="commercial-page cp-detail">
  <div className="cp-wrap cp-detail-header"><Link href={'/'+lang+'#work'} className="cp-detail-back">← {t.back}</Link><span className="cp-kicker">{t.eyebrow} / {c.category}</span><h1>{name}</h1><p>{c.summary}</p><div className="cp-detail-pills"><span>{lang==='es'?'Aplicación a medida':'Custom application'}</span><span>{lang==='es'?'Trabajo real':'Real use case'}</span></div></div>
  <section className="cp-detail-story cp-section"><div className="cp-wrap"><div className="cp-section-head"><span className="cp-kicker">{lang==='es'?'DE LA NECESIDAD A LA SOLUCIÓN':'FROM CHALLENGE TO SOLUTION'}</span><h2>{lang==='es'?'El objetivo era que todo fuera más simple.':'The goal was to make things simpler.'}</h2></div><div className="cp-detail-cards"><article><span>01</span><h2>{t.challenge}</h2><p>{c.context}</p></article><article><span>02</span><h2>{t.solution}</h2><p>{c.system}</p></article><article><span>03</span><h2>{t.result}</h2><p>{c.impact}</p></article></div><details className="cp-detail-technical"><summary>{t.tech}<span aria-hidden="true">+</span></summary><p>{t.techNote}</p><p>{c.engineering}</p><div>{p.stack.join(' · ')}</div></details></div></section>
  <section className="cp-wrap cp-detail-next"><div><span className="cp-kicker">{t.next}</span><Link href={'/'+lang+'/work/'+next.slug}>{projectName(next.slug,next.short)} ↗</Link></div></section>
  <section className="cp-contact"><div className="cp-wrap cp-detail-contact"><div><span className="cp-kicker">{lang==='es'?'HABLEMOS':'LET’S TALK'}</span><h2>{t.closingTitle}</h2><p>{t.closingText}</p><div className="cp-actions"><Link className="cp-btn cp-btn-dark" href={'/'+lang+'#contact'}>{t.cta} ↗</Link><a href={'mailto:'+identity.email} className="cp-contact-link">{t.email} ↗</a></div></div></div></section>
  <footer className="cp-footer cp-wrap"><div><strong>Agustín Wojtyszyn<span>.</span></strong><p>{t.footer}</p></div><div className="cp-footer-links"><Link href={'/'+lang}>{t.home} ↑</Link><a href={'mailto:'+identity.email}>Email ↗</a></div></footer>
 </main>;
}
