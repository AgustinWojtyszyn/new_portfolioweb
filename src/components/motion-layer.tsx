'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/** Progressive enhancement: content stays readable without JS or with reduced motion. */
export function MotionLayer() {
 const pathname = usePathname();
 const progress = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let dispose = () => {};
  const setup = () => {
   dispose();
   if (preference.matches) return;
   const main = document.querySelector('main');
   if (!main) return;
   const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
   const reveals = Array.from(main.querySelectorAll<HTMLElement>('.section-heading,.split-heading,.featured-copy,.project-row,.experience-entry,.education,.stack-item,.archive-row,.about-copy,.status-panel,.case-narrative article,.decisions-grid article,.case-intro,.contact-bottom'));
   const scenes = Array.from(main.querySelectorAll<HTMLElement>('.system-map,.order-visual,.architecture,.ecosystem-network,.midnight,.project-row'));
   const layers = Array.from(main.querySelectorAll<HTMLElement>('.system-map,.midnight-title'));
   const visible = new Set<Element>();
   let frame = 0;
   reveals.forEach((el, i) => {
    el.classList.add('motion-reveal');
    el.style.setProperty('--reveal-delay', `${el.matches('.stack-item') ? (i % 4) * 45 : 0}ms`);
    if (el.getBoundingClientRect().top > innerHeight * .95) el.dataset.reveal = 'pending';
   });
   const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(({target,isIntersecting}) => {
     if (!isIntersecting) return;
     (target as HTMLElement).dataset.reveal = 'visible';
     revealObserver.unobserve(target);
    });
   }, {threshold: 0, rootMargin: '0px 0px -4% 0px'});
   reveals.forEach(el => revealObserver.observe(el));
   const sceneObserver = new IntersectionObserver(entries => {
    entries.forEach(({target,isIntersecting}) => {
     target.classList.toggle('motion-active', isIntersecting);
     if (isIntersecting) { visible.add(target); target.classList.add('motion-seen'); }
     else visible.delete(target);
    });
   }, {threshold: .08});
   scenes.forEach(el => sceneObserver.observe(el));
   const update = () => {
    frame = 0;
    const range = document.documentElement.scrollHeight - innerHeight;
    progress.current?.style.setProperty('--progress', `${range > 0 ? Math.min(1,scrollY / range) : 0}`);
    if (!finePointer.matches) return;
    layers.forEach(el => {
     const rect = el.getBoundingClientRect();
     if (rect.bottom < 0 || rect.top > innerHeight) return;
     const offset = Math.max(-7, Math.min(7, (rect.top + rect.height / 2 - innerHeight / 2) * .018));
     el.style.setProperty('--scroll-depth', `${offset.toFixed(2)}px`);
    });
   };
   const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
   const light = (event: PointerEvent) => {
    if (!finePointer.matches) return;
    const target = (event.target as Element).closest<HTMLElement>('.order-visual,.architecture,.project-row');
    if (!target || !visible.has(target)) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--light-x', `${(event.clientX - rect.left) / rect.width * 100}%`);
    target.style.setProperty('--light-y', `${(event.clientY - rect.top) / rect.height * 100}%`);
   };
   main.classList.add('motion-enabled');
   window.addEventListener('scroll', schedule, {passive:true});
   window.addEventListener('resize', schedule, {passive:true});
   main.addEventListener('pointermove', light, {passive:true});
   update();
   dispose = () => {
    cancelAnimationFrame(frame); revealObserver.disconnect(); sceneObserver.disconnect();
    window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);
    main.removeEventListener('pointermove',light);main.classList.remove('motion-enabled');
    reveals.forEach(el=>{delete el.dataset.reveal;el.classList.remove('motion-reveal');el.style.removeProperty('--reveal-delay');});
    scenes.forEach(el=>el.classList.remove('motion-active','motion-seen'));
    layers.forEach(el=>el.style.removeProperty('--scroll-depth'));
    progress.current?.style.setProperty('--progress','0');
   };
  };
  setup();preference.addEventListener('change',setup);
  return () => {dispose();preference.removeEventListener('change',setup);};
 },[pathname]);
 return <div ref={progress} className="scroll-progress" aria-hidden="true"/>;
}
