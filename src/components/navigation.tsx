'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Language } from '@/lib/site';

const translations = {
 es: { links: [['Experiencia','experience'],['Laboratorio','laboratory'],['Servicios','services'],['Cómo trabajo','approach']], inquiry: 'Empezar un proyecto', menu: 'Abrir menú', close: 'Cerrar menú', skip: 'Ir al contenido', home: 'Inicio' },
 en: { links: [['Experience','experience'],['Playground','laboratory'],['Services','services'],['Approach','approach']], inquiry: 'Start a project', menu: 'Open menu', close: 'Close menu', skip: 'Skip to content', home: 'Home' }
};
export function Navigation({ lang }: { lang: Language }) {
 const t = translations[lang];
 const path = usePathname();
 const [open, setOpen] = useState(false);
 useEffect(() => {
  const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) {setOpen(false);document.getElementById('at-menu-toggle')?.focus();} };
  window.addEventListener('keydown',onEscape);
  return () => window.removeEventListener('keydown',onEscape);
 }, [open]);
 return <>
  <a className="at-skip" href="#main">{t.skip}</a>
  <header className="at-header">
   <div className="at-header-inner">
    <Link href={'/' + lang} className="at-brand" aria-label={'Agustín Wojtyszyn — ' + t.home} onClick={() => setOpen(false)}>Agustín<span> Wojtyszyn</span><span className="at-brand-period">.</span></Link>
    <nav className={open ? 'at-nav is-open' : 'at-nav'} id="at-navigation" aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}>
     {t.links.map(([label,id]) => <Link key={id} href={'/' + lang + '#' + id} onClick={() => setOpen(false)}>{label}</Link>)}
     <Link href={'/' + lang + '#contact'} className="at-nav-mobile-cta" onClick={() => setOpen(false)}>{t.inquiry}</Link>
    </nav>
    <div className="at-header-end">
     <div className="at-language" aria-label={lang === 'es' ? 'Idioma' : 'Language'}>{(['es','en'] as const).map(value => <Link key={value} href={path.replace(/^\/(es|en)/, '/' + value)} hrefLang={value} lang={value} aria-current={lang === value ? 'page' : undefined} onClick={() => setOpen(false)}>{value.toUpperCase()}</Link>)}</div>
     <Link className="at-nav-cta" href={'/' + lang + '#contact'}>{t.inquiry}<span aria-hidden="true">↗</span></Link>
     <button type="button" className={open ? 'at-menu-toggle is-active' : 'at-menu-toggle'} id="at-menu-toggle" aria-expanded={open} aria-controls="at-navigation" aria-label={open ? t.close : t.menu} onClick={() => setOpen(value => !value)}><span/><span/></button>
    </div>
   </div>
  </header>
 </>;
}
