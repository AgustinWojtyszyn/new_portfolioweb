'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Language } from '@/lib/site';

type Consent = 'unknown' | 'accepted' | 'declined';
type AnalyticsWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
};

const storageKey = 'aw-analytics-consent';

export function AnalyticsConsent({ lang, measurementId }: { lang: Language; measurementId: string }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const pathname = usePathname();
  const validId = /^G-[A-Z0-9]+$/.test(measurementId);

  useEffect(() => {
    if (!validId) return;
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(storageKey);
        setConsent(saved === 'accepted' || saved === 'declined' ? saved : 'unknown');
      } catch {
        setConsent('unknown');
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [validId]);

  useEffect(() => {
    if (!validId || consent !== 'accepted') return;
    const analytics = window as AnalyticsWindow;
    if (!document.getElementById('ga4-loader')) {
      analytics.dataLayer = analytics.dataLayer || [];
      analytics.gtag = (...args: unknown[]) => { analytics.dataLayer?.push(args); };
      analytics.gtag('js', new Date());
      const script = document.createElement('script');
      script.id = 'ga4-loader';
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
      document.head.appendChild(script);
    }
    analytics.gtag?.('config', measurementId, { page_path: pathname, anonymize_ip: true });
  }, [consent, pathname, measurementId, validId]);

  useEffect(() => {
    if (!validId || consent !== 'accepted') return;
    const click = (event: MouseEvent) => {
      const element = event.target;
      if (element instanceof Element && element.closest('a[href^="mailto:"]')) {
        (window as AnalyticsWindow).gtag?.('event', 'contact_click', { contact_method: 'email' });
      }
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, [consent, validId]);

  const choose = (value: Consent) => {
    try { localStorage.setItem(storageKey, value); } catch { /* Storage may be disabled. */ }
    setConsent(value);
  };

  if (!validId || consent !== 'unknown') return null;
  return <aside className="seo-consent" role="region" aria-label={lang === 'es' ? 'Preferencias de estadísticas' : 'Analytics preferences'}>
    <p>{lang === 'es'
      ? '¿Me permitís medir visitas y uso de la web con Google Analytics para mejorar esta web? Es opcional.'
      : 'May I use Google Analytics to understand visits and improve this site? This is optional.'}
      {' '}<a href={'/' + lang + '/privacidad'}>{lang === 'es' ? 'Privacidad' : 'Privacy'}</a>
    </p>
    <div className="seo-consent-actions">
      <button type="button" onClick={() => choose('accepted')}>{lang === 'es' ? 'Aceptar medición' : 'Accept analytics'}</button>
      <button type="button" onClick={() => choose('declined')}>{lang === 'es' ? 'No, gracias' : 'No, thanks'}</button>
    </div>
  </aside>;
}
