'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect,useState } from 'react';
import type { CSSProperties } from 'react';
import type { Language } from '@/lib/site';
function NavIcon({name}:{name:'arrow-up-right'|'menu'|'xmark'}){const image='/iconoir/'+name+'.svg';return <span className="studio-icon" aria-hidden="true" style={{maskImage:'url('+image+')',WebkitMaskImage:'url('+image+')'} as CSSProperties}/>;}
const labels={
 es:{nav:['Servicios','Trabajos','Cómo trabajo','Contacto'],brand:'DISEÑO Y DESARROLLO',contact:'Hablemos',menu:'Abrir menú',close:'Cerrar menú',skip:'Saltar al contenido'},
 en:{nav:['Services','Work','Process','Contact'],brand:'DESIGN & DEVELOPMENT',contact:'Let’s talk',menu:'Open menu',close:'Close menu',skip:'Skip to content'}
};
const anchors=['services','work','process','contact'];
const switchKey='studio:language-switch';
export function Navigation({lang}:{lang:Language}){
 const t=labels[lang],path=usePathname();const [open,setOpen]=useState(false);
 useEffect(()=>{const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'&&open){setOpen(false);document.getElementById('studio-menu-toggle')?.focus();}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape);},[open]);
 useEffect(()=>{if(sessionStorage.getItem(switchKey)!=='1')return;sessionStorage.removeItem(switchKey);requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'auto'}));},[path,lang]);
 const languageChange=(next:Language)=>{if(next===lang)return;sessionStorage.setItem(switchKey,'1');setOpen(false);};
 return <><a className="skip-link" href="#main">{t.skip}</a><header className="studio-header"><div className="studio-nav-inner">
  <Link href={'/'+lang} className="studio-brand" aria-label="Agustín Wojtyszyn — Home" onClick={()=>setOpen(false)}><span className="studio-brand-mark">aw</span><span className="studio-brand-text"><strong>Agustín Wojtyszyn</strong><small>{t.brand}</small></span></Link>
  <nav id="main-navigation" className={open?'studio-main-nav is-open':'studio-main-nav'} aria-label={lang==='es'?'Navegación principal':'Main navigation'}>{t.nav.map((label,i)=><Link key={label} href={'/'+lang+'#'+anchors[i]} onClick={()=>setOpen(false)}>{label}</Link>)}</nav>
  <div className="studio-nav-right"><div className="studio-language" aria-label={lang==='es'?'Idioma':'Language'}>{(['es','en'] as const).map(l=><Link key={l} href={path.replace(/^\/(es|en)/,'/'+l)} hrefLang={l} lang={l} scroll={true} aria-current={lang===l?'page':undefined} onClick={()=>languageChange(l)}>{l.toUpperCase()}</Link>)}</div><Link href={'/'+lang+'#contact'} className="studio-nav-cta" onClick={()=>setOpen(false)}>{t.contact}<NavIcon name="arrow-up-right"/></Link><button id="studio-menu-toggle" type="button" className="studio-menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open?t.close:t.menu} onClick={()=>setOpen(x=>!x)}><NavIcon name={open?'xmark':'menu'}/></button></div>
 </div></header></>;
}
