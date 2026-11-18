'use client';

import { useState, type CSSProperties } from 'react';
import type { Language } from '@/lib/site';

type Direction = 'monument' | 'editorial' | 'signal';
const variants: Direction[] = ['monument', 'editorial', 'signal'];
const labels = {
 es: {
  heading: 'Probá tu marca en el escenario.',
  intro: 'No es una imagen. Es una composición que cambia con lo que escribís.',
  input: 'Nombre o palabra de tu marca', placeholder: 'Tu marca', styles: ['Monumento', 'Editorial', 'Señal'],
  directions: 'Elegí una dirección de arte', size: 'Escala visual', result: 'Vista interactiva', reset: 'Restablecer',
  example: 'TU MARCA', hint: 'Esta prueba funciona en tiempo real. Nada se envía ni se guarda.', invite: '¿Te imaginás tu identidad así?',
  specimen: 'Composición tipográfica en vivo'
 },
 en: {
  heading: 'Put your brand on the stage.',
  intro: 'Not a mockup. A composition that changes as you type.',
  input: 'Your brand name or a word', placeholder: 'Your brand', styles: ['Monument', 'Editorial', 'Signal'],
  directions: 'Choose an art direction', size: 'Visual scale', result: 'Interactive preview', reset: 'Reset',
  example: 'YOUR BRAND', hint: 'This preview runs locally. Nothing is sent or saved.', invite: 'Imagine what we could build for your brand.',
  specimen: 'Live typographic composition'
 }
};

export function TypePlayground({ lang, onContact }: { lang: Language; onContact: () => void }) {
 const t = labels[lang];
 const [name, setName] = useState('');
 const [direction, setDirection] = useState<Direction>('monument');
 const [scale, setScale] = useState(82);
 const word = name.trim() || t.example;
 const style = { '--at-scale': String(scale / 82) } as CSSProperties;
 const reset = () => { setName(''); setDirection('monument'); setScale(82); };
 return <div className="at-type-lab">
  <div className="at-type-info">
   <div className="at-type-copy"><span className="at-small-caption">{lang === 'es' ? 'Estudio tipográfico' : 'Typography studio'}</span><h3>{t.heading}</h3><p>{t.intro}</p></div>
   <div className="at-type-controls">
    <label htmlFor="at-brand-input">{t.input}</label>
    <input id="at-brand-input" type="text" maxLength={26} autoComplete="off" placeholder={t.placeholder} value={name} onChange={event => setName(event.target.value)} />
    <div className="at-type-control-label">{t.directions}</div>
    <div className="at-type-options" role="group" aria-label={t.directions}>{variants.map((variant, index) => <button type="button" key={variant} onClick={() => setDirection(variant)} aria-pressed={direction === variant} className={direction === variant ? 'is-selected' : ''}>{t.styles[index]}</button>)}</div>
    <div className="at-type-range-label"><label htmlFor="at-brand-size">{t.size}</label><output htmlFor="at-brand-size">{scale}%</output></div>
    <input type="range" id="at-brand-size" min={60} max={110} step={1} value={scale} onChange={event => setScale(Number(event.target.value))} />
    <button className="at-type-reset" type="button" onClick={reset}>{t.reset}</button>
    <p className="at-type-privacy">{t.hint}</p>
   </div>
  </div>
  <div className={'at-type-preview at-type-preview--' + direction} aria-label={t.specimen}>
   <div className="at-type-preview-head"><span>{t.result}</span><span>Agustín / Studio</span></div>
   <div className="at-type-composition" style={style}>
    <div className="at-type-guide" aria-hidden="true" />
    <span className="at-type-ghost" aria-hidden="true">{word}</span>
    <strong className="at-type-word">{word}</strong>
    <span className="at-type-cross at-type-cross--a" aria-hidden="true" />
    <span className="at-type-cross at-type-cross--b" aria-hidden="true" />
   </div>
   <div className="at-type-preview-foot"><span>{direction === 'monument' ? '01 / Form' : direction === 'editorial' ? '02 / Contrast' : '03 / Rhythm'}</span><button type="button" onClick={onContact}>{t.invite}<span aria-hidden="true">↗</span></button></div>
  </div>
 </div>;
}
