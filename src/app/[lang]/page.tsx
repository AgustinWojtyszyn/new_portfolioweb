import { notFound } from 'next/navigation';
import { StudioHome } from '@/sections/studio-home';
import { isLanguage } from '@/lib/site';
export default async function Home({params}:{params:Promise<{lang:string}>}) {const {lang}=await params;if(!isLanguage(lang))notFound();return <StudioHome lang={lang}/>;}
