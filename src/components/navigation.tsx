'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getContent } from '@/content/site';
import type { Language } from '@/lib/site';
const anchors = ['work', 'experience', 'stack', 'about', 'contact'];
export function Navigation({ lang }: { lang: Language }) {
 const t = getContent(lang); const path = usePathname();
 const [open, setOpen] = useState(false);
 useEffect(() => {
  const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); document.getElementById('menu-toggle')?.focus(); } };
  window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape);
 }, []);
 return <><a className="skip-link" href="#main">{t.skip}</a><header className="site-header"><div className="nav-inner">
  <Link href={`/${lang}`} className="brand" aria-label="Agustín Wojtyszyn — Home">aw<span>.</span></Link>
  <nav id="main-navigation" aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'} className={open ? 'main-nav is-open' : 'main-nav'}>{t.nav.map((label, i) => <a key={label} href={`/${lang}#${anchors[i]}`} onClick={() => setOpen(false)}>{label}</a>)}</nav>
  <div className="nav-right"><div className="language-switch" aria-label={lang === 'es' ? 'Idioma' : 'Language'}>{(['es', 'en'] as const).map(l => <Link key={l} href={path.replace(/^\/(es|en)/, `/${l}`)} hrefLang={l} lang={l} aria-current={lang === l ? 'page' : undefined}>{l.toUpperCase()}</Link>)}</div><button id="menu-toggle" className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? t.close : t.menu} onClick={() => setOpen(!open)}>{open ? '×' : '☰'}</button></div>
 </div></header></>;
}
