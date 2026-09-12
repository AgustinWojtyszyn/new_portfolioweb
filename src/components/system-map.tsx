'use client';
import { useEffect, useState, type CSSProperties } from 'react';
import { getContent } from '@/content/site';
import type { Language } from '@/lib/site';
const nodes = [
 { es: 'App de Pedidos', en: 'Orders App', slug: 'servifood-orders', x: 315, y: 113, code: '01' },
 { es: 'Analysis App', en: 'Analysis App', slug: 'servifood-analytics', x: 480, y: 210, code: '04' },
 { es: 'ServiFood Tracking', en: 'ServiFood Tracking', slug: 'servifood-tracking', x: 420, y: 386, code: '03' },
 { es: 'EP Consultora', en: 'EP Consultora', slug: 'ep-consultora-sgi', x: 150, y: 380, code: '05' },
 { es: 'MIDNIGHT PASS', en: 'MIDNIGHT PASS', slug: 'midnight-pass', x: 98, y: 205, code: '02' },
];
export function SystemMap({ lang }: { lang: Language }) {
 const t = getContent(lang); const [active, setActive] = useState(nodes[0].slug); const [paused,setPaused]=useState(false);
 useEffect(()=>{ if(paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return; const timer=setInterval(()=>setActive(current=>nodes[(Math.max(0,nodes.findIndex(n=>n.slug===current))+1)%nodes.length].slug),2800); return()=>clearInterval(timer); },[paused]);
 return <div className="system-map" onPointerMove={e => { if (e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return; const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--center-x', `${(e.clientX-r.left-r.width/2)/130}px`); e.currentTarget.style.setProperty('--center-y', `${(e.clientY-r.top-r.height/2)/130}px`); e.currentTarget.style.setProperty('--rx', `${-(e.clientY-r.top-r.height/2)/100}deg`); e.currentTarget.style.setProperty('--ry', `${(e.clientX-r.left-r.width/2)/100}deg`); }} onPointerLeave={e => { e.currentTarget.style.setProperty('--center-x','0px'); e.currentTarget.style.setProperty('--center-y','0px'); e.currentTarget.style.setProperty('--rx','0deg'); e.currentTarget.style.setProperty('--ry','0deg'); setPaused(false); }}>
  <div className="map-heading mono"><span><i className="status-dot" />{t.mapTitle}</span><span>AW / 001</span></div>
  <svg viewBox="0 0 600 500" className="atlas-svg" role="img" aria-label={lang === 'es' ? 'Mapa de cinco proyectos conectados' : 'Map of five connected projects'}>
   <defs><linearGradient id="plane" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#33423d" stopOpacity=".7"/><stop offset="1" stopColor="#0c1511" stopOpacity=".9"/></linearGradient><radialGradient id="aura"><stop stopColor="#47d9a1" stopOpacity=".15"/><stop offset="1" stopColor="#47d9a1" stopOpacity="0"/></radialGradient><pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="matrix(1 .5 -1 .5 300 60)"><path d="M28 0H0V28" fill="none" stroke="#607b6d" strokeOpacity=".14"/></pattern></defs>
   <rect width="600" height="500" fill="url(#grid)"/><ellipse cx="300" cy="260" rx="230" ry="200" fill="url(#aura)"/>
   <g className="atlas-center"><g className="atlas-planes"><path d="M110 298 300 190 490 298 300 406Z" fill="#101a16" stroke="#36423b"/><path d="M110 298v16l190 109 190-109v-16L300 406Z" fill="#0b100e" stroke="#29372f"/><path d="M140 247 300 155 460 247 300 339Z" fill="url(#plane)" stroke="#5c7a6b"/><path d="M140 247v13l160 93 160-93v-13L300 339Z" fill="#14221b" stroke="#334b3e"/><path d="M203 224 300 168 397 224 300 280Z" fill="#172b22" stroke="#59c798"/><path d="M203 224v16l97 57 97-57v-16L300 280Z" fill="#102c1d" stroke="#3d8d66"/><path d="M252 223 300 195 348 223 300 251Z" fill="#62e7ac"/><path d="M252 223v10l48 28 48-28v-10L300 251Z" fill="#2c8159"/><path d="M300 280v59m0 14v54" stroke="#72f5b9" strokeDasharray="3 5"/><text x="300" y="320" textAnchor="middle" fill="#a7b9ad" fontSize="9" letterSpacing="3">{lang==='es'?'PROYECTOS':'PROJECTS'}</text></g></g>
   {nodes.map((n, index) => <g style={{'--node-delay': `${index * 100}ms`} as CSSProperties} key={n.slug} className={active === n.slug ? 'map-node active' : 'map-node'}><path className="atlas-connection" pathLength="1" d={`M300 230 L${n.x} ${n.y}`} fill="none"/><path className="atlas-signal" pathLength="1" d={`M300 230 L${n.x} ${n.y}`} fill="none"/><circle cx={n.x} cy={n.y} r="5"/><circle className="node-ring" cx={n.x} cy={n.y} r="11"/></g>)}
   <g fill="#708779" fontSize="9" fontFamily="monospace"><text x="32" y="470">AW / 2026</text><text x="416" y="470">SAN JUAN / AR</text><path d="M30 438v-15m-7 8h15M568 438v-15m-7 8h15" stroke="#66776c"/></g>
  </svg>
  {nodes.map((n, index) => <a style={{ '--node-delay': `${index * 100 + 180}ms`, '--x': `${n.x/6}%`, '--y': `${n.y/5}%` } as CSSProperties} key={n.slug} className={`map-link ${active === n.slug ? 'active' : ''}`} href={`/${lang}/work/${n.slug}`} onMouseEnter={() => {setPaused(true);setActive(n.slug);}} onMouseLeave={()=>setPaused(false)} onFocus={() => {setPaused(true);setActive(n.slug);}} onBlur={()=>setPaused(false)}><small>{n.code}</small>{n[lang]}<span>↗</span></a>)}
  <div className="map-footer mono"><span>{t.mapCaption}</span><span className="map-hint">{t.mapHint} ↗</span></div>
 </div>;
}