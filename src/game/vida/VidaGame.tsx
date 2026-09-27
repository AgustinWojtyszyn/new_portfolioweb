'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './vida.module.css';

type Vec={x:number;y:number};
type Building={x:number;y:number;w:number;h:number;asset:string;title:string;kind:string;facing?:string};
type Npc={x:number;y:number;phase:number;speed:number;gender:'male'|'female';route:Vec[]};
type Vehicle={x:number;y:number;speed:number;lane:number;model:'compact'|'taxi'|'colectivo';dir:1|-1;route?:Vec[];routeIndex?:number;facing?:'north'|'south'|'east'|'west'};
type ImgCache=Record<string,HTMLImageElement>;

const ROOT='https://raw.githubusercontent.com/AgustinWojtyszyn/Life--simulador-de-vida/main/';
const WORLD={w:4800,h:3200};
const horizontal=[{y:394,h:170},{y:1130,h:120},{y:1900,h:126},{y:2660,h:126}];
const vertical=[{x:852,w:138},{x:1810,w:120},{x:2780,w:126},{x:3760,w:126}];
const houseAssets=['modern','common','compact','duplex','old','restored','apartments','brick','premium_home'];
const shopAssets=[
 ['cafe','CAFÉ'],['market','ALMACÉN'],['panaderia','PANADERÍA'],['kiosco','KIOSCO'],
 ['office','OFICINAS'],['clinic','CLÍNICA'],['workshop','TALLER'],['premium','EDIFICIO'],['cheap','VIVIENDA'],['tower','TORRE']
] as const;

function seeded(i:number){const x=Math.sin(i*987.123)*43758.5453;return x-Math.floor(x)}
function clamp(v:number,a:number,b:number){return Math.max(a,Math.min(b,v))}
function dist(a:Vec,b:Vec){return Math.hypot(a.x-b.x,a.y-b.y)}
function imgPath(path:string){return ROOT+path}

function makeBuildings():Building[]{
 const out:Building[]=[];
 let seed=1;
 const xRows=[180,440,700,1110,1430,1640,2070,2350,2500,3040,3300,3480,4020,4280,4540];
 for(const r of horizontal){
  const y=r.y-28;
  for(let c=0;c<xRows.length;c++){
   const x=xRows[c];
   if(vertical.some(v=>x>v.x-250&&x<v.x+v.w+250))continue;
   if(y<500&&x<1380)continue;
   const special=(c+Math.floor(y/700))%6===0;
   if(special){
    const s=shopAssets[(seed*3+c)%shopAssets.length];
    out.push({x,y,w:s[0]==='kiosco'?128:182,h:s[0]==='tower'?255:190,asset:`assets/buildings/ar/${s[0]}.png`,title:s[1],kind:s[0]});
   }else{
    const h=houseAssets[(seed+c)%houseAssets.length];
    out.push({x,y,w:168+(seed%3)*9,h:175+(seed%4)*12,asset:`assets/houses/ar/${h}.png`,title:'VIVIENDA',kind:'house'});
   }
   seed++;
  }
 }
 const sideYs=[820,1530,2290,3040];
 for(const r of vertical){
  for(const y of sideYs){
   if(y>WORLD.h-100)continue;
   out.push({x:r.x-126,y,w:150,h:178,asset:'assets/oriented/ar/house/east.png',title:'VIVIENDA',kind:'house',facing:'east'});
   out.push({x:r.x+r.w+126,y,w:150,h:178,asset:'assets/oriented/ar/house/west.png',title:'VIVIENDA',kind:'house',facing:'west'});
  }
 }
 out.push({x:195,y:318,w:186,h:202,asset:'assets/buildings/ar/cafe.png',title:'CAFÉ',kind:'cafe'});
 out.push({x:445,y:320,w:186,h:188,asset:'assets/buildings/ar/market.png',title:'ALMACÉN',kind:'market'});
 out.push({x:704,y:315,w:184,h:195,asset:'assets/buildings/ar/panaderia.png',title:'PANADERÍA',kind:'bakery'});
 out.push({x:1168,y:324,w:132,h:168,asset:'assets/buildings/ar/kiosco.png',title:'KIOSCO',kind:'kiosk'});
 return out;
}

function createNpcs():Npc[]{
 const out:Npc[]=[];
 const xs=[250,520,1240,1540,2200,2440,3140,3440,4100,4420];
 const ys=[350,760,1450,2200,2960];
 let n=0;
 for(const y of ys)for(const x of xs){
  if(n>=38)break;
  out.push({x,y,phase:seeded(n)*20,speed:32+seeded(n+9)*30,gender:n%2?'female':'male',route:[{x,y},{x:x+120,y},{x:x+120,y:y+52},{x:x+22,y:y+52}]});
  n++;
 }
 return out;
}
function createVehicles():Vehicle[]{
 const traffic:Vehicle[]=Array.from({length:8},(_,i)=>({x:120+i*520,y:i%2?454:512,speed:78+(i%4)*10,lane:i%2,model:i%3===0?'taxi':'compact',dir:i%2?-1:1 as 1|-1}));
 traffic.push(
  {x:958,y:930,speed:76,lane:2,model:'colectivo',dir:1,route:[{x:958,y:1160},{x:958,y:512},{x:1870,y:512},{x:1870,y:1160}],routeIndex:1,facing:'north'},
  {x:2842,y:1500,speed:72,lane:3,model:'colectivo',dir:1,route:[{x:2842,y:1962},{x:2842,y:1190},{x:3822,y:1190},{x:3822,y:1962}],routeIndex:1,facing:'north'}
 );
 return traffic;
}

export function VidaGame(){
 const canvasRef=useRef<HTMLCanvasElement>(null);
 const rafRef=useRef<number>(0);
 const lastRef=useRef(0);
 const player=useRef<Vec>({x:1550,y:620});
 const facing=useRef<'south'|'north'|'east'|'west'>('south');
 const input=useRef<Vec>({x:0,y:0});
 const keys=useRef(new Set<string>());
 const camera=useRef<Vec>({x:1550,y:620});
 const images=useRef<ImgCache>({});
 const npcs=useRef<Npc[]>(createNpcs());
 const vehicles=useRef<Vehicle[]>(createVehicles());
 const stickPointer=useRef<number|null>(null);
 const audioCtx=useRef<AudioContext|null>(null);
 const oscillators=useRef<OscillatorNode[]>([]);
 const musicTimer=useRef<number|null>(null);
 const buildings=useMemo(()=>makeBuildings(),[]);
 const [message,setMessage]=useState('');
 const [panel,setPanel]=useState(false);
 const [muted,setMuted]=useState(false);
 const [nearby,setNearby]=useState<string>('');

 const asset=(path:string)=>{
  let img=images.current[path];
  if(!img){
   img=new Image();
   img.decoding='async';
   img.src=imgPath(path);
   images.current[path]=img;
  }
  return img;
 };

 const stopAudio=useCallback(()=>{
  for(const o of oscillators.current){try{o.stop()}catch{}}
  oscillators.current=[];
  if(musicTimer.current!==null){window.clearTimeout(musicTimer.current);musicTimer.current=null}
 },[]);

 const playTrack=useCallback((index:number)=>{
  if(muted)return;
  let ctx=audioCtx.current;
  if(!ctx){ctx=new AudioContext();audioCtx.current=ctx}
  if(ctx.state==='suspended')void ctx.resume();
  stopAudio();
  const chords=[[196,246.94,293.66],[220,277.18,329.63],[174.61,220,261.63]];
  const gains=[0.018,0.014,0.012];
  const master=ctx.createGain();master.gain.value=.8;master.connect(ctx.destination);
  chords[index%3].forEach((f,i)=>{
   const o=ctx!.createOscillator();const g=ctx!.createGain();
   o.type=i===0?'sine':'triangle';o.frequency.value=f;g.gain.value=gains[i];
   o.connect(g);g.connect(master);o.start();oscillators.current.push(o);
  });
  musicTimer.current=window.setTimeout(()=>playTrack((index+1)%3),20000);
 },[muted,stopAudio]);

 const ensureAudio=useCallback(()=>{if(!muted&&oscillators.current.length===0)playTrack(0)},[muted,playTrack]);

 const beep=useCallback((kind:'act'|'brake')=>{
  if(muted)return;let ctx=audioCtx.current;if(!ctx){ctx=new AudioContext();audioCtx.current=ctx}
  const o=ctx.createOscillator(),g=ctx.createGain();o.type=kind==='brake'?'sawtooth':'sine';
  o.frequency.setValueAtTime(kind==='brake'?850:520,ctx.currentTime);
  if(kind==='brake')o.frequency.exponentialRampToValueAtTime(260,ctx.currentTime+.16);
  g.gain.setValueAtTime(.045,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.18);
  o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.19);
 },[muted]);

 useEffect(()=>()=>{stopAudio();audioCtx.current?.close().catch(()=>{})},[stopAudio]);

 const interact=useCallback(()=>{
  ensureAudio();beep('act');
  const p=player.current;
  const pitch={x:2345,y:2340};
  if(dist(p,pitch)<430){setMessage('Jugaste un rato en la cancha municipal. Bienestar +14 · Reputación +1');return}
  const nearest=buildings.reduce<{b:Building|null;d:number}>((acc,b)=>{const d=dist(p,{x:b.x,y:b.y});return d<acc.d?{b,d}:acc},{b:null,d:9999});
  if(nearest.b&&nearest.d<190){
   const b=nearest.b;
   setMessage(`${b.title}: entrada disponible en la versión Godot. Esta build web prioriza movimiento, escala de ciudad y controles Android.`);
   return;
  }
  setMessage('No hay nada para interactuar tan cerca.');
 },[beep,buildings,ensureAudio]);

 useEffect(()=>{
  const down=(e:KeyboardEvent)=>{keys.current.add(e.key.toLowerCase());if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright','e'].includes(e.key.toLowerCase()))e.preventDefault();ensureAudio();if(e.key.toLowerCase()==='e')interact()};
  const up=(e:KeyboardEvent)=>keys.current.delete(e.key.toLowerCase());
  window.addEventListener('keydown',down,{passive:false});window.addEventListener('keyup',up);
  return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up)}
 },[ensureAudio,interact]);

 useEffect(()=>{
  const canvas=canvasRef.current;if(!canvas)return;
  const ctx=canvas.getContext('2d');if(!ctx)return;
  const resize=()=>{const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.floor(innerWidth*dpr);canvas.height=Math.floor(innerHeight*dpr);canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(dpr,0,0,dpr,0,0)};
  resize();window.addEventListener('resize',resize);
  const render=(now:number)=>{
   const dt=Math.min(.033,(now-lastRef.current)/1000||.016);lastRef.current=now;
   let x=0,y=0;const k=keys.current;
   if(k.has('a')||k.has('arrowleft'))x--;if(k.has('d')||k.has('arrowright'))x++;if(k.has('w')||k.has('arrowup'))y--;if(k.has('s')||k.has('arrowdown'))y++;
   x+=input.current.x;y+=input.current.y;const len=Math.hypot(x,y);if(len>1){x/=len;y/=len}
   if(Math.abs(x)+Math.abs(y)>.02){
    const speed=220;player.current.x=clamp(player.current.x+x*speed*dt,32,WORLD.w-32);player.current.y=clamp(player.current.y+y*speed*dt,32,WORLD.h-32);
    facing.current=Math.abs(x)>Math.abs(y)?(x>0?'east':'west'):(y>0?'south':'north');
   }
   camera.current.x+=(player.current.x-camera.current.x)*Math.min(1,dt*7.5);camera.current.y+=(player.current.y-camera.current.y)*Math.min(1,dt*7.5);
   for(const n of npcs.current){
    n.phase+=dt*n.speed/95;const seg=Math.floor(n.phase)%n.route.length;const a=n.route[seg],b=n.route[(seg+1)%n.route.length],t=n.phase-Math.floor(n.phase);
    n.x=a.x+(b.x-a.x)*t;n.y=a.y+(b.y-a.y)*t;
   }
   for(const v of vehicles.current){
    if(v.route?.length){
     const idx=v.routeIndex??0,target=v.route[idx],dx=target.x-v.x,dy=target.y-v.y,d=Math.hypot(dx,dy);
     if(d<8){v.routeIndex=(idx+1)%v.route.length}
     else{const ux=dx/d,uy=dy/d;v.x+=ux*v.speed*dt;v.y+=uy*v.speed*dt;v.facing=Math.abs(ux)>Math.abs(uy)?(ux>0?'east':'west'):(uy>0?'south':'north')}
    }else{v.x+=v.speed*v.dir*dt;if(v.x>WORLD.w+150)v.x=-150;if(v.x<-150)v.x=WORLD.w+150}
   }
   const vw=innerWidth,vh=innerHeight,cam=camera.current;
   ctx.clearRect(0,0,vw,vh);ctx.save();ctx.translate(vw/2-cam.x,vh/2-cam.y);
   ctx.fillStyle='#bdb9a5';ctx.fillRect(0,0,WORLD.w,WORLD.h);
   ctx.strokeStyle='rgba(255,255,255,.10)';ctx.lineWidth=1;
   for(let yy=24;yy<WORLD.h;yy+=24){ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(WORLD.w,yy);ctx.stroke()}
   for(const r of horizontal){ctx.fillStyle='#e0d5b8';ctx.fillRect(0,r.y-7,WORLD.w,r.h+14);ctx.fillStyle='#424e59';ctx.fillRect(0,r.y,WORLD.w,r.h);ctx.fillStyle='#c9b783';for(let xx=20;xx<WORLD.w;xx+=58)ctx.fillRect(xx,r.y+r.h/2-1,28,2)}
   for(const r of vertical){ctx.fillStyle='#e0d5b8';ctx.fillRect(r.x-7,0,r.w+14,WORLD.h);ctx.fillStyle='#424e59';ctx.fillRect(r.x,0,r.w,WORLD.h);ctx.fillStyle='#c9b783';for(let yy=20;yy<WORLD.h;yy+=58)ctx.fillRect(r.x+r.w/2-1,yy,2,28)}
   const parks=[{x:72,y:620,w:720,h:330},{x:2980,y:650,w:520,h:360},{x:4040,y:1370,w:500,h:350},{x:350,y:2820,w:560,h:300}];
   for(const p of parks){ctx.fillStyle='#d9cfb3';ctx.fillRect(p.x-5,p.y-5,p.w+10,p.h+10);ctx.fillStyle='#78886b';ctx.fillRect(p.x,p.y,p.w,p.h);ctx.fillStyle='#d8cdae';ctx.fillRect(p.x+14,p.y+p.h/2-8,p.w-28,16);ctx.fillRect(p.x+p.w/2-8,p.y+14,16,p.h-28)}
   // Large football ground
   ctx.fillStyle='#8e7b62';ctx.fillRect(1945,2050,800,580);ctx.fillStyle='#527a58';ctx.fillRect(2020,2130,650,400);ctx.strokeStyle='#edf0d8';ctx.lineWidth=3;ctx.strokeRect(2028,2138,634,384);ctx.beginPath();ctx.moveTo(2345,2138);ctx.lineTo(2345,2522);ctx.stroke();ctx.beginPath();ctx.arc(2345,2330,46,0,Math.PI*2);ctx.stroke();
   // Buildings and props
   const visible=buildings.filter(b=>b.x>cam.x-vw*.75&&b.x<cam.x+vw*.75&&b.y>cam.y-vh*.85&&b.y<cam.y+vh*.85).sort((a,b)=>a.y-b.y);
   for(const b of visible){const im=asset(b.asset);ctx.fillStyle='rgba(25,34,38,.18)';ctx.beginPath();ctx.ellipse(b.x,b.y+4,b.w*.42,13,0,0,Math.PI*2);ctx.fill();if(im.complete&&im.naturalWidth){ctx.drawImage(im,b.x-b.w/2,b.y-b.h,b.w,b.h)}ctx.fillStyle='rgba(26,45,48,.92)';ctx.fillRect(b.x-52,b.y-8,104,16);ctx.fillStyle='#efd39b';ctx.font='9px system-ui';ctx.textAlign='center';ctx.fillText(b.title,b.x,b.y+3)}
   const prop=(path:string,x:number,y:number,w:number,h:number)=>{const im=asset(path);if(im.complete&&im.naturalWidth)ctx.drawImage(im,x-w/2,y-h,w,h)};
   for(const [x,y] of [[150,802],[3270,1710]] as const)prop('assets/city/props/ar/choripan_stand.png',x,y,90,84);
   for(const [x,y] of [[723,811],[4240,1030]] as const)prop('assets/city/props/ar/parrilla.png',x,y,94,88);
   for(const p of parks){for(let i=0;i<6;i++){const tx=p.x+55+(i%3)*(p.w-110)/2,ty=p.y+80+Math.floor(i/3)*(p.h-120);prop('assets/city/vegetation/tree.png',tx,ty,92,124)}}
   // NPCs
   for(const n of npcs.current){if(Math.abs(n.x-cam.x)>vw*.7||Math.abs(n.y-cam.y)>vh*.8)continue;const dir='south';const im=asset(`assets/characters/${n.gender}/${dir}.png`);if(im.complete&&im.naturalWidth)ctx.drawImage(im,n.x-19,n.y-45,38,45)}
   // Traffic
   for(const v of vehicles.current){if(Math.abs(v.x-cam.x)>vw*.8||Math.abs(v.y-cam.y)>vh*.9)continue;const dir=v.route?.length?(v.facing??'south'):(v.dir>0?'east':'west');const im=asset(`assets/vehicles/${v.model}/${dir}.png`);const w=v.model==='colectivo'?128:92,h=v.model==='colectivo'?62:48;if(im.complete&&im.naturalWidth)ctx.drawImage(im,v.x-w/2,v.y-h,w,h)}
   // Player
   const pi=asset(`assets/characters/male/${facing.current}.png`);if(pi.complete&&pi.naturalWidth)ctx.drawImage(pi,player.current.x-23,player.current.y-54,46,54);else{ctx.fillStyle='#2f8d89';ctx.fillRect(player.current.x-12,player.current.y-32,24,32)}
   ctx.restore();

   let near='';
   const nb=buildings.reduce<{b:Building|null;d:number}>((acc,b)=>{const d=dist(player.current,{x:b.x,y:b.y});return d<acc.d?{b,d}:acc},{b:null,d:9999});
   if(dist(player.current,{x:2345,y:2340})<430)near='ACTUAR · Jugar en la cancha';
   else if(nb.b&&nb.d<190)near=`ACTUAR · ${nb.b.title}`;
   setNearby(v=>v===near?v:near);
   rafRef.current=requestAnimationFrame(render);
  };
  rafRef.current=requestAnimationFrame(render);
  return()=>{cancelAnimationFrame(rafRef.current);window.removeEventListener('resize',resize)}
 },[buildings]);

 const stickMove=(e:React.PointerEvent<HTMLDivElement>)=>{
  if(stickPointer.current!==e.pointerId)return;
  const r=e.currentTarget.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  let dx=(e.clientX-cx)/(r.width/2),dy=(e.clientY-cy)/(r.height/2);const l=Math.hypot(dx,dy);if(l>1){dx/=l;dy/=l}
  input.current={x:dx,y:dy};e.currentTarget.style.setProperty('--x',`${dx*36}px`);e.currentTarget.style.setProperty('--y',`${dy*36}px`);
 };
 const stickDown=(e:React.PointerEvent<HTMLDivElement>)=>{ensureAudio();stickPointer.current=e.pointerId;e.currentTarget.setPointerCapture(e.pointerId);stickMove(e)};
 const stickUp=(e:React.PointerEvent<HTMLDivElement>)=>{if(stickPointer.current!==e.pointerId)return;stickPointer.current=null;input.current={x:0,y:0};e.currentTarget.style.setProperty('--x','0px');e.currentTarget.style.setProperty('--y','0px')};

 useEffect(()=>{if(muted)stopAudio();else if(audioCtx.current)playTrack(0)},[muted,playTrack,stopAudio]);
 const toggleSound=()=>setMuted(v=>!v);

 return <div className={styles.shell}>
  <canvas ref={canvasRef} className={styles.canvas}/>
  <div className={styles.hud}>
   <div className={styles.identity}><strong>VIDA</strong><span>BARRIO DEL SOL</span><small>San Juan · Argentina</small></div>
   <div className={styles.clock}>D1 · 09:40<b>Despejado</b></div>
   <button className={styles.menu} onClick={()=>setPanel(true)}>Menú</button>
   <button className={styles.sound} onClick={toggleSound} aria-label={muted?'Activar sonido':'Silenciar sonido'}>{muted?'🔇':'🔊'}</button>
   {nearby&&<div className={styles.prompt}>{nearby}</div>}
   {message&&<div className={styles.toast} onClick={()=>setMessage('')}>{message}</div>}
   <div className={styles.legend}>WASD / Flechas · Caminar &nbsp;&nbsp; E · Interactuar</div>
   <div className={styles.controls}>
    <div className={styles.stick} onPointerDown={stickDown} onPointerMove={stickMove} onPointerUp={stickUp} onPointerCancel={stickUp}><div className={styles.knob}/></div>
    <button className={styles.life} onPointerDown={e=>{e.preventDefault();setPanel(true)}}>VIDA</button>
    <button className={styles.action} onPointerDown={e=>{e.preventDefault();interact()}}>ACTUAR</button>
   </div>
   {panel&&<div className={styles.panel}>
    <h2>VIDA · Vista móvil</h2>
    <p>Esta rama ya usa una ciudad mucho más grande, controles táctiles dedicados y los assets actuales del juego. La versión principal sigue siendo la build Godot del repositorio VIDA.</p>
    <p><b>Controles:</b> joystick izquierdo para moverte, ACTUAR para interactuar y el botón de sonido para la ambientación original.</p>
    <button onClick={()=>setPanel(false)}>Seguir jugando</button>
    <button onClick={()=>{player.current={x:1550,y:620};camera.current={x:1550,y:620};setPanel(false)}}>Volver al barrio inicial</button>
   </div>}
  </div>
 </div>;
}
