import { StudioIcon } from '@/components/studio-icon';
import type { Language } from '@/lib/site';

/** Purpose-built interface illustrations. They are design concepts, not screenshots or live data. */
const labels={
 es:{
 conceptual:'VISTA CONCEPTUAL · SIN DATOS REALES',layout:'ESPACIO DE TRABAJO',operations:'Tu operación, organizada.',menu:'Pedidos',reports:'Reportes',team:'Usuarios',today:'Actividad',order:'Pedidos del día',menus:'Menús',notes:'Remitos',workflow:'UN SOLO FLUJO',in:'Pedido',manage:'Gestión',out:'Reporte',mobile:'DESDE TU CELULAR',choose:'Elegí tu menú',action:'Continuar',desktop:'ESCRITORIO',responsive:'CELULAR',
 website:'Un sitio pensado para tu negocio',websiteCta:'Contactar',websiteTop:'TU MARCA',websiteSmall:'SERVICIOS · CONTACTO',app:'Tu trabajo, ordenado',appRow1:'Pedidos',appRow2:'Clientes',appRow3:'Informes',
 autoIn:'Información',autoProcess:'Organización',autoOut:'Reporte',automated:'SIN TAREAS REPETITIVAS',
 featured:'VISTA DE PRODUCTO · CONCEPTUAL',featuredTitle:'Pedidos y administración',featuredMenu:'Secciones',featuredSub:'Un proceso que conecta a todos.',featuredTiles:['Pedidos','Menús','Usuarios','Remitos'],featuredFlow:'PEDIDO → CONTROL → DOCUMENTO',
 trackingTitle:'Trabajos y equipos',analyticsTitle:'Informes e inspecciones',documentTitle:'Documentos y versiones'
 },
 en:{
 conceptual:'CONCEPT VIEW · NO REAL DATA',layout:'WORKSPACE',operations:'Your operation, organized.',menu:'Orders',reports:'Reports',team:'Users',today:'Activity',order:'Daily orders',menus:'Menus',notes:'Delivery notes',workflow:'ONE CONNECTED FLOW',in:'Order',manage:'Manage',out:'Report',mobile:'FROM YOUR PHONE',choose:'Choose your menu',action:'Continue',desktop:'DESKTOP',responsive:'MOBILE',
 website:'A site built for your business',websiteCta:'Contact',websiteTop:'YOUR BRAND',websiteSmall:'SERVICES · CONTACT',app:'Your work, organized',appRow1:'Orders',appRow2:'Customers',appRow3:'Reports',
 autoIn:'Information',autoProcess:'Organize',autoOut:'Report',automated:'LESS REPETITIVE WORK',
 featured:'PRODUCT CONCEPT · ILLUSTRATION',featuredTitle:'Orders and administration',featuredMenu:'Sections',featuredSub:'One workflow connecting everyone.',featuredTiles:['Orders','Menus','Users','Delivery'],featuredFlow:'ORDER → REVIEW → DOCUMENT',
 trackingTitle:'Jobs and equipment',analyticsTitle:'Reports and inspections',documentTitle:'Documents and versions'
 }
};
export function HeroSystemVisual({lang}:{lang:Language}){
 const t=labels[lang];
 return <div className="aw-hero-visual" aria-label={t.conceptual}>
  <div className="aw-visual-graticule" aria-hidden="true"/>
  <div className="aw-visual-spec"><span>AW / INTERFACE LAB</span><span>01 — 03</span></div>
  <div className="aw-desktop-shell">
   <div className="aw-browser-chrome"><span className="aw-chrome-dots"><i/><i/><i/></span><span className="aw-address">workspace / overview</span><span className="aw-browser-mark">AW.</span></div>
   <div className="aw-dashboard">
    <aside className="aw-dash-sidebar"><div className="aw-dash-logotype"><b>AW</b><span>STUDIO</span></div><div className="aw-dash-nav"><span className="is-on"><StudioIcon name="app"/>{t.menu}</span><span><StudioIcon name="reports"/>{t.reports}</span><span><StudioIcon name="data"/>{t.team}</span></div><div className="aw-dash-sidebar-mark">SYSTEM / 001</div></aside>
    <div className="aw-dash-content"><div className="aw-dash-top"><span>{t.layout} / 01</span><i/></div><h3>{t.operations}</h3><p className="aw-dash-caption">{t.today}</p><div className="aw-dash-metrics">{[[t.order,'web'],[t.menus,'app'],[t.notes,'reports']].map(([title,icon])=><div key={title}><StudioIcon name={icon as 'web'|'app'|'reports'}/><span>{title}</span><i/></div>)}</div><div className="aw-dash-flow"><span className="aw-dash-flow-label">{t.workflow}</span><div>{[t.in,t.manage,t.out].map((s,i)=><span key={s}>{i>0&&<b aria-hidden="true">›</b>}{s}</span>)}</div></div></div>
   </div>
  </div>
  <div className="aw-phone-shell"><div className="aw-phone-top"><i/><span>{t.mobile}</span><i/></div><div className="aw-phone-main"><span className="aw-phone-label">WORK / 01</span><h4>{t.choose}</h4><div className="aw-phone-option"><span>01</span><i/><b>✓</b></div><div className="aw-phone-option"><span>02</span><i/></div><span className="aw-phone-button">{t.action} <StudioIcon name="right"/></span></div></div>
  <div className="aw-visual-footer"><span>{t.desktop} <b>+</b> {t.responsive}</span><span>{t.conceptual}</span></div>
 </div>;
}
export function ServiceVisual({kind,lang}:{kind:'web'|'app'|'automation';lang:Language}){
 const t=labels[lang];
 if(kind==='web')return <div className="aw-service-visual aw-service-web" aria-hidden="true"><div className="aw-mini-window"><div className="aw-mini-top"><span>● ● ●</span><span>WWW.</span></div><div className="aw-mini-brand">{t.websiteTop}<span>↗</span></div><div className="aw-mini-headline">{t.website}</div><div className="aw-mini-cta">{t.websiteCta} <StudioIcon name="arrow"/></div><div className="aw-mini-lines"><i/><i/></div></div><span className="aw-visual-corner">WEB / 01</span></div>;
 if(kind==='app')return <div className="aw-service-visual aw-service-app" aria-hidden="true"><div className="aw-app-preview"><div className="aw-app-preview-nav"><StudioIcon name="app"/> APP / 02 <i/></div><b>{t.app}</b>{[t.appRow1,t.appRow2,t.appRow3].map((title,i)=><div className="aw-app-preview-row" key={title}><span>0{i+1}</span><strong>{title}</strong><StudioIcon name="right"/></div>)}</div><span className="aw-visual-corner">APP / 02</span></div>;
 return <div className="aw-service-visual aw-service-automation" aria-hidden="true"><div className="aw-automation-nodes"><div><StudioIcon name="data"/><b>{t.autoIn}</b></div><span className="aw-automation-wire">›</span><div><StudioIcon name="automate"/><b>{t.autoProcess}</b></div><span className="aw-automation-wire">›</span><div><StudioIcon name="reports"/><b>{t.autoOut}</b></div></div><div className="aw-automation-bottom">{t.automated} <StudioIcon name="check"/></div><span className="aw-visual-corner">FLOW / 03</span></div>;
}
export function OrdersVisual({lang}:{lang:Language}){
 const t=labels[lang];return <div className="aw-orders-visual" aria-hidden="true"><div className="aw-orders-hud"><span>SF / OPERATIONS</span><span>{t.featured}</span></div><div className="aw-orders-screen"><div className="aw-orders-screen-top"><span className="aw-orders-logo">SF.</span><span>{t.featuredMenu}</span><StudioIcon name="menu"/></div><div className="aw-orders-screen-body"><div className="aw-orders-breadcrumb">WORKSPACE / 01</div><h4>{t.featuredTitle}</h4><p>{t.featuredSub}</p><div className="aw-orders-four">{t.featuredTiles.map((name,i)=><div key={name}><b>0{i+1}</b><StudioIcon name={(['web','app','data','reports'] as const)[i]}/><span>{name}</span></div>)}</div><div className="aw-orders-line"><span>{t.featuredFlow}</span><span>↗</span></div></div></div><div className="aw-orders-watermark">SF / 01</div></div>;
}
export function WorkVisual({slug,lang}:{slug:string;lang:Language}){
 const t=labels[lang];const type=slug==='servifood-tracking'?'tracking':slug==='servifood-analytics'?'analytics':'documents';
 if(type==='tracking')return <div className="aw-work-small aw-small-tracking" aria-hidden="true"><div className="aw-small-header"><StudioIcon name="calendar"/><span>TRACKING / 02</span></div><div className="aw-small-title">{t.trackingTitle}</div><div className="aw-small-tracking-list">{[0,1,2].map(i=><div key={i}><span>0{i+1}</span><i/><StudioIcon name="check"/></div>)}</div></div>;
 if(type==='analytics')return <div className="aw-work-small aw-small-analytics" aria-hidden="true"><div className="aw-small-header"><StudioIcon name="reports"/><span>ANALYTICS / 03</span></div><div className="aw-small-title">{t.analyticsTitle}</div><div className="aw-small-bars">{[36,66,49,85,60,76].map((n,i)=><span key={i} style={{height:n+'%'}}/>)}</div></div>;
 return <div className="aw-work-small aw-small-documents" aria-hidden="true"><div className="aw-small-header"><StudioIcon name="data"/><span>DOCUMENTS / 04</span></div><div className="aw-small-title">{t.documentTitle}</div><div className="aw-small-doc-stack"><div><i/><span>V1</span></div><div><i/><span>V2</span></div><div><StudioIcon name="check"/><span>V3</span></div></div></div>;
}
