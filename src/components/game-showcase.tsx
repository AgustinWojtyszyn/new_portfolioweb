import type { Language } from '@/lib/site';

/** Original, lightweight vector concept: not a screenshot from the game. */
export function GameShowcase({ lang }: { lang: Language }) {
 const es = lang === 'es';
 const tiles = Array.from({ length: 15 * 6 }, (_, i) => ({ x: 70 + (i % 15) * 70, y: 42 + Math.floor(i / 15) * 70, i }));
 return <div className="game-showcase" role="img" aria-label={es ? 'Ilustración conceptual de un roguelite con héroe, enemigos y escenario' : 'Concept illustration of a roguelite with a hero, enemies and an arena'}>
  <div className="game-topline mono"><span><i className="status-dot"/> RPG PREMIUM / PROJECT 02</span><span>{es ? 'EN DESARROLLO' : 'IN DEVELOPMENT'} <span aria-hidden="true">↗</span></span></div>
  <svg viewBox="0 0 1200 460" preserveAspectRatio="xMidYMid slice" className="game-art" aria-hidden="true">
   <defs>
    <radialGradient id="game-violet"><stop stopColor="#6b4de0" stopOpacity=".62"/><stop offset="1" stopColor="#6b4de0" stopOpacity="0"/></radialGradient>
    <radialGradient id="game-cyan"><stop stopColor="#2bd6bb" stopOpacity=".42"/><stop offset="1" stopColor="#2bd6bb" stopOpacity="0"/></radialGradient>
    <linearGradient id="game-floor" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#20283b"/><stop offset=".5" stopColor="#151c2c"/><stop offset="1" stopColor="#12182a"/></linearGradient>
    <linearGradient id="game-portal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c388ff"/><stop offset=".5" stopColor="#6453e0"/><stop offset="1" stopColor="#3939a0"/></linearGradient>
    <filter id="game-glow"><feGaussianBlur stdDeviation="18"/></filter>
    <pattern id="game-dots" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="18" cy="18" r="1" fill="#a2a4cb" opacity=".2"/></pattern>
   </defs>
   <rect width="1200" height="460" fill="url(#game-floor)"/>
   <rect width="1200" height="460" fill="url(#game-dots)"/>
   <circle cx="618" cy="208" r="315" fill="url(#game-violet)"/>
   <circle cx="550" cy="260" r="235" fill="url(#game-cyan)"/>
   <g opacity=".54">{tiles.map(({x,y,i})=><path key={i} d={`M${x} ${y}h61v60h-61Z`} fill={i%9===0?'#252e48':'none'} stroke="#7784af" strokeWidth="1" strokeOpacity=".17"/>)}</g>
   <path d="M35 30h1130v400H35Z" stroke="#a5a7f6" strokeOpacity=".2" strokeWidth="16" fill="none"/>
   <path d="M65 57h1068v346H65Z" stroke="#9ba6d4" strokeOpacity=".17" strokeWidth="2" fill="none" strokeDasharray="8 12"/>
   <g className="game-pillars" fill="#2b344f" stroke="#7d8dae" strokeOpacity=".8" strokeWidth="3">
    <path d="M135 115h95v40h-95zM135 115l21-19h93l-19 19zM230 115l19-19v43l-19 16z"/>
    <path d="M960 115h95v40h-95zM960 115l21-19h93l-19 19zM1055 115l19-19v43l-19 16z"/>
    <path d="M135 320h95v40h-95zM135 320l21-19h93l-19 19zM230 320l19-19v43l-19 16z"/>
    <path d="M960 320h95v40h-95zM960 320l21-19h93l-19 19zM1055 320l19-19v43l-19 16z"/>
   </g>
   <g opacity=".72" stroke="#7f6cee" strokeWidth="4" fill="none">
    <path d="M568 58h64v17h-64zM575 52h50M600 75v35"/>
    <path d="M560 70q40 18 80 0"/>
    <path d="M582 84l18 19 18-19"/>
   </g>
   <circle cx="600" cy="78" r="67" fill="#8253f9" opacity=".35" filter="url(#game-glow)"/>
   <path d="M585 35h30l25 44-40 26-40-26Z" fill="url(#game-portal)" stroke="#e5caff" strokeWidth="3" strokeLinejoin="bevel"/>
   <path d="M600 42v56M582 67h36" stroke="#cbe7ff" strokeWidth="3" opacity=".75"/>
   <g className="game-enemy" transform="translate(375 214)">
    <ellipse cx="0" cy="61" rx="53" ry="17" fill="#01040b" opacity=".62"/>
    <path d="M-37 7-20-28 17-28 38 7 28 52-26 52Z" fill="#533547" stroke="#ff8f7c" strokeWidth="5"/>
    <path d="M-48 0-66-20-53-46-19-31M48 0 66-20 53-46 19-31" fill="#754357" stroke="#ff967a" strokeWidth="4"/>
    <path d="M-23-15h16v10h-16zm30 0h16v10H7z" fill="#ffcf88"/>
    <path d="M-28 37h56" stroke="#f29a9b" strokeWidth="5"/>
    <path d="M-13-27V-53M13-27V-53" stroke="#f3a49a" strokeWidth="7"/>
   </g>
   <g className="game-enemy" transform="translate(865 225)">
    <ellipse cx="0" cy="60" rx="60" ry="17" fill="#01040b" opacity=".65"/>
    <path d="M-35-32 0-56 37-32 46 25 22 53-22 53-46 25Z" fill="#244d56" stroke="#5be0d7" strokeWidth="5"/>
    <path d="M-48-25-75 4-42 31M48-25 75 4 42 31" fill="none" stroke="#56afa9" strokeWidth="12"/>
    <path d="M-24-8H24l-10 18h-28Z" fill="#baffec"/>
    <path d="M-24 25H24" stroke="#5be0d7" strokeWidth="5"/>
    <circle cy="-45" r="6" fill="#e8fafd"/>
   </g>
   <g className="game-bolts">
    <path d="M500 215l-55-16 15 21-15 20 55-16Z" fill="#ffd08e"/>
    <path d="M728 218l78-22-21 25 21 21-78-20Z" fill="#89fff1"/>
    <path d="M495 257l-58 30" stroke="#ffba86" strokeWidth="5" strokeLinecap="round"/>
    <path d="M730 264l63 35" stroke="#99f6ee" strokeWidth="5" strokeLinecap="round"/>
   </g>
   <g className="game-hero" transform="translate(615 251)">
    <ellipse cx="0" cy="78" rx="73" ry="20" fill="#050913" opacity=".74"/>
    <circle cx="0" cy="2" r="87" fill="url(#game-cyan)"/>
    <path d="M-34 11-52 52-27 78 28 78 52 52 36 11 21-21H-21Z" fill="#263a56" stroke="#85ecdb" strokeWidth="6"/>
    <path d="M-29 12-54 34-61 61-43 70-16 29M29 12 54 34 61 61 43 70 16 29" fill="#415d70" stroke="#7fe9e2" strokeWidth="4"/>
    <path d="M-30-38-15-63h30l16 25-6 41H-25Z" fill="#2c6273" stroke="#9afdf1" strokeWidth="5"/>
    <path d="M-20-28h40l-6 12h-28Z" fill="#baffed"/>
    <path d="M-7 13h14v28H-7z" fill="#d3d7ff" opacity=".8"/>
    <path d="M46 12 106-25 116-12 54 31Z" fill="#6978a8" stroke="#b8c3ff" strokeWidth="5"/>
    <path d="M101-23 125-47 136-37 116-8Z" fill="#a4efff"/>
    <path d="M-27 77-35 98h24l11-21M27 77 35 98H11L0 77" fill="#29495e" stroke="#82c5d1" strokeWidth="4"/>
   </g>
   <g fill="#d3dbff" opacity=".8"><circle cx="287" cy="290" r="2"/><circle cx="905" cy="138" r="2"/><circle cx="778" cy="360" r="3"/><circle cx="475" cy="105" r="2"/><circle cx="706" cy="127" r="3"/></g>
   <g transform="translate(64 394)" fill="#0a1222" opacity=".82"><rect width="196" height="38" rx="7"/><rect x="11" y="10" width="112" height="8" rx="4" fill="#ed6b83"/><rect x="11" y="23" width="82" height="6" rx="3" fill="#48d3c6"/><rect x="143" y="9" width="38" height="20" rx="4" fill="#243d4d"/></g>
   <text x="224" y="419" textAnchor="end" fontSize="10" fill="#aecbd3" fontFamily="monospace">HP / SHIELD</text>
   <text x="1130" y="409" textAnchor="end" fontSize="11" fill="#b7bedc" letterSpacing="3" fontFamily="monospace">01 / 05</text>
   <text x="1130" y="427" textAnchor="end" fontSize="9" fill="#7587ad" fontFamily="monospace">DUNGEON / CONCEPT</text>
  </svg>
  <div className="game-overlay"><span className="game-overlay-tag mono">{es ? 'ACCIÓN · ROGUELITE' : 'ACTION · ROGUELITE'}</span><strong>{es ? 'Cada partida cuenta.' : 'Every run matters.'}</strong><span className="mono game-overlay-note">{es ? 'Arte conceptual original · no es una captura del juego' : 'Original concept artwork · not an in-game screenshot'}</span></div>
 </div>;
}
