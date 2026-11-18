'use client';

import Link from 'next/link';
import { useRef, useState, type FormEvent } from 'react';
import type { Language } from '@/lib/site';
import { identity } from '@/lib/site';
import { CreativeField } from '@/components/creative-field';
import { TypePlayground } from '@/components/type-playground';

const servicePaths = ['paginas-web', 'aplicaciones-a-medida', 'automatizacion'] as const;
const content = {
 es: {
  identity: 'Estudio independiente de diseño y desarrollo web. San Juan, Argentina.',
  title: ['No otra página.', 'Una experiencia.'],
  lead: 'Diseño y desarrollo sitios y aplicaciones que tienen algo para decir, se sienten únicos y funcionan en serio.',
  contact: 'Quiero una web así', explore: 'Explorar el laboratorio', scroll: 'Abajo empieza la parte interesante',
  manifesto: 'La mejor presentación es dejarte tocar el trabajo.',
  laboratoryTitle: 'Cambiá algo. Mirá lo que pasa.',
  laboratoryLead: 'La estética no tiene por qué quedarse quieta. Probá una dirección de arte en tiempo real.',
  labIndex: 'Interacción real, no un video',
  servicesLabel: 'Lo que puedo construir',
  servicesTitle: 'No hay fórmulas copiadas. Hay ideas que merecen una forma propia.',
  services: [
   {n:'01',title:'Sitios con personalidad',description:'Una presencia digital que te represente de verdad. Diseño, desarrollo, rendimiento y una experiencia a medida.',link:'Diseño web'},
   {n:'02',title:'Aplicaciones que resuelven',description:'Herramientas propias para organizar operaciones, simplificar procesos y hacer que las tareas fluyan.',link:'Aplicaciones a medida'},
   {n:'03',title:'Automatización inteligente',description:'Conectamos pasos, reducimos tareas repetitivas y liberamos tiempo sin complicar lo simple.',link:'Automatización'}
  ],
  principle: 'Mi forma de trabajar',
  principleTitle: 'Impacto visual, sin sacrificar lo que importa.',
  principleLead: 'Lo espectacular tiene que ser útil. Por eso cada interacción parte de una idea, cada pantalla se piensa para el celular y cada efecto tiene que tener un propósito.',
  principles: [['Diseño propio','La identidad de tu proyecto antes que cualquier plantilla.'],['Calidad real','Accesibilidad, velocidad y claridad desde el primer boceto.'],['Trato directo','Hablás con quien diseña, programa y entrega.']],
  aboutLabel: 'Detrás de esta web',
  aboutTitle: 'Soy Agustín. Construyo lo que imaginamos juntos.',
  aboutText: 'Soy desarrollador full-stack de San Juan, Argentina. Me gusta convertir ideas complejas en experiencias simples de usar, con obsesión por los detalles y una identidad que no se confunda con ninguna otra.',
  aboutNote: 'Del concepto al código. Una sola persona responsable.',
  endLabel: 'Tu proyecto podría ser el próximo experimento.',
  endTitle: '¿Hacemos algo que nadie quiera cerrar?',
  endText: 'Contame qué tenés en mente. Lo pensamos, lo diseñamos y lo construimos desde cero.',
  endAction: 'Hablemos de tu proyecto', endDirect: 'O escribime por correo',
  back: 'Volver arriba', privacy: 'Privacidad', location: 'San Juan, Argentina', build: 'Diseño y desarrollo independiente',
  modalTitle: 'Contame tu idea',modalIntro: 'No necesitás tener un documento técnico. Con unas líneas podemos empezar.',
  modalName: 'Tu nombre',modalEmail: 'Cómo contactarte (opcional)',modalService: 'Qué necesitás',
  modalOptions: ['Una web con personalidad','Una aplicación a medida','Una automatización','Quiero explorar una idea'],
  modalMessage: 'Contame de tu proyecto',modalExample: 'Qué querés crear, qué debería sentir alguien al usarlo, qué necesitás resolver…',
  modalSend: 'Abrir mi correo',modalCopy: 'Copiar la consulta',modalCopied: 'Consulta copiada',
  modalClose: 'Cerrar',modalNotice: 'Se abre tu aplicación de correo con el mensaje preparado. No se envía ni se almacena nada en esta página.',
  modalSubject: 'Nuevo proyecto desde mi portfolio'
 },
 en: {
  identity: 'Independent web design and development studio. San Juan, Argentina.',
  title: ['Not another website.', 'An experience.'],
  lead: 'I design and build websites and applications with a point of view, their own identity and serious engineering behind them.',
  contact: 'I want a site like this', explore: 'Explore the playground', scroll: 'The interesting part starts below',
  manifesto: 'The best introduction is letting you touch the work.',
  laboratoryTitle: 'Change something. See what happens.',
  laboratoryLead: 'Design does not have to stay still. Try a new art direction in real time.',
  labIndex: 'A real interaction, not a video',
  servicesLabel: 'What I can build',
  servicesTitle: 'No recycled formulas. Just ideas that deserve their own shape.',
  services: [
   {n:'01',title:'Websites with character',description:'A digital presence that feels like you. Unique design, development, performance and thoughtful interactions.',link:'Web design'},
   {n:'02',title:'Applications that solve',description:'Custom tools to organize operations, remove friction and help your team get real work done.',link:'Custom applications'},
   {n:'03',title:'Thoughtful automation',description:'Connecting steps, cutting repetitive work and saving time without making simple things complicated.',link:'Automation'}
  ],
  principle: 'How I work',
  principleTitle: 'Visual impact, without compromise.',
  principleLead: 'Impressive should still be useful. Every interaction starts with an idea, every screen is designed for mobile and every effect has a reason to exist.',
  principles: [['Original by design','Your identity comes before any template.'],['Built to last','Accessibility, speed and clarity from the very first sketch.'],['Direct collaboration','You work with the person who designs, codes and delivers.']],
  aboutLabel: 'Behind this website',
  aboutTitle: 'I’m Agustín. Let’s build what we imagine.',
  aboutText: 'I am a full-stack developer based in San Juan, Argentina. I turn complex ideas into experiences that feel effortless, care about the details and refuse to blend into the crowd.',
  aboutNote: 'From concept to code. One person accountable.',
  endLabel: 'Your project could be the next experiment.',
  endTitle: 'Shall we build something worth staying for?',
  endText: 'Tell me what you have in mind. We will shape, design and build it from scratch.',
  endAction: 'Let’s talk about your project',endDirect: 'Or send me an email',
  back: 'Back to top',privacy: 'Privacy',location:'San Juan, Argentina',build:'Independent design & development',
  modalTitle: 'Tell me your idea',modalIntro: 'No detailed technical brief needed. A few sentences are enough to begin.',
  modalName:'Your name',modalEmail:'How to reach you (optional)',modalService:'What do you need',
  modalOptions:['A website with character','A custom application','Workflow automation','I want to explore an idea'],
  modalMessage:'Tell me about your project',modalExample:'What would you like to create? How should it feel? What should it solve?',
  modalSend:'Open my email app',modalCopy:'Copy inquiry',modalCopied:'Inquiry copied',
  modalClose:'Close',modalNotice:'Your email app opens with the message ready. Nothing is sent or stored on this page.',
  modalSubject:'New project from my portfolio'
 }
};
export function AtelierHome({ lang }: { lang: Language }) {
 const t = content[lang];
 const dialog = useRef<HTMLDialogElement>(null);
 const [name, setName] = useState('');
 const [reply, setReply] = useState('');
 const [kind, setKind] = useState('0');
 const [message, setMessage] = useState('');
 const [copied, setCopied] = useState(false);
 const openInquiry = (value = '0') => { setKind(value);setCopied(false);dialog.current?.showModal(); };
 const inquiry = () => [t.modalService + ': ' + t.modalOptions[Number(kind)],t.modalName + ': ' + name.trim(), reply.trim() ? t.modalEmail + ': ' + reply.trim() : '',t.modalMessage + ': ' + message.trim()].filter(Boolean).join('\n\n');
 const send = (event: FormEvent<HTMLFormElement>) => { event.preventDefault();window.location.href = 'mailto:' + identity.email + '?subject=' + encodeURIComponent(t.modalSubject) + '&body=' + encodeURIComponent(inquiry()); };
 const copy = async () => {
  if (!name.trim() || !message.trim()) { dialog.current?.querySelector<HTMLInputElement>(!name.trim() ? '#at-inquiry-name' : '#at-inquiry-message')?.focus();return; }
  try { await navigator.clipboard.writeText(inquiry());setCopied(true); } catch { setCopied(false); }
 };
 return <main id="main" className="at-page">
  <section className="at-hero at-width" id="experience" aria-labelledby="at-title">
   <div className="at-hero-copy">
    <p className="at-context">{t.identity}</p>
    <h1 id="at-title"><span>{t.title[0]}</span><span>{t.title[1]}</span></h1>
    <p className="at-hero-lead">{t.lead}</p>
    <div className="at-hero-actions"><button className="at-action at-action--primary" type="button" onClick={() => openInquiry()}>{t.contact}<span aria-hidden="true">↗</span></button><a className="at-text-link" href="#laboratory">{t.explore}<span aria-hidden="true">↓</span></a></div>
    <p className="at-hero-trailer">{t.scroll}</p>
   </div>
   <CreativeField lang={lang}/>
  </section>

  <div className="at-statement" aria-label={t.manifesto}><div className="at-width"><span aria-hidden="true">✳</span><p>{t.manifesto}</p></div></div>

  <section className="at-lab-section at-width" id="laboratory" aria-labelledby="at-lab-title">
   <div className="at-section-heading"><p className="at-section-index">{t.labIndex}</p><div><h2 id="at-lab-title">{t.laboratoryTitle}</h2><p>{t.laboratoryLead}</p></div></div>
   <TypePlayground lang={lang} onContact={() => openInquiry()}/>
  </section>

  <section className="at-services" id="services" aria-labelledby="at-services-title">
   <div className="at-width">
    <div className="at-services-head"><p>{t.servicesLabel}</p><h2 id="at-services-title">{t.servicesTitle}</h2></div>
    <div className="at-services-list">{t.services.map((item, index) => <article className="at-service-row" key={item.n}><span className="at-service-number">{item.n}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><Link href={'/' + lang + '/servicios/' + servicePaths[index]} aria-label={item.link} className="at-service-link"><span>{item.link}</span><span aria-hidden="true">↗</span></Link></article>)}</div>
   </div>
  </section>

  <section className="at-method at-width" id="approach" aria-labelledby="at-method-title">
   <div className="at-method-art" aria-hidden="true"><span className="at-method-letter">a</span><span className="at-method-shape"/><span className="at-method-caption">Agustín Wojtyszyn / independent craft</span></div>
   <div className="at-method-content"><p className="at-section-index">{t.principle}</p><h2 id="at-method-title">{t.principleTitle}</h2><p>{t.principleLead}</p><dl>{t.principles.map(([title,description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}</dl></div>
  </section>

  <section className="at-person" aria-labelledby="at-person-title"><div className="at-width at-person-inner"><div><p className="at-section-index">{t.aboutLabel}</p><h2 id="at-person-title">{t.aboutTitle}</h2></div><div><p>{t.aboutText}</p><span>{t.aboutNote}</span></div></div></section>

  <section className="at-contact" id="contact" aria-labelledby="at-contact-title"><div className="at-width at-contact-inner"><p>{t.endLabel}</p><h2 id="at-contact-title">{t.endTitle}</h2><p>{t.endText}</p><div className="at-contact-actions"><button type="button" className="at-action at-action--primary" onClick={() => openInquiry()}>{t.endAction}<span aria-hidden="true">↗</span></button><a href={'mailto:' + identity.email} className="at-text-link">{t.endDirect}<span aria-hidden="true">↗</span></a></div></div></section>

  <footer className="at-footer"><div className="at-width"><div><strong>Agustín Wojtyszyn</strong><p>{t.build}</p></div><nav aria-label={lang === 'es' ? 'Enlaces finales' : 'Footer links'}><a href={identity.github} target="_blank" rel="noreferrer">GitHub</a><a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><Link href={'/' + lang + '/privacidad'}>{t.privacy}</Link><a href="#main">{t.back}</a></nav><small>© {new Date().getFullYear()} · {t.location}</small></div></footer>

  <dialog className="at-dialog" ref={dialog} aria-labelledby="at-modal-title" onClick={event => { if (event.target === dialog.current) dialog.current?.close(); }}><div className="at-dialog-inner">
   <div className="at-dialog-top"><span>Agustín / Studio</span><button type="button" onClick={() => dialog.current?.close()} aria-label={t.modalClose}>×</button></div>
   <h2 id="at-modal-title">{t.modalTitle}</h2><p>{t.modalIntro}</p>
   <form onSubmit={send}>
    <label htmlFor="at-inquiry-service">{t.modalService}</label>
    <select id="at-inquiry-service" value={kind} onChange={event => setKind(event.target.value)}>{t.modalOptions.map((item,index) => <option key={item} value={index}>{item}</option>)}</select>
    <div className="at-inquiry-grid"><div><label htmlFor="at-inquiry-name">{t.modalName}</label><input required maxLength={100} id="at-inquiry-name" value={name} onChange={event => setName(event.target.value)} /></div><div><label htmlFor="at-inquiry-reply">{t.modalEmail}</label><input id="at-inquiry-reply" maxLength={150} value={reply} onChange={event => setReply(event.target.value)} /></div></div>
    <label htmlFor="at-inquiry-message">{t.modalMessage}</label><textarea id="at-inquiry-message" required rows={4} maxLength={2200} placeholder={t.modalExample} value={message} onChange={event => setMessage(event.target.value)} />
    <p className="at-inquiry-notice">{t.modalNotice}</p>
    <div className="at-inquiry-actions"><button type="submit" className="at-action at-action--primary">{t.modalSend}<span aria-hidden="true">↗</span></button><button type="button" className="at-dialog-copy" onClick={copy}>{copied ? t.modalCopied : t.modalCopy}</button></div>
   </form>
   <a className="at-dialog-email" href={'mailto:' + identity.email}>{identity.email}</a>
  </div></dialog>
 </main>;
}
