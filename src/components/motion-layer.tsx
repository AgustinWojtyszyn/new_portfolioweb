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
   const main = document.querySelector<HTMLElement>('main');
   if (!main) return;
   const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
   const reveals = Array.from(main.querySelectorAll<HTMLElement>('.hero-copy,.hero-top,.hero-bottom,.section-heading,.split-heading,.featured-copy,.project-row,.experience-entry,.education,.stack-item,.archive-row,.about-copy,.status-panel,.case-narrative article,.decisions-grid article,.case-intro,.contact-bottom'));
   const scenes = Array.from(main.querySelectorAll<HTMLElement>('.system-map,.order-visual,.architecture,.ecosystem-network,.midnight,.project-row,.stack-item'));
   const layers = Array.from(main.querySelectorAll<HTMLElement>('.system-map,.midnight-title'));
   const trackedSections = Array.from(main.querySelectorAll<HTMLElement>('section[id]'));
   const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.main-nav a[href^="#"]'));
   const visible = new Set<Element>();
   let frame = 0;
   reveals.forEach((el, i) => {
    el.classList.add('motion-reveal');
    el.style.setProperty('--reveal-delay', `${el.matches('.stack-item') ? (i % 4) * 45 : el.matches('.hero-copy,.hero-top,.hero-bottom') ? i * 35 : 0}ms`);
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
   const sectionObserver = new IntersectionObserver(entries => {
    const centered = entries.filter(entry=>entry.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top-innerHeight*.28)-Math.abs(b.boundingClientRect.top-innerHeight*.28))[0];
    if (!centered) return;
    trackedSections.forEach(section=>section.classList.toggle('section-focus',section===centered.target));
    const id=(centered.target as HTMLElement).id;
    navLinks.forEach(link=>link.classList.toggle('is-current',link.getAttribute('href')===`#${id}`));
   },{rootMargin:'-22% 0px -55% 0px',threshold:0});
   trackedSections.forEach(section=>sectionObserver.observe(section));
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
   const pointer = (event: PointerEvent) => {
    if (!finePointer.matches) return;
    main.style.setProperty('--pointer-x',`${event.clientX}px`);
    main.style.setProperty('--pointer-y',`${event.clientY}px`);
    main.style.setProperty('--pointer-alpha','1');
    const target = (event.target as Element).closest<HTMLElement>('.order-visual,.architecture,.project-row,.stack-item');
    if (!target || !visible.has(target)) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--light-x', `${(event.clientX - rect.left) / rect.width * 100}%`);
    target.style.setProperty('--light-y', `${(event.clientY - rect.top) / rect.height * 100}%`);
   };
   const pointerLeave=()=>main.style.setProperty('--pointer-alpha','0');
   main.classList.add('motion-enabled');
   window.addEventListener('scroll', schedule, {passive:true});
   window.addEventListener('resize', schedule, {passive:true});
   main.addEventListener('pointermove', pointer, {passive:true});
   main.addEventListener('pointerleave',pointerLeave);
   update();
   dispose = () => {
    cancelAnimationFrame(frame); revealObserver.disconnect(); sceneObserver.disconnect(); sectionObserver.disconnect();
    window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);
    main.removeEventListener('pointermove',pointer);main.removeEventListener('pointerleave',pointerLeave);main.classList.remove('motion-enabled');
    main.style.removeProperty('--pointer-x');main.style.removeProperty('--pointer-y');main.style.removeProperty('--pointer-alpha');
    reveals.forEach(el=>{delete el.dataset.reveal;el.classList.remove('motion-reveal');el.style.removeProperty('--reveal-delay');});
    scenes.forEach(el=>el.classList.remove('motion-active','motion-seen'));
    trackedSections.forEach(el=>el.classList.remove('section-focus'));
    navLinks.forEach(el=>el.classList.remove('is-current'));
    layers.forEach(el=>el.style.removeProperty('--scroll-depth'));
    progress.current?.style.setProperty('--progress','0');
   };
  };
  setup();preference.addEventListener('change',setup);
  return () => {dispose();preference.removeEventListener('change',setup);};
 },[pathname]);
 return <div ref={progress} className="scroll-progress" aria-hidden="true"/>;
}