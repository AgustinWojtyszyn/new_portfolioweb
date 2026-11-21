'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Language } from '@/lib/site';

type Concept = 'brand' | 'shop' | 'system';
type Appearance = 'light' | 'dark';

const details = {
  es: {
    select: 'Elegí un concepto',
    light: 'Claro',
    dark: 'Oscuro',
    preview: 'Vista previa interactiva',
    label: 'Concepto visual · No corresponde a un cliente',
    explore: 'Ver este servicio',
    conceptLabel: 'Tipo de proyecto',
    names: { brand: 'Marca', shop: 'Tienda', system: 'Sistema' },
    subtitles: {
      brand: 'Una presencia con personalidad.',
      shop: 'Un producto que invita a explorar.',
      system: 'Toda tu operación, más clara.'
    },
    previewBrand: 'El diseño hace la diferencia.',
    previewShop: 'Objetos para vivir mejor.',
    previewSystem: 'El trabajo, organizado.',
    previewSystemIntro: 'Todo lo que necesitás, en un solo lugar.',
    panelA: 'Pedidos', panelB: 'Productos', panelC: 'Equipo',
    brandButton: 'Descubrir', shopButton: 'Explorar objetos',
    example: 'Ejemplo de interfaz'
  },
  en: {
    select: 'Choose a concept',
    light: 'Light',
    dark: 'Dark',
    preview: 'Interactive preview',
    label: 'Visual concept · Not client work',
    explore: 'Explore this service',
    conceptLabel: 'Project type',
    names: { brand: 'Brand', shop: 'Store', system: 'System' },
    subtitles: {
      brand: 'A presence with personality.',
      shop: 'Products worth exploring.',
      system: 'Your work, made clearer.'
    },
    previewBrand: 'Design makes a difference.',
    previewShop: 'Objects for better living.',
    previewSystem: 'Work, beautifully organized.',
    previewSystemIntro: 'Everything you need, all in one place.',
    panelA: 'Orders', panelB: 'Products', panelC: 'Team',
    brandButton: 'Discover', shopButton: 'Explore objects',
    example: 'Interface example'
  }
} as const;

const tabs: Concept[] = ['brand', 'shop', 'system'];

export function LiveShowcase({ lang }: { lang: Language }) {
  const t = details[lang];
  const [concept, setConcept] = useState<Concept>('brand');
  const [appearance, setAppearance] = useState<Appearance>('light');
  const slug = concept === 'system' ? 'aplicaciones-a-medida' : 'paginas-web';

  return <div className="aw-lab">
    <div className="aw-lab-controls">
      <div className="aw-lab-tabs" role="group" aria-label={t.select}>
        {tabs.map((item, index) => <button
          key={item} type="button"
          className={concept === item ? 'is-active' : undefined}
          aria-pressed={concept === item}
          onClick={() => setConcept(item)}>
          <span>0{index + 1}</span>{t.names[item]}
        </button>)}
      </div>
      <div className="aw-lab-appearance" role="group" aria-label={lang === 'es' ? 'Estilo de la vista previa' : 'Preview appearance'}>
        <button type="button" aria-pressed={appearance === 'light'} className={appearance === 'light' ? 'is-active' : undefined} onClick={() => setAppearance('light')}>◐ <span>{t.light}</span></button>
        <button type="button" aria-pressed={appearance === 'dark'} className={appearance === 'dark' ? 'is-active' : undefined} onClick={() => setAppearance('dark')}>◑ <span>{t.dark}</span></button>
      </div>
    </div>

    <div className={'aw-lab-stage aw-lab-stage--' + concept + ' aw-lab-stage--' + appearance}>
      <div className="aw-lab-browser" role="img" aria-label={t.names[concept] + ': ' + t.subtitles[concept] + '. ' + t.label}>
        {concept === 'brand' && <div className="aw-concept aw-concept-brand">
          <div className="aw-concept-nav"><strong>novo<span>®</span></strong><span>DESIGN / STUDIO / <b>CONTACT ↗</b></span></div>
          <div className="aw-concept-brand-main">
            <div className="aw-brand-art" aria-hidden="true"><div className="aw-brand-sun"/><div className="aw-brand-form aw-brand-form-one"/><div className="aw-brand-form aw-brand-form-two"/><div className="aw-brand-shadow"/></div>
            <div className="aw-brand-content"><span>INDEPENDENT CREATIVE STUDIO — 26</span><h3>{t.previewBrand}</h3><span className="aw-concept-pill">{t.brandButton} ↗</span></div>
          </div>
          <div className="aw-concept-bottom"><span>DESIGN WITHOUT LIMITS</span><span>01 / 03</span></div>
        </div>}
        {concept === 'shop' && <div className="aw-concept aw-concept-shop">
          <div className="aw-concept-nav"><strong>objet<span>®</span></strong><span>COLLECTION / ABOUT / <b>BAG (0)</b></span></div>
          <div className="aw-shop-lead"><span>FORM FOLLOWS FEELING / 2026</span><h3>{t.previewShop}</h3><span className="aw-concept-pill">{t.shopButton} ↗</span></div>
          <div className="aw-shop-grid"><div className="aw-shop-item aw-shop-item-a"><div className="aw-shop-vase"/><small>FORM / 01</small></div><div className="aw-shop-item aw-shop-item-b"><div className="aw-shop-lamp"/><small>LIGHT / 02</small></div><div className="aw-shop-item aw-shop-item-c"><div className="aw-shop-chair"/><small>OBJECT / 03</small></div></div>
        </div>}
        {concept === 'system' && <div className="aw-concept aw-concept-system">
          <aside className="aw-system-sidebar"><strong>axis<span>◉</span></strong><div><i className="is-selected">◫</i><i>▥</i><i>◷</i><i>✳</i></div><span>AW / OS</span></aside>
          <div className="aw-system-body"><div className="aw-system-header"><span>WORKSPACE / OVERVIEW</span><span>● <b>ONLINE</b></span></div>
            <h3>{t.previewSystem}</h3><p>{t.previewSystemIntro}</p>
            <div className="aw-system-metrics"><div><span>{t.panelA}</span><b>↗</b><i className="aw-metric-line"/></div><div><span>{t.panelB}</span><b>◎</b><i className="aw-metric-line aw-metric-line--two"/></div><div><span>{t.panelC}</span><b>✳</b><i className="aw-metric-line aw-metric-line--three"/></div></div>
            <div className="aw-system-table"><span>ACTIVITY / RECENT</span><div><b/><i/><em/></div><div><b/><i/><em/></div><div><b/><i/><em/></div></div>
          </div>
        </div>}
      </div>
      <span className="aw-lab-stage-number" aria-hidden="true">0{tabs.indexOf(concept) + 1} / 03</span>
      <span className="aw-lab-stage-cross" aria-hidden="true">✳</span>
    </div>
    <div className="aw-lab-caption">
      <div><span>{t.preview} · {t.conceptLabel}</span><strong>{t.subtitles[concept]}</strong><p>{t.label}</p></div>
      <Link href={'/'+lang+'/servicios/'+slug}>{t.explore}<span aria-hidden="true">↗</span></Link>
    </div>
  </div>;
}
