'use client';
import Link from 'next/link';
import { useEffect,useRef,useState,type FormEvent } from 'react';
import { identity,type Language } from '@/lib/site';
import { StudioIcon,type IconName } from '@/components/studio-icon';
import { HeroSystemVisual,ServiceVisual,OrdersVisual,WorkVisual } from '@/components/studio-visuals';

const copy={
 es:{
 brandSub:'DISEÑO Y DESARROLLO',
 navigation:['Servicios','Trabajos','Cómo trabajo','Contacto'],start:'Hablemos',menu:'Abrir menú',close:'Cerrar menú',
 eyebrow:'DESARROLLO WEB Y APLICACIONES · SAN JUAN, ARGENTINA',
 headline:['Páginas web y apps','que trabajan a favor','de tu negocio.'],
 intro:'Soy Agustín. Diseño y desarrollo páginas web, aplicaciones y herramientas digitales para negocios que quieren verse mejor, ahorrar tiempo y trabajar más ordenados.',
 primary:'Contame tu proyecto',secondary:'Conocé mi trabajo',
 note:'Trabajás directamente conmigo, desde la primera charla hasta la entrega.',
 visualTop:'DISEÑO / DESARROLLO / EVOLUCIÓN',
 visualTag:'HECHO A MEDIDA',visualSmall:'Una buena idea merece una buena ejecución.',
 visualWeb:'PÁGINAS WEB',visualApp:'APLICACIONES',visualTail:'DE LA IDEA A ALGO QUE FUNCIONA.',
 cred1:'Sin tecnicismos innecesarios',cred2:'Pensado para el uso cotidiano',cred3:'Acompañamiento después del lanzamiento',
 servicesEyebrow:'01 / LO QUE HAGO',servicesTitle:'¿Qué necesitás resolver?',servicesLead:'No vendo paquetes iguales para todos. Cada proyecto empieza entendiendo qué necesitás y para quién lo estás haciendo.',
 services:[
  {id:'web',icon:'web',label:'01',title:'Páginas web',lead:'Una web que represente bien tu negocio y haga fácil que te encuentren y contacten.',details:'Para profesionales, comercios y empresas. Diseño, contenido claro y una experiencia cómoda en celular o computadora.',action:'Quiero mi página'},
  {id:'app',icon:'app',label:'02',title:'Aplicaciones a medida',lead:'Cuando las planillas y los mensajes ya no alcanzan para organizar el trabajo.',details:'Pedidos, reservas, clientes, tareas, paneles de administración y procesos propios de tu actividad.',action:'Necesito una app'},
  {id:'automation',icon:'automate',label:'03',title:'Automatización',lead:'Menos tareas manuales. Más tiempo para lo que importa.',details:'Reportes, documentos, seguimiento y pequeñas mejoras que simplifican el trabajo de todos los días.',action:'Quiero automatizar'}
 ],
 workEyebrow:'02 / TRABAJOS SELECCIONADOS',workTitle:'Proyectos reales. Problemas resueltos.',workLead:'Estos sistemas están construidos para situaciones de trabajo concretas. Acá importa qué permiten hacer, no cuántas tecnologías tienen detrás.',
 workMain:{label:'PROYECTO DESTACADO',name:'ServiFood',title:'De pedidos dispersos a una operación organizada.',desc:'Una aplicación donde distintas empresas realizan pedidos y la administración gestiona menús, usuarios, remitos y reportes desde un mismo lugar.',link:'Ver cómo funciona',fields:['PEDIDOS','MENÚS','REMITOS','REPORTES']},
 workOthers:[
  {slug:'servifood-tracking',num:'02',icon:'calendar',name:'ServiFood Tracking',type:'GESTIÓN DE TRABAJOS',desc:'Trabajos, vehículos y mantenimiento con información ordenada y disponible.'},
  {slug:'servifood-analytics',num:'03',icon:'reports',name:'ServiFood Analytics',type:'ANÁLISIS Y CALIDAD',desc:'Documentación, reportes e inspecciones reunidos para trabajar con mayor claridad.'},
  {slug:'ep-consultora-sgi',num:'04',icon:'data',name:'gestiQa',type:'GESTIÓN DOCUMENTAL',desc:'Documentos, responsables, versiones y aprobaciones sin perder el seguimiento.'}
 ],
 processEyebrow:'03 / ASÍ TRABAJO',processTitle:'Simple para vos. Bien hecho por dentro.',processIntro:'No hace falta que sepas cómo se programa una aplicación. Hace falta que me cuentes qué querés lograr.',
 steps:[
  {n:'01',title:'Primero, escucho',text:'Me contás tu idea, qué está pasando hoy y qué te gustaría mejorar.'},
  {n:'02',title:'Después, definimos',text:'Te propongo una solución concreta, con alcance y presupuesto claros.'},
  {n:'03',title:'Por último, construyo',text:'Diseño, desarrollo, pruebo y publico. Si hace falta, seguimos mejorando.'}
 ],
 aboutEyebrow:'¿CON QUIÉN VAS A TRABAJAR?',aboutTitle:'Soy Agustín Wojtyszyn.',aboutText:'Desarrollador full-stack de San Juan, Argentina. Creo y mantengo software que personas y equipos usan todos los días. Prefiero explicar las cosas con claridad, proponer lo que hace falta y estar presente cuando el proyecto sale al mundo.',
 aboutQuote:'El objetivo no es tener más funciones. Es tener las funciones correctas.',
 faqEyebrow:'PREGUNTAS FRECUENTES',faqTitle:'Antes de escribir, quizás quieras saber esto.',faqs:[
  ['¿Tengo que entender de programación?','No. Me contás qué necesitás con tus palabras. Mi trabajo es convertirlo en una solución fácil de usar.'],
  ['¿Cuánto cuesta hacer una página o una app?','El precio depende del alcance del proyecto. Primero hablamos de lo que necesitás y después preparo un presupuesto.'],
  ['¿La web va a funcionar en celulares?','Sí. La experiencia móvil forma parte del diseño, no es algo que se agrega al final.'],
  ['¿Puedo pedir modificaciones después?','Sí. Podemos planificar mantenimiento y mejoras una vez que el proyecto esté funcionando.']
 ],
 contactEyebrow:'04 / EMPECEMOS',contactTitle:'¿Tenés una idea? Hablemos.',contactText:'Contame qué necesitás. Puede ser una web nueva, una aplicación para tu negocio o un proceso que quieras simplificar.',contactBtn:'Solicitar un presupuesto',contactDirect:'O escribime directamente',footer:'Desarrollo web y aplicaciones a medida',backtop:'Volver arriba',
 dialogTitle:'Hablemos de tu proyecto',dialogIntro:'Contame lo básico. No hace falta que tengas todo resuelto.',dialogService:'¿Qué tenés en mente?',dialogTypes:['Una página web','Una aplicación','Una automatización','Todavía no estoy seguro/a'],dialogName:'Tu nombre',dialogReply:'Email o teléfono (opcional)',dialogMessage:'¿Qué necesitás?',dialogPlaceholder:'Ej.: Tengo un comercio y quiero recibir pedidos desde mi propia página…',dialogSubmit:'Continuar por correo',dialogCopy:'Copiar consulta',dialogCopied:'Consulta copiada',dialogClose:'Cerrar',dialogNotice:'Al continuar se abre tu aplicación de correo con el mensaje listo. No se envía automáticamente ni se guardan datos en esta web.',dialogFallback:'También podés escribir a',subject:'Consulta por un proyecto'
 },
 en:{
 brandSub:'DESIGN & DEVELOPMENT',navigation:['Services','Projects','Process','Contact'],start:'Let’s talk',menu:'Open menu',close:'Close menu',
 eyebrow:'WEBSITES & CUSTOM APPLICATIONS · ARGENTINA',
 headline:['Websites and apps','that work for','your business.'],
 intro:'I’m Agustín. I design and develop websites, applications and digital tools to help businesses look professional, save time and stay organized.',
 primary:'Tell me about your project',secondary:'Explore my work',
 note:'Work directly with me, from the first conversation through launch.',
 visualTop:'DESIGN / DEVELOPMENT / EVOLUTION',visualTag:'MADE FOR YOU',visualSmall:'A good idea deserves thoughtful execution.',
 visualWeb:'WEBSITES',visualApp:'APPLICATIONS',visualTail:'FROM IDEA TO SOMETHING THAT WORKS.',
 cred1:'No unnecessary tech jargon',cred2:'Designed for everyday use',cred3:'Support beyond launch',
 servicesEyebrow:'01 / WHAT I DO',servicesTitle:'What do you need to solve?',servicesLead:'No one-size-fits-all packages. Every project starts with understanding what you need and who it is for.',
 services:[
  {id:'web',icon:'web',label:'01',title:'Business websites',lead:'A website that represents your business and makes it easy to discover and contact you.',details:'For professionals, shops and companies. Considered design, clear content and a great experience on every screen.',action:'I need a website'},
  {id:'app',icon:'app',label:'02',title:'Custom applications',lead:'When spreadsheets and messages can no longer keep your work organized.',details:'Orders, bookings, customers, tasks, administration panels and workflows built around the way you work.',action:'I need an app'},
  {id:'automation',icon:'automate',label:'03',title:'Workflow automation',lead:'Less repetitive work. More time for what matters.',details:'Reports, documents, tracking and practical improvements that simplify everyday operations.',action:'Automate my work'}
 ],
 workEyebrow:'02 / SELECTED WORK',workTitle:'Real projects. Real problems solved.',workLead:'Software made for everyday working situations. What matters here is what each solution does for people, not a list of frameworks.',
 workMain:{label:'FEATURED PROJECT',name:'ServiFood',title:'From scattered orders to organized operations.',desc:'An application where different companies place orders while administrators manage menus, users, delivery notes and reporting together.',link:'Explore the case',fields:['ORDERS','MENUS','DELIVERY','REPORTS']},
 workOthers:[
  {slug:'servifood-tracking',num:'02',icon:'calendar',name:'ServiFood Tracking',type:'WORK MANAGEMENT',desc:'Jobs, vehicles and maintenance information organized and accessible.'},
  {slug:'servifood-analytics',num:'03',icon:'reports',name:'ServiFood Analytics',type:'ANALYTICS & QUALITY',desc:'Documents, reports and inspections collected in one coherent workflow.'},
  {slug:'ep-consultora-sgi',num:'04',icon:'data',name:'gestiQa',type:'DOCUMENT MANAGEMENT',desc:'Documents, owners, versions and approvals without losing track.'}
 ],
 processEyebrow:'03 / MY PROCESS',processTitle:'Easy for you. Thoughtful under the hood.',processIntro:'You don’t need to know how an application is built. Just tell me what you want to achieve.',
 steps:[
  {n:'01',title:'First, I listen',text:'Tell me about your idea, how things work today and what you would like to improve.'},
  {n:'02',title:'Then, we define it',text:'I propose a practical solution with clear scope and a quote.'},
  {n:'03',title:'Finally, I build',text:'I design, develop, test and launch. We can keep improving it afterwards.'}
 ],
 aboutEyebrow:'WHO YOU’LL WORK WITH',aboutTitle:'I’m Agustín Wojtyszyn.',aboutText:'A full-stack developer based in San Juan, Argentina. I build and maintain software used by people and teams every day. I value clear communication, practical recommendations and staying involved when a project goes live.',
 aboutQuote:'It’s not about having more features. It’s about having the right ones.',
 faqEyebrow:'COMMON QUESTIONS',faqTitle:'A few things worth knowing.',faqs:[
  ['Do I need to know how to code?','No. Explain what you need in your own words. My job is to make it work and easy to use.'],
  ['How much does a website or app cost?','The price depends on the project scope. We first discuss what you need, then I prepare a quote.'],
  ['Will my website work on mobile?','Yes. Mobile experience is part of the design from the start.'],
  ['Can I request changes after launch?','Yes. We can plan ongoing maintenance and improvements after your project goes live.']
 ],
 contactEyebrow:'04 / GET STARTED',contactTitle:'Have an idea? Let’s talk.',contactText:'Tell me what you need. A new website, a custom application, or a workflow you would like to simplify.',contactBtn:'Request a quote',contactDirect:'Or email me directly',footer:'Websites and custom applications',backtop:'Back to top',
 dialogTitle:'Tell me about your project',dialogIntro:'Just the essentials. You don’t need everything figured out.',dialogService:'What do you have in mind?',dialogTypes:['A website','An application','Workflow automation','Not sure yet'],dialogName:'Your name',dialogReply:'Email or phone (optional)',dialogMessage:'What do you need?',dialogPlaceholder:'E.g. I run a store and want to take orders on my website…',dialogSubmit:'Continue in email',dialogCopy:'Copy inquiry',dialogCopied:'Inquiry copied',dialogClose:'Close',dialogNotice:'This opens your email application with a prepared message. Nothing is sent automatically or stored on this website.',dialogFallback:'You can also email',subject:'Project inquiry'
 }
};
const kinds=['web','app','automation','other'];
export function StudioHome({lang}:{lang:Language}){
 const t=copy[lang];const dialog=useRef<HTMLDialogElement>(null);const [service,setService]=useState('other');const [name,setName]=useState('');const [reply,setReply]=useState('');const [description,setDescription]=useState('');const [copied,setCopied]=useState(false);
 const open=(s='other')=>{setService(s);setCopied(false);dialog.current?.showModal();};
 const body=()=>[t.dialogService+': '+t.dialogTypes[kinds.indexOf(service)],t.dialogName+': '+name.trim(),reply.trim()?t.dialogReply+': '+reply.trim():'',t.dialogMessage+': '+description.trim()].filter(Boolean).join('\n\n');
 const submit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();window.location.href='mailto:'+identity.email+'?subject='+encodeURIComponent(t.subject)+'&body='+encodeURIComponent(body());};
 const copyInquiry=async()=>{if(!name.trim()||!description.trim()){dialog.current?.querySelector<HTMLInputElement>(!name.trim()?'#studio-name':'#studio-description')?.focus();return;}try{await navigator.clipboard.writeText(body());setCopied(true);}catch{setCopied(false);}};
 const openButton=(label:string,s='other',cls='studio-button studio-button-dark')=><button type="button" className={cls} onClick={()=>open(s)}>{label}<StudioIcon name="arrow"/></button>;
 useEffect(()=>{const key=(event:KeyboardEvent)=>{if(event.key==='Escape')setCopied(false);};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[]);
 return <main id="main" className="studio-page">
  <section className="studio-hero studio-container" aria-labelledby="studio-title">
   <div className="studio-hero-copy"><div className="studio-overline"><span className="studio-overline-rule"/>{t.eyebrow}</div><h1 id="studio-title">{t.headline[0]}<br/>{t.headline[1]}<br/><em>{t.headline[2]}</em></h1><p className="studio-hero-intro">{t.intro}</p><div className="studio-hero-actions">{openButton(t.primary)}<a className="studio-link" href="#work">{t.secondary}<StudioIcon name="arrow"/></a></div><p className="studio-hero-note"><StudioIcon name="check"/>{t.note}</p></div>
   <HeroSystemVisual lang={lang}/>
  </section>
  <div className="studio-assurances"><div className="studio-container">{[t.cred1,t.cred2,t.cred3].map((line,i)=><div key={line}><span>0{i+1}</span>{line}</div>)}</div></div>
  <section id="services" className="studio-section studio-container"><div className="studio-section-intro"><span className="studio-eyebrow">{t.servicesEyebrow}</span><div><h2>{t.servicesTitle}</h2><p>{t.servicesLead}</p></div></div><div className="studio-service-list">{t.services.map(s=><article className="studio-service" key={s.id}><div className="studio-service-icon"><StudioIcon name={s.icon as IconName}/></div><div className="studio-service-main"><span className="studio-service-index">{s.label} / {lang==='es'?'SERVICIO':'SERVICE'}</span><h3>{s.title}</h3><p className="studio-service-lead">{s.lead}</p><p className="studio-service-detail">{s.details}</p></div><ServiceVisual lang={lang} kind={s.id as 'web'|'app'|'automation'}/><div className="studio-service-side">{openButton(s.action,s.id,'studio-service-action')}</div></article>)}</div></section>
  <section id="work" className="studio-work-section"><div className="studio-container"><div className="studio-section-intro"><span className="studio-eyebrow">{t.workEyebrow}</span><div><h2>{t.workTitle}</h2><p>{t.workLead}</p></div></div><Link href={'/'+lang+'/work/servifood-orders'} className="studio-featured"><div className="studio-featured-copy"><span className="studio-mini-label">{t.workMain.label}</span><strong className="studio-featured-brand">{t.workMain.name}</strong><h3>{t.workMain.title}</h3><p>{t.workMain.desc}</p><span className="studio-featured-link">{t.workMain.link}<StudioIcon name="arrow"/></span></div><OrdersVisual lang={lang}/></Link>
   <div className="studio-project-list">{t.workOthers.map(p=><Link href={'/'+lang+'/work/'+p.slug} key={p.slug} className="studio-project"><span className="studio-project-num">{p.num}</span><WorkVisual slug={p.slug} lang={lang}/><span className="studio-project-copy"><small>{p.type}</small><strong>{p.name}</strong><span>{p.desc}</span></span><span className="studio-project-arrow"><StudioIcon name="arrow"/></span></Link>)}</div></div></section>
  <section id="process" className="studio-section studio-container studio-process"><div className="studio-section-intro"><span className="studio-eyebrow">{t.processEyebrow}</span><div><h2>{t.processTitle}</h2><p>{t.processIntro}</p></div></div><div className="studio-steps">{t.steps.map(s=><article key={s.n}><span>{s.n}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></section>
  <section className="studio-about"><div className="studio-container studio-about-inner"><div className="studio-about-sign"><span>AGUSTÍN<br/>WOJTYSZYN<span className="studio-dot">.</span></span><small>FULL-STACK DEVELOPMENT / AR</small></div><div><span className="studio-eyebrow">{t.aboutEyebrow}</span><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><blockquote>{t.aboutQuote}</blockquote></div></div></section>
  <section className="studio-section studio-container studio-faq"><div><span className="studio-eyebrow">{t.faqEyebrow}</span><h2>{t.faqTitle}</h2></div><div>{t.faqs.map(([question,answer],i)=><details key={question}><summary><span className="studio-faq-number">0{i+1}</span><strong>{question}</strong><span className="studio-faq-toggle" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
  <section id="contact" className="studio-contact"><div className="studio-container studio-contact-inner"><span className="studio-eyebrow">{t.contactEyebrow}</span><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="studio-contact-actions">{openButton(t.contactBtn,'other','studio-button studio-button-light')}<a href={'mailto:'+identity.email} className="studio-contact-email"><StudioIcon name="mail"/>{identity.email}</a></div><span className="studio-contact-bottom">{t.contactDirect} <StudioIcon name="arrow"/></span></div></section>
  <footer className="studio-footer"><div className="studio-container"><div><strong>Agustín Wojtyszyn<span>.</span></strong><p>{t.footer}</p></div><div className="studio-footer-links"><a href={identity.github} target="_blank" rel="noreferrer">GitHub <StudioIcon name="arrow"/></a><a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn <StudioIcon name="arrow"/></a><a href="#main">{t.backtop} ↑</a></div><small>© {new Date().getFullYear()}</small></div></footer>
  <dialog className="studio-dialog" ref={dialog} aria-labelledby="studio-modal-title" onClick={e=>{if(e.target===dialog.current)dialog.current?.close();}}><div className="studio-dialog-inner"><div className="studio-dialog-header"><span className="studio-eyebrow">AGUSTÍN WOJTYSZYN / {lang==='es'?'CONTACTO':'CONTACT'}</span><button type="button" className="studio-dialog-close" aria-label={t.dialogClose} onClick={()=>dialog.current?.close()}><StudioIcon name="close"/></button></div><h2 id="studio-modal-title">{t.dialogTitle}</h2><p>{t.dialogIntro}</p><form onSubmit={submit}><label htmlFor="studio-service">{t.dialogService}</label><select id="studio-service" value={service} onChange={e=>setService(e.target.value)}>{t.dialogTypes.map((o,i)=><option key={o} value={kinds[i]}>{o}</option>)}</select><div className="studio-form-row"><div><label htmlFor="studio-name">{t.dialogName}</label><input id="studio-name" required maxLength={100} value={name} onChange={e=>setName(e.target.value)}/></div><div><label htmlFor="studio-reply">{t.dialogReply}</label><input id="studio-reply" maxLength={160} value={reply} onChange={e=>setReply(e.target.value)}/></div></div><label htmlFor="studio-description">{t.dialogMessage}</label><textarea id="studio-description" required maxLength={2400} rows={5} value={description} onChange={e=>setDescription(e.target.value)} placeholder={t.dialogPlaceholder}/><p className="studio-form-hint">{t.dialogNotice}</p><div className="studio-form-actions"><button type="submit" className="studio-button studio-button-dark">{t.dialogSubmit}<StudioIcon name="arrow"/></button><button type="button" className="studio-form-copy" onClick={copyInquiry}>{copied?t.dialogCopied:t.dialogCopy}</button></div></form><small className="studio-form-fallback">{t.dialogFallback} <a href={'mailto:'+identity.email}>{identity.email}</a>.</small></div></dialog>
 </main>;
}
