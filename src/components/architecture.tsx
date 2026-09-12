import type { Language } from '@/lib/site';
import { getContent } from '@/content/site';
export function Architecture({ flow, lang, compact = false }: { flow: string[]; lang: Language; compact?: boolean }) {
 return <div className={`architecture ${compact ? 'compact' : ''}`}><div className="diagram-label mono"><span>{getContent(lang).architecture}</span><span>↘</span></div><ol className="flow">{flow.map((node, i) => <li key={node}><span className="flow-number">0{i+1}</span><strong>{node}</strong>{i<flow.length-1 && <span className="flow-arrow" aria-hidden="true">↓</span>}</li>)}</ol><p className="diagram-caption mono">{getContent(lang).visual}</p></div>;
}
export function OrderVisual({ lang }: { lang: Language }) {
 return <div className="order-visual"><div className="diagram-label mono"><span>SERVIFOOD / SYSTEM DESIGN</span><span>01—05</span></div><div className="order-blueprint"><div className="blueprint-input mono">{lang === 'es' ? 'EMPRESAS / SEDES / USUARIOS' : 'COMPANIES / LOCATIONS / USERS'}</div><div className="blueprint-line"/><div className="blueprint-core"><span className="mono">SF / OPERATIONS</span><strong>Order<br/>System<span>↗</span></strong><div className="blueprint-core-footer mono">React <span>↔</span> Supabase</div></div><div className="blueprint-branches"><span>{lang === 'es' ? 'Pedidos' : 'Orders'}</span><span>{lang === 'es' ? 'Permisos' : 'Permissions'}</span><span>{lang === 'es' ? 'Reportes' : 'Reporting'}</span></div></div><p className="diagram-caption mono">{getContent(lang).visual}</p></div>;
}
