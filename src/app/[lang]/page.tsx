import { notFound } from 'next/navigation';
import { AtelierHome } from '@/sections/atelier-home';
import { isLanguage } from '@/lib/site';

export default async function Home({ params }: { params: Promise<{lang:string}> }) {
 const { lang } = await params;
 if (!isLanguage(lang)) notFound();
 return <AtelierHome lang={lang}/>;
}
