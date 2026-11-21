import Link from 'next/link';
import { LiveShowcase } from '@/components/live-showcase';
import { identity, type Language } from '@/lib/site';

const copy = {
  es: {
    eyebrow: 'Diseño y desarrollo web independiente · San Juan, Argentina',
    heroFirst: 'Páginas web',
    heroSecond: 'que dejan',
    heroAccent: 'huella.',
    heroText: 'Diseño y desarrollo páginas web, tiendas online y aplicaciones a medida para que tu negocio se vea tan bien como lo que ofrece.',
    heroStart: 'Quiero mi página web',
    heroExplore: 'Explorar servicios',
    heroProof: 'Diseño con personalidad. Desarrollo que funciona.',
    heroVisualLabel: 'Estudio de diseño web',
    heroVisualNote: 'Diseños de demostración, no trabajos de clientes',
    topTag: 'Diseñadas para destacar',
    browserTag: 'Un sitio a tu medida',
    bandOne: 'DISEÑO WEB',
    bandTwo: 'DESARROLLO A MEDIDA',
    bandThree: 'EXPERIENCIAS DIGITALES',
    aboutIndex: '01 / La diferencia',
    aboutEyebrow: 'No se trata solo de tener una web.',
    aboutTitleA: 'Se trata de que',
    aboutTitleB: 'te elijan.',
    aboutCopy: 'Tu sitio es muchas veces la primera impresión de tu negocio. Diseño experiencias que combinan estética, claridad y tecnología para convertir esa primera visita en una buena oportunidad.',
    quality: [
      { number: '01', title: 'Impacto visual', text: 'Una identidad digital propia. Nada de parecerte a cien sitios más.' },
      { number: '02', title: 'Pensado para personas', text: 'Una experiencia cómoda y clara, desde una computadora hasta un celular.' },
      { number: '03', title: 'Hecho para funcionar', text: 'Velocidad, estructura sólida y detalles que acompañan el crecimiento.' }
    ],
    showIndex: '02 / Laboratorio visual',
    showEyebrow: 'No te lo cuento. Te lo muestro.',
    showTitleA: 'Distintas ideas.',
    showTitleB: 'Infinitas formas.',
    showDescription: 'Explorá tres conceptos interactivos: el estilo cambia, la calidad se mantiene. Son demostraciones de diseño, no trabajos de clientes.',
    servicesIndex: '03 / Qué puedo hacer por vos',
    servicesTitle: 'De una idea a algo extraordinario.',
    servicesDescription: 'Cada proyecto empieza entendiendo qué necesitás. El resultado no debería ser una plantilla más, sino una herramienta real para tu negocio.',
    services: [
      { count: '01', category: 'Presencia digital', title: 'Páginas web', description: 'Sitios profesionales, páginas de presentación y experiencias que hacen que una marca destaque.', slug: 'paginas-web', tag: 'Diseño + desarrollo', visual: 'website' },
      { count: '02', category: 'Herramientas de negocio', title: 'Aplicaciones a medida', description: 'Sistemas web, paneles internos y plataformas pensadas para simplificar tu trabajo.', slug: 'aplicaciones-a-medida', tag: 'Soluciones reales', visual: 'apps' },
      { count: '03', category: 'Procesos más simples', title: 'Automatizaciones', description: 'Conectá tareas y procesos para ahorrar tiempo y reducir trabajo repetitivo.', slug: 'automatizacion', tag: 'Más eficiencia', visual: 'flow' }
    ],
    details: 'Conocer servicio',
    interludeSmall: 'BUEN DISEÑO. MEJOR EXPERIENCIA.',
    interludeFirst: 'Tu negocio ya',
    interludeSecond: 'tiene algo único.',
    interludeAccent: 'Tu web también debería.',
    interludeText: 'Sin fórmulas repetidas. Sin efectos que estorben. Con una idea clara detrás de cada detalle.',
    processIndex: '04 / Cómo trabajamos',
    processTitle: 'De tu idea a la pantalla.',
    process: [
      { n:'01', title:'Hablemos', text:'Me contás qué necesitás, a quién querés llegar y cuál es tu objetivo.' },
      { n:'02', title:'Diseñamos', text:'Definimos la dirección visual, el contenido y la experiencia.' },
      { n:'03', title:'Desarrollo', text:'Construyo una solución adaptable, funcional y cuidada en cada detalle.' },
      { n:'04', title:'Publicamos', text:'Revisamos el resultado y dejamos tu proyecto listo para mostrarse.' }
    ],
    personIndex: '05 / Quién está detrás',
    personHello: 'Hola, soy',
    personName: 'Agustín.',
    personCopy: 'Soy desarrollador web full-stack de San Juan, Argentina. Me gusta combinar diseño, código y criterio para crear sitios y aplicaciones que realmente sirvan. Me involucro personalmente desde la primera idea hasta el resultado final.',
    personLink: 'Ver mi perfil en GitHub',
    personAside: 'Una persona real detrás de cada proyecto.',
    contactIndex: 'El próximo proyecto puede ser el tuyo',
    contactA: 'Hagamos',
    contactB: 'que suceda.',
    contactText: '¿Tenés un negocio, una idea o un problema que se puede resolver con una web? Contame qué imaginás.',
    contactButton: 'Hablemos de tu proyecto',
    contactDirect: 'O escribime directamente',
    footerTag: 'Diseño y desarrollo web a medida',
    backTop: 'Volver arriba',
    privacy: 'Privacidad',
    footerServices: 'Servicios'
  },
  en: {
    eyebrow: 'Independent web design & development · San Juan, Argentina',
    heroFirst: 'Websites',
    heroSecond: 'made to',
    heroAccent: 'stand out.',
    heroText: 'I design and build websites, online stores and custom applications that make your business look as good as the work behind it.',
    heroStart: 'Let’s build my website',
    heroExplore: 'Explore services',
    heroProof: 'Distinctive design. Development that works.',
    heroVisualLabel: 'Web design studio',
    heroVisualNote: 'Visual demonstrations, not client projects',
    topTag: 'Designed to stand out',
    browserTag: 'A website that fits',
    bandOne: 'WEB DESIGN',
    bandTwo: 'CUSTOM DEVELOPMENT',
    bandThree: 'DIGITAL EXPERIENCES',
    aboutIndex: '01 / The difference',
    aboutEyebrow: 'It is not just about having a website.',
    aboutTitleA: 'It is about being',
    aboutTitleB: 'the choice.',
    aboutCopy: 'Your website is often your business’s first impression. I create experiences that combine aesthetics, clarity and technology to turn that first visit into an opportunity.',
    quality: [
      { number: '01', title: 'Visual impact', text: 'A digital identity of your own. Not another generic template.' },
      { number: '02', title: 'Made for people', text: 'A comfortable, intuitive experience on every screen.' },
      { number: '03', title: 'Built to perform', text: 'Speed, strong foundations and room to grow.' }
    ],
    showIndex: '02 / Visual lab',
    showEyebrow: 'Don’t take my word for it. Take a look.',
    showTitleA: 'Different ideas.',
    showTitleB: 'Endless possibilities.',
    showDescription: 'Explore three interactive concepts. Different aesthetics, the same attention to detail. These are design demonstrations, not client work.',
    servicesIndex: '03 / What I can build',
    servicesTitle: 'An idea, made extraordinary.',
    servicesDescription: 'Every project starts with understanding your goals. The result should never be just a template, but something useful for your business.',
    services: [
      { count: '01', category: 'Digital presence', title: 'Websites', description: 'Professional websites, landing pages and visual experiences that help brands get noticed.', slug: 'paginas-web', tag: 'Design + development', visual: 'website' },
      { count: '02', category: 'Business tools', title: 'Custom applications', description: 'Web systems, internal dashboards and platforms built around the way you work.', slug: 'aplicaciones-a-medida', tag: 'Real solutions', visual: 'apps' },
      { count: '03', category: 'Smarter workflows', title: 'Automation', description: 'Connect tasks and processes to save time and reduce repetitive work.', slug: 'automatizacion', tag: 'More efficiency', visual: 'flow' }
    ],
    details: 'Explore service',
    interludeSmall: 'GREAT DESIGN. BETTER EXPERIENCE.',
    interludeFirst: 'Your business',
    interludeSecond: 'is one of a kind.',
    interludeAccent: 'Your website should be, too.',
    interludeText: 'No recycled formulas. No effects that get in the way. Just a clear idea behind every detail.',
    processIndex: '04 / The process',
    processTitle: 'From your idea to the screen.',
    process: [
      { n:'01', title:'Let’s talk', text:'You tell me what you need, who you want to reach and what success looks like.' },
      { n:'02', title:'Design', text:'We define the visual direction, content and overall experience.' },
      { n:'03', title:'Development', text:'I build a responsive solution with function and detail in mind.' },
      { n:'04', title:'Launch', text:'We check the result and get your project ready for the world.' }
    ],
    personIndex: '05 / Behind the work',
    personHello: 'Hi, I’m',
    personName: 'Agustín.',
    personCopy: 'I’m a full-stack web developer based in San Juan, Argentina. I love combining design, code and thoughtful problem-solving to build websites and applications that genuinely help people. I’m personally involved from the first idea to the finished result.',
    personLink: 'Explore my GitHub',
    personAside: 'A real person behind every project.',
    contactIndex: 'The next project could be yours',
    contactA: 'Let’s make',
    contactB: 'it happen.',
    contactText: 'A business, an idea or a problem the web could solve? Tell me what you have in mind.',
    contactButton: 'Tell me about your project',
    contactDirect: 'Or email me directly',
    footerTag: 'Custom web design and development',
    backTop: 'Back to top',
    privacy: 'Privacy',
    footerServices: 'Services'
  }
} as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="aw-arrow">{diagonal ? '↗' : '→'}</span>;
}

function HeroArtwork({ lang }: { lang: Language }) {
  const es = lang === 'es';
  return <div className="aw-hero-art aw-hero-art--proof" role="img" aria-label={es ? 'Estudio visual original: diseño de una página web editorial y su versión para celular' : 'Original visual study: an editorial website design and its mobile adaptation'}>
    <div className="aw-art-coordinate aw-art-coordinate--top" aria-hidden="true">AW / {es ? 'Estudio digital' : 'Digital studio'}</div>
    <div className="aw-art-grid" aria-hidden="true"/>
    <div className="aw-proof-sheet" aria-hidden="true">
      <div className="aw-proof-toolbar"><span>AW<span className="aw-proof-mark">✳</span></span><span>{es ? 'Diseño web a medida' : 'Custom web design'}</span><span>01 / 03</span></div>
      <div className="aw-proof-image">
        <div className="aw-proof-orb"><i className="aw-proof-orb-core"/></div>
        <div className="aw-proof-rules"/>
        <p className="aw-proof-overline">{es ? 'Una idea. Una identidad.' : 'One idea. One identity.'}</p>
        <strong>{es ? <>Ideas que<br/>se sienten.</> : <>Ideas you<br/>can feel.</>}</strong>
        <span className="aw-proof-link">{es ? 'Explorar el diseño' : 'Explore the design'} <i>↗</i></span>
      </div>
      <div className="aw-proof-foot"><span>Digital craft / AW®</span><span>{es ? 'Concepto original' : 'Original concept'}</span></div>
    </div>
    <div className="aw-proof-mobile" aria-hidden="true">
      <div className="aw-proof-mobile-top"><span>aw<span>✳</span></span><span>≡</span></div>
      <div className="aw-proof-mobile-visual"><i/><i/></div>
      <div className="aw-proof-mobile-copy"><span>{es ? 'Cada pantalla importa.' : 'Every screen matters.'}</span><strong>{es ? <>Una web.<br/>Todas las<br/>pantallas.</> : <>One site.<br/>Every<br/>screen.</>}</strong></div>
      <div className="aw-proof-mobile-foot"><span>Digital studio</span><span>↗</span></div>
    </div>
    <div className="aw-proof-signature" aria-hidden="true"><span>W</span><span>✳</span></div>
    <p className="aw-art-coordinate aw-art-coordinate--bottom" aria-hidden="true">{es ? 'Diseño que se adapta' : 'Designed for every screen'} <span>001 — AW/26</span></p>
  </div>;
}

function ServiceVisual({ visual, lang }: { visual: string; lang: Language }) {
  return <div className={'aw-service-visual aw-service-visual--' + visual} aria-hidden="true">
    {visual === 'website' ? <div className="aw-mini-site">
      <div className="aw-mini-site-nav"><strong>atelier.</strong><span>THE STUDIO &nbsp; ↗</span></div>
      <div className="aw-mini-site-image"><div className="aw-mini-arch"/><span>FORM / FUNCTION</span></div>
      <div className="aw-mini-site-caption">Built to be remembered. <span>→</span></div>
    </div> : visual === 'apps' ? <div className="aw-mini-app">
      <div className="aw-mini-app-side"><strong>●</strong><i/><i/><i/></div>
      <div className="aw-mini-app-content"><small>WORKSPACE / OVERVIEW</small><h3>{lang === 'es' ? 'Todo en un lugar.' : 'Everything in one place.'}</h3>
      <div className="aw-mini-app-cols"><div><span/><span/><span/></div><div><i/><i/><i/><i/></div></div></div>
    </div> : <div className="aw-mini-flow"><div className="aw-flow-line"/><span className="aw-flow-node aw-flow-node-one">01 <b>INPUT</b></span><span className="aw-flow-node aw-flow-node-two">02 <b>PROCESS</b></span><span className="aw-flow-node aw-flow-node-three">03 <b>DONE ✓</b></span><div className="aw-flow-orb"/></div>}
  </div>;
}

export function CinemaHome({ lang }: { lang: Language }) {
  const t = copy[lang];
  const emailSubject = encodeURIComponent(lang === 'es' ? 'Consulta por desarrollo de página web' : 'Website development inquiry');
  const emailHref = 'mailto:' + identity.email + '?subject=' + emailSubject;

  return <main className="aw-site" id="main">
    <section className="aw-hero" id="experience" aria-labelledby="aw-hero-title">
      <div className="aw-grain" aria-hidden="true"/>
      <div className="aw-wrap aw-hero-grid">
        <div className="aw-hero-copy">
          <p className="aw-eyebrow"><span className="aw-live-dot" aria-hidden="true"/>{t.eyebrow}</p>
          <h1 id="aw-hero-title"><span>{t.heroFirst}</span><span>{t.heroSecond}</span><em>{t.heroAccent}</em></h1>
          <p className="aw-hero-description">{t.heroText}</p>
          <div className="aw-hero-actions">
            <a className="aw-button aw-button--lime" href={emailHref}>{t.heroStart}<Arrow diagonal/></a>
            <a className="aw-text-action" href="#services">{t.heroExplore}<span aria-hidden="true">↓</span></a>
          </div>
          <p className="aw-hero-micro">{t.heroProof}</p>
        </div>
        <HeroArtwork lang={lang}/>
      </div>
      <div className="aw-hero-bottom aw-wrap"><span>© AW / 2026</span><span>{t.heroVisualNote}</span><a href="#vision" aria-label={lang === 'es' ? 'Desplazarse a la siguiente sección' : 'Scroll to next section'}>↓</a></div>
    </section>

    <div className="aw-ticker" aria-hidden="true"><div className="aw-ticker-inner">
      <span>{t.bandOne} <b>✳</b> {t.bandTwo} <b>✳</b> {t.bandThree} <b>✳</b></span>
      <span>{t.bandOne} <b>✳</b> {t.bandTwo} <b>✳</b> {t.bandThree} <b>✳</b></span>
    </div></div>

    <section className="aw-philosophy aw-light" id="vision" aria-labelledby="aw-philosophy-title">
      <div className="aw-wrap">
        <div className="aw-section-header"><span>{t.aboutIndex}</span><span>AW ® / WEB DEVELOPMENT</span></div>
        <div className="aw-philosophy-intro">
          <div><span className="aw-orbit-mark" aria-hidden="true">✳</span><p className="aw-overline">{t.aboutEyebrow}</p></div>
          <div><h2 id="aw-philosophy-title">{t.aboutTitleA} <em>{t.aboutTitleB}</em></h2><p className="aw-section-lead">{t.aboutCopy}</p></div>
        </div>
        <div className="aw-quality-grid">{t.quality.map(item => <article className="aw-quality" key={item.number}><span>{item.number} / 03</span><h3>{item.title}</h3><p>{item.text}</p><span className="aw-quality-symbol" aria-hidden="true">↗</span></article>)}</div>
      </div>
    </section>

    <section className="aw-showcase aw-ink" id="work" aria-labelledby="aw-showcase-title">
      <div className="aw-wrap">
        <div className="aw-section-header aw-section-header--dark"><span>{t.showIndex}</span><span>INTERACTIVE / STUDIO</span></div>
        <div className="aw-showcase-head"><div><p className="aw-overline">{t.showEyebrow}</p><h2 id="aw-showcase-title">{t.showTitleA}<br/><em>{t.showTitleB}</em></h2></div><p>{t.showDescription}</p></div>
        <LiveShowcase lang={lang}/>
      </div>
    </section>

    <section className="aw-services aw-light" id="services" aria-labelledby="aw-services-title">
      <div className="aw-wrap">
        <div className="aw-section-header"><span>{t.servicesIndex}</span><span>WHAT I DO / 03</span></div>
        <div className="aw-services-heading"><h2 id="aw-services-title">{t.servicesTitle}</h2><p>{t.servicesDescription}</p></div>
        <div className="aw-services-list">{t.services.map(item=><article key={item.count} className="aw-service-card">
          <div className="aw-service-copy">
            <div className="aw-service-topline"><span>{item.count} / 03</span><span>{item.tag}</span></div>
            <p className="aw-service-category">{item.category}</p><h3>{item.title}</h3><p className="aw-service-desc">{item.description}</p>
            <Link className="aw-service-link" href={'/'+lang+'/servicios/'+item.slug}>{t.details}<Arrow diagonal/></Link>
          </div>
          <ServiceVisual visual={item.visual} lang={lang}/>
        </article>)}</div>
      </div>
    </section>

    <section className="aw-interlude" aria-labelledby="aw-interlude-title">
      <div className="aw-wrap aw-interlude-inner">
        <p className="aw-overline">{t.interludeSmall}</p>
        <h2 id="aw-interlude-title">{t.interludeFirst}<br/>{t.interludeSecond}<br/><em>{t.interludeAccent}</em></h2>
        <div className="aw-interlude-footer"><p>{t.interludeText}</p><span aria-hidden="true">✳</span></div>
      </div>
    </section>

    <section className="aw-process aw-ink" id="process" aria-labelledby="aw-process-title">
      <div className="aw-wrap">
        <div className="aw-section-header aw-section-header--dark"><span>{t.processIndex}</span><span>FROM IDEA TO LIVE</span></div>
        <div className="aw-process-layout"><div className="aw-process-title"><h2 id="aw-process-title">{t.processTitle}</h2><div className="aw-process-signet" aria-hidden="true"><span>AW</span><span>✳</span></div></div>
        <div className="aw-process-steps">{t.process.map(step=><div className="aw-process-step" key={step.n}><span>{step.n}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><span aria-hidden="true">↗</span></div>)}</div></div>
      </div>
    </section>

    <section className="aw-person aw-light" id="about" aria-labelledby="aw-person-title">
      <div className="aw-wrap">
        <div className="aw-section-header"><span>{t.personIndex}</span><span>PERSONAL / INDEPENDENT</span></div>
        <div className="aw-person-grid">
          <div className="aw-person-art" aria-hidden="true"><div className="aw-person-ring"/><span className="aw-person-monogram">AW<span>®</span></span><span className="aw-person-vertical">INDEPENDENT STUDIO — SAN JUAN</span><span className="aw-person-star">✳</span></div>
          <div className="aw-person-copy"><p className="aw-overline">{t.personAside}</p><h2 id="aw-person-title">{t.personHello}<br/><em>{t.personName}</em></h2><p>{t.personCopy}</p><a href={identity.github} target="_blank" rel="noopener noreferrer">{t.personLink}<Arrow diagonal/></a></div>
        </div>
      </div>
    </section>

    <section className="aw-contact" id="contact" aria-labelledby="aw-contact-title">
      <div className="aw-wrap aw-contact-layout">
        <p className="aw-overline">{t.contactIndex}</p>
        <h2 id="aw-contact-title">{t.contactA}<br/><em>{t.contactB}</em></h2>
        <div className="aw-contact-bottom"><p>{t.contactText}</p><div><a className="aw-button aw-button--dark" href={emailHref}>{t.contactButton}<Arrow diagonal/></a><a className="aw-email-link" href={'mailto:'+identity.email}>{t.contactDirect}: {identity.email}</a></div></div>
        <div className="aw-contact-asterisk" aria-hidden="true">✳</div>
      </div>
    </section>

    <footer className="aw-footer"><div className="aw-wrap aw-footer-grid">
      <div><Link href={'/'+lang} className="aw-footer-name">Agustín<br/>Wojtyszyn<span>®</span></Link><p>{t.footerTag}</p></div>
      <nav aria-label={lang==='es'?'Navegación del pie':'Footer navigation'}><a href="#services">{t.footerServices}</a><a href="#about">{lang==='es'?'Sobre mí':'About'}</a><a href={identity.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={identity.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><Link href={'/'+lang+'/privacidad'}>{t.privacy}</Link></nav>
      <div className="aw-footer-end"><span>© {new Date().getFullYear()} / San Juan, Argentina</span><a href="#main">{t.backTop} ↑</a></div>
    </div></footer>
  </main>;
}
