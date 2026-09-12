'use client';
import dynamic from 'next/dynamic';
import type { Language } from '@/lib/site';
const Scene=dynamic(()=>import('./road-scene'),{ssr:false,loading:()=> <div className="road-scene road-placeholder" aria-hidden="true"/>});
export function Road({lang}:{lang:Language}) {return <Scene lang={lang}/>;}
