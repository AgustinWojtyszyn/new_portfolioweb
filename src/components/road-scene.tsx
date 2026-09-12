'use client';
import { useEffect, useRef, useState } from 'react';
import { getContent } from '@/content/site';
import type { Language } from '@/lib/site';
export default function RoadScene({ lang }: { lang: Language }) {
 const phaseRef = useRef(0);
 const canvas = useRef<HTMLCanvasElement>(null); const [playing, setPlaying] = useState(false); const t = getContent(lang);
 useEffect(() => { const q = matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setPlaying(!q.matches); update(); q.addEventListener('change', update); return () => q.removeEventListener('change', update); }, []);
 useEffect(() => {
  const el = canvas.current; if (!el) return; const ctx = el.getContext('2d'); if (!ctx) return;
  let frame = 0, width = 0, height = 0, visible = true, phase = phaseRef.current, last = 0, painted = 0, camera = 0, targetCamera = 0;
  const desktop = matchMedia('(min-width: 801px) and (pointer: fine)').matches;
  const frameInterval = desktop ? 1000 / 60 : 1000 / 30;
  const running = () => playing && visible && !document.hidden;
  function draw(time: number) {
   if (!ctx || !el) return;
   if (running() && time - painted < frameInterval - 1) { frame=requestAnimationFrame(draw); return; }
   painted=time;
   if (running()) { phase += Math.min((time-last)/1000, .05) * .09; phaseRef.current=phase; camera+=(targetCamera-camera)*.055; }
   last = time;
   ctx.clearRect(0,0,width,height);
   const horizon = height*(.29 + camera*.008);
   const sky = ctx.createLinearGradient(0,0,0,height); sky.addColorStop(0,'#101917'); sky.addColorStop(.45,'#15241e'); sky.addColorStop(1,'#080c0b'); ctx.fillStyle=sky;ctx.fillRect(0,0,width,height);
   const glow=ctx.createRadialGradient(width*.54,horizon,0,width*.54,horizon,width*.5);glow.addColorStop(0,'#46694b44');glow.addColorStop(1,'#10201600');ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
   const project=(z:number,side:number) => { const p=z*z; return { x:width*(.5+camera*.006) + Math.sin(z*3.7+0.5)*width*.12*z + side*(width*.009+p*width*.37), y:horizon+p*(height-horizon) }; };
   // Deterministic topography: a visual study, independent of the game's physics.
   ctx.lineWidth=1;ctx.strokeStyle='#63827030';
   for(let row=0;row<19;row++) {const z=row/18; ctx.beginPath();for(let col=0;col<=64;col++){const x=col/64*width;const edge=Math.abs(x-width/2)/(width/2);const wave=Math.sin(col*.34+row*.19)*Math.sin(col*.11+1);const y=horizon+z*z*(height-horizon)-edge*(1-z)*height*.2-wave*edge*height*.06*(1-z);if(col===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.stroke();}
   for(let col=0;col<=28;col++){ctx.beginPath();for(let row=0;row<=24;row++){const z=row/24,x=width/2+(col/28-.5)*width*(.2+z*1.4);const edge=Math.abs(x-width/2)/(width/2);const y=horizon+z*z*(height-horizon)-edge*(1-z)*height*.2-Math.sin(col*.78+row*.14)*edge*height*.04*(1-z);if(row===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.stroke();}
   ctx.beginPath();for(let i=0;i<=90;i++){const p=project(i/90,-1);if(i){ctx.lineTo(p.x,p.y);}else{ctx.moveTo(p.x,p.y);}}for(let i=90;i>=0;i--){const p=project(i/90,1);ctx.lineTo(p.x,p.y);}ctx.closePath();ctx.fillStyle='#111715';ctx.fill();
   for(const side of [-1,1]){ctx.beginPath();for(let i=0;i<=90;i++){const p=project(i/90,side);if(i){ctx.lineTo(p.x,p.y);}else{ctx.moveTo(p.x,p.y);}}ctx.strokeStyle='#a4bca780';ctx.lineWidth=1.4;ctx.stroke();}
   for(let j=0;j<17;j++){const z=((j/17+phase)%1);const p=project(z,0),p2=project(Math.min(z+.02,1),0);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);ctx.strokeStyle='#c8d2af';ctx.lineWidth=1+z*3;ctx.stroke();}
   for(let j=1;j<13;j++){const z=j/13;for(const s of [-1.14,1.14]){const p=project(z,s);ctx.fillStyle='#c7ddb0';ctx.fillRect(p.x,p.y-3-z*8,1+z,3+z*8);}}
   // Faint roadside streaks follow the same illustration clock as the center line.
   for (let j=0;j<8;j++) {const z=(j/8+phase*.65)%1;for(const side of [-1.3,1.3]){const a=project(z,side),b=project(Math.min(z+.012,1),side);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle='#8ad7af35';ctx.lineWidth=.7+z;ctx.stroke();}}
   const car=project(.73, .26), cw=Math.min(width*.095,70),ch=cw*.58;
   ctx.shadowColor='#000';ctx.shadowBlur=18;ctx.fillStyle='#080b0a';ctx.beginPath();ctx.roundRect(car.x-cw/2,car.y-ch,cw,ch,5);ctx.fill();ctx.shadowBlur=0;
   ctx.fillStyle='#66746c';ctx.beginPath();ctx.moveTo(car.x-cw*.43,car.y-ch*.25);ctx.lineTo(car.x-cw*.31,car.y-ch*1.35);ctx.lineTo(car.x+cw*.31,car.y-ch*1.35);ctx.lineTo(car.x+cw*.43,car.y-ch*.25);ctx.closePath();ctx.fill();ctx.fillStyle='#172b24';ctx.fillRect(car.x-cw*.27,car.y-ch*1.16,cw*.54,ch*.45);ctx.fillStyle='#e78370';ctx.fillRect(car.x-cw*.4,car.y-ch*.2,cw*.23,3);ctx.fillRect(car.x+cw*.17,car.y-ch*.2,cw*.23,3);
   el.parentElement?.classList.toggle('road-running',running());
   if(running())frame=requestAnimationFrame(draw);
  }
  const resize=()=>{const r=el.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio,desktop?1.5:1.25);el.width=width*dpr;el.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);cancelAnimationFrame(frame);draw(performance.now());};
  const ro=new ResizeObserver(resize);ro.observe(el);
  const scrollCamera=()=>{if(!desktop||!running())return;const r=el.getBoundingClientRect();targetCamera=Math.max(-1,Math.min(1,(innerHeight/2-r.top-r.height/2)/innerHeight));};
  const resume=()=>{cancelAnimationFrame(frame);el.parentElement?.classList.toggle('road-running',running());if(visible&&!document.hidden){last=performance.now();painted=0;draw(last);}};
  const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;scrollCamera();resume();});io.observe(el);
  window.addEventListener('scroll',scrollCamera,{passive:true});document.addEventListener('visibilitychange',resume);
  return()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();window.removeEventListener('scroll',scrollCamera);document.removeEventListener('visibilitychange',resume);el.parentElement?.classList.remove('road-running');};
 },[playing]);
 return <div className="road-scene"><canvas ref={canvas} aria-hidden="true"/><div className="road-hud mono"><span><i className="status-dot"/> MIDNIGHT PASS</span><span>SECTOR / PINE PASS</span></div><div className="road-telemetry mono"><div><span>PHYSICS</span><strong>60 <small>Hz</small></strong></div><div><span>ENGINE</span><strong>RAPIER</strong></div><div><span>TERRAIN</span><strong>{lang==='es'?'SECTORIZADO':'SECTORIZED'}</strong></div></div><svg className="road-route" viewBox="0 0 120 100" aria-hidden="true"><path className="route-outline" d="M17 82C-2 49 74 86 68 52S101 32 92 13"/><path className="route-trace" pathLength="1" d="M17 82C-2 49 74 86 68 52S101 32 92 13"/><circle cx="92" cy="13" r="3"/><text x="12" y="96">PINE PASS</text></svg><div className="road-bottom"><span className="mono">{t.roadNote}</span><button onClick={()=>setPlaying(!playing)} aria-label={playing?t.roadPause:t.roadPlay}>{playing?'Ⅱ':'▷'} <span>{playing?t.roadPause:t.roadPlay}</span></button></div></div>;
}
