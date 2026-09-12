import Link from 'next/link';
import { getContent, stack, archive } from '@/content/site';
import { projects } from '@/content/projects';
import { identity, projectName, type Language } from '@/lib/site';
import { SystemMap } from '@/components/system-map';
import { OrderVisual } from '@/components/architecture';
import { ProjectSignal } from '@/components/project-signal';
import { Road } from '@/components/road';
export function Hero({lang}:{lang:Language}) {
 const t=getContent(lang);
 return <section className="hero container" aria-labelledby="hero-title"><div className="hero-top mono"><span>{t.eyebrow}</span><span className="hero-coordinate">31°32′ S &nbsp; 68°32′ W</span></div><div className="hero-grid"><div className="hero-copy"><p className="overline"><i className="status-dot"/>{t.role}</p><h1 id="hero-title">{t.hero[0]}<br/>{t.hero[1]}<br/><em>{t.hero[2]}</em></h1><p className="hero-intro">{t.intro}</p><div className="hero-actions"><a className="button-primary" href="#work">{t.work}<span>↘</span></a><a className="text-link" href={identity.github} target="_blank" rel="noreferrer">GitHub ↗</a><a className="text-link" href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div><SystemMap lang={lang}/></div><div className="hero-bottom mono"><span>{t.location} <span className="muted">/ UTC−3</span></span><span className="hero-bottom-center">{lang==='es'?'IDEA → DESARROLLO → PRODUCCIÓN':'IDEA → BUILD → PRODUCTION'}</span><a href="#work" aria-label={t.work}>{lang==='es'?'SEGUIR EXPLORANDO':'KEEP EXPLORING'} <span>↓</span></a></div></section>;
}
export function SelectedWork({lang}:{lang:Language}) {
 const t=getContent(lang), flagship=projects[0];
 return <section id="work" className="section container"><div className="section-heading"><p className="eyebrow">01 / {t.selected}</p><h2>{t.selectedSub}</h2><span className="index-stamp mono">2024<br/>2026</span></div><article className="featured-project"><div className="featured-copy"><span className="eyebrow">{flagship.number} / {flagship[lang].category}</span><h3>{projectName(flagship.slug,flagship.name)}</h3><p className="project-headline">{flagship[lang].headline}</p><p className="body-copy">{flagship[lang].summary}</p><p className="tech-line mono">React · Supabase · PostgreSQL</p><Link className="text-link arrow-link" href={`/${lang}/work/${flagship.slug}`}>{t.case}<span>↗</span></Link></div><Link href={`/${lang}/work/${flagship.slug}`} className="project-visual-link" aria-label={`${t.case}: ${projectName(flagship.slug,flagship.name)}`}><OrderVisual lang={lang}/></Link></article><div className="project-list">{projects.slice(2).map(p=><Link className="project-row" data-project={p.slug} key={p.slug} href={`/${lang}/work/${p.slug}`}><span className="project-number mono">{p.number}</span><div><span className="eyebrow">{p[lang].category}</span><h3>{projectName(p.slug,p.name)}</h3><p>{p[lang].summary}</p></div><span className="project-row-stack mono"><ProjectSignal slug={p.slug}/>{p.stack.slice(0,3).join(' / ')}</span><span className="row-arrow">↗</span></Link>)}</div></section>;
}
export function Ecosystem({lang}:{lang:Language}) {
 const t=getContent(lang);
 return <section className="ecosystem section"><div className="container ecosystem-grid"><div><p className="eyebrow">{t.ecosystemLabel}</p><h2>{t.ecosystemTitle}</h2><p className="body-copy">{t.ecosystemText}</p><p className="ecosystem-note mono">↳ {t.ecosystemFoot}</p></div><div className="ecosystem-network"><div className="network-root"><span className="mono">SERVIFOOD</span><span className="network-plus">+</span><strong>{lang==='es'?'Herramientas para el trabajo diario':'Tools for daily work'}</strong></div><div className="network-systems">{[projects[0],projects[3],projects[2]].map(p=><Link href={`/${lang}/work/${p.slug}`} key={p.slug}><i className="status-dot"/><span>{projectName(p.slug,p.short)}</span><span>↗</span></Link>)}</div><div className="network-base mono"><span>{lang==='es'?'Web corporativa':'Corporate website'}</span><span>{lang==='es'?'Reportes y datos operativos':'Reports and operational data'}</span></div></div></div></section>;
}
export function Midnight({lang}:{lang:Language}) {
 const t=getContent(lang);
 return <section id="midnight" className="midnight section"><div className="container"><div className="midnight-title"><div><p className="eyebrow">02 / {t.midnightLabel}</p><h2>MIDNIGHT<br/><span>PASS</span><sup>↗</sup></h2></div><div className="midnight-intro"><p>{t.midnightText}</p><Link href={`/${lang}/work/midnight-pass`} className="text-link arrow-link">{t.case}<span>↗</span></Link></div></div><Road lang={lang}/><div className="midnight-spec mono"><span>REACT THREE FIBER</span><span>RAPIER</span><span>{lang==='es'?'MUNDO PROCEDURAL':'PROCEDURAL WORLD'}</span><span>{lang==='es'?'3 CÁMARAS':'3 CAMERAS'}</span></div></div></section>;
}
export function Experience({lang}:{lang:Language}) {
 const t=getContent(lang);
 return <section id="experience" className="section container experience"><div className="split-heading"><div><p className="eyebrow">03 / {t.experienceLabel}</p><h2>{t.experienceTitle}</h2></div><p className="body-copy">{t.experienceIntro}</p></div><div className="experience-entry"><div className="mono experience-date"><i className="status-dot"/>{t.present}</div><div><div className="job-heading"><h3>ServiFood</h3><span className="mono">{t.job}</span></div><p className="body-copy">{t.jobText}</p><ol className="lifecycle">{t.responsibilities.map((r,i)=><li key={r}><span className="mono">0{i+1}</span>{r}<span aria-hidden="true">↗</span></li>)}</ol></div></div><div className="education"><p className="eyebrow">{t.education}</p><div><span className="mono muted">{t.schoolDate}</span><p>{t.schoolText}</p></div><span className="language-level mono">{t.english}</span></div></section>;
}
export function Stack({lang}:{lang:Language}) {
 const t=getContent(lang);
 return <section id="stack" className="section stack-section"><div className="container"><div className="split-heading"><div><p className="eyebrow">04 / {t.stackLabel}</p><h2>{t.stackTitle}</h2></div><p className="body-copy">{t.stackText}</p></div><div className="stack-grid">{stack.map((s,i)=><article className="stack-item" key={s.title.en}><div className="stack-item-top"><span className="mono">0{i+1}</span><span aria-hidden="true">↘</span></div><h3>{s.title[lang]}</h3><p className="mono stack-tools">{s.tools}</p><p>{s[lang]}</p></article>)}</div><div className="stack-pipeline mono">React <span>→</span> Auth <span>→</span> PostgreSQL <span>→</span> RLS <span>→</span> RPC <span>→</span> Edge Functions <span>→</span> Render</div></div></section>;
}
export function Evolution({lang}:{lang:Language}) {
 const t=getContent(lang);
 return <section className="section container"><div className="split-heading"><div><p className="eyebrow">05 / {t.archiveLabel}</p><h2>{t.archiveTitle}</h2></div><p className="body-copy">{t.archiveText}</p></div><div className="archive">{archive.map(a=><div key={a.era} className="archive-row"><span className="mono archive-index">{a.era}</span><h3>{a[lang]}</h3><span className="mono archive-tech">{a.tech}</span><div className="archive-links">{a.projects.map(p=><a key={p.name} href={'repo' in p?`${identity.github}/${p.repo}`:p.href} target={'repo' in p?'_blank':undefined} rel={'repo' in p?'noreferrer':undefined}>{p.name}<span>↗</span></a>)}</div></div>)}</div></section>;
}
export function About({lang}:{lang:Language}) {
 const t=getContent(lang);
 return <section id="about" className="section container about-grid"><div><p className="eyebrow">06 / {t.aboutLabel}</p><h2>{t.aboutTitle}</h2><div className="status-panel"><p className="mono">{t.status}<span>AW.</span></p>{t.statusLabels.map((label,i)=><div key={label}><span>{label}</span><span>{t.statusValues[i]}</span></div>)}</div></div><div className="about-copy"><p>{t.aboutText}</p><p>{t.aboutSecond}</p><span className="signature">Agustín W<span>.</span></span></div></section>;
}
export function Contact({lang}:{lang:Language}) {
 const t=getContent(lang);
 return <section id="contact" className="contact section"><div className="container"><p className="eyebrow">07 / {t.contactLabel}</p><h2>{t.contactTitle}<br/><a href={`mailto:${identity.email}`}>{t.contactCta}<span>↗</span></a></h2><div className="contact-bottom"><div><p>{t.contactText}</p><a className="contact-email text-link" href={`mailto:${identity.email}`}>{identity.email}</a></div><div className="contact-links"><a href={identity.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div></div></section>;
}
export function Footer({lang}:{lang:Language}) { return <footer className="footer container mono"><span>© {new Date().getFullYear()} AGUSTÍN WOJTYSZYN</span><span>{getContent(lang).footer}</span><a href="#main" aria-label={lang==='es'?'Volver arriba':'Back to top'}>↑</a></footer>; }
