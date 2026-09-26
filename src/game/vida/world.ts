export type SceneId = 'city' | 'home' | 'cafe' | 'gym' | 'market';

export type Vec = { x: number; y: number };
export type Rect = { x: number; y: number; w: number; h: number };
export type Portal = Rect & { id: string; label: string; target: SceneId; spawn: Vec; accent: string };
export type Hotspot = Rect & { id: string; label: string; action: 'talk' | 'order' | 'train' | 'buy' | 'sleep'; actor?: string };
export type Deco = {
  id: string;
  kind: 'house' | 'apartment' | 'cafe' | 'gym' | 'market' | 'office' | 'church' | 'kiosk' | 'tree' | 'lamp' | 'bench' | 'fountain' | 'bus-stop' | 'flower' | 'park';
  x: number; y: number; w?: number; d?: number; h?: number; tone?: number; label?: string;
};
export type SceneDefinition = { id: SceneId; name: string; worldW: number; worldH: number; spawn: Vec; portals: Portal[]; hotspots: Hotspot[]; colliders: Rect[]; decos: Deco[] };

const cityDecos: Deco[] = [
  { id:'plaza', kind:'park', x:17, y:14, w:10, d:8, label:'Plaza 25 de Mayo' },
  { id:'fountain', kind:'fountain', x:21.5, y:17.4 },
  { id:'cafe', kind:'cafe', x:29, y:12, w:7, d:6, h:6, label:'Café del Centro' },
  { id:'gym', kind:'gym', x:8, y:10, w:7, d:6, h:6, label:'Altura Gym' },
  { id:'market', kind:'market', x:34, y:24, w:8, d:7, h:5, label:'Vea' },
  { id:'home', kind:'apartment', x:6, y:26, w:8, d:7, h:7, tone:1, label:'Mi casa' },
  { id:'church', kind:'church', x:41, y:8, w:7, d:7, h:9, label:'Catedral' },
  { id:'work', kind:'office', x:26, y:28, w:7, d:6, h:8, tone:2, label:'Trabajo' },
  { id:'school', kind:'office', x:16, y:29, w:7, d:6, h:6, tone:3, label:'Instituto' },
  { id:'kiosk', kind:'kiosk', x:43, y:24, w:4, d:4, h:3, label:'Kiosco' },
  { id:'a1', kind:'apartment', x:2, y:4, w:7, d:6, h:8, tone:0 }, { id:'a2', kind:'apartment', x:10, y:3, w:7, d:7, h:10, tone:1 },
  { id:'a3', kind:'apartment', x:19, y:3, w:8, d:7, h:9, tone:2 }, { id:'a4', kind:'apartment', x:29, y:2, w:8, d:7, h:11, tone:3 },
  { id:'a5', kind:'apartment', x:39, y:2, w:8, d:7, h:8, tone:1 },
  { id:'h1', kind:'house', x:2, y:17, w:6, d:5, h:4, tone:0 }, { id:'h2', kind:'house', x:9, y:18, w:6, d:5, h:4, tone:2 },
  { id:'h3', kind:'house', x:2, y:35, w:6, d:5, h:4, tone:1 }, { id:'h4', kind:'house', x:10, y:36, w:6, d:5, h:4, tone:3 },
  { id:'o1', kind:'office', x:19, y:37, w:7, d:5, h:6, tone:1 }, { id:'o2', kind:'office', x:28, y:38, w:7, d:5, h:7, tone:0 },
  { id:'o3', kind:'office', x:38, y:36, w:8, d:6, h:9, tone:3 }, { id:'s1', kind:'house', x:47, y:15, w:6, d:5, h:4, tone:2 },
  { id:'s2', kind:'house', x:48, y:30, w:6, d:5, h:4, tone:0 },
  { id:'stop', kind:'bus-stop', x:37, y:19, label:'Parada de colectivo' },
  { id:'b1', kind:'bench', x:16.8, y:17.2 }, { id:'b2', kind:'bench', x:24.2, y:19.5 }, { id:'b3', kind:'bench', x:20.1, y:13.2 },
  { id:'l1', kind:'lamp', x:16, y:15 }, { id:'l2', kind:'lamp', x:26, y:15 }, { id:'l3', kind:'lamp', x:17, y:22 }, { id:'l4', kind:'lamp', x:26, y:22 },
  { id:'l5', kind:'lamp', x:31, y:19 }, { id:'l6', kind:'lamp', x:36, y:18 }, { id:'l7', kind:'lamp', x:11, y:24 }, { id:'l8', kind:'lamp', x:12, y:31 },
  ...Array.from({length:16}, (_,i)=>({ id:`tree-${i}`, kind:'tree' as const, x:15+(i%5)*2.4+(i%2)*.5, y:12+Math.floor(i/5)*3.0, tone:i%3 })),
  ...Array.from({length:12}, (_,i)=>({ id:`flower-${i}`, kind:'flower' as const, x:16+(i%6)*1.8, y:14+Math.floor(i/6)*5.5, tone:i%3 })),
];

const buildingRects = cityDecos.filter(d => ['house','apartment','cafe','gym','market','office','church','kiosk'].includes(d.kind)).map(d => ({ x:d.x-.3, y:d.y-.3, w:(d.w ?? 4)+.6, h:(d.d ?? 4)+.6 }));

export const SCENES: Record<SceneId, SceneDefinition> = {
  city: { id:'city', name:'San Juan · Centro', worldW:56, worldH:46, spawn:{x:11.4,y:31.6},
    portals:[
      { id:'door-home', label:'Entrar a casa', x:10.3,y:31.0,w:2.2,h:1.8,target:'home',spawn:{x:8,y:12},accent:'#ffd35a' },
      { id:'door-cafe', label:'Entrar a la cafetería', x:31.1,y:17.2,w:2.3,h:1.7,target:'cafe',spawn:{x:7.6,y:13.8},accent:'#ff7f72' },
      { id:'door-gym', label:'Entrar al gimnasio', x:10.0,y:15.4,w:2.2,h:1.7,target:'gym',spawn:{x:7.5,y:13.4},accent:'#a67bff' },
      { id:'door-market', label:'Entrar al supermercado', x:36.8,y:29.5,w:2.4,h:1.7,target:'market',spawn:{x:7.5,y:13.8},accent:'#7ed9ff' },
    ],
    hotspots:[
      { id:'plaza-talk', label:'Hablar con gente de la plaza', x:18,y:15,w:8,h:7,action:'talk',actor:'Mica' },
      { id:'bus', label:'Esperar el colectivo', x:36,y:18,w:4,h:3,action:'talk',actor:'Chofer' },
    ], colliders: buildingRects, decos: cityDecos },
  home: { id:'home', name:'Mi casa', worldW:17, worldH:16, spawn:{x:8,y:12},
    portals:[{id:'exit-home',label:'Salir a la calle',x:7,y:13.3,w:2.4,h:1.4,target:'city',spawn:{x:11.4,y:31.6},accent:'#ffd35a'}],
    hotspots:[{id:'bed',label:'Descansar',x:11.1,y:3.5,w:3.6,h:3.2,action:'sleep'}],
    colliders:[{x:1,y:1,w:15,h:1},{x:1,y:1,w:1,h:14},{x:15,y:1,w:1,h:14},{x:1,y:14,w:6,h:1},{x:9,y:14,w:6,h:1},{x:10.3,y:2.6,w:4.2,h:4.2},{x:2,y:8,w:4.6,h:3.1},{x:2,y:2.5,w:4,h:3.4}], decos:[] },
  cafe: { id:'cafe', name:'Café del Centro', worldW:18, worldH:16, spawn:{x:7.6,y:13.8},
    portals:[{id:'exit-cafe',label:'Salir a la calle',x:6.5,y:14,w:2.5,h:1.3,target:'city',spawn:{x:32,y:18.3},accent:'#ff7f72'}],
    hotspots:[{id:'barista',label:'Pedir en el mostrador',x:10.5,y:3.5,w:5,h:2.4,action:'order',actor:'Lola'}],
    colliders:[{x:1,y:1,w:16,h:1},{x:1,y:1,w:1,h:14},{x:16,y:1,w:1,h:14},{x:1,y:14.7,w:5.5,h:.6},{x:9,y:14.7,w:8,h:.6},{x:9.5,y:2.2,w:6.2,h:2.7},{x:3,y:6.5,w:3,h:2.2},{x:3,y:10.4,w:3,h:2.2},{x:10.2,y:7.5,w:3,h:2.2}], decos:[] },
  gym: { id:'gym', name:'Altura Gym', worldW:18, worldH:16, spawn:{x:7.5,y:13.4},
    portals:[{id:'exit-gym',label:'Salir a la calle',x:6.5,y:14,w:2.5,h:1.3,target:'city',spawn:{x:10.5,y:16.6},accent:'#a67bff'}],
    hotspots:[{id:'trainer',label:'Entrenar',x:11.3,y:3.2,w:4.5,h:2.7,action:'train',actor:'Nico'}],
    colliders:[{x:1,y:1,w:16,h:1},{x:1,y:1,w:1,h:14},{x:16,y:1,w:1,h:14},{x:1,y:14.7,w:5.5,h:.6},{x:9,y:14.7,w:8,h:.6},{x:10.5,y:2.2,w:5.3,h:2.8},{x:3,y:4.7,w:2.5,h:6.5},{x:7,y:4.7,w:2.5,h:6.5}], decos:[] },
  market: { id:'market', name:'Supermercado Vea', worldW:20, worldH:16, spawn:{x:7.5,y:13.8},
    portals:[{id:'exit-market',label:'Salir a la calle',x:6.5,y:14,w:2.5,h:1.3,target:'city',spawn:{x:38,y:30.8},accent:'#7ed9ff'}],
    hotspots:[{id:'cashier',label:'Comprar algo',x:13.4,y:3.0,w:4.3,h:2.6,action:'buy',actor:'Caro'}],
    colliders:[{x:1,y:1,w:18,h:1},{x:1,y:1,w:1,h:14},{x:18,y:1,w:1,h:14},{x:1,y:14.7,w:5.5,h:.6},{x:9,y:14.7,w:10,h:.6},{x:12.5,y:2.1,w:5.5,h:2.8},{x:3,y:4.5,w:2.2,h:7.6},{x:7,y:4.5,w:2.2,h:7.6},{x:11,y:5.2,w:2.2,h:6.9}], decos:[] },
};
export const PLAYER_START = { scene:'city' as SceneId, x:11.4, y:31.6 };
