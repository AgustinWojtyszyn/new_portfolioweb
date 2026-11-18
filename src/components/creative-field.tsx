'use client';

import { useEffect, useRef, useState } from 'react';
import type { Language } from '@/lib/site';

type FieldMode = 'flow' | 'orbit' | 'form';
const modes: FieldMode[] = ['flow', 'orbit', 'form'];
const words = {
  es: { label: 'Un experimento en vivo', instruction: 'Mové el dedo o el cursor. Cambiá la escena.', names: ['Flujo','Órbita','Forma'], pause: 'Pausar movimiento', play: 'Reanudar movimiento', canvas: 'Arte generativo interactivo. Seleccioná otra escena o pausá la animación con los controles.' },
  en: { label: 'A live experiment', instruction: 'Move your finger or cursor. Change the scene.', names: ['Flow','Orbit','Form'], pause: 'Pause animation', play: 'Resume animation', canvas: 'Interactive generative art. Choose another scene or pause animation using the controls.' }
};

const TAU = Math.PI * 2;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function CreativeField({ lang }: { lang: Language }) {
  const t = words[lang];
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });
  const [mode, setMode] = useState<FieldMode>('flow');
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const host = root.current;
    const element = canvas.current;
    if (!element || !host) return;
    const context = element.getContext('2d', { alpha: false });
    if (!context) return;
    const ctx = context;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const styles = getComputedStyle(host);
    const color = (token: string) => styles.getPropertyValue(token).trim();
    const ink = color('--at-field-ink');
    const line = color('--at-field-line');
    const warm = color('--at-field-warm');
    const white = color('--at-field-white');
    const fog = color('--at-field-fog');
    let width = 1;
    let height = 1;
    let frame = 0;
    let visible = true;
    let lastDraw = -100;
    let frozenAt = 0;
    let lastTime = 0;

    function paint(time: number) {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = ink;
      ctx.fillRect(0, 0, width, height);
      const cursor = pointer.current;
      const px = cursor.x - 0.5;
      const py = cursor.y - 0.5;
      const t = time * 0.00038;
      ctx.strokeStyle = line;
      ctx.globalAlpha = 0.38;
      ctx.lineWidth = 1;
      const step = Math.max(34, Math.round(width / 13));
      for (let x = 0; x <= width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      if (mode === 'flow') {
        const bands = width < 450 ? 38 : 62;
        const amplitude = height * 0.27;
        for (let i = 0; i < bands; i++) {
          const row = i / (bands - 1);
          ctx.beginPath();
          for (let j = 0; j <= 75; j++) {
            const x = (j / 75) * (width + 60) - 30;
            const progress = x / width;
            const dist = Math.abs(progress - cursor.x);
            const pull = Math.exp(-dist * 5.4);
            const swell = Math.sin(progress * 4.8 + t * 1.8 + row * 3.2) * amplitude * (0.2 + 0.55 * Math.sin(row * Math.PI));
            const twist = Math.sin(progress * 13 - t * 1.3 + row * 4) * (8 + 28 * pull);
            const y = height * (0.2 + 0.63 * row) + swell + twist + py * pull * 65;
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = i % 9 === 0 ? white : i % 3 === 0 ? warm : fog;
          ctx.globalAlpha = i % 9 === 0 ? 0.65 : 0.15 + row * 0.25;
          ctx.lineWidth = i % 9 === 0 ? 1.8 : 1;
          ctx.stroke();
        }
      } else if (mode === 'orbit') {
        const cx = width * (0.5 + px * 0.13);
        const cy = height * (0.49 + py * 0.11);
        const size = Math.min(width * 0.49, height * 0.48);
        for (let i = 0; i < 19; i++) {
          const p = i / 18;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate((i * Math.PI) / 19 + t * (i % 2 ? -0.26 : 0.18));
          ctx.beginPath();
          ctx.ellipse(0, 0, size * (0.36 + p * 0.93), size * (0.26 + p * 0.45), 0, 0, TAU);
          ctx.strokeStyle = i % 4 === 0 ? warm : fog;
          ctx.globalAlpha = i % 4 === 0 ? 0.63 : 0.25;
          ctx.lineWidth = i % 4 === 0 ? 1.5 : 1;
          ctx.stroke();
          ctx.restore();
        }
        for (let i = 0; i < 70; i++) {
          const a = (i * 2.39996 + t * (0.5 + (i % 4) * 0.1));
          const distance = size * (0.28 + ((i * 19) % 67) / 69);
          const x = cx + Math.cos(a) * distance;
          const y = cy + Math.sin(a) * distance * 0.64;
          ctx.beginPath();
          ctx.arc(x, y, i % 8 === 0 ? 2.1 : 0.9, 0, TAU);
          ctx.fillStyle = i % 8 === 0 ? white : warm;
          ctx.globalAlpha = i % 8 === 0 ? 0.8 : 0.44;
          ctx.fill();
        }
      } else {
        const scale = Math.min(width * 0.42, height * 0.72, 310);
        ctx.save();
        ctx.translate(width / 2 + px * 25, height / 2 + py * 25);
        ctx.rotate(Math.sin(t) * 0.045);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '900 ' + scale + 'px Arial, sans-serif';
        for (let i = 12; i >= 0; i--) {
          ctx.globalAlpha = i === 0 ? 0.85 : 0.06;
          ctx.strokeStyle = i === 0 ? white : warm;
          ctx.lineWidth = i === 0 ? 2 : 1;
          ctx.strokeText('AW', i * (4 + px * 6), i * (2 + py * 5));
        }
        ctx.restore();
        const rays = 17;
        for (let i = 0; i < rays; i++) {
          const p = i / rays;
          const x = width * p;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(width - x + px * 65, height);
          ctx.strokeStyle = warm;
          ctx.globalAlpha = i % 4 === 0 ? 0.28 : 0.09;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      // A small optical frame, drawn with the same palette as the site.
      const inset = Math.min(24, width * 0.045);
      const length = 18;
      ctx.strokeStyle = warm;
      ctx.lineWidth = 1.4;
      const corners = [[inset, inset, 1, 1], [width - inset, inset, -1, 1], [inset, height - inset, 1, -1], [width - inset, height - inset, -1, -1]];
      corners.forEach(([x, y, dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(x, y + dy * length);
        ctx.lineTo(x, y);
        ctx.lineTo(x + dx * length, y);
        ctx.stroke();
      });
    }

    function draw(now: number) {
      if (now - lastDraw < 28 && !paused && !motion.matches) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastDraw = now;
      if (!paused && !motion.matches) {
        const delta = lastTime ? Math.min(now - lastTime, 50) : 16;
        frozenAt += delta;
      }
      lastTime = now;
      paint(frozenAt);
      if (!paused && !motion.matches && visible && !document.hidden) frame = requestAnimationFrame(draw);
    }
    function resize() {
      const bounds = element!.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const density = Math.min(window.devicePixelRatio || 1, 1.7);
      element!.width = Math.round(width * density);
      element!.height = Math.round(height * density);
      ctx.setTransform(density, 0, 0, density, 0, 0);
      paint(frozenAt);
    }
    function restart() {
      cancelAnimationFrame(frame);
      lastTime = 0;
      if (visible && !document.hidden) frame = requestAnimationFrame(draw);
    }
    function move(event: PointerEvent) {
      const r = host!.getBoundingClientRect();
      pointer.current = { x: clamp((event.clientX - r.left) / r.width, 0, 1), y: clamp((event.clientY - r.top) / r.height, 0, 1) };
      if (paused || motion.matches) paint(frozenAt);
    }
    const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; restart(); }, { threshold: 0.03 });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(host);
    resizeObserver.observe(element);
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerdown', move);
    document.addEventListener('visibilitychange', restart);
    motion.addEventListener('change', restart);
    resize();
    restart();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerdown', move);
      document.removeEventListener('visibilitychange', restart);
      motion.removeEventListener('change', restart);
    };
  }, [mode, paused]);

  return <div className="at-field" ref={root}>
    <div className="at-field-top"><span>{t.label}</span><span aria-hidden="true">AW / Lab</span></div>
    <canvas className="at-field-canvas" ref={canvas} aria-label={t.canvas} role="img">{t.canvas}</canvas>
    <div className="at-field-bottom">
      <div className="at-field-modes" role="group" aria-label={lang === 'es' ? 'Cambiar escena' : 'Change scene'}>
        {modes.map((name, index) => <button key={name} type="button" aria-pressed={name === mode} className={name === mode ? 'is-active' : ''} onClick={() => setMode(name)}><span>{String(index + 1).padStart(2, '0')}</span>{t.names[index]}</button>)}
      </div>
      <button type="button" className="at-field-pause" aria-label={paused ? t.play : t.pause} aria-pressed={paused} onClick={() => setPaused(p => !p)}>{paused ? '▶' : 'Ⅱ'}<span>{paused ? t.play : t.pause}</span></button>
    </div>
    <p className="at-field-hint">{t.instruction}</p>
  </div>;
}
