'use client';

import { useEffect, useRef } from 'react';
import { ChromeSculpture } from '@/components/cinema-art';
import type { Language } from '@/lib/site';

const stages = {
  es: [
    { index: '01', label: 'La idea', title: 'Todo empieza con una forma de mirar.', line: 'No se trata de llenar una pantalla. Se trata de crear una sensación.' },
    { index: '02', label: 'La transformación', title: 'La forma empieza a cobrar vida.', line: 'El espacio cambia, las piezas se encuentran y aparece una identidad.' },
    { index: '03', label: 'La experiencia', title: 'Y entonces, todo encaja.', line: 'Diseño, animación y desarrollo dejan de ser partes separadas.' },
  ],
  en: [
    { index: '01', label: 'The idea', title: 'It starts with a different way of seeing.', line: 'Not filling a screen. Creating a feeling.' },
    { index: '02', label: 'The transformation', title: 'Shape begins to come alive.', line: 'Space shifts, elements meet and an identity emerges.' },
    { index: '03', label: 'The experience', title: 'And suddenly, everything clicks.', line: 'Design, animation and engineering become one.' },
  ],
};

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * One continuous three-act film tied to native scrolling.
 * The page retains normal scroll behaviour, there is no wheel hijacking.
 * Without JavaScript or with reduced-motion, the chapter text renders stacked,
 * the art is still, and every service / contact link remains accessible.
 */
export function CinematicSequence({ lang }: { lang: Language }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const acts = [...root.querySelectorAll<HTMLElement>('.vx-film-act')];
    let frame = 0;
    let active = true;

    const reset = () => {
      root.classList.remove('is-playing');
      for(const name of ['--vx-fp','--vx-film-turn','--vx-film-scale','--vx-film-sculpture-alpha','--vx-film-traces-turn','--vx-film-traces-scale','--vx-film-typography-alpha','--vx-film-typography-shift','--vx-film-typography-turn','--vx-film-typography-scale','--vx-film-architecture-alpha','--vx-film-architecture-shift','--vx-film-architecture-scale'])root.style.removeProperty(name);
      acts.forEach(act => {
        act.style.removeProperty('opacity');
        act.style.removeProperty('transform');
      });
    };

    const update = () => {
      frame = 0;
      if (media.matches) {
        reset();
        return;
      }
      const rect = root.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const p = clamp(-rect.top / distance);
      const weights = [
        clamp((0.38 - p) / 0.11),
        clamp((p - 0.27) / 0.11) * clamp((0.73 - p) / 0.11),
        clamp((p - 0.62) / 0.11),
      ];
      const props: Record<string,string> = {
        '--vx-fp': p.toFixed(4),
        '--vx-film-turn': (-11+p*155).toFixed(2)+'deg',
        '--vx-film-scale': (1+p*.7).toFixed(3),
        '--vx-film-sculpture-alpha': clamp(1-(p-.34)*2.15).toFixed(3),
        '--vx-film-traces-turn': (-14+p*72).toFixed(2)+'deg',
        '--vx-film-traces-scale': (1+p*.55).toFixed(3),
        '--vx-film-typography-alpha': clamp((p-.25)*3.4).toFixed(3),
        '--vx-film-typography-shift': (-6*p).toFixed(2)+'%',
        '--vx-film-typography-turn': (-14+p*25).toFixed(2)+'deg',
        '--vx-film-typography-scale': (.6+p*.9).toFixed(3),
        '--vx-film-architecture-alpha': clamp((p-.58)*3.6).toFixed(3),
        '--vx-film-architecture-shift': ((1-p)*24).toFixed(2)+'%',
        '--vx-film-architecture-scale': (.7+p*.3).toFixed(3),
      };
      for(const [name,value] of Object.entries(props))root.style.setProperty(name,value);
      for (let i = 0; i < acts.length; i++) {
        const weight = weights[i] ?? 0;
        acts[i].style.opacity = weight.toFixed(3);
        acts[i].style.transform = 'translate3d(0,' + ((1 - weight) * 24).toFixed(1) + 'px,0)';
      }
      root.classList.add('is-playing');
    };

    const schedule = () => {
      if (!active || frame) return;
      frame = window.requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(entries => {
      active = entries.some(entry => entry.isIntersecting);
      if (active) schedule();
    }, { rootMargin: '200px 0px' });
    observer.observe(root);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    const onMotionPreference = () => { window.cancelAnimationFrame(frame); frame=0; update(); };
    media.addEventListener('change', onMotionPreference);
    schedule();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      media.removeEventListener('change', onMotionPreference);
      reset();
    };
  }, []);

  return <section className="vx-film" ref={rootRef} id="transformation" aria-label={lang === 'es' ? 'De una idea a una experiencia, tres escenas animadas' : 'From idea to experience, a three-act animated story'}>
    <div className="vx-film-sticky">
      <div className="vx-film-world" aria-hidden="true">
        <div className="vx-film-traces"><span/><span/><span/><span/><span/></div>
        <div className="vx-film-sculpture"><ChromeSculpture variant="detail"/></div>
        <div className="vx-film-typography"><span>AGUSTÍN</span><span>STUDIO</span></div>
        <div className="vx-film-architecture">
          <div className="vx-film-architecture-main"><span className="vx-fa-mark">AW</span><span className="vx-fa-rule"/><span className="vx-fa-word">{lang==='es'?'Construir lo imposible.':'Build the extraordinary.'}</span></div>
          <div className="vx-film-architecture-side"><i/><i/><i/><i/></div>
        </div>
        <div className="vx-film-vignette"/>
      </div>
      <div className="vx-container vx-film-content">
        {stages[lang].map((stage, index) => <article className={'vx-film-act vx-film-act--' + index} key={stage.index}>
          <p className="vx-film-act-index">{stage.index} — {stage.label}</p>
          <h2>{stage.title}</h2>
          <p className="vx-film-act-copy">{stage.line}</p>
        </article>)}
      </div>
      <div className="vx-film-bottom" aria-hidden="true">
        <div className="vx-film-track"><span/></div>
        <span>AW / 001—003</span>
      </div>
    </div>
  </section>;
}
