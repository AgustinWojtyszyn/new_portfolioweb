'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Language } from '@/lib/site';

const labels = {
  es: {
    links: [['Inicio','experience'],['Ejemplos','work'],['Servicios','services'],['Cómo trabajo','process'],['Sobre mí','about']],
    start: 'Hablemos', skip: 'Ir al contenido principal', home: 'Inicio', menu: 'Menú', close: 'Cerrar menú'
  },
  en: {
    links: [['Home','experience'],['Concepts','work'],['Services','services'],['Process','process'],['About','about']],
    start: 'Let’s talk', skip: 'Skip to main content', home: 'Home', menu: 'Menu', close: 'Close menu'
  }
} as const;

export function Navigation({ lang }: { lang: Language }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = labels[lang];
  const home = '/' + lang;
  const href = (id: string) => home + '#' + id;

  return <>
    <a className="aw-skip" href="#main">{t.skip}</a>
    <header className="aw-header">
      <div className="aw-header-inner">
        <Link className="aw-logo" href={home} aria-label={'Agustín Wojtyszyn — ' + t.home} onClick={() => setMenuOpen(false)}>Agustín<span>✳</span>Wojtyszyn</Link>
        <nav className="aw-nav" aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}>
          {t.links.map(([name, id]) => <Link key={id} href={href(id)}>{name}</Link>)}
        </nav>
        <div className="aw-header-right">
          <div className="aw-languages" aria-label={lang === 'es' ? 'Idioma' : 'Language'}>
            {(['es','en'] as const).map(value => <Link key={value} lang={value} hrefLang={value} aria-current={lang === value ? 'page' : undefined} href={pathname.replace(/^\/(es|en)/, '/' + value)} onClick={() => setMenuOpen(false)}>{value.toUpperCase()}</Link>)}
          </div>
          <Link className="aw-nav-cta" href={href('contact')} onClick={() => setMenuOpen(false)}>{t.start} <span aria-hidden="true">↗</span></Link>
          <button className="aw-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="aw-mobile-navigation" aria-label={menuOpen ? t.close : t.menu} onClick={() => setMenuOpen(value => !value)}>
            <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>{t.menu}
          </button>
        </div>
      </div>
      {menuOpen && <nav id="aw-mobile-navigation" className="aw-mobile-nav" aria-label={lang === 'es' ? 'Navegación móvil' : 'Mobile navigation'}>
        {t.links.map(([name, id]) => <Link key={id} href={href(id)} onClick={() => setMenuOpen(false)}>{name}</Link>)}
        <Link href={href('contact')} onClick={() => setMenuOpen(false)}>{t.start} ↗</Link>
      </nav>}
    </header>
  </>;
}
