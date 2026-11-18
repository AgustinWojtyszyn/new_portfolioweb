'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Language } from '@/lib/site';

const labels = {
 es: { sections: [['Experiencia','experience'],['Enfoque','vision'],['Servicios','services'],['Sobre mí','about']], start:'Hablemos', skip:'Ir al contenido',home:'Inicio'},
 en: { sections: [['Experience','experience'],['Approach','vision'],['Services','services'],['About','about']], start:'Let’s talk',skip:'Skip to content',home:'Home'}
};

export function Navigation({ lang }: { lang: Language }) {
 const path=usePathname();
 const t=labels[lang];
 return <>
  <a className="vx-skip" href="#main">{t.skip}</a>
  <header className="vx-header">
   <div className="vx-header-shell">
    <Link className="vx-wordmark" href={'/'+lang} aria-label={'Agustín Wojtyszyn — '+t.home}>Agustín <span>Wojtyszyn</span></Link>
    <nav aria-label={lang==='es'?'Navegación principal':'Main navigation'} className="vx-navigation">
     {t.sections.map(([text,id])=><Link href={'/'+lang+'#'+id} key={id}>{text}</Link>)}
    </nav>
    <div className="vx-header-tools">
     <div className="vx-languages" aria-label={lang==='es'?'Idioma':'Language'}>{(['es','en'] as const).map(value=><Link key={value} lang={value} hrefLang={value} aria-current={lang===value?'page':undefined} href={path.replace(/^\/(es|en)/,'/'+value)}>{value.toUpperCase()}</Link>)}</div>
     <Link href={'/'+lang+'#contact'} className="vx-nav-contact">{t.start}<span aria-hidden="true">↗</span></Link>
    </div>
   </div>
  </header>
 </>;
}
