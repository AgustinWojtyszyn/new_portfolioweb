'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { StudioIcon } from '@/components/studio-icon';
import type { Language } from '@/lib/site';

const actualScreens=[
 {src:'/portfolio-evidence/servifood-quality-management.webp',es:{name:'Gestión de calidad',label:'VISTA DE MÓDULOS',description:'Información de distintas áreas, disponible en una misma aplicación.'},en:{name:'Quality management',label:'WORKSPACES',description:'Information from different teams in one application.'}},
 {src:'/portfolio-evidence/servifood-quality-analysis.webp',es:{name:'Análisis anual',label:'GRÁFICOS Y SEGUIMIENTO',description:'Análisis y filtros para entender la información sin revisar planillas dispersas.'},en:{name:'Annual analysis',label:'REPORTS & INSIGHTS',description:'Charts and filters that make information easier to understand.'}},
 {src:'/portfolio-evidence/servifood-quality-documents.webp',es:{name:'Documentación SGC',label:'DOCUMENTOS Y CONTROL',description:'Documentos organizados y accesibles para el trabajo cotidiano.'},en:{name:'Document management',label:'DOCUMENTS & CONTROL',description:'Organized documentation, accessible in everyday workflows.'}},
 {src:'/portfolio-evidence/servifood-quality-charts.webp',es:{name:'Indicadores',label:'INFORMACIÓN A LA VISTA',description:'Gráficos que permiten observar tendencias y categorías.'},en:{name:'Indicators',label:'INFORMATION AT A GLANCE',description:'Charts for exploring trends and categories.'}},
] as const;

const tr={
 es:{
  imageLabel:'Captura del proyecto ServiFood Análisis',real:'UNA APLICACIÓN REAL. NO UN MOCKUP.',pin:'DISEÑADO · DESARROLLADO · IMPLEMENTADO',release:'PROYECTOS EN PRODUCCIÓN',screen:'VISTA DE SISTEMA',heroAside:'Detrás de cada pantalla hay un problema resuelto.',
  title:'Menos promesas. Más trabajo que se puede ver.',eyebrow:'EL SOFTWARE, SIN HUMO',lead:'Estas pantallas pertenecen a una aplicación que desarrollé. No son diseños de muestra ni números inventados.',
  module:'SERVIFOOD / ANÁLISIS',note:'Capturas del propio repositorio de la aplicación. La interfaz puede haber evolucionado desde que se registraron.',goto:'Conocer el proyecto',view:'Ver vista',next:'Siguiente vista',previous:'Anterior vista',cover:'Imagen de interfaz',hint:'Explorá las vistas',heroCaption:'Diseño y desarrollo reales',enlarge:'Ampliar captura'
 },
 en:{
  imageLabel:'Screenshot from ServiFood Analytics',real:'A REAL APPLICATION. NOT A MOCKUP.',pin:'DESIGNED · BUILT · DELIVERED',release:'REAL PROJECTS',screen:'SYSTEM VIEW',heroAside:'Behind each screen is a problem being solved.',
  title:'Less talk. More work you can actually see.',eyebrow:'REAL SOFTWARE, NOT RENDERINGS',lead:'These screens come from an application I built. They are not concept art or fictional metrics.',
  module:'SERVIFOOD / ANALYTICS',note:'Screenshots from the application’s own repository. The live interface may have changed since they were captured.',goto:'Explore the project',view:'View screen',next:'Next screen',previous:'Previous screen',cover:'Interface screenshot',hint:'Explore the screens',heroCaption:'Real design and development',enlarge:'Enlarge screenshot'
 }
};
export function EvidenceHero({lang}:{lang:Language}){
 const t=tr[lang];
 return <figure className="aw-evidence-hero" aria-label={t.imageLabel}>
  <div className="aw-evidence-grid" aria-hidden="true"/>
  <div className="aw-evidence-hero-top"><span className="aw-evidence-bullet"/><span>{t.pin}</span><span>© AW</span></div>
  <div className="aw-evidence-backword" aria-hidden="true">01</div>
  <div className="aw-evidence-main-frame"><div className="aw-evidence-frame-top"><span><i/><i/><i/></span><span>servifood / quality / workspace</span><StudioIcon name="app"/></div><div className="aw-evidence-main-image"><Image src="/portfolio-evidence/servifood-quality-management.webp" alt={t.imageLabel} fill sizes="(max-width: 860px) 80vw, 560px" priority quality={85}/></div></div>
  <div className="aw-evidence-floating" aria-hidden="true"><div className="aw-evidence-floating-top">AW / 26 <StudioIcon name="arrow"/></div><b>BUILD<br/>WHAT<br/>MATTERS.</b><span>← 01 / 04</span></div>
  <div className="aw-evidence-bottom"><span>{t.screen}</span><span>{t.heroAside}</span></div>
 </figure>;
}

export function EvidenceCollection({lang}:{lang:Language}){
 const [index,setIndex]=useState(0);
 const [large,setLarge]=useState(false);
 const t=tr[lang];
 const item=actualScreens[index];
 return <section className="aw-evidence-section" id="evidence" aria-labelledby="aw-evidence-title">
  <div className="studio-container">
   <div className="aw-evidence-heading"><div className="aw-evidence-heading-label"><span className="aw-eyebrow-line"/>04 / {t.eyebrow}</div><div><h2 id="aw-evidence-title">{t.title}</h2><p>{t.lead}</p></div></div>
   <div className="aw-evidence-viewer">
    <div className="aw-evidence-viewer-main"><div className="aw-evidence-viewer-chrome"><span className="aw-signal-dot"/> {t.module}<span className="aw-evidence-viewer-number">0{index+1} / 04</span></div><button className="aw-evidence-shot" type="button" onClick={()=>setLarge(true)} aria-label={t.enlarge}><Image key={item.src} src={item.src} alt={item[lang].name+' — '+t.cover} fill sizes="(max-width: 850px) 90vw, 820px" quality={90}/><span className="aw-evidence-enlarge"><StudioIcon name="arrow"/>{t.enlarge}</span></button><div className="aw-evidence-viewer-foot"><span>{t.hint}</span><span><span className="aw-live-mark"/> {t.real}</span></div></div>
    <div className="aw-evidence-detail"><span className="aw-evidence-detail-kicker">{item[lang].label}</span><h3>{item[lang].name}</h3><p>{item[lang].description}</p><div className="aw-evidence-choices" role="group" aria-label={t.hint}>{actualScreens.map((v,i)=><button key={v.src} type="button" className={i===index?'is-selected':''} onClick={()=>setIndex(i)} aria-pressed={i===index}><span>0{i+1}</span><span>{v[lang].name}</span><StudioIcon name="arrow"/></button>)}</div><Link className="aw-evidence-project-link" href={'/'+lang+'/work/servifood-analytics'}>{t.goto}<StudioIcon name="arrow"/></Link><p className="aw-evidence-disclaimer">{t.note}</p></div>
   </div>
  </div>
  {large&&<div className="aw-evidence-lightbox" role="presentation" onClick={()=>setLarge(false)}><div role="dialog" aria-modal="true" aria-label={t.enlarge} className="aw-evidence-lightbox-inner" onClick={e=>e.stopPropagation()}><button type="button" className="aw-evidence-lightbox-close" onClick={()=>setLarge(false)} aria-label={lang==='es'?'Cerrar imagen':'Close image'}><StudioIcon name="close"/></button><div className="aw-evidence-lightbox-image"><Image src={item.src} alt={item[lang].name} fill sizes="95vw" quality={95}/></div><div className="aw-evidence-lightbox-bottom"><span>{item[lang].name}</span><div><button type="button" onClick={()=>setIndex(i=>(i+actualScreens.length-1)%actualScreens.length)} aria-label={t.previous}>←</button><button type="button" onClick={()=>setIndex(i=>(i+1)%actualScreens.length)} aria-label={t.next}>→</button></div></div></div></div>}
 </section>;
}

export function FeaturedEvidence({lang}:{lang:Language}){
 const label=lang==='es'?'CAPTURA DE LA APLICACIÓN':'APPLICATION SCREENSHOT';
 return <div className="aw-featured-evidence" aria-label={label}>
   <div className="aw-featured-evidence-rail"><span>QUALITY / SERVIFOOD</span><span>02 : 04</span></div>
   <div className="aw-featured-evidence-window"><div className="aw-featured-evidence-top"><span><i/><i/><i/></span> analytics / yearly-review <StudioIcon name="arrow"/></div><div className="aw-featured-evidence-image"><Image src="/portfolio-evidence/servifood-quality-analysis.webp" alt={label} fill sizes="(max-width: 768px) 90vw, 660px" quality={86}/></div></div>
   <span className="aw-featured-evidence-foot">AW / SELECTED WORK <span>↗</span></span>
 </div>;
}
export function CaseEvidence({lang}:{lang:Language}){
 return <div className="aw-case-evidence" aria-label={lang==='es'?'Captura real de la aplicación de Análisis de ServiFood':'Real screenshot of ServiFood Analytics'}>
  <div className="aw-case-evidence-title"><span>SF / ANALYTICS</span><span>{lang==='es'?'VISTA REAL':'REAL APPLICATION'}</span></div>
  <div className="aw-case-evidence-image"><Image src="/portfolio-evidence/servifood-quality-charts.webp" alt={lang==='es'?'Panel real de gráficos de la aplicación de Análisis':'Real analytics application charts'} fill sizes="(max-width: 900px) 90vw, 1000px" quality={88}/></div>
  <span className="aw-case-evidence-note">{lang==='es'?'CAPTURA ORIGINAL DEL PROYECTO':'ORIGINAL PROJECT SCREENSHOT'}</span>
 </div>;
}
