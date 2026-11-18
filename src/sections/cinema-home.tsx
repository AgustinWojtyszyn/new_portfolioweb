import Link from 'next/link';
import { ChromeSculpture, TypographicPlate, MotionStudy } from '@/components/cinema-art';
import { identity, type Language } from '@/lib/site';

const copy = {
 es: {
  role: 'Agustín Wojtyszyn / Diseñador y desarrollador independiente',
  heroA: 'Hagamos algo', heroB: 'que no se', heroC: 'olvide.',
  heroLead: 'Creo sitios y experiencias digitales con identidad propia. Diseño con intención. Desarrollo con precisión.',
  heroAction: 'Hablemos de tu idea', discover: 'Deslizá para descubrir',
  manifesto: 'Una página puede informar. O puede hacer que alguien se detenga, mire y recuerde.',
  galleryLabel: '01 / Dirección artística',
  galleryTitle: 'Cada idea merece su propia identidad.',
  galleryCopy: 'No hay estética predeterminada. Cada decisión visual tiene que responder a lo que querés comunicar.',
  motionLabel: '02 / Movimiento',
  motionTitle: 'El movimiento también cuenta una historia.',
  motionCopy: 'Una transición, una pausa, un cambio de ritmo. Los pequeños gestos hacen que una experiencia se sienta especial.',
  engineerLabel: '03 / Desarrollo',
  engineerTitle: 'Debajo de lo visual, ingeniería de verdad.',
  engineerCopy: 'Lo que sorprende también tiene que cargar rápido, funcionar en el celular y ser fácil de usar. El detalle está en ambos lados.',
  servicesLabel: 'Qué puedo construir',
  servicesTitle: 'Una buena idea puede tomar muchas formas.',
  services: [
   {n:'01',name:'Páginas web',desc:'Presencias digitales que se sienten propias.',slug:'paginas-web'},
   {n:'02',name:'Aplicaciones a medida',desc:'Productos que resuelven problemas reales.',slug:'aplicaciones-a-medida'},
   {n:'03',name:'Automatizaciones',desc:'Menos trabajo repetitivo. Más tiempo para lo importante.',slug:'automatizacion'}
  ],
  authorLabel: 'Quién está detrás',
  authorTitle: 'Una persona. Una visión. Cada detalle.',
  authorCopy: 'Soy Agustín, desarrollador full-stack de San Juan, Argentina. Me involucro en la idea, el diseño y la implementación. No quiero que tu proyecto se parezca a todos los demás.',
  authorLink: 'Conocé mi GitHub',
  closeLabel: 'El siguiente capítulo puede ser el tuyo.',
  closeTitle: 'Tu idea merece algo que esté a su altura.',
  closeCopy: 'Contame qué imaginás. Hagamos que exista.',
  closeAction: 'Empecemos a crear', direct: 'O escribime directamente',
  footer: 'Diseño y desarrollo digital independiente',privacy:'Privacidad',back:'Volver arriba',
  ariaSculpture: 'Escultura cromada en movimiento, un estudio de forma y luz.'
 },
 en: {
  role: 'Agustín Wojtyszyn / Independent designer and developer',
  heroA: 'Let’s make',heroB: 'something',heroC: 'unforgettable.',
  heroLead: 'I create distinctive websites and digital experiences. Design with intention. Engineering with precision.',
  heroAction: 'Tell me your idea',discover: 'Scroll to discover',
  manifesto: 'A website can tell a story. Or it can make someone stop, look and remember.',
  galleryLabel: '01 / Art direction',
  galleryTitle: 'Every idea deserves its own identity.',
  galleryCopy: 'There is no preset aesthetic. Every visual decision should serve what you want to communicate.',
  motionLabel: '02 / Motion',
  motionTitle: 'Motion can tell a story, too.',
  motionCopy: 'A transition, a pause, a change of rhythm. Small gestures make an experience feel considered.',
  engineerLabel: '03 / Development',
  engineerTitle: 'Behind the visuals, real engineering.',
  engineerCopy: 'What delights should also load quickly, work beautifully on mobile and remain effortless to use.',
  servicesLabel: 'What I can build',
  servicesTitle: 'A good idea can take many forms.',
  services: [
   {n:'01',name:'Websites',desc:'Digital places that feel truly yours.',slug:'paginas-web'},
   {n:'02',name:'Custom applications',desc:'Products that solve real problems.',slug:'aplicaciones-a-medida'},
   {n:'03',name:'Automation',desc:'Less repetitive work. More time for what matters.',slug:'automatizacion'}
  ],
  authorLabel: 'Behind the work',
  authorTitle: 'One person. One vision. Every detail.',
  authorCopy: 'I’m Agustín, a full-stack developer based in San Juan, Argentina. From the idea to design to implementation, I care about making work that doesn’t blend in.',
  authorLink: 'Explore my GitHub',
  closeLabel: 'The next chapter could be yours.',
  closeTitle: 'Your idea deserves something extraordinary.',
  closeCopy: 'Tell me what you imagine. Let’s make it real.',
  closeAction: 'Let’s create',direct: 'Or email me directly',
  footer: 'Independent digital design and development',privacy:'Privacy',back:'Back to top',
  ariaSculpture: 'Slowly moving chrome sculpture, a study of shape and light.'
 }
} as const;

export function CinemaHome({ lang }: { lang: Language }) {
 const t = copy[lang];
 const message = encodeURIComponent(lang === 'es' ? 'Quiero hablarte de mi proyecto' : 'I would like to discuss my project');
 const mail = 'mailto:' + identity.email + '?subject=' + message;
 return <main className="vx-page" id="main">
  <section className="vx-hero" id="experience" aria-labelledby="vx-hero-title">
   <div className="vx-hero-art"><ChromeSculpture/><div className="vx-hero-veil"/></div>
   <div className="vx-container vx-hero-content">
    <p className="vx-hero-intro">{t.role}</p>
    <h1 id="vx-hero-title"><span>{t.heroA}</span><span>{t.heroB}</span><span>{t.heroC}</span></h1>
    <p className="vx-hero-lede">{t.heroLead}</p>
    <a className="vx-primary-link" href={mail}>{t.heroAction}<span aria-hidden="true">↗</span></a>
   </div>
   <a className="vx-scroll-note" href="#statement">{t.discover}<span aria-hidden="true">↓</span></a>
   <div className="vx-hero-serial" aria-hidden="true">AW / 2026</div>
  </section>

  <section className="vx-statement" id="statement" aria-label={t.manifesto}>
   <div className="vx-container">
    <div className="vx-statement-line" aria-hidden="true"/>
    <h2>{t.manifesto}</h2>
   </div>
  </section>

  <section className="vx-chapter vx-chapter--direction" id="vision" aria-labelledby="vx-direction-title">
   <div className="vx-container vx-chapter-layout">
    <div className="vx-chapter-copy"><p className="vx-caption">{t.galleryLabel}</p><h2 id="vx-direction-title">{t.galleryTitle}</h2><p>{t.galleryCopy}</p></div>
    <div className="vx-chapter-image"><TypographicPlate/><span className="vx-frame-inscription" aria-hidden="true">Form follows feeling.</span></div>
   </div>
  </section>

  <section className="vx-motion-chapter" aria-labelledby="vx-motion-title">
   <div className="vx-motion-image"><MotionStudy/></div>
   <div className="vx-container vx-motion-copy"><p className="vx-caption">{t.motionLabel}</p><h2 id="vx-motion-title">{t.motionTitle}</h2><p>{t.motionCopy}</p></div>
  </section>

  <section className="vx-chapter vx-chapter--engineering" id="approach" aria-labelledby="vx-engineer-title">
   <div className="vx-container vx-engineering-layout">
    <div className="vx-engineering-art" aria-hidden="true">
     <div className="vx-engineering-tracks"><i/><i/><i/><i/><i/><i/><i/></div>
     <span className="vx-engineering-giant">DETALLE</span>
     <span className="vx-engineering-seal">Idea → diseño → desarrollo</span>
    </div>
    <div className="vx-chapter-copy"><p className="vx-caption">{t.engineerLabel}</p><h2 id="vx-engineer-title">{t.engineerTitle}</h2><p>{t.engineerCopy}</p></div>
   </div>
  </section>

  <section className="vx-services" id="services" aria-labelledby="vx-services-title">
   <div className="vx-container">
    <div className="vx-services-heading"><p className="vx-caption">{t.servicesLabel}</p><h2 id="vx-services-title">{t.servicesTitle}</h2></div>
    <div className="vx-services-rows">{t.services.map(item=><Link key={item.n} href={'/'+lang+'/servicios/'+item.slug} className="vx-service">
     <span className="vx-service-index">{item.n}</span><span className="vx-service-name">{item.name}</span><span className="vx-service-description">{item.desc}</span><span className="vx-service-arrow" aria-hidden="true">↗</span>
    </Link>)}</div>
   </div>
  </section>

  <section className="vx-author" id="about" aria-labelledby="vx-author-title">
   <div className="vx-container vx-author-layout">
    <div className="vx-author-art" aria-hidden="true"><span>Agustín</span><span>Wojtyszyn</span><div className="vx-author-line"/></div>
    <div className="vx-author-copy"><p className="vx-caption">{t.authorLabel}</p><h2 id="vx-author-title">{t.authorTitle}</h2><p>{t.authorCopy}</p><a href={identity.github} target="_blank" rel="noreferrer">{t.authorLink}<span aria-hidden="true">↗</span></a></div>
   </div>
  </section>

  <section className="vx-contact" id="contact" aria-labelledby="vx-contact-title">
   <div className="vx-container vx-contact-inner">
    <p className="vx-caption">{t.closeLabel}</p>
    <h2 id="vx-contact-title">{t.closeTitle}</h2>
    <p>{t.closeCopy}</p>
    <a className="vx-primary-link vx-primary-link--final" href={mail}>{t.closeAction}<span aria-hidden="true">↗</span></a>
    <a className="vx-email" href={'mailto:'+identity.email}>{t.direct}: {identity.email}</a>
   </div>
  </section>
  <footer className="vx-footer"><div className="vx-container vx-footer-inner">
   <div><strong>Agustín Wojtyszyn</strong><p>{t.footer}</p></div>
   <nav aria-label={lang==='es'?'Enlaces del pie':'Footer links'}>
    <a href={identity.github} target="_blank" rel="noreferrer">GitHub</a>
    <a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
    <Link href={'/'+lang+'/privacidad'}>{t.privacy}</Link>
    <a href="#main">{t.back}</a>
   </nav>
   <small>© {new Date().getFullYear()} / San Juan, Argentina</small>
  </div></footer>
 </main>;
}
